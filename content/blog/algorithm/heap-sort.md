---
title: "Heap Sort : 힙 정렬"
date: 2020-08-31 19:00:47
category: algorithm
thumbnail: { thumbnailSrc }
draft: false
---

## 힙 정렬이란?

`Binary Heaps` 힙이란, 최대값이나 최소값을 찾아내는 연산을 빠르게하기 위해 `완전 이진트리`를 기본으로한 자료구조. 이러한 자료구조를 최대 힙 또는 최소 힙 트리를 구성해 정렬을 하는 방법 (* 힙의 구조상, 부모-자식 관계의 정렬은 되지만, 형제간의 정렬은 고려대상이 아니다.)

- 힙 정렬은 비교 기반(comparison-based) 정렬 알고리즘이다.
- 힙 정렬은 선택 정렬을 개선한 것으로 생각할 수 있다.
- 선택 정렬 알고리즘과 마찬가지로 정렬 된 영역과 정렬되지 않은 영역을 나누고 가장 큰 요소를 추출하여 정렬 된 영역으로 이동시킨다.
- 선택 정렬보다 개선된 점은 선형 시간이 소요되는 선택 정렬의 탐색과 달리 힙 데이터 구조를 사용하여 최대값을 찾는 점으로 선택 정렬 대비 시행 속도가 훨씬 빠르다.

> 선택 정렬 시간 복잡도 : O(n<sup>2</sup>)<br/>
힙 정렬 시간 복잡도 : O(n log<sub>2</sub> n)

> *heapify : 힙 정렬은 정렬을 수행하면서 매번 가장 큰 값 또는 가장 작은 값을 루트 노드로 하는 힙 트리를 만드는 과정을 하는데 그 힙 트리를 만드는 과정을 말합니다.

|||
|-|-|
|Max Heap|Min Heap|
|![](./images/max_heap_example.jpg)|![](./images/min_heap_example.jpg)|

### 힙의 index 규칙성

부모 노드 기준으로,<br />
왼쪽의 인덱스는 `부모 index * 2 + 1` 이다.<br />
오른쪽의 인덱스는 `부모 index * 2 + 2` 이다.


### Javascript 코드 예시

```javascript
// Max Heap
class BinaryHeap {
  constructor() {
    this.heap = [30, 20, 10, 7, 9, 5];
  }
  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  // 부모트리를 구하면서 값 비교를 통해 힙을 정렬한다.
  heapifyUp() {
    let index = this.heap.length - 1;

    while (index > 0) {
      let element = this.heap[index];
      // 힙의 index 규칙성에 따라서 부모 index를 구한다.
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.heap[parentIndex];
      
      // 부모가 자식보다 크거나 같은경우 Loop을 멈춘다
      if (parent >= element) break;
      // 부모가 자식보다 작을 경우 Swap 한다.
      this.heap[index] = parent;
      this.heap[parentIndex] = element;
      index = parentIndex;
    }
  }

  // max 구하기 (Pop)
  // extract 연산은 힙으로부터 루트를 삭제하고, 다시 힙을 구성하는 절차이다. (루트의 값을 마지막 요소와 바꾼 후, 힙의 사이즈를 하나 줄인다.)
  extractMax() {
    let max = this.heap[0];
    // 최하위 노드를 root로 올린다.
    this.heap[0] = this.heap.pop();
    this.heapify(0);
    return max;
  }

  // 자식트리를 구하면서 값 비교를 통해 힙을 정렬한다.
  heapify(index) {
    // 힙의 index 규칙성에 따라서 자식 index를 구한다.
    let leftIndex = 2 * index + 1;
    let rightIndex = 2 * index + 2;
    
    let parentIndex = index;
    const length = this.heap.length;

    // 왼쪽 자식노드와 부모노드 비교
    if (
      leftIndex <= length
      && this.heap[leftIndex] > this.heap[parentIndex]
    ) {
      parentIndex = leftIndex;
    }

    // 오른쪽 자식노드와 부모노드 비교
    if (
      rightIndex <= length
      && this.heap[rightIndex] > this.heap[parentIndex]
    ) {
      parentIndex = rightIndex;
    }

    // 처음 들어온 인덱스가 변동이 있을 경우, 스왑 및 정렬 재귀호출
    if (parentIndex !== index) {
      const swap = this.heap[parentIndex];
      this.heap[parentIndex] = this.heap[index]; 
      this.heap[index] = swap;
      this.heapify(parentIndex);
    }
  }
}

const heap = new BinaryHeap();
heap.insert(800);
heap.insert(700);
console.log(heap); // BinaryHeap { heap: [ 800, 700, 30, 20, 9, 5, 10, 7 ] }
heap.extractMax(); // 800
```

### 힙 정렬, 장단점 정리

- 단점
  - 안정성을 보장받지 못한다. (선택정렬과 마찬가지로, 값이 중복되었을 경우, 위치가 바뀔 수 있다. = 불안한 정렬)
  - 데이터의 상태에 따라 다른 정렬법보다 느릴 수 있다.

- 장점
  - 속도가 빠르고, 최악의 경우에도 O(n log<sub>2</sub> n)의 시간 복잡도를 보장한다.
  - 추가적인 메모리를 필요로 하지 않는다.
  - '가장 큰 값 또는 작은 값을 구할 때' 유용하게 쓰이는 알고리즘이다.

-----

## 출처
https://www.tutorialspoint.com/data_structures_algorithms/heap_data_structure.htm

https://gmlwjd9405.github.io/2018/05/10/algorithm-heap-sort.html

https://www.youtube.com/watch?v=jfwjyJvbbBI

https://velog.io/@yujo/JS%ED%9E%99-%EC%A0%95%EB%A0%ACHeap-Sort-66pye5v9

---

## "퀵 정렬 vs 힙 정렬"

> 빅오 노테이션은 대략적인 측정 방법이다. n개의 문제(보통 처리해야 할 아이템의 개수가 된다.)가 주어졌을 때 알고리즘이 실행되는 동안 수행되는 오퍼레이션을 측정하되 상수와 계수는 제거한 측정값을 말한다. 힙 정렬 와 퀵 정렬 모두 평균적으로 O(NlogN)이지만 힙 정렬에는 특별한 작업이 있다. heapify 작업이다. 정렬 작업이 수행되면서 정렬된 값이 하나 정해져서 힙에서 빠져나오게 되면 엉클어진 힙을 다시 힙 형태로 만들기 위해 힙 내의 원소들끼리 자리를 바꾸는 heapify 동작이 수행된다. 데이터의 개수가 많지 않다면 큰 영향은 없겠지만, 굉장히 큰 데이터 집합을 대상으로 힙 정렬 작업이 수행된다면 퍼포먼스 차원에서 heapify 동작은 무시할 수 없게 된다.

출처: https://brunch.co.kr/@k2u4yt/3