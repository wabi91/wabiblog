---
title: TS, 고급 타입 - 1
date: 2020-10-16 19:10:96
category: typescript
thumbnail: { thumbnailSrc }
draft: false
---

> 타입스크립트는 까다롭다는 하스켈 프로그래머의 부러움을 살 정도로 강력한 타입 수준 프로그래밍 기능을 갖추었다.

## 타입 간의 관계
### 서브타입과 슈퍼타입

"슈퍼타입", 두 개의 타입 A와 B가 있고 B가 A의 슈퍼타입이면 B가 필요한 곳에는 어디든 A를 안전하게 사용할 수 있다.<br/>
"서브타입", 두 개의 타입 A와 B가 있고 B가 A의 서브타입이면 A가 필요한 곳에는 어디든 B를 안전하게 사용할 수 있다.<br/>

#### 슈퍼타입 > 서브타입
- Object > Array > Tuple
- any > 모든 타입
- 모든 타입 > never
- Animal 를 상속한 Bird 클래스: Animal > Bird

### 가변성

`Array<A>` 처럼 타입 매개변수를 갖거나, `{a: number}` 같은 필드를 갖거나 `(a: A) => B` 같은 형태는 추론하기가 어려워서 명확하게 서브타입, 슈퍼타입을 판단할 수 없다.

- A <: B 는 'A는 B와 같거나 B의 서브타입' 이라는 의미
- A >: B 는 'A는 B와 같거나 B의 슈퍼타입' 이라는 의미

```ts
type ExistingUser = {
  id: number
  name: string
};

type NewUser = {
  name: string
};

function deleteUser(user: {id?: number, name: string}) {
  /**
   * {id?: number, name: string} 이라는 타입의 서브타입은 {id: number, name: string}
  */
  delete user.id;
}
let existingUser: ExistingUser = {
  id: 123,
  name: 'wabi',
};
deleteUser(existingUser);
/** 
 * deleteUser 를 통해 id가 삭제 되었음에도,
 * ExistingUser 라는 타입정의가 된 상태라서 id 가
 * number 타입 일 것으로 생각한다. = 안전성이 완벽하게 보장이 안된다
*/
type LegacyUser = {
  id?: number | string
  name: string
};
let legacyUser: LegacyUser = {
  id: '1234',
  name: 'prevWabi',
};
deleteUser(legacyUser);
/**
 * Argument of type 'LegacyUser' is not assignable to parameter of type '{ id?: number; name: string; }'.
  Types of property 'id' are incompatible.
    Type 'string | number' is not assignable to type 'number'.
      Type 'string' is not assignable to type 'number'.ts(2345)
*/
```

#### 가변성의 네 종류
- 불변 - 정확히 T를 원함
- 공변 - <:T 를 원함
- 반변 - >:T 를 원함
- 양변 - <:T 또는 >: 를 원함

모든 복합타입의 멤버(객체, 클래스, 배열, 함수, 반환 타입)는 공변이며 함수 매개변수 타입만 예외적으로 반변이다.

#### 함수 가변성

```ts
class Animal { }
class Bird extends Animal {
  chirp() { }
}
class Crow extends Bird {
  caw() { }
}
// Crow <: Bird <: Animal

function chirp(bird: Bird): Bird {
  bird.chirp();
  return bird;
}

chirp(new Animal);
/**
 * Argument of type 'Animal' is not assignable to parameter of type 'Bird'.
  Property 'chirp' is missing in type 'Animal' but required in type 'Bird'.ts(2345)
 * 매개변수는 반변 ( >:T ) 매개변수에는 같거나 서브타입만 들어가야한다.
*/
chirp(new Bird);
chirp(new Crow);

function clone(f: (b: Bird) => Bird): void {
  let parent = new Bird;
  let babyBird = f(parent);
  babyBird.chirp();
}
function birdToBird(b: Bird): Bird {
  return b;
}
clone(birdToBird);
function birdToCrow(b: Bird): Crow {
  return new Crow;
}
clone(birdToCrow);
function birdToAnimal(b: Bird): Animal {
  return new Animal;
}
clone(birdToAnimal);
/**
 * Argument of type '(b: Bird) => Animal' is not assignable to parameter of type '(b: Bird) => Bird'.
  Type 'Animal' is not assignable to type 'Bird'.
 * 함수의 반환타입은 공변 이므로 ( <:T )
 * '서브함수의 반환 타입 <: 다른 함수의 반환 타입' 을 만족해야 한다.
*/
function animalToBird(a: Animal): Bird {
  return new Bird;
}
clone(animalToBird);
function crowToBird(c: Crow): Bird {
  c.caw();
  return new Bird;
}
clone(crowToBird);
/**
 * Argument of type '(c: Crow) => Bird' is not assignable to parameter of type '(b: Bird) => Bird'.
  Types of parameters 'c' and 'b' are incompatible. Property 'caw' is missing in type 'Bird' but required in type 'Crow'.
 * 함수의 매개변수, this타입은 반변 ( >:T )
 * '서브함수의 매개변수와 this타입 >: 다른 함수의 매개변수' 를 만족해야 한다.
*/
```
### 할당성

- A <: B - A는 B의 서브타입으로 B가 사용되는 곳에 A를 사용할 수 있다.
- A 는 any - A는 예외타입으로 어느 곳에서든 사용할 수 있다.

### 타입 넓히기

```ts
let A = 'a'; // string
A = 'b'; // OK

let a: 'x' = 'x';
a = 'c'; // Type '"c"' is not assignable to type '"x"'.
let b: 3 = 3;
b = 3; // OK

function x() {
  let a = null; // any
  a = 3;  // any
  a = 'b';  // any
  return a;
}

let c = {x: 3, c: [1,2,3]} as const;
/**
 * {
    readonly x: 3;
    readonly c: readonly [1, 2, 3];
  }
 * 중첩된 자료구조의 재귀로 적용된다.
*/
c.x = 4 // Cannot assign to 'x' because it is a read-only property.ts(2540)
c.c[2] = 2 // Cannot assign to '2' because it is a read-only property.ts(2540)
```
#### 초과 프로퍼티 확인

```ts
type Opt = {
  a: string
  b?: number
  c?: 'wabi' | 'one' | 'taek'
}

class CreatePost {
  constructor(private opt: Opt){}
}
new CreatePost({
  a: 'ts',
  c: 'wabi'
})
new CreatePost({
  a: '123',
  d: 12,
})
/**
 * Argument of type '{ d: number; }' is not assignable to parameter of type 'Opt'.
  Object literal may only specify known properties, and 'd' does not exist in type 'Opt'.ts(2345)
*/
new CreatePost({
  a: 'tes',
  d: 123
} as Opt)
// 유효하지 않은 키를 넣은 객체이지만, as T 문법으로 타입스크립트는 초과 프로퍼티 확인을 안한다.

const testOpt: Opt = {
  a: 'basdf',
  b: 12312,
  f: 1231,
}
/**
 * Type '{ a: string; b: number; f: number; }' is not assignable to type 'Opt'.
  Object literal may only specify known properties, and 'f' does not exist in type 'Opt'.ts(2322)
 * 타입을 명시해버리기 때문에 초과 프로퍼티 확인을 수행. 에러를 잡아낸다.
*/
```

### 정제

타입스크립트의 타입 검사기는 typeof, instanceof, in 등의 타입 질의뿐 아니라, 프로그래머가 코드를 읽는 것과 마찬가지로 if, ?, ||, switch 같은 제어 흐름 문장도 고려해서 타입을 정제한다.

#### 차별된 유니온 타입

```ts
type UserTextEvent = {
  value: string
  target: HTMLInputElement
}
type UserMouseEvent = {
  value: [number, number]
  target: HTMLElement
}

type UserEvent = UserTextEvent | UserMouseEvent

function handle(event: UserEvent) {
  if (typeof event.value === 'string') {
    event.value // value: string
    event.target // target: HTMLInputElement | HTMLElement
    return;
  }
  event.value // value: [number, number]
  event.target // target: HTMLInputElement | HTMLElement
}
// 유니온의 멤버가 서로 중복될 수 있어서 위와 같이 target같은 리터럴 타입이 아닌 경우 유니온 타입으로 추론된다.
```

```ts
type UserTextEvent = {
  type: 'TextEvent'
  value: string
  target: HTMLInputElement
}
type UserMouseEvent = {
  type: 'MouseEvent'
  value: [number, number]
  target: HTMLElement
}

type UserEvent = UserTextEvent | UserMouseEvent

function handle(event: UserEvent) {
  if (event.type === 'TextEvent') {
    event.value // value: string
    event.target // target: HTMLInputElement
    return;
  }
  event.value // value: [number, number]
  event.target // target: HTMLElement
}
// event.type에 따라 정제되도록 수정했기 때문에, if문 내부 외부 추론이 좁게 가능해진다.
// 위 같이 태그된 유니온을 사용하는 경우의 예시로 플럭스 액션, 리덕스 리듀서 useReducer 등이 있다.
```

## 종합성

철저 검사라고도 불리는 종합성은 필요한 모든 상황을 제대로 처리했는지 타입 검사기가 검사하는 기능이다.
```ts
type A = 1 | 2 | 3 | 4 | 5
type B = 'a' | 'b' | 'c' | 'd'

function test(a: A): B {
  switch(a) {
    case 1: return 'a'
  }
}
// Function lacks ending return statement and return type does not include 'undefined'.

function isTrue(x: boolean) {
  if (x) {
    return true
  }
}
// Not all code paths return a value.
```

## 고급 객체 타입

객체를 안전하게 표현하고 조작할 수 있는 다양한 수단을 제공한다.

### 객체 타입의 타입 연산자
타입스크립트는 |, & 외에 다른 연산자도 제공한다.
#### 키인 연산자
```ts
type Test = {
  a: {
    b: string
    c: {
      d: number
      e: {
        f: string
        g: boolean
      }[]
    }
  }
}

type TestE = Test['a']['c']['e']
/**
 * {
    f: string;
    g: boolean;
  }[]
*/
type TestEValue = Test['a']['c']['e'][number]
/**
 * {
    f: string;
    g: boolean;
  }
*/
```
#### keyof 연산자
```ts
type Test = {
  a: {
    b: string
    c: {
      d: number
      e: {
        f: string
        g: boolean
      }[]
    }
  }
}

type KeyOfTestA = keyof Test['a'] // "b" | "c"
type KeyOfTestAinC = keyof Test['a']['c']['e'][number] // "f" | "g"
```
### Record 타입
객체가 특정 키 집합을 정의하도록 강제하는 방법 중 하나로 key, value를 매핑 가능하다.
```ts
type A = 1 | 2 | 3 | 4 | 5
type B = 'a' | 'b' | 'c' | 'd'

let recordTest: Record<A, B> = {
  1: 'a',
}

/**
 * Type '{ 1: "a"; }' is missing the following properties
 * from type 'Record<A, B>': 2, 3, 4, 5ts(2739)
*/
```
### 매핑된 타입

```ts
type Test = {
  a: number
  b: string
  c: boolean[]
}

type OptionalTest = {
  [K in keyof Test]?: Test[K]
}
type NullableTest = {
  [K in keyof Test]: Test[K] | null
}
type ReadonlyTest = {
  readonly [K in keyof Test]: Test[K]
}
type Test2 = {
  [K in keyof OptionalTest]-?: Test[K]
}
type Test3 = {
  -readonly [K in keyof ReadonlyTest]: Test[K]
}

// - 연산자로 타입정의를 제거할 수 있다.
```

#### 내장 매핑된 타입

- Record<Keys, Values><br/>
Keys 타입의 키와 Values 타입의 값을 갖는 객체

- Partial<Object><br/>
Object의 모든 필드를 선택형으로 표시

- Required<Object><br/>
Object의 모든 필드를 필수형으로 표시

- Readonly<Object><br/>
Object의 모든 필드를 읽기 전용으로 표시

- Pick<Object, Keys><br/>
주어진 Keys에 대응하는 Object의 서브타입을 반환

```ts
type Person = {
  name: string
  age: number
  gender: 'male' | 'female'
};

type NameAndAgeOfPerson = Pick<Person, "name" | "age">;
const nameAndAgeOfPerson: NameAndAgeOfPerson = {
    name: 'wabi', // required
    age: 30,      // required
    // gender: "male" --> (X)
};
```

### 컴패니언 객체 패턴

스칼라에서 유래한 기능으로 같은 이름을 공유하는 객체, 클래스를 쌍으로 연결한다.

```ts
//file1
export type WebDev = {
  type: 'Frontend' | 'Backend' | 'Full Stack'
  value: number,
}

export const WebDev = {
  default: 'Frontend',
  getValue: (type = WebDev.default, value: number): WebDev => ({ type, value })
}
```

```ts
//file2
import { WebDev } from './test'

const prevWabi: WebDev = {
  type: 'Frontend',
  value: 1000,
}

const nextWabi = WebDev.getValue('Full Stack', 10000);
```

타입과 객체가 의미상 관련이 있고, 이 객체가 타입을 활용하는 유틸리티 메서드를 제공할 경우 위 패턴을 사용한다.