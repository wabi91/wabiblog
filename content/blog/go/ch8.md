---
title: "golang. 상수"
date: 2021-05-14 19:05:08
category: go
thumbnail: { thumbnailSrc }
draft: false
---

## 상수 선언

상수는 변하지 않는 값을 뜻한다. 정수, 실수, 문자열 등 기본 타입값들만 상수로 선언 가능하다. 반면, 구조체, 배열 등 기본 타입이 아닌 타입에는 상수를 사용할 수 없다.

상수 사용 가능 타입 : 불리언, 룬(rune), 정수, 실수, 복소수, 문자열

> 상수명 규칙으로 함수 외부에 선언되고 첫 글자가 대문자인 상수는 패키지 외부로 공개되는 상수 이다.

### 상수를 사용해야 할 때

- 변하면 안 되는 값에 사용
- 코드값을 통해 숫자에 의미를 부여할 때 사용

### 코드값으로 사용

HTTP 응답코드로 200 은 OK, 404는 NOT FOUND 를 의미 하는 것 처럼 숫자값에 의미를 부여하는 것처럼 숫자에 의미를 부여할 수도 있다.

```go
const Pig int = 0
const Cow int = 1
const Chicken int = 2
```

### iota 로 간편하게 열거값 사용

iota 키워드는 소괄호 내 0부터 시작해 1씩 증가하는 값을 부여할 수 있다.</br>
iota 생략 가능하다.

```go
const (
  C1 uint = iota + 1 // 1 = 0 + 1
  C2 // 2 = 1 + 1
  C3 // 3 = 2 + 1
)
```

### 타입 없는 상수
상수 선언 시 타입을 명시하지 않게 되면 여러 타입에 사용되는 상수 값을 사용할 때 편리하다.

```go
const PI = 3.14
const FloatPI float64 = 3.14

var a int = PI * 100 // 314
var b int = FloatPI * 100
// float64 타입으로 int 타입 설정된 b 대입이 안되는 에러 발생
```

### 상수와 리터럴




</br></br>
--------

출처: [『Tucker의 Go 언어 프로그래밍』](http://www.yes24.com/Product/Goods/99108736)</br>
저자: [YouTube, Tucker Programming](https://www.youtube.com/channel/UCZp_ftx6UB_32VfVmlS3o_A)