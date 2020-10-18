---
title: "Dynamic Programming : 동적 프로그래밍"
date: 2020-10-18 00:10:29
category: algorithm
thumbnail: { thumbnailSrc }
draft: false
---

> 다이나믹 프로그래밍이란 하나의 문제를 단 한번만 풀도록 하는 알고리즘이다.

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
  ['물',3,10],
  ['책',1,3],
  ['음식',2,9],
  ['자켓',2,5],
  ['카메라',1,6],
  # ['다이아몬드',6,1000],
]

# [] * number 로 배열을 만들면 해당 array의 프로퍼티를 공유하므로, [] for x in [] 로 만들어야한다.
# 초기표 설정, 행 = 물건, 열 = 배낭, pound 1 ~ limitPound
data = [[[0, []] for x in range(limitPound)] for x in range(len(things))]

# 행을 loop 돌린다.
for i in range(len(things)):
  pound = 1
  # 열을 loop 돌린다.
  while pound <= limitPound:
    # [설정] pound 1부터 있기때문에 index 0으로 조정
    poundIdx = pound - 1
    # [설정] 이전 최대값, 이전 최대물건 리스트
    prevMaxValue, prevThings = [0, []]
    # [설정] (가방최대치 - 물건 무게) 남은 무게의 최대값, 남은 무게의 최대물건 리스트
    remainPoundMaxValue, remainPoundThings = [0, []]
    # [설정] loop this, 현재의 가치, 현재 물건 리스트 초기화
    thisValue, thisThings = [0, []]
    # 현재 물건 무게가 가방의 제한 무게에 들어가는 경우
    if things[i][1] <= pound:
      thisValue, thisThings = [things[i][2], [things[i][0]]]
    
    # 이전이 있을 경우
    if i-1 >= 0:
      prevMaxValue, prevThings = data[i-1][poundIdx]
      # (가방최대치 - 물건 무게) 남은 무게가 0 초과일 경우
      if pound - things[i][1] > 0:
        remainPoundMaxValue, remainPoundThings = data[i-1][poundIdx - things[i][1]]
        # 현재 정의한 무게를 뺀 남은 무게의 가방 최대치와 최대물건 리스트를 더한다.
        thisValue += remainPoundMaxValue
        thisThings += remainPoundThings
    # 이전의 최대값과 현재의 최대값 비교, 높은 값을 데이터 현재 칸에 넣는다.
    data[i][poundIdx][0] = max(prevMaxValue, thisValue)
    # 이전의 최대값과 현재의 최대값 비교하고 높은 값의 물건 리스트를 현재 칸에 넣는다.
    if prevMaxValue > thisValue:
      data[i][poundIdx][1] = prevThings
    else:
      data[i][poundIdx][1] = thisThings
    # loop의 기준 pound를 1 추가
    pound += 1


print(*data, sep='\n')
# [[0, []], [0, []], [10, ['물']], [10, ['물']], [10, ['물']], [10, ['물']]]
# [[3, ['책']], [3, ['책']], [10, ['물']], [13, ['책', '물']], [13, ['책', '물']], [13, ['책', '물']]]
# [[3, ['책']], [9, ['음식']], [12, ['음식', '책']], [13, ['책', '물']], [19, ['음식', '물']], [22, ['음식', '책', '물']]]
# [[3, ['책']], [9, ['음식']], [12, ['음식', '책']], [14, ['자켓', '음식']], [19, ['음식', '물']], [22, ['음식', '책', '물']]]
# [[6, ['카메라']], [9, ['카메라', '책']], [15, ['카메라', '음식']], [18, ['카메라', '음식', '책']], [20, ['카메라', '자켓', '음식']], [25, ['카메라', '음식', '물']]]
print('최대 가치는', data[-1][-1][0], '이다.')
# 최대 가치는 25 이다.
print('최적의 물건들은', ", ".join(data[-1][-1][1]), '이다.')
# 최적의 물건들은 카메라, 음식, 물 이다.
```

