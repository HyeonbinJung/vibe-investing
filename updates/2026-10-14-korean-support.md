# 2026-10-14 · 한국어 지원 추가

## 요약

저장소 전체를 한국어로 현지화하고, 한국어 출력을 위한 전용 스킬과 로컬 스킬 브라우저를 추가했습니다.

## ✨ 새 기능

### 한국어 지원 스킬 `korean-localization`

- 위치: `skills/output-formats/korean-localization/`
- 사용자가 한국어로 질문하면 다른 스킬의 결과물을 한국어로 출력하도록 하는 출력 레이어
- 금융 용어 표준화: `references/korean-finance-glossary.md` 용어집(밸류에이션, 재무제표, 매크로, 퀀트, 딜, 한국 시장 고유 용어)
- 원화 단위 규칙: 억·조 원 표기, 외화 환산 시 환율과 기준일 명시, %와 %p 구분, 연결/별도 기준 구분
- 한국 시장 데이터 소스: DART, KRX 정보데이터시스템, 한국은행 ECOS
- 한국 종목 티커 규칙: 코스피 `.KS`, 코스닥 `.KQ` (예: `005930.KS`)
- 상위 스킬의 출력 계약(블록 순서, 마크다운·표 금지 등)은 그대로 유지

### 스킬 브라우저 `viewer/`

- 의존성 없는 Node.js 로컬 서버(`viewer/server.js`)와 한국어 UI(`viewer/index.html`)
- 카테고리별 스킬 목록, 검색, `SKILL.md`·`references/` 문서 렌더링
- 실행: `node viewer/server.js` → http://localhost:4300 (`PORT` 환경변수로 변경 가능)

## 🌐 한국어 번역

- 모든 `SKILL.md`, `AGENTS.md`, `references/*.md` 문서를 한국어로 번역
- 프런트매터의 `name` 값, 파일 경로, 코드, 명령어, 지표 약어(DCF, ROIC 등)는 원문 유지
- `description`은 한국어로 번역하되 핵심 영문 트리거 용어를 괄호로 병기
- `openbb-data-fetcher/scripts/fetch_openbb.py`는 코드 동작 보존을 위해 변경하지 않음

## 📝 README 개편

- 한국어로 전면 재작성
- 배지, 목차 링크, 카테고리 요약 표 추가
- 스킬 목록을 링크가 걸린 표로 정리(투자 대가 페르소나는 투자자·핵심 관점 포함)
- 빠른 시작, 한국어 지원, 스킬 브라우저 실행 방법 섹션 추가
- 참고 자료를 표로 정리

## 🗂️ 기타

- `updates/` 폴더 신설: 이후 변경 내역은 이 폴더에 `YYYY-MM-DD-주제.md` 형식으로 기록
