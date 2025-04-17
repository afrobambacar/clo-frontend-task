# CLO NEWSROOM
[![Vitest](https://github.com/afrobambacar/clo-newsroom/actions/workflows/vitest.yml/badge.svg)](https://github.com/afrobambacar/clo-newsroom/actions/workflows/vitest.yml)
[![Playwright](https://github.com/afrobambacar/clo-newsroom/actions/workflows/playwright.yml/badge.svg)](https://github.com/afrobambacar/clo-newsroom/actions/workflows/playwright.yml)

![Preview](https://github.com/afrobambacar/clo-newsroom/blob/hotfix/preview.gif)

### Getting Started

본 프로젝트를 시작하려면 아래 명령어를 터미널에서 실행하여 프로젝트를 다운로드 받아야 합니다.
```
git clone https://github.com/afrobambacar/clo-newsroom.git
```

프로젝트 폴더로 이동하세요.
```
cd clo-newsroom
```

프로젝트 루트에서 패키지를 `yarn` 대신 `npm install` 명령어를 실행해도 됩니다.
```
yarn install
```

개발 모드 실행 후 [http://localhost:3000](http://localhost:3000)에서 확인하실 수 있습니다.
```
npm run dev
```
```
  VITE v6.2.6  ready in 271 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Completed Tasks

#### Required
- [x] Sorting 구현
- [x] 키워드 검색 및 결과 출력
- [x] 새로 고침 시 기존 sorting, 키워드 결과 유지 (History API 이용)
- [x] API Data를 이용하여 Content List 구현 (Zustand 라이브러리 사용 및 서버 API 모사)
- [x] 이미지 호출 시 리사이징 파라미터 전달 (이미지 요청 시 w,h,q,f,fit 전달)
- [x] 이미지 로딩 에러 발생시 placeholder로 교체 (img 태그 onError 핸들링)
- [x] 그리드 시스템 적용 및 반응형 적용 (Breakpoint 설정)
- [x] 인피닛스크롤 적용 (Intersection API 이용)

#### Optional
- [x] 테스트 코드 작성 
  - [x] 유닛 테스트: Vitest
  - [x] E2E 테스트: Playwright
- [x] Typescript 적용
- [x] 인피닛스크롤 작동 시 Skeleton UI 구현 (서버 응답을 모사하기 위해 delay 적용)

### Packages

- react
- react-dom
- react-error-boundary: 함수 실행 중 에러가 발생했을 때 UI에 표시
- tailwindcss: CSS 유틸리티
- zustand: 상태관리 라이브러리

### End-to-end tests

e2e 테스트는 주요 구현 사항 확인을 위해 아래의 일곱가지 시나리오를 테스트합니다.

1. 화면이 정상적으로 보여지고, 뉴스가 정상적으로 표시되는지 여부
2. Sorting 옵션을 변경하고 그에 맞게 뉴스가 표시되는지 여부
3. 검색어 입력 시 제목 혹은 본문 내용과 검색어가 일치하는 뉴스를 찾아 올바르게 표시하는지 여부
4. 검색어를 입력했으나 일치하는 뉴스가 없는 경우 검색 결과가 없음을 표시하는지 여부
5. 페이지를 스크롤 했을 때 인피닛 스크롤이 동작하여 추가 기사를 불러오는지 여부
6. 페이지를 새로고침 한 경우 입력되어 있는 sorting 옵션, 키워드가 유지되는지 여부
7. API 호출에 실패한 경우, 에러 문구가 표시되는지 여부

e2e 테스트는 아래의 명령어로 실행할 수 있습니다.

```
npm run test:e2e
```

### Additional Scripts

프로젝트 Lint
```
npm run lint
```

프로젝트 유닛 테스트
```
npm run test
```
```
> clo-newsroom@0.0.1 preview
> vitest --coverage
```

프로젝트 빌드
```
npm run build
```
```
> vite-project@0.0.0 build
> tsc -b && vite build

vite v6.2.6 building for production...
✓ 42 modules transformed.
dist/index.html                   0.46 kB │ gzip:  0.30 kB
dist/assets/index-CcEPKPiA.css   11.78 kB │ gzip:  3.31 kB
dist/assets/index-BZ-T2Bx9.js   257.72 kB │ gzip: 82.12 kB
✓ built in 543ms
```

빌드한 파일을 실행할 수 있습니다.
```
npm run preview
```
```
> clo-newsroom@0.0.1 preview
> vite preview --port 3001

  ➜  Local:   http://localhost:3001/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Troubleshooting

#### 로컬에서 e2e 테스트를 실행했으나 동작하지 않고 멈춰있는 증상

로컬 머신에서 이미 `3001`번 포트를 점유하고 있을 수 있습니다. 이 경우 프로젝트가 다른 포트로 실행되기 때문에 playwright가 올바른 테스트 서버를 찾을 수 없는 문제가 발생합니다. 이 문제가 발생하는 경우 로컬의 `3001`번 포트를 해제하고 테스트 명령어를 다시 입력해볼 수 있습니다. 
```
# 로컬에서 3001번 포트를 이미 사용하고 있는지 확인
lsof -i tcp:3001 

# 로컬의 PID를 입력하여 3001번 포트 점유를 해제
kill -9 <PID>

# 테스트 실행
npm run test:e2e
```
