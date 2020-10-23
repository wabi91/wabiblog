---
title: TS, 고급 타입 - 2
date: 2020-10-23 18:10:12
category: typescript
thumbnail: { thumbnailSrc }
draft: false
---

## 고급 함수 타입들

### 튜플의 타입 추론 개선

```ts
const a = [1, true]; // (number | boolean)[]
```
위와 같은 일반적 추론보다 엄격한 추론을 필요로할 때, (= 고정된 길이의 튜플) 타입 어서션 이나 `as const` 어서션을 이용해 튜플의 타입을 좁고 읽기전용으로 만들 수 있지만, 타입 어서션을 사용 안하고 나머지 매개변수의 타입을 추론하는 기법을 사용할 수 있다.

#### Type Assertions?
```ts
//angle-bracket(<>)
const someValueA: any = "this is a string";
const strALength: number = (<string>someValueA).length;

// as
const someValueB: any = "this is a string";
const strBLength: number = (someValueB as string).length;
```
> Type Assertions : 개발자가 타입스크립트에게 "내가 무슨짓을하고 있는지 아니까, 나를믿어줘!" 하고 메세지를 보내는 것으로 주로 엔티티의 타입을 보다 구체적으로 설정할 때 사용.

```ts
function tuple<
  T extends unknown[]
>(...ts: T): T{
  return ts;
}

const a = tuple(1, true);

a[0] = '44'; // Type '"44"' is not assignable to type 'number'.
a[2] = 423; // Type '423' is not assignable to type 'undefined'.
```
튜플 타입이 많이 등장하는 코드라면 이 기법을 사용해서 타입 어서션을 줄일 수 있다.

### 사용자 정의 타입 안전 장치

```ts
function isString(a: unknown): boolean {
  return typeof a === 'string';
}
isString('a') // true
isString(true) // false

function parseInput(input: string | number) {
  let formattedInput: string;
  if (isString(input)) {
    // input: string | number
    formattedInput = input.toUpperCase();
    /**
     * Property 'toUpperCase' does not exist on type 'string | number'.
      Property 'toUpperCase' does not exist on type 'number'.ts(2339)
    */
  }
}
```
위 같은 에러는 `isString` 함수가 `typeof` 를 이용해서 boolean 값을 반환한다는 것만 타입스크립트는 알고 있기 때문에 일어난다. 그러므로 true 이면 isString 에 전달한 인수가 string 인지 알려줘야한다.

사용자 정의 타입 안전 장치('user-defined type guard') 기법 적용
```ts
function isString(a: unknown): a is string {
  return typeof a === 'string';
}
// 유니온 또는 인터섹션 같은 복합 타입에도 적용가능
type A = {
  a: string;
  b: number;
};
type B = {
  a: null;
  b: boolean;
};
function isAtype(input: A | B): input is A{
  return input.a !== null;
}
```

## 조건부 타입

예시) U 와 V 타입에 의존하는 T 타입을 선언해야한다. U <: V 일 경우 T 는 A에 할당하고 그렇지 않을 경우 T 는 B에 할당.
```ts
type isString<T> = T extends string ? true : false;
type A = isString<number>; // false
type B = isString<string>; // true
type C = isString<'hi'>; // true
```

### 분배적 조건부

`(string | number) extends T ? A : B` 는 `(string extends T ? A : B) | (number extends T ? A : B)` 와 같다.

```ts
type toArray1<T> = T[];
type test1 = toArray1<string>; // stirng[]
type test2 = toArray1<number | boolean | string>; // (string | number | boolean)[]

type toArray2<T> = T extends unknown ? T[] : T[];
type test3 = toArray2<string>; // stirng[]
type test4 = toArray2<number | boolean | string>; // string[] | number[] | false[] | true[]

// 조건부를 분배하기 때문에 아래와 같다.
type test4 = (number extends unknown ? number[] : never) // number[] | true[] | false[] | string[]
            | (true extends unknown ? true[] : never)
            | (false extends unknown ? false[] : never)
            | (string extends unknown ? string[] : never)
```

### infer 키워드

제네릭 타입을 인라인으로 선언하는 전용 문법인 infer를 제공
```ts
type ElementType<T> = T extends unknown[] ? T[number] : T;
type A = ElementType<number[]>; // number
type F = ElementType<string[]>; // string

type C = string[][number]; // 키인덱스로 어레이의 인덱싱으로 해당 value를 뽑아옴 string

type ElementType2<T> = T extends (infer U)[] ? U : T;
type B = ElementType2<number[]>; // number
type D = ElementType2<string[]>; // string
type E = ElementType2<boolean[]>; // boolean
```

### 내장 조건부 타입들

```ts
// Exclude<T, U> : T에 속하지만 U에 없는 타입
type A = number | string;
type B = string;
type C = Exclude<A, B>; // number

// Extract<T, U> : T의 타입 중 U에 할당할 수 있는 타입
type D = Extract<A, B>; // string

// NonNullable<T> : null 과 undefined 를 제외한 타입을 구한다.
type X = null | undefined;
type E = NonNullable<A | X>; // string | number
type Y = {
  a?: string | null;
};
type F = NonNullable<A | X>; // string | number
type G = NonNullable<Y['a']>; // string

// ReturnType<F> : 제네릭, 오버로드된 함수 제외하고 함수의 반환 타입을 구한다.
type H = (a: string) => A;
type I = ReturnType<H>; // string | number // (=== A타입)

// InstanceType<C> : 클래스 생성자의 인스턴스 타입을 구한다.
type K = { b?: string };
type J = { new(): K };
type L = InstanceType<J>; // { b?: string }
```

## 탈출구

### 타입 어서션 (Type Assertions)

<>문법과 as문법을 쓸 수 있는데 as 문법을 권장한다. 이유로는, react TSX 와 혼동을 일으킬 수 있기 때문이다. 관련 옵션으로는 "noangle-bracket-type-assertion"이 있다.
```ts
function formatInput(input: string) {
  // ...
}
function getUserInput(data: boolean): string | number {
  if (data) return 'ok';
  return 0;
}
const input = getUserInput(false); // string | number
formatInput(input as string);
formatInput(<string>input);
```
> 위 `if (data)`의 true 가 들어오면 string 반환인 것이 확실한데 추론을 못하는 이유로 유니온 타입은 정제되지 않기 때문이다. <a href="/typescript/advanced_type/#차별된-유니온-타입" target="_blank">이전 글 참조</a>

### Nonnull 어서션

```ts
type Dialog = {
  id?: string;
};

function closeDialog(dialog: Dialog) {
  if (!dialog.id) return;
  setTimeout(() => {
    removeFromDom(dialog, document.getElementById(dialog.id)!);
  });
}

function removeFromDom(dialog: Dialog, element: Element) {
  element.parentNode!.removeChild(element);
  delete dialog.id;
}
```
`T | null | undefined` 로 정의된 타입을 ! 연산자로 T로 정의할 수 있다.

### 확실한 할당 어서션

타입스크립트가 변수를 사용할 때 값이 이미 할당되어 있는지 검사하는 방법
```ts
let userId!: string;
fetchUser();

userId.toUpperCase();

function fetchUser() {
  userId = 'sadnflkasndfl';
}
```

> nonnull 어서션과 마찬가지로 할당 어서션도 많이 쓰인다면 개발이 무언가 잘못되고 있는 중일 가능성이 높다.

### 이름 기반 타입 흉내내기 (type branding)

```ts
type CompanyID = string;
type ShopID = string;
type UserID = string;
function onlyForUser(id: UserID){
  //...
}
const companyID: CompanyID = '23143124asdf';
onlyForUser(companyID); // 구조기반 타입 체크인 타입스크립트라서 에러가 발생 안한다.
```

위 같은 경우를 피하기위해서 `type branding` 이라는 기법을 사용 이름 기반 타입정의를 흉내낼 수 있다.

```ts
type CompanyID = string & { readonly brand: unique symbol };
type ShopID = string & { readonly brand: unique symbol };
type UserID = string & { readonly brand: unique symbol };
// 타입의 이름을 unique symbol (brnad) 로 readonly 시킨다. 그리고 이것은 string과 매칭

function onlyForUser(id: UserID){
  //...
}
const testID: CompanyID = '32141234'; // TS Error!
/**
 * Type '"32141234"' is not assignable to type 'CompanyID'.
  Type '"32141234"' is not assignable to type '{ readonly brand: unique symbol; }'.ts(2322)
 */
const companyID = CompanyID('23143124asdf'); // CompanyID
const shopID = ShopID('124df'); // ShopID
const userID = UserID('30asdf'); // UserID
onlyForUser(companyID); // TS Error!
// Argument of type 'CompanyID' is not assignable to parameter of type 'UserID'.

function CompanyID(id: string) {
  return id as CompanyID;
}
function ShopID(id: string) {
  return id as ShopID;
}
function UserID(id: string) {
  return id as UserID;
}
```

### 프로토타입 안전하게 확장하기

```ts
function tuple<
  T extends unknown[]
>(...ts: T): T{
  return ts;
}

// 타입스크립트에 zip이 무엇인지 설명
interface Array<T> {
  zip<U>(list: U[]): [T, U][]
}

// .zip 구현
Array.prototype.zip = function <T, U>(
  this: T[],
  list: U[]
): [T, U][] {
  return this.map((val, idx) => tuple(val, list[idx]));
}
```
위 코드를 아래와 같이 사용 가능하다. 단, 프로젝트에서 zip.ts를 명시적으로 제외하도록 tsconfig.json에 exculde `./zip.ts` 를 추가해야한다.
```ts
import './zip';
[1, 2, 3].map(n => n * 2).zip(['a', 'b', 'c']);
// [[2, 'a'], [4, 'b'], [6, 'c']]
```


