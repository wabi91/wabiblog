---
title: "제너릭타입을 사용한 함수 코드 예제"
date: 2020-12-05 19:12:54
category: typescript
thumbnail: { thumbnailSrc }
draft: false
---

## 언제 써볼까? - 예시 들어보기

함수에 넘기는 인자값에 따라서 반환하는 값이 다른 경우로 아래 3가지를 생각해 보았다.
- boolean 값 true, false 에 따라서 반환 타입이 다른 경우
- object 값의 특정 키가 있을 경우, 없을 경우에 따라서 반환 타입이 다른 경우
- 특정 매개변수 타입 설정이 optional 이지 않고, 인자값으로 꼭 null 또는 타입으로 정의한 object이어야 되며, 인자값으로 null일때와 타입으로 정의한 object로 들어오는 것에 따라서 각 반환 타입이 다른 경우

### 조건

- any 쓰지 말 것
- strict 옵션 true, 활성화
- 제너릭 함수 적극 활용
- 함수를 쓰는 시점에 인자값의 정의를 내리면서 반환타입이 바뀌는 것을 볼 수 있어야 한다
- 반환 값을 유니온 타입정의 ( | ) 처리로 정의하는 것이 아닌 해당 인자값에따라 정확히 리턴타입이 변하는 함수를 만들어야 한다.

## boolean 타입, True|False 에 따른 반환 값 정의

```ts
type Config = {
  id: string;
  password: string;
}

type TrueTypeConfig = Config & {
  emailId: number;
  paymentId: number;
}

type FalseTypeConfig = Config & {
  documentId: number;
  buyerId: number;
}

const getRandomNumber = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min) + min);
};
const getRandomData = (data: string) => {
  return `${data}_${getRandomNumber(1, 10)}`;
};

function getTestConfig<T extends boolean>(type: T, id: string, password: string): T extends true ? TrueTypeConfig : FalseTypeConfig;
function getTestConfig(type: boolean, id: string, password: string): TrueTypeConfig | FalseTypeConfig {
  return {
    id: getRandomData(id),
    password: getRandomData(password),
    ...(type ?
      {
        emailId: getRandomNumber(1, 100),
        paymentId: getRandomNumber(1, 100)
      } : {
        documentId: getRandomNumber(1, 100),
        buyerId: getRandomNumber(1, 100)
      }
    )
  };
}

getTestConfig(true, 'id', 'psw'); // TrueTypeConfig
getTestConfig(false, 'id', 'psw'); // FalseTypeConfig
getTestConfig(null, 'id', 'psw'); // TS Error 
```

boolean 에 상속되는 `제너릭타입 T` 를 만들고, `매개변수 type` 에 T를 할당 (true | false) 반환 값으로는 type에 넘기는 인자값에 따라서 T 가 boolean 보다 더 작은 `true에 할당이되어진 것인지 확인`을 통해 T가 true인지 분기처리, true일 경우 `TrueTypeConfig` false 일 경우 `FalseTypeConfig` 로 정의

함수를 사용하면서 인자값을 적는 즉시 반환값이 true|false에 따라 바뀌는 것이 확인 가능. 또한 type 인자값 자리에 boolean만 허용된다.

## object 값의 특정 키가 있을 경우, 없을 경우 유무에 따라서 반환 타입이 다른 경우

```ts
type CodeOption = {
  scope: string;
  state: string;
};
type TokenOption = {
  scope: string;
  successRedirect: string;
  failureRedirect: string;
};

type GetAuthOptionArg = {
  scope: string;
  url: string;
  code: string;
  state?: string;
};

function getAuthOption<T>({
  scope, url, code, state,
}: { scope: string; url: string; code: string; state?: T }): T extends string ? CodeOption : TokenOption;
function getAuthOption({
  scope, url, code, state,
}: GetAuthOptionArg): CodeOption | TokenOption {
  const successRedirect = `${url}?code=${code}`;
  const failureRedirect = `${url}/fail`;
  if (typeof state == 'string') {
    return {
      scope,
      state,
    };
  }
  return ({
    scope,
    successRedirect,
    failureRedirect,
  });
}

getAuthOption({ // TokenOption
  scope: '1',
  url: 'www.naver.com',
  code: 't',
  // state: 'sadf'
});
getAuthOption({ // CodeOption
  scope: '1',
  url: 'www.naver.com',
  code: 't2',
  state: 'sadf'
});
```

`제너릭 타입 T`를 만들고 매개변수 object 내에 state 값으로 분기는 함수를 나타내기위해 state 값에 `optional T`로 타입정의 그리고 반환 값에는 해당 `T가 string으로 상속이되어지는지 확인`하는 분기처리 추가로 string에 상속되어질 경우 `CodeOption` 아닐 경우는 `TokenOption`으로 정의한다.

따라서 state값 유무에 따라서 반환값이 바뀌게 된다.

## 매개변수값이 null 또는 특정 타입정의된 object로 정의되고 전달받은 인자값에 따라 반환 타입이 다른 경우

```ts
type User = {
  id: number;
  data: string[];
};

type IsResWithUnknown = {
  user: null;
  job: string;
};

type IsNotResWithNull = {
  user: User;
  job: string;
};

function getRes<T extends null>(job: string, user: T): IsResWithUnknown;
function getRes<T extends User>(job: string, user: T): IsNotResWithNull;
function getRes(job: string, user: User) {
  return (
    user ? {
      user: {
        id: 1,
        data: ['1', '2']
      },
      job: `${job}_${user.data.join(', ')}`
    } : {
        user: null,
        job,
      }
  )
}
getRes('전사', null); // IsResWithUnknown
getRes('전사', 'null'); // TS Error
getRes('전사', { // IsNotResWithNull
  id: 1,
  data: ['1', '2']
});
```

strict true 옵션으로 이 경우, 위 2가지 경우처럼 하나로 묶어서 분기처리가 어렵다. 그래서 `T extends null` 그리고 `T extends User`의 경우로 나뉘어서 return 값을 각 정의하여 함수를 만들면 위 예시코드처럼 2번째 인자값으로 null 또는 정의된 타입 object만 들어오게 막으면서도 해당 값에 따라 반환되는 타입이 다르도록 만들 수 있다.