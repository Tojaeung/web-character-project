# 목차

- [개발환경](#개발환경)
- [사용기술](#사용기술)
- [아키텍쳐](#아키텍쳐)
- [폴더구조](#폴더구조)
- [ERD다이어그램](#ERD-다이어그램)
- [핵심기능](#핵심기능)
- [프로젝트를 통해 느낀점](#프로젝트를-통해-느낀점)

# 그림러들

그림 그리기를 좋아하는 사람들을 위한 웹 커뮤니티 프로젝트  
그림러들 바로가기 [https://grimlerdl.net](https://grimlerdl.net)

**※ 아래의 계정으로 로그인하면 여러기능들을 빠르게 확인할 수 있습니다.**

아이디: example@email.com

비밀번호: example1027@

# 개발환경

- Win10
- VSCode
- Github

# 사용기술

## 프론트엔드

- Typescript
- React
- Redux-Toolkit
- Redux-Persist
- Styled-Components

## 백엔드

- Typescript
- Express
- Typeorm(ORM)
- Socket.io
- Express-session

## 데이터베이스

- PostgreSQL
- Redis

## 인프라

- AWS EC2
- AWS S3
- AWS Route53
- AWS RDS
- AWS ElastiCache

## CI/CD

- Github-Actions

# 아키텍쳐

<img width='80%' src="https://user-images.githubusercontent.com/90431864/170942013-12cdb44a-a64a-4238-b0e5-2c6d11802503.svg" />

# 폴더구조

## 프론트 폴더구조

<img width='50%' src="https://user-images.githubusercontent.com/90431864/170942039-3496d6fb-c5a5-40e5-b70c-17cb27b3a6ac.svg" />

## 백엔드 폴더구조

<img width='50%' src="https://user-images.githubusercontent.com/90431864/170942054-31d6124e-f76f-4e82-9974-51b4b391e179.svg" />

# ERD 다이어그램

**※ 클릭하고 확대하면 자세히 확인할 수 있습니다.**

<img width='100%' src="https://user-images.githubusercontent.com/90431864/170942151-6972ce30-3f17-4c15-b99a-4cfd156e53cf.png" />

# 핵심기능

1. (게시물과 게시판 동시에 사용)[##-게시물과-게시판-동시에-사용]

## 1.게시물과 게시판 동시에 사용

   <img width='100%' src="https://user-images.githubusercontent.com/90431864/171014682-20b61094-2d1f-4db2-8e5c-ba7340f0a363.gif" />  
   
처음에는, 게시물을 클릭하면 게시물만 나오고 목록버튼을 누르면 다시 게시판으로 돌아가고 다시 게시물을 열람할 수 있게되는 방법을 사용하였습니다. (게시물, 게시판 분리)

위의 방법을 코드로 구현하는것은 간단했습니다.

그러나, 다른 커뮤니티 사이트를 관찰한 결과, 게시물과 게시판을 동시에 사용자에게 제공하는 방법을 사용하고 있었습니다. (아닌곳도 있었다..)

게시물과 게시판이 동시에 제공된다면 사용자는 굳이 목록버튼을 누르지 않고 다른 게시글을 열람할 수 있기 때문에 사용자 경험이 더 좋다고 생각하였고 적용하기로 결정하였습니다.

하지만, 코드로 구현하는것은 간단하지 않았습니다.

하나의 url에 게시물, 게시판, 페이지네이션까지 정보를 제공해야됐기 때문입니다.

여러 시행착오를 거친끝에.. react-router-dom라이브러리가 제공하는 useSearchParams커스텀훅(url쿼리스트링 파싱)을 사용해서 해결하였습니다.

페이지를 이동하는 순간 useState값이 변경되도록 [useSearchParams커스텀훅을 이용해서 파싱된 url쿼리스트링을 useState의 초기값으로 할당해서](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/client/src/pages/board/%5Bboard%5D/index.tsx#L27-L31) 문제를 해결하였습니다.

## 2.채팅기능

<img width='100%' src="https://user-images.githubusercontent.com/90431864/171022514-948d8df9-30a5-4c07-a8f2-2393fc45f675.gif" />

redis와 socket.io을 이용해서 다른 유저와 1:1채팅기능을 구현하였습니다.

텍스트메세지와 이미지메세지를 보낼 수 있습니다.

hooks폴더의 [useSocketSetup.ts](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/client/src/hooks/useSocketSetup.ts#L26)파일 커스텀 훅이 새로고침 또는 메세지창을 오픈할때마다 유저의 대화정보를 초기화합니다. ([App.ts파일에서 선언](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/client/src/App.tsx#L31))

 <img width='100%' src="https://user-images.githubusercontent.com/90431864/171028162-8f7e9c74-0ca1-46f8-a267-0b6ec8dc2ba1.png" />

상대방이 채팅방에서 퇴장했을때의 상황을 구현하는부분이 코드가 조금 복잡하고 여러 고민과 시행착오가 있었기 때문에 간단하게 설명하도록 하겠습니다.

[내가 채팅방에서 퇴장했을때](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/server/src/socketio/chat/deleteMessage.ts#L8) 상대방에게 내가 채팅방에서 퇴장했다는 사실을 알리기위해 [end타입을 가진 message객체](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/client/src/components/modals/chat/chatting/ChatBody.tsx#L9) 를 상대방에게 보냅니다.

이 메세지 객체를 받은 상대방은 더이상 메세지를 입력할 수 없습니다.

[상대방의 대화정보에는 end타입을 가진 메세지 객체가 존재하기 때문에 상대방이 채팅방에서 퇴장하더라도 나에게 end타입 메세지 객체를 보내지 않고 나와의 대화정보가 모두 삭제되면서 채팅은 종료됩니다.](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/server/src/socketio/chat/deleteMessage.ts#L57)

## 3.이미지 s3저장 및 최적화

그림러들(프로젝트 이름)에 올라오는 모든 이미지파일들은 s3에 저장되고 사용자의 요청에 맞게 사용되어집니다.

이것은 어려운 일이 아니었습니다.

다른 웹 서비스에서 어떻게 관리하는지 모르겠지만..

> '만약 사용자가 이미지가 포함된 게시글을 삭제할때 또는 그림을 삭제할때 s3에 저장된 해당 이미지 파일도 똑같이 삭제되어야 하지 않을까?'

라는 고민을 하였습니다. 게다가, s3는 용량이 커질수록 가격도 상승하기 때문에 최적화 로직을 설계하는것이 합리적이라고 판단하였습니다.

[s3객체를 삭제 로직을 유틸함수로](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/server/src/utils/s3.utils.ts#L5) 만들어서 s3를 최적화를 간소화 하였습니다.

어려움을 겪었던 부분은 게시물에 업로드되는 이미지였습니다.

게시물에 여러 이미지가 업로드 될 수 있습니다. 여러 이미지를 한번에 업로드하고 그 게시물을 삭제할때 업로드 됐던 s3객체들을 골라서 삭제하여 최적화를 해줘야합니다.

이 과제에 직면한 저는 [board스키마에 imageKey라는 테이블](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/server/src/entities/board/imageKey.entity.ts#L16)을 생성하여 어떤 사용자가 어떤 이미지를 어느 게시물에 업로드 했는지 정보를 저장하였습니다.

그 결과, 게시물을 삭제할때 그 게시물과 1:N관계에 있는 imageKey테이블의 이미지 정보들을 골라서 삭제할 수 있게 해서 s3최적화를 완성하게 되었습니다.

## 4.알림기능

   <img width='100%' src="https://user-images.githubusercontent.com/90431864/171092733-6c49f7e6-b716-47d2-9bd9-5639c547ad8a.gif" />

redis와 socket.io를 사용한 채팅기능과는 달리 알림기능은 DB와 socket.io를 사용하였습니다.

이 알림기능은 사용자가 자기의 게시물이 아닌 게시물에 댓글을 남기거나 좋아요 또는 싫어요를 눌렀을때 게시물을 올린 유저에게 알림이 갑니다.

[알림은 최신 20개만 저장이 되고 나머지는 사용자의 알림이 초기화될때 자동으로 삭제가 되도록 구현하였습니다.](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/server/src/socketio/initUser.ts#L27-L43)

추가적으로, 채팅기능에도 자체적으로 알림 기능을 가지고 있습니다.

아래의 사진을 보시면 상대방에게 채팅 메세지를 받았기 때문에 채팅 아이콘에 알림이 생겼습니다.

또한, 오른쪽 상단을 보시면 프로필사진 위에 빨간점이 표시되어 있습니다.

[이것은 채팅 알림 또는 일반 알림(위에서 언급한) 중 1개라도 존재할 시, 표시됩니다.](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/client/src/layouts/Header/index.tsx#L45-L50)

그래서, 사용자는 프로필 위의 빨간점을 보고 채팅 알림 또는 일반 알림이 왔다고 인지할 수 있게 됩니다.

   <img width='50%' src="https://user-images.githubusercontent.com/90431864/171133267-c9dadc39-c0b4-4858-be2d-adc08ce8e74a.png" />

## 5.관리자 권한

관리자가 현장에서 관리할 수 있도록 관리자만이 가질 수 있는 권한을 설정하였습니다.

먼저, 관리자는 user테이블의 role칼럼값이 admin값을 가져야 관리자 권한을 사용할 수 있습니다.

관리자가 아닌 일반 사용자는 다른 사용자가 올린 게시글,그림, 댓글을 수정, 제거 할 수 없습니다.

그러나, 관리자는 다른 사용자가 올린 게시글이나 댓글들을 수정, 삭제할 수 있습니다.

아래의 사진을 보시면 관리자가 일반 사용자(사진에서는 tojaeung2)의 그림, 댓글을 수정, 삭제할 수 있는 버튼이 표시되어 있습니다.

   <img width='50%' src="https://user-images.githubusercontent.com/90431864/171096901-1514ca99-32b2-4f3d-b62a-b990a49d75ac.png" />

또한, 관리자는 불량유저에게 제재를 가하는 패널티 조치를 취할 수 있게 하였습니다.

패널티 조치를 받은 사용자는 [관리자가 정하는 일정기간 동안 서비스 이용에 제한을 받습니다.](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/server/src/controllers/user.controller.ts#L460-L489) (ex. 게시물, 그림, 좋아요, 싫어요 생성)

그리고, 이용을 제한당한 서비스에 접근할때마다 [penalty미들웨어](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/server/src/middlewares/penalty.middleware.ts#L9)를 통과하게 됩니다.

여기서 불량유저(패널티 조치를 받은 사용자)는 제재조치 기간이 만료되었는지 확인받고 만료되었다면 정상유저로 복귀가 됩니다.

   <img width='40%' src="https://user-images.githubusercontent.com/90431864/171098938-1c7e3009-f152-4d39-8d33-980075e0d7c5.png" />
   <img width='50%' src="https://user-images.githubusercontent.com/90431864/171098943-cd765739-07b1-48ec-a8cd-3aa30f9f4fab.png" />

## 6.커서페이징 무한스크롤

사용자의 프로필에는 자신이 그린 그림을 소개, 평가받기 위해 그림을 추가할 수 있습니다. (단, 예시는 사진파일로 대체)

사용자가 업로드한 그림정보를 모두 불러올 필요는 없기때문에 커서페이징을 활용한 무한스크롤을 구현하였습니다.

커서페이징을 구현하기 위해 [useObserver.ts라는 커스텀훅](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/client/src/hooks/useObserver.ts#L3)을 만들어서 사용하였습니다.

그리고,[프론트에서 cursor의 변수가 null값을 받을때](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/client/src/pages/profile/%5Bid%5D/Drawing.tsx#L18-L33)

더이상, [서버로 부터 그림정보를 받아오지 않게 하였습니다.](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/server/src/controllers/drawing.controller.ts#L68-L74)

즉, 서버로부터 null값을 받으면 마지막 커서 페이징이 된다는것으로 이해할 수 있습니다.

   <img width='100%' src="https://user-images.githubusercontent.com/90431864/171117314-3a025812-73e1-4a61-84ea-be17ce15c174.gif" />

## 7.신고기능

사용자들이 직접 커뮤니티 생태계를 자정작용 하도록 하기위해서 [신고기능](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/server/src/controllers/user.controller.ts#L372)을 만들었습니다.

신고를 한 내용은 관리자의 Slack으로 그 신고 내용이 전송됩니다.

그 뿐만아니라, 관리자가 신고에 발빠르게 조치할 수 있도록 신고발생 지점(URL)정보를 포함하여 Slack 메세지로 전송하게 구현하였습니다.

아래의 .gif파일에서 확인 할 수 있듯이, Slack 메세지의 확인하러가기 링크가 바로 그것입니다.

   <img width='100%' src="https://user-images.githubusercontent.com/90431864/171127501-de72ef28-6b40-4f9d-bc38-e2cb2c1f10f3.gif" />

## 8.CI/CD

CI/CD환경을 구축하기위해 Github-actions를 사용하였습니다.

저는 EC2 프리티어를 사용하는데 리엑트 빌드시, 메모리 초과로 오류가 발생하였습니다.

CI/CD환경을 구축하는게 핵심기능도 아니고 잘한것도 아니지만...

EC2 프리티어상에서, 리엑트 빌드가 메모리 초과로 오류가 나는 문제를

나름의 고민과 시행착오를 통해 해결하였다고 생각하여 소개하게 되었습니다.

처음에는, 로컬환경에서 리엑트를 빌드하고 그 빌드한것을 scp명령어를 사용해서 직접 EC2에 복사하는 방법을 사용하였습니다.

그러나, 이 방법은 리엑트 빌드 폴더를 EC2로 수동으로 이동시키는 작업이기 때문에 CI/CD의 자동화 목적에 부합하지 않았습니다.

결과적으로, 리엑트를 빌드하는 문제는 Github-actions가 명령을 수행할때 사용하는 Docker 컨테이너를 이용하였습니다.

[Docker 컨테이너에 Node환경을 구축하고 리엑트를 빌드하는 방법을 사용하여 문제를 해결했습니다.](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/.github/workflows/deploy-main.yml#L12-L28)

scp수동명령 문제는, 구글링을 통해 Github-actions의 액션 중에 [scp명령 액션이 존재한다는것을 알게되어서 그것을 적용하여](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/.github/workflows/deploy-main.yml#L30-L40) 문제를 해결하였습니다.

# 프로젝트를 통해 느낀점

**1. 테스트코드 작성**  
 처음 테스트코드를 접했을때에는 왜 테스트코드를 사용해야하는건지 몰랐습니다. 그래서 이 프로젝트에 도입을 하지 않았습니다. 프로젝트가 어느정도 커지면서 하나를 수정하면 여러곳을 수정해야하는 상황이 많이 발생하였습니다. 하지만, 모든 부분을 에러없이 수정해야지만 비로소 프로젝트가 잘 작동하는지 확인을 할 수 있었습니다. 그래서, 내가 수정한 코드가 잘 작동할까? 하는 걱정을 하면서 나머지를 수정하고 있는 저의 모습을 발견하였습니다. 문득, 유닛테스트로 한 부분을 수정한 후 바로 테스트해서 그 부분이 잘 작동하는지 확인할 수 있다면 걱정이 줄어들고 자신감을 가지고 수정해 나갈수 있겠구나 라고 생각하였습니다. 또한, 전체 테스트를 진행해서 에러표시가 안되는 에러(ex. API 경로 불일치 등)때문에 개발자가 직접 확인 하기전까지 알 수 없는 에러들도 찾아 낼 수 있다는 장점을 가지고 있다고 이 프로젝트를 하면서 느꼈습니다. 물론, 저의 일천한 경험으로 느낀 테스트코드의 장점이지만 이외에도 제가 알지 못하는 테스트코드의 장점을 100% 활용 해보고 싶다는 생각을 하였습니다.

**2. UI라이브러리 활용**  
 저는 프로젝트에 styled-components 라이브러리를 사용해서 UI를 디자인 하였습니다.(많이 허졉...) 프로젝트를 돌아보면, UI디자인으로 시간을 많이 소비한거 같습니다.(나는 백엔드인데...) 지난 커밋을 확인해보면 알 수 있듯이 styled-component에 CSS BEM방법론을 합쳐서 UI를 디자인 하기도 했습니다. 결국, 가독성 떨어지고 장점을 느낄 수 없었기 때문에 styled-components에 Container 컴포넌트만 사용해서 HTML의 className을 사용하는 방법도 사용하였습니다. 그러나, 중복되는 className에 혼란을 겪다가 다시 지금 styled-components만을 사용하는 방식으로 돌아왔습니다. 문제는 이렇게 UI 디자인 방법론이 변경될때마다 많은 시간을 투자해서 수정해야 한다는것이었습니다. 또한, 반응형을 적용하는것도 적지않은 노력이 들어갔습니다. 앞에서 언급한 경험들을 겪고 UI라이브러리 장점을 이해한 이후로는, 이것을 사용하지 않을 이유가 없다는 생각을 하였습니다. 반응형, 디자인이 미리 적용 되어있는 컴포넌트를 가져와서 사용하는것이 편리하다고 느껴졌습니다. UI라이브러리들만의 특성을 이해하는데 진입장벽이 있지만 앞으로 UI라이브러리를 공부해서 잘 활용해야겠다는 생각을 하였습니다.

**3. 리엑트 렌더링 최적화**  
<img width='100%' src="https://user-images.githubusercontent.com/90431864/171313342-ffbd74db-bc93-4bf7-9f20-770a7a1c2016.png" />
위의 사진은 그림러들 프로젝트의 홈페이지입니다. 이곳에 콘솔을 찍어서 불필요한 렌더링이 몇번 되는지 확인하였습니다. 위의 그림에서 확인할 수 있다시피, 6번 불필요한 렌더링이 발생하였습니다. 이 프로젝트를 하기전에 리엑트를 공부하면서 렌더링에 대한 원리와 최적화에 대해서 공부하였습니다. 그러나, 저는 백엔드 개발자를 지망했고 빠르게 개발해서 취업을 해야한다는 생각이 있었기 때문에(또한, 작은 프로젝트인데 렌더링 최적화를 해봐야 성능차이가 얼마나 나겠어..) 렌더링 최적화를 신경쓰지 않고 개발을 하였습니다. 프로젝트를 마친 이후, 위의 사진과 같이 불필요하게 렌더링이 6번되는걸 확인하니 마음이 좋지 않았습니다. 렌더링 최적화를 다시 공부해서 앞으로 프로젝트에 기본적으로 적용할 수 있게끔 노력을 해야한다고 생각하였습니다.
