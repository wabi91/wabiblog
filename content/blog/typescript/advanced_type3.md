---
title: TS, 슈퍼타입, 서브타입 예시
date: 2020-10-23 20:10:12
category: typescript
thumbnail: { thumbnailSrc }
draft: false
---

## 슈퍼타입 서브타입 관계 예시
각 쌍에 대해 첫 번째 유형이 두 번째 유형에 할당 가능한지 여부 제시
```ts
// a. 1 and number

let a: number
a = 1 as 1

/* Yes. The type literal 1 is a subtype of number, so it's assignable to number. */

// b. number and 1

let b: 1
b = 2 as number

/* No. number is a supertype of the type literal 1, so is not assignable to 1. */

// c. string and number | string

let c: number | string
c = 'foo' as string

/* Yes. string is a subtype of number | string, so it assignable to number | string. */

// d. boolean and number

let d: number
d = true as boolean

/* No. The boolean and number types are unrelated. */

// e. number[] and (number | string)[]

let e: (number | string)[]
e = [1] as number[]

/* Yes. Arrays are covariant in their members, so for an array to be assignable to another array, its members needs to be <: the other array's members. number is a subtype of number | string, so number[] is assignable to (number | string)[]. */

// f. (number | string)[] and number[]

let f: number[]
f = [1] as (number | string)[]

/* No. Arrays are covariant in their members, so for an array to be assignable to another array, its members needs to be <: the other array's members. number | string is a supertype of number, rather than a subtype, so (number | string)[] is not assignable to number[]. */

// g. {a: true} and {a: boolean}

let g: {a: boolean}
g = {a: true} as {a: true}

/* Yes. Objects are covariant in their members, so for an object to be assignable to another object, each of its members needs to be <: the type of the other object's members. This object has just one member, a, and its type is the type literal true. true is <: boolean, so the whole object {a: true} is assignable to {a: boolean}. */

// h. {a: {b: [string]}} and {a: {b: [number | string]}}

let h: {a: {b: [number | string]}}
h = {a: {b: ['c']}} as {a: {b: [string]}}

/* Yes. Combining the rules from (e) and (g), for a nested object to be assignable to another object, each of its members needs to be <: the other object's members. We repeat this recursively:
Is {a: {b: [string]}} assignable to {a: {b: [number | string]}}? Yes, if:
  Is {b: [string]} assignable to {b: [number | string]}? Yes, if:
    Is [string] assignable to [number | string]? Yes, if:
      Is string assignable to number | string? Yes, because string is contained in the union number | string.
*/

// i. (a: number) => string and (b: number) => string

let i: (b: number) => string
i = ((b: number) => 'c') as (b: number) => string

/* Yes. For a function to be assignable to another function, each of its parameters should be >: the other function's parameters, and its return type should be <: the other function's return type. number is >: number, and string is <: string, so the function type is assignable. */

// j. (a: number) => string and (a: string) => string

let j: (a: string) => string
j = ((a: number) => 'b') as (a: number) => string

/* No. For a function to be assignable to another function, each of its parameters should be >: the other function's parameters, and its return type should be <: the other function's return type. number is unrelated to string, so it's not >: string, implying that the function type isn't assignable. */

// k. (a: number | string) => string and (a: string) => string

let k: (a: string) => string
k = ((a: number | string) => 'b') as (a: number | string) => string

/* Yes. For a function to be assignable to another function, each of its parameters should be >: the other function's parameters, and its return type should be <: the other function's return type. number | string is a supertype of string, and string is <: string, so the function type is assignable. */
```