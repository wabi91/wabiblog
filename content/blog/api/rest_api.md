---
title: "REST API 디자인 기본 컨샙"
date: 2020-11-27 17:11:46
category: api
thumbnail: { thumbnailSrc }
draft: false
---

## 디자인 컨샙

- URI 는 정보의 자원을 표현해야한다.
- 자원에 대한 행위는 HTTP Method 내에 표현한다. (GET, POST, PUT, DELETE)

- 소문자를 사용한다.
- 언더바 대신해서 하이픈을 사용한다.
- 마지막에 `/`를 포함하지 않는다.
- HTTP Method를 포함하지 않는다.
- 파일 확장자는 URI에 포함시키지 않는다.
- 가급적 자원을 나타내는 명사를 사용하되, 중복된 자원 등 컨트롤되어진 자원을 의미하는 경우 예외적으로 동사를 허용한다.

```
# BAD
v1/posts/duplicating

# GOOD
v1/posts/duplicate
```

### Bad API Design

```
/getAllDogs
/scheduleWalkOnThePark
/getDowOwener
```

"명사는 좋고, 동사는 나쁘다."

> NOUNS ARE GOOD, VERBS ARE BAD

### Good API Design
```
GET (all) -> /dogs
GET -> /dogs/${id}
POST -> /dogs
PUT -> /dogs/${id}
DELETE -> /dogs/${id}

GET -> /dogs/wabi
POST -> /dogs/wabi (error)
PUT -> /dogs/wabi (if Kung exists update, if not error)
DELETE -> /dogs/wabi

GET -> /dogs/search?color=brown

GET /owners/wabi/dogs -> List of all the dogs that Wabi has.
POST /owners/wabi/dogs -> Create a dog for Wabi
PUT /owners/wabi/dogs -> Update all of Wabi's dogs
DELETE /owners/wabi/dogs -> Delete!

GET -> /dogs/search?color=brown
GET -> /owners/wabi/dogs/search?color=brown

/v1/dogs/search?color=brown
/v2/dogs/search?color=brown
```