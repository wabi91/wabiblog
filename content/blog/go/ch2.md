---
title: "golang. 프로그래밍 언어"
date: 2021-05-01 15:12:12
category: go
thumbnail: { thumbnailSrc }
draft: false
---

## 초창기 프로그래밍 언어
> 초기에는 천공카드에 구멍을 뚫어서 기계어를 작성했고 컴퓨터에 명령을 내렸다.

예를 들어 3과 4를 더하라는 의미로 'ADD 3 4' 명령을 내리고 싶을 경우 컴퓨터가 알 수 있도록 0 과 1을 사용해서 전달해야한다. 이때 ADD를 표현하는 규칙을 만들어야되는데 이런 명령어를 나타내는 부호를 오퍼레이션 코드, OP <sup>operation code</sup> 라고 부른다. (= 명령어 코드)</br>

>ADD 3 4 를 기계어로 표현</br>
`0011`이 ADD를 나타내는 OP코드라고 하면 3과 4를 이진법으로 나타내어</br>
`0011 0011 0100` 으로 나타낼 수 있다.

## 어셈블리어
위 예시처럼 ADD 3 4 를 `0011 0011 0100`으로 변환 시켜주는 프로그램이 어셈블리어이다. 1:1로 대응되는 언어로 ADD, SUB, MOV 같은 연산자가 있고 뒤에 인수를 쓰는 형태이다.

> ADD 3, 4</br>
SUB 5, 3</br>
MOV CX, 1</br>
MOV AX, 0

## 고수준 언어
기계어에 비해 어셈블리어는 천공카드에서 키보드로 프로그램을 작성할 수 있게 되어 혁신이었지만 단순 프로그램에도 코딩 양이 많고, 전체 동작을 이해하기 어렵고, 버그 발생 확률이 높고, 다른 아키텍처로 쉽게 이식을 할 수 없었다.</br>
그래서 인간의 언어 표현법과 비슷하게 고수준 프로그래밍 언어가 생겼다.

- 생산성이 좋다
- 가독성이 높다
- 이식성이 좋다

위 같은 장점으로 전체적 코드의 흐름을 이해하기 쉽고 코드 양이 대폭 줄게되었다.

### 실행되려면?
어떤 프로그래밍 언어든 기계어로 변환이 되어야 컴퓨터가 명령을 실행 하기 때문에 컴파일 과정이 필요하다. (= 컴파일러 필요하다, 각 고수준 언어는 자신만의 고유한 컴파일러가 있다.)

## 언어 구분
### 정적 vs 동적 컴파일 언어
|정적|동적|
|---|---|
|미리 기계어로 변환해서 사용하는 방식 타입 에러를 컴파일 시 발견하기 때문에 타입 안정성이 뛰어나다|실행 시점에 기계어로 변환하므로 미리 기계어로 변환하지 않는다. 실행 도중 변환하기 때문에 정적 컴파일 언어보다 느리게 동작한다.|
|칩셋과 운영체제마다 바이너리 코드 표현 방식이 다르기 때문에 각 칩셋에 맞게 변환해야한다.|실행 시점에 환경에 맞는 기계어로 변환 하기 때문에 모든 플랫폼에서 실행이 가능하다. 속도 대신 범용성이 좋다.|

> Go는 정적 컴파일 언어임에도 불구하고 내부 환경 변수만 바꿔서 다양한 플랫폼에 맞도록 실행 파일을 만들 수 있어서 비교적 쉽게 대응이 가능하다. 그리고 당연히 정적 컴파일 언어로 매우 빠른 실행속도를 자랑한다.

### 약 vs 강 타입 언어
서로 다른 타입 간 연산에 관대하면 약 타입 언어, 반대로 엄격하게 타입을 적용해야하면 강 타입 언어라 한다.</br>
다른 표현으로는 강 타입 언어를 정적 타입 언어라고 부르고 약 타입 언어를 동적 타입 언어라 부른다.

> Go는 다른 강 타입 언어와 비교하면 자동 타입 변환도 지원하지 않기 때문에 엄청 정적인 타입의 언어라고 볼 수 있다.

### 가비지 컬렉터 유무
> 가비지 컬렉터란 메모리에서 불필요한 영역을 치워준다.</br>

|가비지 컬렉터가 없을 경우|가비지 컬렉터가 있을 경우|
|---|---|
|프로그래머가 메모리 할당/해제를 책임져야 메모리 누수나 해제한 영역을 다시 해제하는 버그가 발생하지 않는다.|메모리 해제를 자동으로 해주기 때문에 메모리 관련 문제가 줄어든다. 하지만 CPU 성능을 사용하기 때문에 가비지 컬렉터가 없는 언어가 대체로 더 빠른 성능을 자랑한다.|

> Go 는 가비지 컬렉터를 제공하는 언어이다. 그리고 매우 발전한 형태의 가비지 컬렉터를 제공하기 때문에 성능 손실이 크지 않다. (= 가비지 컬렉터가 없는 언어보다는 느리지만 있는 언어들 중에서 상위 성능을 자랑한다.)

## Go 언어 정리
- 정적 컴파일 언어
- 강 타입 언어
- 가비지 컬렉터 제공


--------

출처: [『Tucker의 Go 언어 프로그래밍』](http://www.yes24.com/Product/Goods/99108736)</br>
저자: [YouTube, Tucker Programming](https://www.youtube.com/channel/UCZp_ftx6UB_32VfVmlS3o_A)