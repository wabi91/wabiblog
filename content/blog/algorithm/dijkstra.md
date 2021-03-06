---
title: "다익스트라 알고리즘"
date: 2020-09-26 21:09:60
category: algorithm
thumbnail: { thumbnailSrc }
draft: false
---

## 다익스트라 알고리즘?

최단 경로 탐색 알고리즘으로 특정한 한 정점에서 다른 모든 정점으로 가는 최단 경로를 알려준다.<br/>
*단, 간선의 가중치가 음수일 경우에는 적용할 수가 없다.

### 예시 1)
```bash
[A]- 4 -[B]
 | \     |
 6   9   1
 |     \ |
[C]- 2 -[D]
```
### 출발 노드 A 에서 목적 노드 D 까지 가는 최단 경로는?
A에서 가장 가까이 붙은 노드의 거리를 각 산정한다.<br/>
- A -> B : 4
- A -> D : 9
- A -> C : 6

이때 A에서 최종 목적지에서 D까지의 최단거리는 9라고 첫 산정이 이루어진다.<br/>
이후, (계산하지 않은 노드 중 가장 적은 값인) 다음 노드 B 를 처리한다.<br/>
- B -> D : 1
- A -> B -> D : 5

위 같은 처리가 이전에 산정해둔 `A->D : 9` 거리보다 더 짧은 `A->B->D : 5`로 갱신이된다.

### 예시 정리
1. 출발노드를 선정
2. 출발노드 기준에 연결된 각 노드의 최소 비용을 저장.
3. 계산하지 않은 다음 노드에서 가장 비용이 작은 노드를 선택
4. 위 선택된 노드를 거쳐서 특정한(목적지) 노드로 가는 경우를 고려하여 최소 비용을 갱신한다.
5. 3,4번 과정을 반복한다.

### 예시 2)

![](./images/dijkstra_animation.gif)

위 그래프 이미지의 노드간 가중치를 아래의 표와 같이 나열할 수 있다.

|-|노드1|노드2|노드3|노드4|노드5|노드6|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|노드1|0|7|9|∞|∞|14|
|노드2|7|0|10|15|∞|∞|
|노드3|9|10|0|11|∞|2|
|노드4|∞|15|11|0|6|∞|
|노드5|∞|∞|∞|6|0|9|
|노드6|14|∞|2|∞|9|0|

> 연결이되지 않은 노드는 각 무한대로 표시

1번 노드를 기준으로 각 노드의 최단거리를 구한다고 하면 아래와 같이 알고리즘이 적용된다.

|-|노드1|노드2|노드3|노드4|노드5|노드6|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|노드1|0|7|9|∞|∞|14|

1번 노드에서 시작 이후 작은 가중치 2번 노드로 진행.

|-|노드1|노드2|노드3|노드4|노드5|노드6|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|노드2|7|0|10|15|∞|∞|

|-|노드1|노드2|노드3|노드4|노드5|노드6|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|최단노드|(0)|(7)|10>9<br/>(9)|∞>22<br/>(22)|∞|(14)|

위 처럼 2번노드와 연결된 노드들의 수치로 최단노드를 갱신 후 다음 3번노드를 중심으로 진행

|-|노드1|노드2|노드3|노드4|노드5|노드6|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|노드3|9|10|0|11|∞|2|

|-|노드1|노드2|노드3|노드4|노드5|노드6|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|최단노드|(0)|(7)|(9)|22>20<br/>(20)|∞|14>11<br/>(11)|

위 처럼 3번노드와 연결된 노드들의 수치로 최단노드를 갱신 후 다음 6번 노드를 중심으로 진행

|-|노드1|노드2|노드3|노드4|노드5|노드6|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|노드6|14|∞|2|∞|9|0|

|-|노드1|노드2|노드3|노드4|노드5|노드6|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|최단노드|(0)|(7)|(9)|(20)|(20)|(11)|

> (1->3->6)11 + (6->5)9 = 20 최단거리 (1 -> 5) 계산 완료

마지막으로 4번노드를 중심으로 재진행

|-|노드1|노드2|노드3|노드4|노드5|노드6|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|노드4|∞|15|11|0|6|∞|

|-|노드1|노드2|노드3|노드4|노드5|노드6|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|최단노드|(0)|(7)|(9)|(20)|(20)|(11)|

`1->4 (20) >= 1->5 (20)` 갱신되는 값이 없으므로 그대로 유지 & 알고리즘 종료.

-----

## 출처
https://m.blog.naver.com/ndb796/221234424646

https://ko.wikipedia.org/wiki/%EB%8D%B0%EC%9D%B4%ED%81%AC%EC%8A%A4%ED%8A%B8%EB%9D%BC_%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98

https://www.acmicpc.net/problem/1753