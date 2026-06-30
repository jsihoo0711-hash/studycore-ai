StudyCore AI Functions 완성 폴더

이 ZIP 안에 들어있는 것:
- index.html : 네 학습 사이트
- netlify.toml : Netlify 설정
- netlify/functions/ask-ai.mjs : OpenAI API를 대신 호출하는 AI 서버 파일

중요:
- OpenAI API 키는 절대 index.html 안에 넣지 마.
- Netlify 사이트 설정의 Environment variables에 넣어야 함.

Netlify에서 설정할 환경변수:
1) OPENAI_API_KEY
   값: 네 OpenAI API 키

선택:
2) OPENAI_MODEL
   값 예시: 네 OpenAI 계정에서 사용 가능한 모델 이름
   비워두면 ask-ai.mjs 안의 기본값 gpt-4.1-mini를 사용함.

배포 후 AI 주소:
https://네사이트주소.netlify.app/.netlify/functions/ask-ai

앱 안에는 기본값으로 /.netlify/functions/ask-ai 가 들어가 있어서,
같은 Netlify 사이트에 올리면 보통 주소를 따로 안 넣어도 됨.
