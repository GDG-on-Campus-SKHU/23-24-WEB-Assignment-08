# api toyproject - 감성일기 with chatgpt

## 서비스 소개
### 문제
- 오늘 있었던 일을 글로 작성하는 것이 너무 귀찮은 현대인들, 그러나 자신의 행동기제는 명확히 알고 고쳐야 더 나은 나가 된다는 것을 알고 있음. 
- 이를 실천으로 옮기기 위해서 최소한의 도움이 될 수는 없을까? 하고 생각함.
### 가설
- 최소한의 정보가 담긴 글을 쓰면, gpt의 도움으로 자동으로 문장을 작성하고, 심리적인 분석과 액션리스트를 제공할 경우 위를 알기 더욱 용이할 것.
### 서비스
- web application을 통한 ai 회고록 모델

## Chat gpt 활용법
### prompt: chat gpt를 통해 원하는 결과를 출력할 수 있도록 잘 짜여진 지시사항 작성

### 개발 과정
1. https://chat.openai.com/에서 프롬프트 개발, 테스트 진행
2. Open API Key 발급 후 연동(18$까지 무료)
3. 프롬프트 코드 변환
- 시스템(System) 역할: Chat gpt에게 전제, 배경설명
- 보조자(Assistant) 역할: 이전 내용을 바탕으로 프롬프트에 요청할 때 사용
- 사용자(User) 역할: Chat gpt 에게 질문

## 서비스 개발
### 기술 스택: Reast, Styled-Component, antd, Vite
- [x] React install
- [x] npm install styled-components antd @ant=design/icons
- [] make counter: useState, event, handle
- [x] GPT API KEY발급, env 설정
- [] UserInput 처리
- [] antd, styled-components 소개 및 스타일 컴포넌트
- [] refactoring - loading, icon, errer message

## 주의점
1. API 호출 유료 > 하루 사용량 제한
2. API Key 노출 x
3. 최초 1회 발급 시 재노출 불가

## 레퍼런스 
### 심리상담사 Chat GPT AI 회고록: 코딩루팡


