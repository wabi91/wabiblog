---
title: "golang. if 문"
date: 2021-05-17 22:01:11
category: go
thumbnail: { thumbnailSrc }
draft: false
---

## "if" 조건에 따라 분기하는 구문

```go
var humidity int = 66;
high := 70;
low := 60;

if humidity >= high  {
  fmt.Println("제습기를 켠다");
} else if humidity <= low {
  fmt.Println("제습기를 끈다");
} else {
  fmt.Printf("현재 제습기 가동중\n설정: 습도 %d 이상일 때 자동으로 켜지고 %d 이하일 때 자동으로 꺼집니다.\n현재 습도: %d", high, low, humidity);
}
/*
현재 제습기 가동중
설정: 습도 70 이상일 때 자동으로 켜지고 60 이하일 때 자동으로 꺼집니다.
현재 습도: 66
*/
```

## && 그리고, || 또는
논리연산자로 'AND &&', 'OR ||' 이렇게 두가지가 있다. &&는 조건 모두 true, ||는 조건 하나라도 true일때를 true로 반환한다.

```go
import (
  "fmt"
  "math/rand"
)

func main() {
  var a int = rand.Intn(150);
  max := 100;
  min := 80;

  if a <= max && a >= min {
    fmt.Printf("%d 이하 %d 이상인 a값: %d", max, min, a);
  } else if a > max || a < min {
    fmt.Printf("%d 보다 크거나 %d 보다 작은 a값: %d", max, min, a);
  }
}
```

### 쇼트 서킷 (short-circuit)
> && 연산은 좌변이 false 이면 우변은 생략, || 연산은 좌변이 true이면 우변은 생략

if 연산자의 위 특성으로 조건 검사를 하는 함수만 if문에 들어가도록 해야된다. 그외 다른 로직을 실행할 경우 의도치 않은 버그발생 원인이 되기도 한다.

### 소괄호 ()
```go
// 물건을 샀거나, 돈이 500원 이상이고 장바구니에 물건이 있는 경우
if hasBought() || (money >= 500 && hasCartItems())
```

## 중첩 if

if문 안에 if문을 중첩해서 사용하는 경우로 복잡한 경우를 나타낼 때 하나로 표현하기가 어려워 중첩해서 사용한다.
제한 없이 여러번 중첩해서 사용은 가능하지만 코드 가독성을 위해서 3중첩 이상은 하지 않도록 권장한다.

```go
if a > 10 {
  if b > 20 {
    // ...
  } else {
    // ...
  }
} else if c > 20{
  if d > 20 {
    // ...
  } else {
    // ...
  }
}
```

## if 초기문; 조건문
if문 조건 검사 전 초기문을 이용해서 변수를 초기화시킬 수 있다.
```go
if 초기문, 조건문 {
  문장
}
```
> 초기문 자리에 하나의 구문이 위치하며 끝에 ; 를 붙여서 끝남을 표시한다. 그 뒤로 조건문을 넣는다. 초기문의 변수는 if문 안에서 한정되는 변수이다.

```go
package main

import (
  "fmt"
  "math/rand"
)

func getAge() (int, bool){
  var a int = rand.Intn(150);
  if a > 100 {
    return a, true;
  }
  return a, false;
}
func main() {
  if age, isPass := getAge(); isPass {
    fmt.Printf("%d 나이로 입장 가능합니다.", age);
  } else {
    fmt.Printf("%d 나이로 입장 불가입니다.", age);
  }
  fmt.Println(age); // Error
}
```

</br></br>
--------

출처: [『Tucker의 Go 언어 프로그래밍』](http://www.yes24.com/Product/Goods/99108736)</br>
저자: [YouTube, Tucker Programming](https://www.youtube.com/channel/UCZp_ftx6UB_32VfVmlS3o_A)