---
title: "TS, 비동기 프로그래밍 동시성과 병렬성 - 2"
date: 2020-11-15 01:11:12
category: typescript
thumbnail: { thumbnailSrc }
draft: false
---

## 비동기 스트림

### 이벤트 방출기
채널로 이벤트를 방출하고 채널에서 발생하는 이벤트를 리스닝하는 API를 제공
```ts
interface Emitter {
  // 이벤트 방출
  emit(channel: string, value: unknown): void
  // 이벤트가 방출되었을 때 어떤 작업을 수행
  on(channel: string, f: (value: unknown) => void): void
}
```

#### Redis 라이브러리 안전하게 사용하는 예시
```ts
type Events = {
  ready: void;
  error: Error;
  reconnecting: { attempt: number, delay: number };
};

type RedisClient = {
  on<E extends keyof Events>(
    event: E,
    f: (arg: Events[E]) => void
  ): void;
  emit<E extends keyof Events>(
    event: E,
    arg: Events[E]
  ): void;
};
```
이벤트 이름과 인수를 하나의 형태(`type Events`)로 정의하고 리스너와 방출기를 생성하는데 쓰인 매핑하는 패턴은 실무의 타입스크립트 코드에서 자주 볼 수 있다.<br/>
이 방법은 간결하고 매우 안전해서 인수 타입을 잘못 사용하거나 인수 전달을 빼먹는 실수를 방지할 수 있고 코드 편집기가 리스닝할 수 있는 이벤트와 이벤트의 콜벡 매개변수 타입을 제시하기 때문에 다른 개발자에게 코드가 하는 일을 설명하는 문서화 역할이 가능하다.

## 타입 안전 멀티스레딩

### 웹 워커?

> 웹 워커는 브라우저에서 멀티스레딩 작업을 폭넓게 지원하는 기능이다.

웹 워커는 브라우저에서 병렬 싱행을 실현할 수 있어서 Promise, setTimeout 같은 비동기 API는 동시성을 제공하지만 워커는 코드를 다른 CPU 스레드에서 병렬 실행하도록 해준다.<br/>
예를들어, 네트워크 요청을 전송하거나 파일시스템에 데이터를 기록하는 등의 작업이 가능하다.