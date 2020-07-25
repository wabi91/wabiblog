---
title: "Big O notation : 빅오 표기법"
date: 2020-07-25 18:07:45
category: algorithm
thumbnail: { thumbnailSrc }
draft: false
---

빅오 표기법은 알고리즘의 빠르기를 표시하는 방법이다.

## 빅오 표기법의 사용 이유

### 예시) 사용 이유

```
100개의 배열을 단순탐색으로 검색하면 100초가 걸린다고 가정하고,
똑같은 수의 배열을 이진탐색으로 검색하면 7초가 걸린다고 가정.

해당 배열의 수가 1000배가 되면, 단순배열은 100초 * 1000 = 100,000초
그리고 이진탐색은 같은 비율로 7초 * 1000초 = 7,000초
```

**위 예시는 틀렸다.** 이진 탐색의 경우 아무리 배열의 수를 늘려도 단순탐색 보다 늘어나는 시간이 동일하게 늘어나지 않고 적게 늘어난다.\
`알고리즘은 실행 시간이 얼마가 걸리는지만 고려하면 안되고, 배열의 크기가 증가할 때 얼마나 처리속도가 증가하는지를 파악해야한다.` 이 이유 때문에 빅오 표기법을 사용한다.

---

## 빅오 표기법 쓰는 법

빅오 표기법은 알고리즘이 동작하기 위해 필요한 연산 횟수를 나타낸다.\
"대문자 알파벳 O" → O(n) ← 연산 횟수

위 표현법 처럼, 이진 탐색의 경우에는 O(log n) 으로 표현된다.

### 예시) 알고리즘 2

<div style="overflow:hidden; width:200px; line-height:94px; text-align:center; font-size:30px;">
<div style="float:left; width:100px; height:100px; box-sizing: border-box; border:3px solid #000;">1</div>
<div style="float:left; width:100px; height:100px; box-sizing: border-box; border:3px solid #000;">2</div>
<div style="float:left; width:100px; height:100px; box-sizing: border-box; border:3px solid #000;">3</div>
<div style="float:left; width:100px; height:100px; box-sizing: border-box; border:3px solid #000;">4</div>
</div>

큰 정사각형의 종이를 위 처럼 4개의 네모박스를 그린다고 가정하면, 2가지 방법이 있다.

1. 하나씩 네모 그리기 방식\
1번 그리고, 2번 그리고, 3번 그리고, 마지막으로 4번 그리기\
총 4단계 필요

2. 종이를 반으로 접어서 네모를 만드는 방식\
반으로 접고 또 반으로 접은 뒤 펼쳐서 4개의 네모가 형성\
총 2단계 필요

위 방식들로 네모 32개를 만든다고 가정하면,\
- 1번째 방식은 32번의 단계가 필요
- 2번째 방식은 log<sub>2</sub> 32 이므로 5번의 단계가 필요

2번째 방식은 한번의 종이 접음으로 네모칸의 개수가 2배로 늘어나기 때문에 log<sub>2</sub> N 이다.

빅오 표기법으로 나타내면,

- 방식 1 : 실행시간은 O(N) 시간
- 방식 2 : 실행시간은 O(log N) 시간

---

## 많이 사용하는 빅오 표기법 실행시간의 예

- O(log n)
- O(n)
- O(n * log n)
- O(n<sup>2</sup>)
- O(n!)

위 예시는 빠른 것 부터 느린 것 순으로 나열한 것이다.

---

## 요약

- 알고리즘의 속도는 단순히 시간이 아니라 연산 횟수가 어떻게 증가하는지를 측정해야한다.
- 연산 횟수가 어떻게 증가하는지 표기해야, 입력 데이터의 크기에 따라 얼마나 속도가 증가하는지 알 수 있다.
- 빅오 표기법이 알고리즘의 실행 시간을 나타낸다.
