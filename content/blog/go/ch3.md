---
title: "golang. Hello Go World"
date: 2021-05-01 15:49:55
category: go
thumbnail: { thumbnailSrc }
draft: false
---

## Go 언어 특징
|개념|있다/없다|설명|
|---|:-:|---|
|클래스|없다|클래스는 없지만, 메서드를 가지는 구조체를 지원|
|상속|없다|상속을 지원하지 않는다|
|메서드|있다|구조체가 메서드를 가질 수 있다|
|인터페이스|있다|상속이 없지만 인터페이스는 있다|
|익명 함수|있다|함수 리터럴이라는 이름으로 제공|
|가비지 컬렉터|있다|고성능 가비지 컬렉터 제공|
|포인터|있다|메모리 주소를 가르키는 포인터가 있다|
|제네릭 프로그래밍|없다|제너릭 프로그래밍을 지원 안한다|
|네임스페이스|없다|네임 스페이스를 제공하지 않고 모든 코드는 패키지 단위로 분리된다|

## 코드 실행되기까지
1. 폴더 생성
2. .go 파일 생성 및 작성
3. Go 모듈 생성
4. 빌드
5. 실행

## Hello Go World

```go
package main
import "fmt"

func main() {
  fmt.Println("Hello Go World")
}
```

--------

출처: [『Tucker의 Go 언어 프로그래밍』](http://www.yes24.com/Product/Goods/99108736)</br>
저자: [YouTube, Tucker Programming](https://www.youtube.com/channel/UCZp_ftx6UB_32VfVmlS3o_A)