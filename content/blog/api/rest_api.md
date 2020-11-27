---
title: "REST API 디자인 컨샙"
date: 2020-11-27 17:11:46
category: database
thumbnail: { thumbnailSrc }
draft: false
---

## 디자인 컨샙 예시

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