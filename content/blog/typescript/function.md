---
title: "TS, 함수"
date: 2020-09-24 23:09:15
category: typescript
thumbnail: { thumbnailSrc }
draft: false
---

> 자바스크립트에서 함수는 일급 `first-class` 객체이다.

### 타입스크립트에서 함수를 선언하고 실행하는 다양한 방법
```typescript
// 1. 이름을 붙인 함수
function hello1(name: string) {
  return `hello ${name}`;
}
// 2. 함수 표현식
const hello2 = function (name: string) {
  return `hello ${name}`;
};
// 3. 화살표 함수 표현식
const hello3 = (name: string) => {
  return `hello ${name}`;
};
// 4. 단축형 화살표 함수 표현식
const hello4 = (name: string) => `hello ${name}`;
// 5. 함수 생성자 (불안전으로 사용 X)
const hello5 = new Function('name', 'return "hello " + name');

// 선택적 매개변수 / 기본 매개변수

const log = (msg: string, id?: string) => `${id || 'Someone'} says "${msg}"`;

log('Hi', 'Wabi'); // Wabi says "Hi"
log('Bye'); // Someone says "Bye"

// 기본 매개변수 사용
const log2 = (msg: string, person = { firstName: 'Hong', lastName: 'gil dong' }) => `${person.firstName} ${person.lastName} says "${msg}"`;

log('Enjoy typescript');
// Hong gil dong says "Enjoy typescript"
// NOTE: 타입스크립트는 기본값으로 매개변수 타입을 추론하기 때문에 선택형 마크와 타입을 지정할 필요가 없다.

// 나머지 매개변수

const sumNumbersWithDouble = (double: number, ...numbers: number[]): number => {
  return double * 2 + numbers.reduce((total, n) => total + n, 0);
};

sumNumbersWithDouble(2, 1, 2, 3, 4); // 14

// call, apply, bind

const testSum = (a: number, b: number) => a + b;
testSum(1, 2); // 3
testSum.apply(null, [1, 2]); // 3
testSum.call(null, 1, 2); // 3
testSum.bind(null, 1, 2)(); // 3

// NOTE: strict mode 또는 strictBindCallApply 활성화로 안전하게 사용 필요.

// 제너레이터 함수

function* increaseNum(): IterableIterator<number> {
  let n = 0;
  while (true) {
    yield n ++;
  }
}

const increaseTest = increaseNum();
increaseNum.next(); // {value: 0, done: false}
increaseNum.next(); // {value: 1, done: false}
increaseNum.next(); // {value: 2, done: false}

/** NOTE
iterable : Symbol.iterator 반복자를 반환하는 함수를 가진 모든 객체
iterator : value, done 두 프로퍼티를 가진 객체를 반환하는 메서드를 정의한 객체
*/

// 호출 시그니처

type MatchTitle = (a: string, b: string, round: number) => string;

const matchTitle: MatchTitle = (a, b, round) => {
  return `Final ${round} round match: ${a} vs ${b}`;
}
matchTitle('A', 'B', 6);
// Final 6 round match: A vs B

// 오버로드 시그니처

type CreateElement = {
  (tag: 'a'): HTMLAnchorElement
  (tag: 'canvas'): HTMLCanvasElement
  (tag: string): HTMLElement
};

const createElement: CreateElement = (tag: string): HTMLElement => {
  // ...
};

// 다형성

type Filter = {
  (arr: string[], func: (item: string) => boolean): string[]
  (arr: number[], func: (item: number) => boolean): number[]
};
// ===, 아래와 같이 변경 가능. (제네릭 타입 매개변수)
type Filter = {
  <T>(arr: T[], func: (item: T) => boolean): T[]
};
// Filter 라는 타입 내 시그니처 T를 개별 시그니처가 아닌 모든 시그니처 한정으로 변경하면 아래와 같다.
type Filter<T> = {
  (arr: T[], func: (item: T) => boolean): T[]
};
let filter: Filter<number>

// 상한선을 둔 다형성 표현

type HasSides = { numberOfSides: number };
type SidesHaveLength = { sideLength: number };

function logPerimeter<
  Shape extends HasSides & SidesHaveLength
>(s: Shape): Shape {
  console.log(s.numberOfSides * s.sideLength);
  return s;
}

type Square = HasSides & SidesHaveLength;
let square: Square = { numberOfSides: 4, sideLength: 3 };
logPerimeter(square); // 12

// 제네릭 타입 기본값

type MyEvent<T extends HTMLElement = HTMLElement> {
  target: T
  type: string
};
// NOTE: 필수 타입 매개변수는 선택적 타입 매개변수 뒤에 올 수 없다. (= 기본타입을 갖는 제네릭은 반드시 기본 타입을 갖지않는 제네릭의 뒤에 위치해야 한다.)
```

### 위 타입스크립트의 다향성으로 나타나는 map 함수의 타입 시그니처

```typescript
function map<T, U>(array: T[], func: (item: T) => U): U[] {
  // ...
}
```

> 타입스크립트는 타입 시그니처를 통해 타입 주도 개발(type-driven development), 타입 시그니처를 먼저 정하고 값을 나중에 채우는 프로그래밍 방식을 주도 한다.

--------
### 타입스크립트 함수 타입 정의 요약

#### 타입스크립트는 함수 타입 시그니처에서 어떤 부분을 추론하는가? 매개변수 타입, 반환 타입 또는 두 가지 모두?

함수의 매개변수는 타입을 추론하지 않는다.<br/>
반환 타입은 자동으로 추론하지만 원하면 명시 할 수 있다.

#### 자바스크립트의 arguments 객체는 타입 안전성을 제공하는가? 그렇지 않다면 무엇으로 대체할 수 있을까?

arguments 객체는 안전성을 제공하지 않는다.<br/>
해당 인수는 모두 any타입으로 추론이되고, 이 문제를 나머지 매개변수로 해결이 가능하다<br/>

#### 타입 다형성 & 나머지 매개변수 에 대한 정리

```typescript
is(5, 5); // true
is(true, false); // false
is(1, '1'); // Argument of type '"1"' is not assignable to parameter of type 'number'.
is('1', 1); // Argument of type '1' is not assignable to parameter of type 'string'.
is(true, true, true, true, true, true, true); // true
is([1], [1,3], [1,2,3,4]); // false
is([1], [1]); // false, [1] === [1] false 이기 때문
```

위와 같은 결과가 나오도록 타입 시그니처를 갖춘 함수를 아래와 같이 나타낸다.

```typescript
function is<T>(a: T, ...b: [T, ...T[]]): boolean {
  return b.every(_ => _ === a);
}
```