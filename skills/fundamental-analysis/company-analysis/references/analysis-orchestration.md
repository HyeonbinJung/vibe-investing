# 분석 오케스트레이션

## 목차

- 자동 라우팅 로직
- 핵심 원칙
- 프롬프트 유형별 프레임워크 스택
- 8대 프레임워크 군
- 역검증 규칙

## 자동 라우팅 로직

추가 질문 없이 사용자의 표현으로부터 분석을 트리거한다.

### 기본 기업 분석

프롬프트 예시:

- `[Company] analyze`
- `Analyze [Company]`
- 기업명만 제시

라우팅:

- 상장기업: 내러티브(Narrative) + 역DCF(Reverse DCF) + 순DCF(Forward DCF) + 트레이딩 컴프스(Trading Comps) + 민감도 분석(Sensitivity) + So What
- 비상장 스타트업: 영업 모델(Operating Model) + 유닛 이코노믹스(Unit Economics) + DCF
- 지주회사 또는 대형 복합기업: SOTP + 부문별 비교기업 분석(Segment Comps)
- 모호한 경우: 내러티브(Narrative) + 역DCF(Reverse DCF) + 순DCF(Forward DCF) + 트레이딩 컴프스(Trading Comps) + 민감도 분석(Sensitivity)

상장기업의 경우 항상 내러티브를 정의하고, 순DCF보다 역DCF를 먼저 수행한다.

### M&A 트리거

프롬프트 예시:

- `A acquires B`
- `M&A`

라우팅:

- 증익/희석 분석(Accretion / Dilution)
- 선례 거래 분석(Precedent Transactions)

### LBO 트리거

프롬프트 예시:

- `[Company] LBO`
- `[Company] buyout`

라우팅:

- LBO 모델(LBO Model)
- 투자심의 메모(IC Memo)

### IPO 트리거

프롬프트 예시:

- `[Company] IPO`
- `[Company] listing`

라우팅:

- IPO 공모가 산정(IPO Pricing)
- 트레이딩 컴프스(Trading Comps)

### 부채/신용 트리거

프롬프트 예시:

- `[Company] debt`
- `[Company] credit`

라우팅:

- 신용 분석(Credit Analysis)
- 부채 수용 능력(Debt Capacity)

### 리스크 트리거

프롬프트 예시:

- `[Company] risk`

라우팅:

- 민감도 분석(Sensitivity)
- 시나리오 분석(Scenario Analysis)

## 핵심 원칙

모든 분석의 출발점은 "적정가치는 얼마인가?"가 아니다. 출발점은 "현재 주가는 어떤 기대치를 내포하고 있는가?"이다.

다음 순서를 따른다:

1. 내러티브(Narrative)
2. 역DCF(Reverse DCF)
3. 순DCF(Forward DCF)
4. 비교기업 분석(Comps) 및 교차 검증
5. 시나리오 및 So What

## 8대 프레임워크 군

### 0. 내러티브 및 기대치 프레임워크

- 기업에 대해 현재 시장이 가진 스토리를 정의한다
- 스토리를 재무적 기대치로 변환한다
- 역DCF(Reverse DCF)를 통해 내재 성장률, 이익률, 재투자 가정을 도출한다
- 해당 가정을 산업의 현실과 대조하여 검증한다

### 1. FCFF 기반 DCF

공식:

- FCFF = EBIT x (1 - Tax) + D&A - Capex - Delta NWC

규칙:

- WACC 산출 논리를 명시한다
- 잔존가치(terminal value) 산출 논리와 그것이 산업적으로 타당한 이유를 명시한다
- DCF는 독립적인 답이 아니라 역DCF와의 비교 기준으로 사용한다

### 2. 트레이딩 컴프스(Trading Comps)

- 가능한 경우 실재하는 상장 비교기업 7~15개를 사용한다
- P/S, P/E, EV/EBITDA를 고려한다
- 백분위 기반 해석과 프리미엄/디스카운트 논리를 사용한다
- 멀티플을 압축된 기대치로 해석한다

### 3. SOTP

- 사업부문을 명확히 구분한다
- 필요한 경우 옵션 가치를 분리한다
- 핵심 자산과 비핵심 자산을 구분한다

### 4. 민감도 및 시나리오 분석

- 강세(bull), 기본(base), 약세(bear) 시나리오를 사용한다
- 시나리오별로 확률 가중치를 부여한다
- 이벤트를 주당 가격 영향으로 환산한다
- 기대값뿐 아니라 변동성도 언급한다

### 5. M&A 증익/희석 분석(Accretion / Dilution)

- 거래 구조
- 프로포마(pro forma) EPS
- 시너지
- 손익분기 논리

### 6. LBO 모델

- 자금 조달 및 사용(Sources and Uses)
- 부채 구조
- IRR
- 현금 회수 배수(Cash-on-Cash multiple)

### 7. 영업 모델 및 유닛 이코노믹스

- 매출 빌드업
- CAC / LTV
- 코호트 논리
- 현금 소진율(burn rate)

### 8. 투자심의 메모(IC Memo)

- 요약
- 투자 논거
- 밸류에이션
- 리스크
- 투자 권고

## 역검증 규칙

항상 다음을 공개한다:

- 산출 가치와 현재 시가총액 또는 주가 간의 격차
- 격차가 ±30%를 초과할 경우 주의(caution) 표시
- 현재 주가를 정당화하는 데 필요한 매출 CAGR, EBIT 이익률, 재투자율
- 해당 요구 수준이 산업 구조 및 비교기업의 과거 실적 대비 현실적인지 여부
