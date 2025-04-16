# CLO Frontend Task 

[![Test and Build](https://github.com/afrobambacar/clo-frontend-task/actions/workflows/ci.yml/badge.svg)](https://github.com/afrobambacar/clo-frontend-task/actions/workflows/ci.yml)

### Getting Started

본 프로젝트를 시작하려면 아래 명령어를 터미널에서 실행하여 프로젝트를 다운로드 받아야 합니다.
```
git clone https://github.com/afrobambacar/clo-frontend-task.git
```

프로젝트 루트에서 패키지를 설치해주세요.
```
# 프로젝트 폴더로 이동
cd clo-frontend-task
# 패키지 설치
yarn install // or npm install
```

개발 모드 실행 후 [http://localhost:3000](http://localhost:3000)에서 확인하실 수 있습니다.
```
npm run dev

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
- [x] Typescript 적용
- [x] 인피닛스크롤 작동 시 Skeleton UI 구현 (서버 응답을 모사하기 위해 delay 적용)

### Packages

본 프로젝트는 요구사항 충족을 위해 최소한의 패키지를 사용했습니다. 

- react
- react-dom
- react-error-boundary: 코드 내 에러가 발생하는 경우 캐치하여 UI를 표시합니다.
- tailwindcss: CSS
- zustand: 상태관리 라이브러리
- moment

### Scripts

프로젝트 테스트
```
npm test

> vite-project@0.0.0 test
> vitest --coverage
```

프로젝트 빌드
```
npm run build

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

> vite-project@0.0.0 preview
> vite preview

  ➜  Local:   http://localhost:4173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

