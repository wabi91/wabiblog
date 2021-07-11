---
title: "golang. 함수"
date: 2021-05-14 17:05:54
category: go
thumbnail: { thumbnailSrc }
draft: false
---

## 함수 정의
> 함수는 반복 사용되는 코드를 묶을 수 있다. 함수를 이용해서 중복 코드를 제거하여 코드를 간결하게 만든다.

함수는 함수 키워드, 함수명, 매개변수, 반환 타입, 함수 코드 블록으로 구성된다.

```go
func Add(a int, b int) int {
  return a + b
}
```

### 함수를 호출시 생기는 일

함수를 호출할 때 입력하는 값을 argument (아규먼트/인수)라고 하고 함수가 외부로 부터 입력받는 변수를 parameter (파라미터/매개변수)라고 한다.

- 인수는 매개변수로 값이 복사되어 전달된다.
- 함수 내 매개변수와 선언된 변수는 함수 종료시 변수 범위를 벗어나서 접근하지 못한다. (지역 변수)
- 함수가 종료되면 함수를 호출했던 호출 위치로 명령 포인터가 되돌아가서 수행한다.

### 멀티 반환 함수

함수는 값을 여러 개 반환할 수 있다. 반환값이 여럿일 때는 반환 타입들을 소괄호로 묶어서 표현한다.

```go
package main
import "fmt"

func Divide(a, b int) (int, bool) {
  if b == 0 {
    return 0, false
  }
  return a / b, true
}


func main() {
  c, success := Divide(9, 3)
  fmt.Println(c, success) // 3, true
  c, success := Divide(9, 0)
  fmt.Println(c, success) // 0, false
}
```

### 변수명 지정해서 반환하기

함수 선언부에 반환 타입을 적을 때 변수명 까지 지정할 수 있다. 그리고 명시적으로 반환값을 지정하지 않아도 반환 타입에 지정된 변수명이 자동 반환 된다.

```go
func Divide(a, b int) (num int, flag bool) {
  if b == 0 {
    num = 0
    flag = false
    return
    // 명시적으로 반환값을 지정하지 않아도 반환 타입에 지정된 변수명이 자동 반환 된다.
  }
  num = a / b
  flag = true
  return
}
```

## 재귀 호출

재귀 호출<sup>recursive call</sup>이란 함수 안에서 자기 자신 함수를 다시 호출하는 것을 뜻한다.

```go
package main
import "fmt"

func printNo(n int) {
  if n == 0 {
    return
  }
  fmt.Println(n)
  printNo(n - 1)
  fmt.Println("After", n)
}

func main() {
  printNo(3)
}

/*
3
2
1
After 1
After 2
After 3
*/
```

> 재귀 호출 시에는 항상 탈출 조건을 명확히 해야 한다.


--------

출처: [『Tucker의 Go 언어 프로그래밍』](http://www.yes24.com/Product/Goods/99108736)</br>
저자: [YouTube, Tucker Programming](https://www.youtube.com/channel/UCZp_ftx6UB_32VfVmlS3o_A)