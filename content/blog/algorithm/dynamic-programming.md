---
title: "Dynamic Programming : 동적 프로그래밍"
date: 2020-10-18 00:10:29
category: algorithm
thumbnail: { thumbnailSrc }
draft: false
---

## 동적 프로그래밍이란?
알고리즘을 짤 때 분할정복 기법을 사용하는 경우로 큰 문제를 한 번에 해결하기 힘들 때 작은 여러 개의 문제로 나누어서 푸는 기법이다. 작은 문제들을 풀다보면 같은 문제들을 반복해서 푸는 경우가 생기게 되고, 그 문제들을 매번 재계산하지 않고 값을 저장해두었다가 재사용하는 기법을 동적 프로그래밍이라고 한다.

- 어떤 제한 조건이 주어졌을 때 무언가를 최적화하는 경우에 유용하다.
- 하위 문제가 서로 의존하지 않는 경우에만 사용할 수 있다.

### 예시 문제) 배낭 문제
캠핑을 간다. 배낭에는 6파운드까지 들어갈 수 있고 다음과 같은 물건 중에서 선택할 수 있다. 각각에는 역시 가치가 매개져 있고 가치가 높을수록 중요한 물건이다. 캠필할 때 가져가야할 최적의 물건은 무엇일까?
|물건|무게|가치|
|:-:|:-:|:-:|
|물|3파운드|10|
|책|1파운드|3|
|음식|2파운드|9|
|자켓|2파운드|5|
|카메라|1파운드|6|

```py
limitPound = 6

# 물건, 무게, 가치
things = [
  # ['다이아몬드',6,1000],
  ['물',3,10],
  ['책',1,3],
  ['음식',2,9],
  ['자켓',2,5],
  ['카메라',1,6],
]

data = [[0] * limitPound for x in range(len(things))]

for i in range(len(things)):
  pound = 1
  
  while pound <= limitPound:
    poundIdx = pound - 1
    
    prevMaxValue = 0
    if i-1 >= 0:
      prevMaxValue = data[i-1][poundIdx]
    
    thisValueWithRemainValue = 0
    if things[i][1] <= pound:
      thisValueWithRemainValue += things[i][2]
    if i-1 >= 0 and pound > things[i][1]:
      thisValueWithRemainValue += data[i-1][poundIdx - things[i][1]]
    
    data[i][poundIdx] = max(prevMaxValue, thisValueWithRemainValue)
    pound += 1

print(*data, sep='\n')
# [0, 0, 10, 10, 10, 10]
# [3, 3, 10, 13, 13, 13]
# [3, 9, 12, 13, 19, 22]
# [3, 9, 12, 14, 19, 22]
# [6, 9, 15, 18, 20, 25]
print('최대 가치는', data[-1][-1], '이다.')
# 최대 가치는 25 이다.
```

