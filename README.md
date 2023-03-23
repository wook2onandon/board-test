## 🔗 Getting Started

1.server.js를 node server.js로 실행.[http://localhost:3000](http://localhost:3000)

2.소스코드를 yarn dev

3.[http://localhost:3001](http://localhost:3001)

## 📌 Summary

next.js기반의 게시판을 구현했습니다. 기본적인 게시판의 기능인 글쓰기와 수정, 삭제기능이있으며 글을 상세히 볼 수 있는 페이지가 있습니다. 또한 댓글기능과 대댓글기능, 댓글 수정 및 삭제 기능이 있습니다.

페이지네이션의 경우 페이지 당 표시할 게시물 수에 따라 게시판 하단에 번호로 표시가 됩니다.

# \*주요 기능

1.게시글

- 쓰기
- 수정
- 삭제

  2.댓글

- 쓰기
- 수정
- 삭제
- 대댓글

  3.페이지네이션

- 페이지 당 표시할 게시물 수 선택기능
- 페이지 당 표시할 게시물 수 선택기능에 따른 페이지 수 표시 및 이동기능

## 🤔 Background

최근 next.js를 공부하고 있던와중 여러 서비스를 개발해보고 싶었는데 게시판을 만들 기회가 생겨 다양한 공부를 해볼 수 있었습니다.

## 🔍 Meaning

next.js와 typescript를 완벽하게 다루지는 못하다보니 중간중간 막히는 부분이있었습니다. 특히 api호출 시점이나 routing관련된 부분이 조금은 낯설었지만 구글링을 통해 풀어나갔습니다. 또한 @emotion/styled를 이번기회에 처음 접하게 되었는데 styled-component와 비슷한 사용방식이라 큰 불편함은 없었습니다. 평소작업할 때 css module을 주로 사용해왔는데 다른방식의 css-in-js를 사용해보고 공부할 기회가 되서 좋았던 점 중에 하나였습니다.

yarn berry 또한 이번기회에 처음 접하게되었는데 처음에는 사용방법이 낯설고 이해가 안되는부분이 있어 사용이 어려웠지만 node-module없이 사용이 가능한 점이 정말 큰 장점이라고 생각이 들었습니다.

api명세가 없어서 api를 호출하는 부분에서 조금 어려웠지만 기본적인 Restful api의 방식과 postman을 사용하여 api호출을 test해서 사용하는 방식으로 해결했습니다.

게시글과 댓글의 고유한 id를 부여하기 위해 uuid library를 사용하였습니다. uuid를 사용함에 있어 typescript버전을 설치해서 사용하는데 오류가 생겨 이유를 찾아보았지만 끝내 찾지는 못했습니다. 그래서 기존의 react버전의 uuid를 설치한 뒤 types폴더를 생성한뒤 index.d.ts를 만들어 react버전의 uuid를 사용하였습니다.

🔨 Technology Stack(s)

- next.js
- typescript
- yarn berry
- @emotion/styled
