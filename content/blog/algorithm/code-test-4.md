---
title: "[프로그래머스] 월간 코드 챌린지 시즌1 > 내적"
date: 2020-11-15 03:50:76
category: algorithm
thumbnail: { thumbnailSrc }
draft: false
---

## 문제
길이가 같은 두 1차원 정수 배열 a, b가 매개변수로 주어집니다. a와 b의 내적을 return 하도록 solution 함수를 완성해주세요.<br/>
<br/>
이때, a와 b의 내적은 a[0]*b[0] + a[1]*b[1] + ... + a[n-1]*b[n-1] 입니다. (n은 a, b의 길이)

## 제한 조건
- a, b의 길이는 1 이상 1,000 이하입니다.
- a, b의 모든 수는 -1,000 이상 1,000 이하입니다.

## 입출력 예
|a|b|return|
|:-:|:-:|:-:|
|[1,2,3,4]|[-3,-1,0,2]|3|
|[-1,0,1]|[1,0,-1]|-2|

## 문제 풀이 - 1 (처음으로 했던 풀이)
```py
def solution(a, b):
    answer = 0
    for i in range(len(a)):
        answer += a[i]*b[i]
    return answer
```
설명이 필요없을 정도로 쉽다...

## 문제 풀이 - 2 (두번째 했던 풀이)
```py
def solution(a, b):
    return sum([i*j for i, j in zip(a,b)])
```
- python `zip()` 으로 더 쉽게 내적 풀이
- sum 으로 answer 조차 생략

----

[참고: 문제링크](https://programmers.co.kr/learn/courses/30/lessons/70128)