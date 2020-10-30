---
title: TS, 에러 처리
date: 2020-10-30 02:10:87
category: typescript
thumbnail: { thumbnailSrc }
draft: false
---

## 에러를 표현&처리 하는 일반적 패턴 4가지

### null 반환

타입 안정성을 유지하면서 에러를 처리하는 가장 간단한 방법은 null을 반환하는 것이다.
하지만 단점으로 어떤 것 때문에 null을 반환하는지 이후 디버깅을 하기가 어렵고 에러메시지 또한 "알 수 없는 오류가 발생했습니다." 라는 애매한 메시지를 사용자에게 전달하게된다. 그리고 null 반환시 모든 연산에 null 체크를 해야하기 때문에 조합이 어려워진다.

#### 예시
```ts
const ask = () => prompt('When is your birthday?');

const isValid = (date: Date) => (
  Object.prototype.toString.call(date) === '[object Date]'
  && !Number.isNaN(date.getTime())
)

const parse = (birthday: string): Date | null => {
  const date = new Date(birthday);
  if (!isValid(date)) return null;
  return date;
};

const date = parse(ask());
if (date) {
  console.log(`Date is ${date.toISOString()}`);
} else {
  console.log('Error parsing date for some reason');
}
```
### 예외 던지기

null을 반환하는 예제와 다르게 연산 하나하나 실패 했는지 확인할 필요가 없고 문제 디버깅도 쉽게 판단 되며 사용자에게 어떤 문제가 생겼는지 알려줄 수 있다.<br/>
단, 타입스크립트는 특정 타입의 에러 또는 기존의 에러들이 던져질 수도 있다는 것을 선언할 수가 없다. 즉 에러 예외처리를 함수의 시그니처로 취급하지 않는다. 그래서 docblock 문서화 주석에 정보를 추가해야한다.

#### 예시
```ts
...

class InvalidDateFormatError extends RangeError {}
class DateIsInTheFutureError extends RangeError {}

/**
 * @throws {InvalidDateFormatError} 사용자가 생일을 잘못 입력
 * @throws {DateIsInTheFutureError} 사용자가 미래에서 옴
*/
const parse = (birthday: string): Date => {
  const date = new Date(birthday);
  if (!isValid(date)) throw new InvalidDateFormatError('YYYY/MM/DD 타입으로 적어주세요.');
  if (date.getTime() > Date.now()) throw new DateIsInTheFutureError('너 시간여행자냐?');
  return date;
};

try {
  const date = parse(ask());
  console.log(`Date is ${date.toISOString()}`);
} catch (e) {
  if (e instanceof InvalidDateFormatError) {
    console.error(e.message);
  } else if (e instanceof DateIsInTheFutureError) {
    console.error(e.message);
  } else {
    throw e;
  }
}
```
### 예외 반환
타입스크립트는 자바와 다르게 throws 문을 지원하지 않는다. 하지만 '|' 유니온 타입으로 비슷하게 흉내가 가능하다

#### 예시 - 1
```ts
const parse = (birthday: string)
  : Date | InvalidDateFormatError | DateIsInTheFutureError => {
  const date = new Date(birthday);
  if (!isValid(date)) throw new InvalidDateFormatError('YYYY/MM/DD 타입으로 적어주세요.');
  if (date.getTime() > Date.now()) throw new DateIsInTheFutureError('너 시간여행자냐?');
  return date;
};
```

위 예시처럼 반환 타입에 정의하게되면 `성공, InvalidDateFormatError, DateIsInTheFutureError` 3가지 상황을 모두 처리해야한다. (안할 경우 컴파일타임 타입에러 발생)

```ts
const result = parse(ask());
if (result instanceof InvalidDateFormatError) {
  console.error(result.message); // type result: InvalidDateFormatError 
} else if (result instanceof DateIsInTheFutureError) {
  console.error(result.message); // type result: DateIsInTheFutureError
} else {
  console.log(result.toISOString); // type result: Date
}

// 또는 아래처럼 한번에 명시
const result = parse(ask());
if (result instanceof Error) {
  console.error(result.message); // type result: InvalidDateFormatError | DateIsInTheFutureError 
} else {
  console.log(result.toISOString); // type result: Date
}
```

단점으로는 에러를 던지는 연산을 연쇄적으로 호출하거나 중첩하면 코드가 지저분해진다는 단점이 있다.<br/>
예) `function x(): T|Error1|Error2|Error3|Error4|Error5`

### Option 타입

특수 목적 데이터 타입(`Try, Option, Either`)을 사용해서 예외를 표현할 수 도 있다. null | 유니온 에러타입 반환 방식에 비해서 단점으로 해당 타입을 사용하지않는 다른 코드와 호환이 되지않는 이슈가 있지만 연쇄적 에러 연산 수행을 할수 있게 해주는 장점이 있다.

> Try, Option, Either 타입은 자바스크립트가 기본으로 제공하지 않기때문에 라이브러리를 설치하거나 직접 구현해야한다.

#### 예시
```ts
import { Option } from "ts-option";

type None = {
  flatMap<U>(f: (value: null) => Option<U>): None;
  getOrElse<U>(def: U): U;
  isEmpty(): true;
  map<U>(f: (value: null) => U): None;
  nonEmpty(): false;
  orElse<U>(alternative: Option<U>): Option<U>;
};

type Some<T> = {
  flatMap<U>(f: (value: T) => Some<U>): Some<U>;
  flatMap<U>(f: (value: T) => None): None;
  flatMap<U>(f: (value: T) => Option<U>): Option<U>;
  get(): T;
  getOrElse<U extends T>(def: U): T | U;
  isEmpty(): false;
  map(f: (value: T) => null): None;
  map<U>(f: (value: T) => U): Some<U>;
  map<U>(f: (value: T) => U): Option<U>;
  nonEmpty(): true;
  orElse<U extends T>(alternative: Option<U>): Option<T> | Option<U>;
};

type Option<T> = Some<T> | None;

let None: None = {
  flatMap: <T>(_f: (value: never) => Option<T>) => None,
  getOrElse: <T>(def: T) => def,
  isEmpty: () => true,
  map: <T>(_f: (value: never) => T) => None,
  nonEmpty: () => false,
  orElse: <U>(alternative: Option<U>): Option<U> => alternative
};

function Some<T>(value: T): Some<T> {
  return {
    flatMap: <U>(f: (value: T) => Option<U>) => f(value) as any, // TODO
    get: () => value,
    getOrElse: <U extends T>(def: U): T | U  => value || def,
    isEmpty: () => false,
    map: <U>(f: (value: T) => U) => Option(f(value)) as any, // TODO
    nonEmpty: () => true,
    orElse: <U>(_alternative: Option<U>): Option<T> | Option<U> => Some(value)
  }
}

function Option<T>(value: T): Some<T>
function Option<T>(value: null): None
function Option<T>(value: T | null) {
  if (value === null) {
    return None;
  }
  return Some(value);
}

const y = Option(3)
  .map(() => 4)
  .flatMap(() => Option(5))
  .get();
```

#### [참고 "ts-option"](https://www.npmjs.com/package/ts-option)

`option<A>(value?: A | null): Option<A>`
Option 값에서 인스턴스를 생성한다. `Some<A>` 값이 null 이거나 undefined 아닐 때 반환하고 그렇지 않을경우에는 `None` 타입을 반환한다.

`some<A>(value: A): Option<A>`
Some 타입 값의 인스턴스를 생성한다. `Some<A>` 값이 null 이거나 undefined 여도 반환한다. 단, tsconfig.json에 `strict null` 이 활성화된 경우 undefined, null이 허용되지 않는다.

`none: Option<never>`
None 타입의 단일객체