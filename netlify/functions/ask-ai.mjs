export default async function handler(req) {
  try {
    if (req.method === "OPTIONS") {
      return new Response("", {
        status: 204,
        headers: corsHeaders()
      });
    }

    if (req.method !== "POST") {
      return json({ answer: "POST 요청만 가능해." }, 405);
    }

    if (!process.env.OPENAI_API_KEY) {
      return json({
        answer:
          "아직 OPENAI_API_KEY가 Netlify 환경변수에 안 들어가 있어. Netlify 사이트 설정에서 Environment variables에 OPENAI_API_KEY를 추가해줘."
      }, 500);
    }

    const body = await req.json().catch(() => ({}));
    const question = String(body.question || "").slice(0, 4000);
    const selected = body.selected || {};
    const wrong = Array.isArray(body.wrong) ? body.wrong.slice(0, 6) : [];
    const notes = Array.isArray(body.notes) ? body.notes.slice(0, 6) : [];

    if (!question.trim()) {
      return json({ answer: "질문을 입력해줘." }, 400);
    }

    const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

    const prompt = `
너는 한국 중고등학생을 위한 공부 앱 안의 AI 튜터야.
학생은 공부를 어려워하고, 설명은 짧고 쉽게 해줘야 해.

말투:
- 한국어로 답해.
- 너무 딱딱하지 않게, 학생이 바로 이해하게 설명해.
- 답만 주지 말고 풀이 흐름을 보여줘.
- 모르면 모른다고 하고, 근거 없이 지어내지 마.

과목별 규칙:
- 수학: 공식 → 대입 → 계산 → 정답 순서로 보여줘. 고난도면 조건을 쪼개서 설명해.
- 영어: 문법 포인트, 해석, 왜 그 답인지 설명해. 단어 질문이면 예문도 줘.
- 과학: 공식, 단위, 원인-결과를 같이 설명해.
- 국어: 지문 근거와 선지 판단 방식으로 설명해.
- 사회: 개념, 자료 해석, 원인-결과 중심으로 설명해.

복습 규칙:
- 최근 오답이나 문제 노트가 있으면 약한 유형을 찾아서 복습문제 1~3개를 만들어줘.
- 복습문제는 정답과 풀이까지 같이 줘.
- 학생이 "고난도"라고 하면 너무 쉬운 계산만 내지 말고 응용 조건을 넣어줘.

현재 선택 개념:
${JSON.stringify(selected, null, 2)}

최근 오답:
${JSON.stringify(wrong, null, 2)}

문제 노트:
${JSON.stringify(notes, null, 2)}

학생 질문:
${question}
`;

    const openaiRes = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        input: prompt,
        max_output_tokens: 1400
      })
    });

    const data = await openaiRes.json().catch(() => ({}));

    if (!openaiRes.ok) {
      const message =
        data?.error?.message ||
        "OpenAI API 연결 오류가 났어. API 키, 결제 설정, 모델 이름을 확인해줘.";

      return json({
        answer: `AI 연결 오류: ${message}`
      }, 500);
    }

    const answer =
      data.output_text ||
      extractOutputText(data) ||
      "답변을 불러오지 못했어. 모델 응답 형식을 확인해줘.";

    return json({ answer });

  } catch (error) {
    return json({
      answer: `서버 오류가 났어: ${error.message}`
    }, 500);
  }
}

function extractOutputText(data) {
  try {
    const output = data.output || [];
    return output
      .flatMap(item => item.content || [])
      .map(content => content.text || "")
      .filter(Boolean)
      .join("\n")
      .trim();
  } catch {
    return "";
  }
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };
}

function json(payload, status = 200) {
  return Response.json(payload, {
    status,
    headers: corsHeaders()
  });
}
