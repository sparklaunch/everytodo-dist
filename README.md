# ✔️ EveryTodo(에브리투두)

## 👋 프로젝트 소개

<b> every todo는 할 일을 체크하는 투두리스트 프로젝트입니다. </b>

<br>

## 🎨 와이어프레임

![](https://velog.velcdn.com/images/marksen/post/71b48fb5-32f9-4c64-9214-b34e824a71ff/image.png)

<br>

## 👩🏻‍💻 팀원 🧑🏻‍💻

| 박세은                   | 김진욱            | 이요한                       | 정현진    |
| ------------------------ | ----------------- | ---------------------------- | --------- |
| 상세TODO 조회 / 댓글CRUD | 로그인 / 회원가입 | TODO 조회 페이지 / TODO CRUD | TODO CRUD |
| Front-end                | Front-end         | Front-end                    | Front-end |

<br>

## 🤟🏻 주요 기능

### `로그인 / 회원가입`

- 회원가입 기능
- 로그인 기능
- 로그아웃 기능
  - 로그아웃 시, 사용자 token 삭제

### `메인 페이지`

- TODO 리스트 조회
- TODO 삭제 기능
- TODO 등록, 수정, 상세페이지 화면 이동 기능

### `TODO 등록 페이지`

- TODO 등록 기능

### `TODO 상세 페이지`

- TODO 상세 데이터 조회
- TODO 댓글 CRUD 기능
- TODO 삭제 가능
  - 상세 조회한 TODO 삭제 시, 해당 TODO의 댓글들도 삭제
- TODO 수정페이지 이동 기능

### `TODO 수정 페이지`

- TODO 수정 기능

### `DB 연동 및 api 설계`

- json-server 이용

<br>

## 🤟🏻 적용 기능

- redux-toolkit
- redux-thunk
- axios
- json-server

<br>

## 🤟🏻 프로젝트 시작하기

### clone repository

```shell
$ git clone https://github.com/marksenee/everytodo.git
```

### install

```shell
$ yarn install
```

### react start

```shell
$ yarn start
```
