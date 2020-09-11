---
title: "타입스크립트 소개 및 설정"
date: 2020-09-11 22:09:51
category: typescript
thumbnail: { thumbnailSrc }
draft: false
---

### 타입스크립트/자바스크립트 컴파일 과정

|TS|JS|
|:--|:--|
|1. 타입스크립트 소스 -> 타입스크립트 AST(abstract syntax tree)<br/>2. 타입검사기가 AST를 확인<br/>3. 타입스크립트 AST -> 자바스크립트 소스|1. 자바스크립트 소스 -> 자바스크립트 AST(abstract syntax tree)<br/>2. AST -> 바이트코드<br/>3. 런타임이 바이트코드를 평가|

> 자바스크립트 컴파일러와 런타임은 엔진이라는 하나의 프로그램으로 합쳐진다.

타입스크립트에서 자바스크립트 코드로 컴파일할 때는 개발자가 사용한 타입을 확인하지 않으므로, 개발자가 기입한 타입 정보는 단지 타입을 확인하는 데만 쓰인다. 그렇기 때문에 타입을 바꾸고 개선한다고 기존의 응용 프로그램이 망가지지 않는다.

### 타입 시스템

타입 검사기가 프로그램에 타입을 할당하는 데 사용하는 규칙 집합.

1. 명시적으로 알려주는 타입 시스템
2. 자동으로 타입을 추론하는 타입 시스템

타입스크립트는 위 2가지 모두 영향을 받았고, 개발자가 타입을 명시하거나 타입스크립트가 알아서 추론하도록 하는 방식 중 선택할 수 있다.

타입을 알리는 어노테이션('value: tpye') 사용|미사용 예시

```typescript
// 어노테이션 사용
let a: number = 1;  // a는 number
let b: string = 'hi';  // b는 string
let c: boolean[] = [false, true]; // c는 boolean 배열

// 어노테이션 미사용
let a = 1;  // a는 number
let b = 'hi';  // b는 string
let c = [false, true]; // c는 boolean 배열
```

> 타입스크립트는 알아서 추론을 잘하기 때문에 보통 어노테이션은 생략한다.

### 타입스크립트 vs 자바스크립트

|타입 시스템 기능|자바스크립트|타입스크립트|
|:--|:-:|:-:|
|타입 결정 방식|동적|정적|
|타입이 자동으로 변환되는가?|O|X(대부분)|
|언제 타입을 확인하는가?|런타임|컴파일 타임|
|언제 에러를 검출하는가?|런타임(대부분)|컴파일 타임(대부분)|

### tsconfig.json

루트 디렉토리에 tsconfig.json 파일은 타입스크립트의 프로젝트에서 어떤 파일을 컴파일하고, 어떤 자바스크립트 버전으로 방출하는지 등을 정의한다.

```json
{
  "compilerOptions": {
    "lib": ["es2015"],
    "module": "commonjs",
    "outDir": "dist",
    "sourceMap": true,
    "strict": true,
    "target": "es2015",
    "paths": {
      "~/*": ["./*"]
    }
  },
  "exclude": [
    "node_modules",
    "**/__tests__",
    "**/factory"
  ],
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx"
  ]
}
```

> tsc --init 이라는 명령어로 자동 설정도 가능하다.

#### 기본 옵션 설명
|||
|:--|:--|
|include|TSC가 타입스크립트 파일을 찾을 디렉터리|
|exclude|TSC가 컴파일을 하지않고 무시할 디렉터리|
|lib|TSC가 코드 실행 환경에서 이용할 수 있다고 가정하는 API|
|module|TSC가 코드를 컴파일할 대상 모듈 시스템|
|outDir|생성된 자바스크립트 코드를 출력할 디렉터리|
|strict|유효하지 않은 코드를 확인할 때 가능한 한 엄격하게 검사|
|target|TSC가 코드를 컴파일할 자바스크릡트 버전|

### tslint.json

탭을 사용할지 공백을 사용할지 등 코드컨밴션을 결정하는 파일이다.<br/>
tslint -init 이라는 명령어를 통해 기본값으로 채워진 파일 생성이 가능하다. 하지만 tslint는 2019년 이후로 개발이 중단되었고, typescript-eslint로 대체를하여 eslint 쓰는 것을 권장한다.