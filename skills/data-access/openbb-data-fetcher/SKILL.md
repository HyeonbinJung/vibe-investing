---
name: openbb-data-fetcher
description: "OpenBB MCP 서버 대신 OpenBB Python 인터페이스를 통해 재무, 시장, 경제, 펀더멘털, 뉴스, 옵션, 암호화폐, ETF, 지수, 매크로 데이터를 조회한다. 에이전트가 OpenBB 지원 제공업체(provider)로부터 현재 또는 과거 데이터를 가져와야 할 때, OpenBB MCP 호출을 Python/OpenBB 직접 사용으로 대체해야 할 때, 또는 명확한 쿼리 파라미터, 제공업체 정보, 데이터 품질 메모가 포함된 출처 태깅 및 재현 가능한 데이터셋을 반환해야 할 때 사용한다."
---

# OpenBB 데이터 페처

## 역할

OpenBB를 독립적인 데이터 액세스 계층으로 사용한다. 요청된 데이터를 조회하고, 출처 이력(provenance)을 보존하며, 활용 가능한 구조로 정규화하고, 반환되는 데이터셋 패키지에 불확실성을 명시한다.

## 기본 동작

- `from openbb import obb`로 OpenBB Python 패키지를 직접 사용한다.
- 사용자가 명시적으로 MCP를 요청하지 않는 한 OpenBB MCP 서버를 사용하지 않는다.
- 단순한 엔드포인트 호출에는 임시 셸 heredoc 대신 번들된 `scripts/fetch_openbb.py` 헬퍼를 우선 사용한다.
- 웹 스크래핑보다 공식 OpenBB 엔드포인트와 제공업체 확장(extension)을 우선 사용한다.
- OpenBB가 설치되어 있지 않다는 이유만으로 일반 웹 검색으로 대체하지 않는다. OpenBB를 설치하고 요청을 재시도하거나, 설치 장애 요인을 보고한다.
- 웹 검색은 OpenBB 설치, 임포트, 엔드포인트, 제공업체 또는 인증 정보 설정이 실패했고 여전히 요청 작업에 대한 답이 필요한 경우에만 대체 수단으로 사용한다.
- 대체 웹 리서치를 사용할 때는 `non-OpenBB fallback data`로 명확히 표시하고 출처를 인용한다. OpenBB에서 가져온 데이터인 것처럼 암시하지 않는다.
- 구조화된 데이터를 먼저 반환한다: DataFrame, CSV, JSON, 또는 데이터셋이 큰 경우 간결한 스키마/샘플.
- 사용자가 변환된 모델 투입용 데이터셋을 요청하지 않는 한 제공업체의 원본 필드를 유지한다.

## 빠른 시작

1. 데이터 영역을 식별한다: 주식, ETF, 지수, 암호화폐, 채권, 옵션, 경제, 펀더멘털, 뉴스, 애널리스트 추정치, 일정 이벤트, 또는 규제 공시.
2. 종목 식별자, 기간, 빈도, 선호 제공업체, 필수 필드를 식별한다.
3. OpenBB 설치 여부를 확인한다. 설치되어 있지 않다면 활성 Python 환경에 설치하고 동일한 요청을 재시도한다.
4. 단순한 엔드포인트 호출로 충분한 경우 재사용 가능한 헬퍼를 사용한다. 해당 엔드포인트가 지원하지 않는 한 `provider="yfinance"`를 강제하지 않는다:

```bash
python skills/data-access/openbb-data-fetcher/scripts/fetch_openbb.py \
  --install-if-missing \
  --endpoint equity.price.historical \
  --params '{"symbol":"AAPL","start_date":"2024-01-01","provider":"yfinance"}' \
  --output /tmp/aapl_prices.csv
```

5. 탐색적 작업에는 Python을 직접 사용한다:

```python
from openbb import obb

result = obb.equity.price.historical(
    symbol="AAPL",
    start_date="2024-01-01",
    provider="yfinance",
)
df = result.to_dataframe()
```

사업부문별 또는 지역별 매출과 같은 제공업체 특화 펀더멘털 데이터의 경우 `yfinance`가 작동한다고 가정하지 않는다:

```bash
python skills/data-access/openbb-data-fetcher/scripts/fetch_openbb.py \
  --install-if-missing \
  --endpoint equity.fundamental.revenue_per_segment \
  --params '{"symbol":"NVDA","provider":"fmp"}' \
  --output /tmp/nvda_segment_revenue.csv
```

## 설치 가이드

- 현재 공식 기본 설치 방법: `pip install openbb`.
- 이 스킬이 트리거된 경우, OpenBB 미설치는 일반 웹 검색을 사용해도 된다는 의미가 아니라 설정 단계로 취급한다.
- 데이터 요청을 실행할 동일한 인터프리터에서 `python -m pip install openbb`를 우선 사용한다.
- 광범위한 제공업체 커버리지가 필요하고 설치 용량이 허용되는 경우에만 `pip install openbb[all]`을 사용한다.
- 특정 제공업체만 필요한 경우 전체 extras 대신 해당 확장 패키지를 설치하는 것을 우선한다.
- OpenBB는 현재 Python 3.10+을 지원한다. 설치에 실패하면 코드를 변경하기 전에 활성 Python 버전과 OpenBB 문서를 확인한다.
- API 키나 인증 정보 파일을 절대 커밋하지 않는다.
- 웹 브라우징은 공식 OpenBB 문서나 제공업체 설정 요건을 확인하거나, OpenBB가 실제로 실패한 후 대체 데이터를 제공하는 용도로 허용된다.

최소 설치 후 재시도 패턴:

```bash
python -m pip install openbb
python skills/data-access/openbb-data-fetcher/scripts/fetch_openbb.py \
  --endpoint equity.price.historical \
  --params '{"symbol":"AAPL","start_date":"2024-01-01","provider":"yfinance"}' \
  --output /tmp/aapl_prices.csv
```

## 인증 정보

- 제공업체 인증 정보는 사용자의 기존 환경, OpenBB `.env`, OpenBB `user_settings.json`, 또는 명시적인 세션 한정 Python 할당에서만 사용한다.
- 기존 인증 정보는 다음 순서로 우선 사용한다: 활성 프로세스 환경, `~/.openbb_platform/.env`, `~/.openbb_platform/user_settings.json`, 그다음 세션 한정 할당.
- 인증 정보가 없는 경우, `yfinance`와 같은 키 불필요 제공업체가 요청을 충족할 수 있을 때에만 이를 시도한다.
- 요청된 제공업체에 키가 필요한 경우, 작업을 중단하고 누락된 인증 정보를 제공업체 및 필드명별로 보고한다.
- `~/.openbb_platform/.env`, `~/.openbb_platform/user_settings.json` 및 런타임 인증 정보 값은 저장소 파일에 포함하지 않는다.

## 환경 변수

OpenBB는 활성 프로세스와 `user_settings.json` 옆에 위치한 `~/.openbb_platform/.env`에서 환경 변수를 읽을 수 있다.

제공업체 API 키의 경우, 해당 제공업체가 그 패턴을 따른다면 `_API_KEY`로 끝나는 대문자 환경 변수명을 사용한다:

```bash
mkdir -p ~/.openbb_platform
printf 'FMP_API_KEY="replace_with_key"\n' >> ~/.openbb_platform/.env
printf 'FRED_API_KEY="replace_with_key"\n' >> ~/.openbb_platform/.env
```

OpenBB는 이를 소문자 인증 정보 필드로 노출한다. 예를 들어 `FMP_API_KEY`는 `obb.user.credentials.fmp_api_key`가 된다.

현재 세션에서만 사용하려면 OpenBB를 임포트하기 전에 환경 변수를 설정한다:

```python
import os

os.environ["FMP_API_KEY"] = "replace_with_key"

from openbb import obb
```

토큰이나 계정 유형 플래그처럼 `_API_KEY`로 끝나지 않는 인증 정보도 있다. 이러한 경우 제공업체가 요구하는 인증 정보 필드를 확인한 후 `user_settings.json` 또는 세션 한정 할당을 우선 사용한다.

## 환경 변수가 없는 경우

다음 경로 중 하나를 사용한다:

1. 요청을 충족할 수 있다면 키 불필요 제공업체를 사용한다:

```python
from openbb import obb

prices = obb.equity.price.historical(
    symbol="AAPL",
    start_date="2024-01-01",
    provider="yfinance",
)
```

2. 현재 Python 세션에만 키를 설정한다:

```python
from openbb import obb

obb.user.credentials.fmp_api_key = "replace_with_key"
data = obb.equity.fundamental.metrics(symbol="AAPL", provider="fmp")
```

3. 키를 로컬의 `~/.openbb_platform/user_settings.json`에 저장한다:

```json
{
  "credentials": {
    "fmp_api_key": "replace_with_key",
    "fred_api_key": "replace_with_key",
    "polygon_api_key": "replace_with_key"
  }
}
```

`.env` 또는 `user_settings.json`에 인증 정보를 추가한 후에는 Python 프로세스를 재시작한다.

## 대체(Fallback) 정책

OpenBB가 기본 경로다. 대체 수단으로 전환하기 전에 다음을 실제로 시도한다:

- OpenBB를 임포트한다.
- OpenBB가 없으면 활성 Python 환경에 설치한다.
- 동일한 엔드포인트 호출을 재시도한다.
- 검증 오류가 제공업체가 유효하지 않다고 하면서 허용 제공업체를 지정하는 경우, 해당 제공업체로 재시도한다.
- 엔드포인트가 없으면 설치된 라우트 트리를 확인한다.
- 인증 정보가 없고 키 불필요 제공업체가 요청을 충족할 수 있다면 이를 시도한다.

위 단계가 실패하거나 환경, 패키지, 제공업체, 인증 정보, 라우트 제약으로 차단된 경우에만 웹 검색을 사용한다. 최종 출력에는 다음을 명시한다:

- OpenBB가 실패했거나 사용할 수 없었다는 사실.
- 실무적 수준에서의 실패 원인.
- 반환된 데이터가 `non-OpenBB fallback data`라는 사실.
- 출처, 타임스탬프 및 비교 가능성의 한계.

## 엔드포인트 선택

OpenBB의 라우트 계층 구조를 직접 사용한다:

- 가격: `obb.equity.price.historical`, `obb.crypto.price.historical`, 그리고 가용한 경우 지수 또는 ETF 가격 라우트.
- 펀더멘털: 재무제표, 재무비율, 지표, 기업 개요 및 관련 기업 데이터에는 `obb.equity.fundamental.*` 라우트.
- 경제 및 매크로: 가용한 경우 FRED, IMF, OECD, ECB, BLS, Federal Reserve 또는 Trading Economics 제공업체 라우트.
- 뉴스 및 공시: 검증 가능한 출처가 필요한 경우 뉴스 라우트, SEC 라우트 또는 제공업체 특화 라우트.
- 옵션 및 파생상품: 심볼 형식, 만기, 제공업체 지원 여부를 확인한 후에만 옵션 라우트를 사용한다.

정확한 라우트가 불분명한 경우, 설치된 OpenBB 인터페이스를 확인한다:

```python
from openbb import obb

dir(obb.equity)
dir(obb.equity.price)
help(obb.equity.price.historical)
```

## 제공업체 선택

- 제공업체 호환성은 엔드포인트별로 다르다고 간주한다. 가격 데이터에 작동하는 제공업체가 펀더멘털, 추정치, 사업부문, 공시 또는 매크로 데이터에는 작동하지 않을 수 있다.
- `yfinance`를 범용 대체 수단으로 사용하지 않는다. 가격 및 일부 추정치에는 유용한 경우가 많지만, 상당수 펀더멘털 라우트는 `fmp`와 같은 제공업체를 요구한다.
- OpenBB가 `provider -> input: yfinance -> Input should be 'fmp'`와 같은 검증 오류를 발생시키면, 동일한 엔드포인트를 `provider="fmp"`로 재시도한다.
- 수정된 제공업체에 인증 정보가 필요한 경우, 대체 수단으로 전환하기 전에 환경 변수와 `user_settings.json`을 확인한다.
- `revenue_per_segment` 및 `revenue_per_geography`의 경우, 설치된 OpenBB 라우트가 달리 명시하지 않는 한 `fmp`를 예상한다.
- 요청이 한 제공업체로 시작되어 다른 제공업체로 성공 또는 실패했음을 사용자가 알 수 있도록 제공업체 변경 사항을 출력에 기록한다.

## 출력 계약

반환하는 모든 데이터셋에 다음을 포함한다:

- 쿼리 의도 및 사용한 엔드포인트.
- 알려진 경우 제공업체 및 인증 정보 상태.
- 요청한 심볼 또는 식별자.
- 기간, 빈도 및 시간대 가정.
- 행 수, 열 목록 및 소량의 샘플.
- 누락된 필드, 제공업체 제한, 데이터 지연(stale) 경고 또는 생존 편향(survivorship bias) 우려 사항.

반환 값과 파생 필드의 수치에는 다음과 같이 태그를 붙인다:

- `[actual]`: 명시된 제공업체 또는 공식 공시/출처가 반환한 데이터.
- `[derived]`: 조회한 데이터로부터 산출한 계산값.
- `[assumption]`: 사용자 제공 입력값 또는 시나리오 입력값.
- `[unavailable]`: 제공업체가 반환하지 않은 필드.

## 데이터 품질 규칙

- 결과를 해석하기 전에 심볼과 기간을 검증한다.
- 빈 DataFrame, 중복 타임스탬프, 종가 누락, 액면분할 조정 가정, 통화 불일치를 점검한다.
- 복수 제공업체 비교 시, 캘린더, 시간대, 통화, 조정 기준, 빈도가 정렬되기 전까지 시계열을 병합하지 않는다.
- 펀더멘털 데이터의 경우 회계 기간, 공시일, 통화, 가능하다면 재작성(restatement) 여부, 제공업체 출처 이력을 보존한다.
- 매크로 데이터의 경우 가용하다면 발표일, 빈티지(vintage), 빈도, 계절 조정 여부, 단위를 보존한다.
- OpenBB 출력은 보장된 사실이 아니라 제공업체 데이터로 취급하고, 출처의 한계를 언급한다.

## 실패 처리

- OpenBB가 설치되어 있지 않으면 설치 후 재시도한다. 설치에 실패하면 정확한 설치 명령어, 활성 Python 버전, 실패 출력을 보고한다.
- 엔드포인트가 없으면 설치된 라우트 트리를 확인한다. OpenBB 라우트는 패키지 버전과 설치된 확장에 따라 달라질 수 있다.
- 제공업체 검증 오류가 허용 제공업체를 지정하는 경우, 포기하거나 대체 수단으로 전환하기 전에 해당 제공업체로 한 번 재시도한다.
- 제공업체가 데이터를 반환하지 않으면, 티커 형식, 기간, 제공업체 지원 여부를 확인한 후에만 재시도한다.
- 사용자가 실시간 데이터를 요청한 경우, 해당 제공업체가 지연 데이터인지 장 마감 기준(end-of-day) 데이터인지 명시한다.
- 제공업체 약관, 요청 한도(rate limit) 또는 인증 정보로 인해 요청이 차단되면, 대체 데이터를 지어내지 말고 차단 요인을 설명한다.
- OpenBB를 설치할 수 없거나 라우트가 요청된 데이터셋을 반환할 수 없는 경우, 인용 가능한 공개 출처로 책임 있게 답할 수 있을 때에만 웹 대체 수단을 사용한다.
- 대체 데이터가 신뢰할 수 없거나, 구할 수 없거나, 요청된 OpenBB 데이터셋과 비교할 수 없는 경우, 결과를 지어내거나 과도하게 평활화하지 말고 차단 요인을 보고하며 작업을 중단한다.
