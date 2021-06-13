---
title: "golang. 변수"
date: 2021-05-03 23:08:59
category: go
thumbnail: { thumbnailSrc }
draft: false
---

> 변수<sup>variable</sup>는 값을 저장하는 메모리 공간을 가르킨다

## 변수선언

```go
package main
import "fmt"

func main() {
  var a int = 10
  var msg string = "Hello Variable"

  a = 20
  msg = "Good Morning"
  fmt.Println(msg, a)
}
```

### 4가지 속성
> golang 변수 선언</br>
var a int = 10</br>
var : 변수 선언 키워드</br>
a : 변수명</br>
int : 타입</br>
10 : 초기값</br>

- 이름: 프로그래머가 변수명을 지정해서 저장된 메모리 공간에 쉽게 접근 가능
- 값: 변수가 가리키는 메모리 공간에 저장된 값
- 주소: 변수가 저장된 메모리 공간의 시작 주소
- 타입: 변숫값의 형태

### 변수의 타입
변수는 타입을 가지고 있고 타입은 공간 크기를 나타낸다. 변수는 메모리 주소를 가르키는데 메모리 주소는 값이 있는 메모리의 시작 주소만을 알려준다.</br>
```go
var a float32 = 123.456
var b float64 = 123.456
```
위 예시에서 a가 b보다 메모리 할당이 적다. (float32 < float64)

> 타입 정보가 없으면 가리키는 공간의 시작주소는 알지만, 크기를 알 수 없다.

### 숫자 타입
|이름|설명/값의 범위|
|---|--------------------|
|uint8|1바이트 부호 없는 정수</br>`0~255`|
|uint16|2바이트 부호 없는 정수</br>`0~65535`|
|uint32|4바이트 부호 없는 정수</br>`0~4294967295`|
|uint64|8바이트 부호 없는 정수</br>`0~184467440737709551615`|
|int8|1바이트 부호 있는 정수</br>`-128~127`|
|int16|2바이트 부호 있는 정수</br>`-32768~32767`|
|int32|4바이트 부호 있는 정수</br>`-2147483648~2147483647`|
|int64|8바이트 부호 있는 정수</br>`-9223372036854775808~-9223372036854775807`|
|float32|4바이트 실수</br>`IEEE-754 32비트 실수, 소수부 7자리`|
|float64|8바이트 실수</br>`IEEE-754 64비트 실수, 소수부 15자리`|
|complex64|8바이트 복소수(진수, 가수)</br>`진수와 가수 범위는 float32 범위와 같음`|
|complex128|16바이트 복소수(진수, 가수)</br>`진수와 가수 범위는 float64 범위와 같음`|
|byte|uint8의 별칭, 1바이트 데이터를 나타낼 때 사용</br>`0~255`|
|rune|int32의 별칭, UTF-8로 문자 하나를 나타낼 때 사용</br>`-2147483648~2147483647`|
|int|32비트 컴퓨터에서는 int32</br>64비트 컴퓨터에서는 int64|
|uint|32비트 컴퓨터에서는 uint32</br>64비트 컴퓨터에서는 uint64|

### 그외 타입
|타입|설명|
|-------------|-----------------------|
|boolean|true/false|
|string|문자열|
|배열 array|같은 타입의 요소들로 이루어진 연속된 메모리 공간을 나타내는 자료구조 `[N]Type`|
|슬라이스|배열은 고정 길이로써 한번 길이가 정해지면 늘리거나 줄일 수 없지만, 슬라이스는 가능하다. `[]Type{}`|
|구조체|필드의 집합 자료구조로 상관관계가 있는 데이터를 묶어놓을 때 사용한다.|
|포인터|메모리 주소를 값으로 갖는 타입, 같은 메모리 공간을 가르키는 여러 변수를 만드는 것도 가능|
|함수 타입|함수를 가리키는 타입으로 함수 포인터라고도 불러진다.|
|인터페이스|메서드 정의의 집합|
|맵|키와 값을 갖는 데이터 저장 자료구조|
|채널|멀티 스레드 환경에 특화된 큐 형태 자료구조|

## 여러 형태의 변수 선언

```go
// 기본형태
var a int = 3
// 초깃값 생략, 타입별 기본값으로 대체
var b int
// 타입 생략, 변수 타입이 우변 값의 타입이 됨
var c = 4
// 선언 대입문: var 키워드 , 타입 생략
d := 5
```

### 타입별 기본값
|타입|기본값|
|---|---|
|모든 정수 타입</br>`int8~64, uint8~64, int, uint, byte, rune`|0|
|모든 실수 타입</br>`float32, float64, complex64, complex128`|0.0|
|불리언|false|
|문자열|""|
|그외|nil|

> Go 는 자동타입변환이 안되고, 다른 타입끼리 연산도 불가하다. `float32 + float64` 는 타입이 다르므로 에러발생

### 변수 타입의 변환

```go
package main
import "fmt"

func main() {
  a := 3
  var b float64 = 3.5

  var c int = int(b)
  d := float64(a * c)
  fmt.Println(b, d)

  var g int = int(b * 3)
  var h int = int(b) * 3
  fmt.Println(g, h) // 10, 9
  // g는 3.5 * 3 먼저 계산되어 10
  // h는 3.5가 3으로 변환후 * 3 으로 9
}
```

## 변수의 범위
`{}` 중괄호 범위, 어느 중괄호도 속해있지 않은 경우 전역 변수로 된다.


--------

출처: [『Tucker의 Go 언어 프로그래밍』](http://www.yes24.com/Product/Goods/99108736)</br>
저자: [YouTube, Tucker Programming](https://www.youtube.com/channel/UCZp_ftx6UB_32VfVmlS3o_A)