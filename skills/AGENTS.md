# 스킬 루트 가이드

## 적용 범위

- 하위 경로의 `AGENTS.md`가 별도로 규정하지 않는 한, 이 규칙을 `skills/` 아래 모든 항목에 적용한다.

## 목적

- 이 디렉터리를 모든 투자 스킬 패키지의 단일 기준 원천(source of truth)으로 사용한다.

## 규칙

- `skills/` 바로 아래의 각 하위 폴더는 `data-access`, `fundamental-analysis`, `market-analysis`, `quantitative-analysis`, `portfolio`, `output-formats`와 같은 주요 투자 기능 하나에 집중하도록 유지한다.
- 구조는 얕게 유지한다. 깊은 카테고리 중첩보다 `skills/<top-level-domain>/<skill-name>` 형태를 우선한다.
- 모든 스킬은 각자의 폴더 안에서 자기완결적으로 유지한다.
- 각 스킬 폴더에는 반드시 `SKILL.md`를 포함한다.
- `references/`, `scripts/`, `assets/`는 필요할 때만 추가한다.
- 자산군별 차이는 가능한 한 각 스킬 내부에서 처리하고, 중첩 계층을 성급하게 추가하지 않는다.
- `output-formats/`는 문자 그대로의 파일 확장자라기보다 재사용 가능한 표현 스타일 또는 출력 패키징 패턴으로 취급한다.

## 품질 기준

- `SKILL.md`는 간결하고 워크플로 중심으로 작성한다.
- 긴 설명, 수식, 템플릿은 `references/`로 옮긴다.
- 깔끔하게 공유할 수 있는 지침은 여러 스킬에 중복해서 두지 않는다.
- `output-formats/*` 스킬을 표현 스키마와 재사용 가능한 퍼블리싱 스타일의 소유 주체로 취급한다.
- 구체적인 구현 계획이 없는 플레이스홀더 또는 시험적 스킬 폴더는 유지하지 않는다.
