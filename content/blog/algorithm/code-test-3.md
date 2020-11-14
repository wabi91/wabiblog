---
title: "[프로그래머스] 스킬트리"
date: 2020-11-15 03:11:76
category: algorithm
thumbnail: { thumbnailSrc }
draft: false
---

## 문제
선행 스킬이란 어떤 스킬을 배우기 전에 먼저 배워야 하는 스킬을 뜻합니다.<br/>
<br/>
예를 들어 선행 스킬 순서가 `스파크 → 라이트닝 볼트 → 썬더`일때, 썬더를 배우려면 먼저 라이트닝 볼트를 배워야 하고, 라이트닝 볼트를 배우려면 먼저 스파크를 배워야 합니다.<br/>
<br/>
위 순서에 없는 다른 스킬(힐링 등)은 순서에 상관없이 배울 수 있습니다. 따라서 `스파크 → 힐링 → 라이트닝 볼트 → 썬더`와 같은 스킬트리는 가능하지만, `썬더 → 스파크`나 `라이트닝 볼트 → 스파크 → 힐링 → 썬더`와 같은 스킬트리는 불가능합니다.<br/>
<br/>
선행 스킬 순서 skill과 유저들이 만든 스킬트리1를 담은 배열 skill_trees가 매개변수로 주어질 때, 가능한 스킬트리 개수를 return 하는 solution 함수를 작성해주세요.

## 제한 조건
- 스킬은 알파벳 대문자로 표기하며, 모든 문자열은 알파벳 대문자로만 이루어져 있습니다.
- 스킬 순서와 스킬트리는 문자열로 표기합니다.
  - 예를 들어, C → B → D 라면 CBD로 표기합니다
- 선행 스킬 순서 skill의 길이는 1 이상 26 이하이며, 스킬은 중복해 주어지지 않습니다.
- skill_trees는 길이 1 이상 20 이하인 배열입니다.
- skill_trees의 원소는 스킬을 나타내는 문자열입니다.
  - skill_trees의 원소는 길이가 2 이상 26 이하인 문자열이며, 스킬이 중복해 주어지지 않습니다.

## 입출력 예
|skill|skill_trees|return|
|:-:|:-:|:-:|
|"CBD"|["BACDE", "CBADF", "AECB", "BDA"]|2|

## 문제 풀이 - 1 (처음으로 했던 풀이)
```py
def solution(skill, skill_trees):
  answer = 0

  for tree in skill_trees:
    copySkill = (skill + '.')[:-1]
    listTree = list(tree)

    for idx in range(len(listTree)):
      treeSkill = listTree[idx]
      if (treeSkill in skill) == True:
        if treeSkill != copySkill[0]:
          break;
        else:
          copySkill = copySkill[1:]

      if idx == len(listTree) -1:
        answer += 1
        break;
        
  return answer
```
처음에는 주어지는 스킬을 딕셔너리로 하고 false 값을 갖은 { 스킬명: false } 형태로 갖춘뒤 loop을 돌려서 해당 스킬들을 순서대로 true로 두고 이전 스킬들이 true가 아닐경우에 break를 해서 잘못된 스킬트리를 필터링하면 되지 않을까? 라고 생각했다. 하지만 이렇게 할 경우 불필요하게 로직이 2가지가 들어간다.
- 스킬을 매번 딕셔너리 형태로 만들어야되고 loop의 마지막에는 모든 스킬의 값을 false로 리셋
- 딕셔너리를 순회해서 이전의 스킬들이 true인지 비교

그래서 더 고민을 해보니, string 그대로 비교를하면 쉽게 해결할 수 있을 것 같았다. 왜냐하면 스킬트리에 속하지 않은 스킬은 논외로 하고 스킬트리에 속한 스킬일 경우에만 인자로 주어진 skill string의 제일 앞 글자가 같거나 틀리다만 비교하면 되기 때문이다.<br/>
- 주어진 스킬트리의 스킬을 배열로 만들고 해당 배열을 loop돌린뒤 주어진 skill에 속할 경우 체크
  - 참: 다음 비교를 위해 skill의 첫번째 알파벳 삭제
  - 거짓: loop break;
- loop을 모두 거쳐서 참만 나오고 마지막 index에 도달할 경우 answer에 +1

위 같은 방법으로 문제 제출을 하였고, list.pop(index), for-else 구문이 있다는 것을 보고 다시풀어보면 아래와 같다.
## 문제 풀이 - 2 (두번째 했던 풀이)
```py
def solution(skill, skill_trees):
  answer = 0
    
  for tree in skill_trees:
    skillList = list(skill)
    for treeSkill in list(tree):
      if (treeSkill in skill) == True and treeSkill != skillList.pop(0):
        break;
    else:
      answer += 1
      
  return answer
```
string slice를 한 첫번째 풀이에서 list로 변경하고 pop으로 비교하는 것이 바뀌었고, for-else로 마지막 인덱싱을 처리하던 로직이 간소화되서 한결 보기 편하다.

----

[참고: 문제링크](https://programmers.co.kr/learn/courses/30/lessons/49993)