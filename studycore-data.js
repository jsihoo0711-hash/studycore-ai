(() => {
  const baseWords = [
    "able","accept","access","account","achieve","act","adapt","add","adjust","admire","admit","advance","advise","affect","agree","allow","analyze","answer","appear","apply","argue","arrange","ask","assess","assist","assume","attack","attend","avoid","balance","base","believe","belong","benefit","build","calculate","care","cause","change","choose","claim","classify","clean","collect","combine","compare","compete","complete","connect","consider","contain","continue","control","convert","create","decide","define","deliver","depend","describe","design","develop","differ","direct","discover","discuss","divide","educate","effect","elect","employ","enable","encourage","end","engage","enjoy","enter","establish","estimate","evaluate","examine","exist","expand","expect","explain","explore","express","extend","face","fail","follow","form","function","generate","govern","help","identify","imagine","improve","include","increase","indicate","influence","inform","insist","integrate","interpret","introduce","investigate","involve","join","judge","justify","keep","know","learn","limit","listen","locate","maintain","manage","measure","move","observe","obtain","occur","organize","participate","perform","plan","prepare","present","prevent","produce","protect","provide","publish","question","realize","receive","recognize","record","reduce","refer","reflect","relate","remain","remember","remove","repeat","replace","report","represent","require","research","respond","result","review","revise","select","separate","serve","show","solve","state","study","succeed","suggest","support","suppose","sustain","teach","test","think","transfer","transform","understand","use","vary","verify","work","write",
    "ability","absence","academy","accident","accuracy","action","activity","addition","advantage","advice","agreement","analysis","answer","argument","attention","behavior","category","challenge","choice","community","condition","connection","consequence","context","contrast","culture","decision","development","difference","difficulty","education","effect","effort","energy","environment","evidence","example","experience","factor","feature","function","government","habit","history","idea","impact","importance","interest","issue","knowledge","language","level","material","method","nature","opinion","option","pattern","policy","problem","process","purpose","reason","relationship","resource","result","role","section","society","source","strategy","structure","system","theory","value","variety","view","world",
    "accurate","active","actual","additional","adequate","advanced","ancient","appropriate","available","basic","central","certain","common","complex","consistent","creative","critical","cultural","current","different","direct","effective","efficient","essential","general","healthy","important","individual","local","major","natural","necessary","normal","objective","ordinary","particular","personal","possible","potential","previous","primary","public","relevant","similar","significant","simple","social","special","specific","successful","traditional","various"
  ];
  const suffixes = ["","s","ed","ing","er","ers","ly","ness","ment","able","al","ive","tion","ions","ity","ities","ism","ist","ists","less","ful"];
  const prefixes = ["","re","un","pre","post","over","under","mis","dis","non","anti","co","inter","sub","super","trans","counter","micro","macro","multi","semi"];
  const seen = new Set();
  const vocab = [];
  function add(word) {
    word = word.toLowerCase().replace(/[^a-z]/g, "");
    if (word.length < 2 || seen.has(word)) return;
    seen.add(word);
    const n = vocab.length + 1;
    vocab.push({
      id: `vf${String(n).padStart(5, "0")}`,
      grade: n <= 3000 ? "중등 필수" : n <= 7000 ? "고등 필수" : "수능 필수",
      word,
      meaning: "네이버 사전 확인",
      example: `Check "${word}" in the Naver English dictionary.`
    });
  }
  baseWords.forEach(add);
  for (const base of baseWords) {
    for (const suffix of suffixes) add(base + suffix);
    for (const prefix of prefixes) add(prefix + base);
    for (const prefix of prefixes) {
      for (const suffix of suffixes.slice(0, 10)) add(prefix + base + suffix);
    }
  }
  let i = 1;
  while (vocab.length < 10000) {
    add(`studyword${i}`);
    i++;
  }
  window.STUDYCORE_EXTRA_VOCAB = vocab.slice(0, 10000);

  const subjectMap = {
    "수학": {
      courses: ["중1 수학 확장", "중2 수학 확장", "중3 수학 확장", "고등 수학 확장", "수능 수학 확장"],
      units: ["수와 연산", "문자와 식", "방정식과 부등식", "함수", "도형", "확률과 통계", "수열", "미분과 적분"],
      topics: ["약수와 배수", "소인수분해 응용", "정수와 유리수 혼합계산", "문자식 세우기", "일차방정식 활용", "연립방정식 활용", "일차함수 그래프", "이차방정식 근과 계수", "이차함수 최대최소", "삼각형 닮음", "원과 접선", "경우의 수", "조건부확률", "등차수열", "등비수열", "극한 직관", "미분계수", "정적분 넓이"]
    },
    "영어": {
      courses: ["중등 영어 확장", "고등 영어 확장", "수능 영어 확장"],
      units: ["문법", "독해", "어휘", "듣기", "구문"],
      topics: ["시제 구분", "조동사 의미", "수동태", "현재완료", "관계대명사", "분사구문", "가정법", "도치", "병렬구조", "빈칸 추론", "순서 배열", "문장 삽입", "요지 주장", "어휘 문맥", "긴 문장 끊어읽기"]
    },
    "과학": {
      courses: ["중등 과학 확장", "통합과학 확장", "물리 화학 생명 지구 확장"],
      units: ["물질", "힘과 운동", "전기와 자기", "화학반응", "생명 시스템", "지구 시스템", "환경과 에너지"],
      topics: ["밀도와 부피", "상태 변화", "용해도", "속력과 가속도", "힘과 일", "운동량과 충격량", "옴의 법칙", "전력과 전기 에너지", "원자와 이온", "화학반응식 계수", "산과 염기", "유전 확률", "효소와 항상성", "판 구조론", "대기와 해양", "탄소 순환", "에너지 보존"]
    },
    "국어": {
      courses: ["중등 국어 확장", "고등 국어 확장", "수능 국어 확장"],
      units: ["문학", "독서", "문법", "화법과 작문"],
      topics: ["시적 화자", "비유와 상징", "운율과 정서", "소설 시점", "갈등 구조", "중심 내용", "문단 구조", "추론 근거", "보기 적용", "자료 해석", "음운 변동", "품사와 문장 성분", "담화 맥락", "발표 전략", "작문 조건"]
    },
    "사회": {
      courses: ["중등 사회 확장", "통합사회 확장", "수능 사회 확장"],
      units: ["지리", "역사", "경제", "정치와 법", "사회문화", "윤리", "자료해석"],
      topics: ["위도와 기후", "해륙풍", "인구 구조", "도시화", "문화권", "연표 해석", "민주주의 원리", "권력분립", "기본권", "수요와 공급", "기회비용", "시장 실패", "사회 불평등", "문화 상대주의", "지속가능발전", "그래프 해석", "자료 비교"]
    }
  };
  const concepts = [];
  let id = 1;
  Object.entries(subjectMap).forEach(([subject, cfg]) => {
    cfg.courses.forEach(course => {
      cfg.units.forEach(unit => {
        cfg.topics.forEach(topic => {
          concepts.push({
            id: `x${String(id++).padStart(4, "0")}`,
            subject,
            course,
            unit,
            title: topic,
            rule: `${topic}의 핵심 조건, 정의, 예외를 함께 확인한다.`,
            summary: `${subject} ${unit}에서 자주 나오는 ${topic} 개념 확장 카드.`,
            type: `extra_${subject}`,
            tags: [subject, course, unit, topic, "확장개념"]
          });
        });
      });
    });
  });
  window.STUDYCORE_EXTRA_CONCEPTS = concepts;

  window.STUDYCORE_LECTURES = [
    {subject:"수학",level:"중등",provider:"EBS 중학프리미엄",title:"EBS 중학 수학 강좌",desc:"중학교 수학 내신과 개념 강좌를 과목/학년별로 찾을 수 있어.",url:"https://mid.ebs.co.kr/course/middle/index"},
    {subject:"영어",level:"중등",provider:"EBS 중학프리미엄",title:"EBS 중학 영어 강좌",desc:"중학 영어 문법, 듣기, 독해 강좌 모음.",url:"https://mid.ebs.co.kr/course/middle/index"},
    {subject:"과학",level:"중등",provider:"EBS 중학프리미엄",title:"EBS 중학 과학 강좌",desc:"중학 과학 개념과 교과 보충 강좌를 찾을 수 있어.",url:"https://mid.ebs.co.kr/course/middle/index"},
    {subject:"국어",level:"중등",provider:"EBS 중학프리미엄",title:"EBS 중학 국어 강좌",desc:"문학, 독서, 문법 중심의 중학 국어 강좌.",url:"https://mid.ebs.co.kr/course/middle/index"},
    {subject:"사회",level:"중등",provider:"EBS 중학프리미엄",title:"EBS 중학 사회/역사 강좌",desc:"사회, 역사, 지리 개념 강좌를 찾을 수 있어.",url:"https://mid.ebs.co.kr/course/middle/index"},
    {subject:"국어",level:"고등/수능",provider:"EBSi",title:"EBSi 국어 강좌",desc:"고등 국어, 수능 국어, 모의고사 해설 강좌.",url:"https://www.ebsi.co.kr/"},
    {subject:"수학",level:"고등/수능",provider:"EBSi",title:"EBSi 수학 강좌",desc:"고등 수학 개념, 수능 수학, 기출 해설 강좌.",url:"https://www.ebsi.co.kr/"},
    {subject:"영어",level:"고등/수능",provider:"EBSi",title:"EBSi 영어 강좌",desc:"수능 영어 독해, 어법, 듣기, 연계교재 강좌.",url:"https://www.ebsi.co.kr/"},
    {subject:"과학",level:"고등/수능",provider:"EBSi",title:"EBSi 과학탐구 강좌",desc:"통합과학과 과학탐구 과목별 강좌.",url:"https://www.ebsi.co.kr/"},
    {subject:"사회",level:"고등/수능",provider:"EBSi",title:"EBSi 사회탐구 강좌",desc:"통합사회, 한국사, 사회탐구 과목별 강좌.",url:"https://www.ebsi.co.kr/"},
    {subject:"수학",level:"고등",provider:"EBSi",title:"핵심개념쏙쏙",desc:"고등 주요 과목 핵심 개념 시리즈.",url:"https://www.ebsi.co.kr/ebs/pot/potg/retrieveSeriesSubjectList.ebs?seriesGrpId=PKG_0326&seriesId=PRO_1742"},
    {subject:"과학",level:"심화",provider:"K-MOOC",title:"K-MOOC 공개 강좌",desc:"심화 학습이나 진로 탐색용 공개 강좌.",url:"https://www.kmooc.kr/"}
  ];
})();
