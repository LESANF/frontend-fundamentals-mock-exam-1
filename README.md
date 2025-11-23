# Frontend Fundamentals 모의고사

## 전반적인 작업 플로우

- 폴더 구조화
  - components, constants, pages, utils 관심사 분리
- API 레이어 정의 및 queryKeys, queries 분리
  - post, put, delete에 대한 mutation 폴더 구조 확장 가능성
- 기능별 컴포넌트 관심사 분리 작업 진행
- 재사용 가능한 공통 컴포넌트 분리 작업
  - 적금 상품, 추천 상품 목록 등
- 계산 관련 로직 커스텀 훅 분리 및 수치 상수화
  - 계산에 대한 부분만 분리하여 데이터를 넘겨 처리하는 형태로 작업
  - 추후 계산식에대한 수치 처리에대하여 공통 상수로 유지보수 용이하게 작업
