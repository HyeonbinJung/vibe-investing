<div align="center">

# 📈 Vibe Investing

**`SKILL.md` 형식으로 만든 오픈소스 금융·투자 분석 스킬 모음**

일회성 프롬프트 대신, 재사용 가능한 투자 워크플로우를 모읍니다.

![Skills](https://img.shields.io/badge/skills-19-blue)
![Language](https://img.shields.io/badge/언어-한국어%20%7C%20English-success)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

[소개](#-소개) · [스킬 목록](#-스킬-목록) · [빠른 시작](#-빠른-시작) · [한국어 지원](#-한국어-지원) · [구조](#-저장소-구조) · [기여하기](#-기여하기) · [업데이트 내역](updates/)

</div>

---

## 💡 소개

Vibe Investing은 리서치 프레임워크, 시장 분석 관점, 포트폴리오 로직, 보고서 형식을 **재사용·비교·확장하기 쉬운 스킬 단위**로 정리한 저장소입니다. `SKILL.md` 형식의 스킬 폴더를 읽을 수 있는 에이전트나 워크플로우라면 어디서든 사용할 수 있습니다.

| 영역 | 하는 일 |
| --- | --- |
| 🏢 기업 분석 | 비즈니스 이해부터 밸류에이션까지 바텀업 분석 |
| 🗄️ 데이터 수집 | 금융 데이터 조회, 검증, 전처리 |
| 🌐 시장 분석 | 시장 국면, 유동성, 매크로 맥락 파악 |
| 🔢 퀀트 분석 | 시그널 설계와 백테스트 검증 |
| 📝 출력 형식 | 분석 결과를 보고서·브리핑 형태로 패키징 |
| 🧠 투자 대가 페르소나 | 유명 투자자의 의사결정 프레임워크 적용 |

## 🧩 스킬 목록

### 핵심 분석

| 스킬 | 설명 |
| --- | --- |
| [`company-analysis`](skills/fundamental-analysis/company-analysis/SKILL.md) | 기업명만으로 역DCF → 순DCF, 딜 레이더, 데이터 검증까지 IB 스타일 분석 |
| [`openbb-data-fetcher`](skills/data-access/openbb-data-fetcher/SKILL.md) | OpenBB로 시세·재무·매크로 데이터 조회 및 CSV/JSON 저장 |
| [`traditional-market-analysis`](skills/market-analysis/traditional-market-analysis/SKILL.md) | 사이클·유동성·재귀성 기반 시장 국면 분석 |
| [`quant-research`](skills/quantitative-analysis/quant-research/SKILL.md) | 팩터 설계, 과적합 방어, 성과 요인분해 |
| [`financial-report`](skills/output-formats/financial-report/SKILL.md) | 증권사 리포트 스타일의 차트 중심 보고서 |
| [`korean-localization`](skills/output-formats/korean-localization/SKILL.md) | 🆕 한국어 출력, 금융 용어 표준화, 원화 단위·한국 시장 데이터 규칙 |

### 투자 대가 페르소나

| 스킬 | 투자자 | 핵심 관점 |
| --- | --- | --- |
| [`aswath-damodaran`](skills/investor-personas/aswath-damodaran/SKILL.md) | 애스워스 다모다란 | 스토리와 숫자를 잇는 내재가치 평가 |
| [`ben-graham`](skills/investor-personas/ben-graham/SKILL.md) | 벤저민 그레이엄 | 안전마진과 방어적 가치투자 |
| [`bill-ackman`](skills/investor-personas/bill-ackman/SKILL.md) | 빌 애크먼 | 집중투자와 행동주의 |
| [`cathie-wood`](skills/investor-personas/cathie-wood/SKILL.md) | 캐시 우드 | 파괴적 혁신 성장 |
| [`charlie-munger`](skills/investor-personas/charlie-munger/SKILL.md) | 찰리 멍거 | 정신 모형과 우량 기업 |
| [`michael-burry`](skills/investor-personas/michael-burry/SKILL.md) | 마이클 버리 | 역발상과 심층 가치 |
| [`mohnish-pabrai`](skills/investor-personas/mohnish-pabrai/SKILL.md) | 모니시 파브라이 | 낮은 위험·높은 불확실성 베팅 |
| [`nassim-taleb`](skills/investor-personas/nassim-taleb/SKILL.md) | 나심 탈레브 | 꼬리위험과 안티프래질 |
| [`peter-lynch`](skills/investor-personas/peter-lynch/SKILL.md) | 피터 린치 | 이해할 수 있는 성장주 |
| [`phil-fisher`](skills/investor-personas/phil-fisher/SKILL.md) | 필립 피셔 | 장기 성장과 경영진 질 |
| [`rakesh-jhunjhunwala`](skills/investor-personas/rakesh-jhunjhunwala/SKILL.md) | 라케시 준준왈라 | 신흥시장 성장 확신 |
| [`stanley-druckenmiller`](skills/investor-personas/stanley-druckenmiller/SKILL.md) | 스탠리 드러켄밀러 | 유동성 중심 매크로 |
| [`warren-buffett`](skills/investor-personas/warren-buffett/SKILL.md) | 워런 버핏 | 경제적 해자와 장기 보유 |

## 🚀 빠른 시작

### 스킬 사용하기

1. 작업에 맞는 카테고리를 고릅니다.
2. 해당 스킬의 `SKILL.md`를 엽니다.
3. 필요할 때만 `references/`, `scripts/`, `assets/`를 불러옵니다.
4. 투자 질문, 리서치 작업, 보고서 생성에 워크플로우를 적용합니다.

```text
예) "삼성전자 분석해줘"
→ company-analysis + korean-localization 이 함께 적용되어 한국어 IB 스타일 분석을 출력
```

### 스킬 브라우저 실행

저장소의 모든 스킬을 웹에서 검색·열람할 수 있는 로컬 뷰어가 포함되어 있습니다. Node.js만 있으면 별도 설치 없이 실행됩니다.

```bash
node viewer/server.js
# → http://localhost:4300
```

포트를 바꾸려면 `PORT=5000 node viewer/server.js` 처럼 실행합니다.

## 🇰🇷 한국어 지원

모든 스킬 문서가 한국어로 번역되었고, 한국어 출력을 위한 [`korean-localization`](skills/output-formats/korean-localization/SKILL.md) 스킬이 추가되었습니다.

- **자동 언어 감지**: 한국어로 질문하면 최종 답변을 한국어로 작성
- **용어 표준화**: [한국어 금융 용어집](skills/output-formats/korean-localization/references/korean-finance-glossary.md) 기반으로 `잉여현금흐름(FCF)`처럼 병기
- **원화 단위**: `1조 2,345억 원` 형식, 환율·기준일 명시
- **한국 시장 데이터**: DART, KRX, 한국은행 ECOS 및 `005930.KS`, `247540.KQ` 티커 규칙

자세한 변경 내역은 [updates/](updates/) 폴더를 참고하세요.

## 🗂️ 저장소 구조

```text
vibe-investing/
├── README.md
├── AGENTS.md
├── updates/                 # 업데이트 내역
├── viewer/                  # 로컬 스킬 브라우저
└── skills/
    ├── AGENTS.md
    ├── data-access/
    ├── fundamental-analysis/
    ├── investor-personas/
    ├── market-analysis/
    ├── output-formats/
    ├── portfolio/
    └── quantitative-analysis/
```

각 스킬은 독립 폴더로 구성되며, `SKILL.md`만 필수입니다.

```text
skills/<category>/<skill-name>/
├── SKILL.md
├── references/   # 선택
├── scripts/      # 선택
└── assets/       # 선택
```

## 📐 설계 원칙

- 임시 프로젝트 폴더가 아니라 **재사용 가능한 역량** 단위로 스킬을 구성합니다.
- 각 스킬은 모듈화되어 있고, 이식 가능하며, 쉽게 발전시킬 수 있어야 합니다.
- `SKILL.md`는 간결하고 워크플로우 중심으로 작성합니다.
- 상세 공식, 템플릿, 긴 설명은 `references/`로 분리합니다.
- 반복적이고 결정론적인 작업만 `scripts/`로 자동화합니다.
- 스킬 이름은 소문자 하이픈 표기(lowercase hyphen-case)를 사용합니다.
- 폴더별 관리 규칙은 별도 문서 대신 `AGENTS.md`에 둡니다.

## 🤝 기여하기

재사용 가능한 투자 워크플로우 인프라로서 저장소를 개선하는 기여를 환영합니다. 스킬을 추가하거나 수정할 때는:

- `skills/` 아래 가장 적합한 최상위 카테고리에 둡니다.
- 구조를 얕게 유지합니다.
- 광범위한 추측성 뼈대보다 작고 구체적인 추가를 선호합니다.
- 하위 폴더에 `README.md`를 추가하지 않습니다.
- 특정 호스트 제품에 묶이지 않는 일반적인 지침으로 작성합니다.
- 수정하는 디렉터리의 `AGENTS.md` 지침을 따릅니다.
- 변경 사항은 `updates/` 폴더에 기록합니다.

## 📚 참고 자료

| 대상 | 기반 이론·출처 |
| --- | --- |
| `skills/investor-personas/` | [virattt/ai-hedge-fund](https://github.com/virattt/ai-hedge-fund)의 투자자 페르소나를 스킬 형식으로 각색 |
| `company-analysis` | 애스워스 다모다란(Aswath Damodaran) 스타일 밸류에이션: 내러티브 우선 분석, 시장 내재 기대치, 순DCF 이전의 역DCF, FCFF 기반 내재가치, 재투자·마진 분해, 산업 현실 검증 |
| `quant-research` | 파마-프렌치(Fama-French) 팩터 프레임워크, AQR 스타일 팩터 투자·팩터 모멘텀, 앤드루 로(Andrew Lo)의 적응적 시장 가설, 베일리·로페즈 데 프라도(Bailey & López de Prado)의 백테스트 과적합 방어, CMT·존 볼린저(John Bollinger) 규칙 기반 기술적 분석, 성과 요인분해·위험 분해 |
| `traditional-market-analysis` | 하워드 막스(Howard Marks)의 사이클·진자 심리·2차적 사고·위험 비대칭, 마이클 모부신(Michael Mauboussin)의 기대 투자·기저율·해자 지속성·자본배분, 스탠리 드러켄밀러(Stanley Druckenmiller)의 매크로 국면·유동성 우선 해석, 조지 소로스(George Soros)의 재귀성 |

## 📄 라이선스

[MIT License](LICENSE)
