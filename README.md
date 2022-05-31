# 그림러들

그림 그리기를 좋아하는 사람들을 위한 웹 커뮤니티 프로젝트  
그림러들 바로가기 [https://grimlerdl.com](https://grimlerdl.com)

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

<img width='100%' src="https://user-images.githubusercontent.com/90431864/170942151-6972ce30-3f17-4c15-b99a-4cfd156e53cf.png" />

# 핵심기능

1. 게시물과 게시판 동시에 사용
   <img width='100%' src="https://user-images.githubusercontent.com/90431864/171014682-20b61094-2d1f-4db2-8e5c-ba7340f0a363.gif" />
   처음에는, 게시물을 클릭하면 게시물만 나오고 목록버튼을 누르면 다시 게시판으로 돌아가고 다시 게시물을 열람할 수 있게되는 방법을 사용하였습니다. (게시물, 게시판 분리)  
   위의 방법을 코드로 구현하는것은 간단했습니다.  
   그러나, 다른 커뮤니티 사이트를 관찰한 결과, 게시물과 게시판을 동시에 사용자에게 제공하는 방법을 사용하고 있었습니다. (아닌곳도 있었다..)  
   게시물과 게시판이 동시에 제공된다면 사용자는 굳이 목록버튼을 누르지 않고 다른 게시글을 열람할 수 있기 때문에 사용자 경험이 더 좋다고 생각하였고 적용하기로 결정하였습니다.  
   하지만, 코드로 구현하는것은 간단하지 않았습니다.  
   하나의 url에 게시물, 게시판, 페이지네이션까지 정보를 제공해야됐기 때문입니다.  
   여러 시행착오를 거친끝에.. react-router-dom라이브러리가 제공하는 useSearchParams커스텀훅(url쿼리스트링 파싱)을 사용해서 해결하였습니다.  
   [페이지를 이동하는 순간 useState값이 변경되도록 useSearchParams커스텀훅을 이용해서 파싱된 url쿼리스트링을 useState의 기본값으로 할당하였습니다.](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/client/src/pages/board/%5Bboard%5D/index.tsx#L27-L31)
2. 채팅기능  
    <img width='100%' src="https://user-images.githubusercontent.com/90431864/171022514-948d8df9-30a5-4c07-a8f2-2393fc45f675.gif" />
   redis와 socket.io을 이용해서 다른 유저와 1:1채팅기능을 구현하였습니다.  
    텍스트메세지와 이미지메세지를 보낼 수 있습니다.  
    hooks폴더의 [useSocketSetup.ts](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/client/src/hooks/useSocketSetup.ts#L26)파일 커스텀 훅이 새로고침 또는 메세지창을 오픈할때마다 유저의 대화정보를 초기화합니다. ([App.ts파일에서 선언](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/client/src/App.tsx#L31))  
   <img width='100%' src="https://user-images.githubusercontent.com/90431864/171028162-8f7e9c74-0ca1-46f8-a267-0b6ec8dc2ba1.png" />
   상대방이 채팅방에서 퇴장했을때의 상황을 구현하는부분이 코드가 조금 복잡하고 여러 고민과 시행착오가 있었기 때문에 간단하게 설명하도록 하겠습니다.  
   [내가 채팅방에서 퇴장했을때](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/server/src/socketio/chat/deleteMessage.ts#L8) 상대방에게 내가 채팅방에서 퇴장했다는 사실을 알리기위해 [end타입을 가진 message객체](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/client/src/components/modals/chat/chatting/ChatBody.tsx#L9) 를 상대방에게 보냅니다.  
    이 메세지 객체를 받은 상대방은 더이상 메세지를 입력할 수 없습니다.  
    [상대방의 대화정보에는 end타입을 가진 메세지 객체가 존재하기 때문에 상대방이 채팅방에서 퇴장하더라도 나에게 end타입 메세지 객체를 보내지 않고 나와의 대화정보가 모두 삭제되면서 채팅은 종료됩니다.](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/server/src/socketio/chat/deleteMessage.ts#L57)

3. 이미지 s3저장 및 최적화  
   그림러들(프로젝트 이름)에 올라오는 모든 이미지파일들은 s3에 저장되고 사용자의 요청에 맞게 사용되어집니다.  
   이것은 어려운 일이 아니었습니다.  
   다른 웹 서비스에서 어떻게 관리하는지 모르겠지만..

   > '만약 사용자가 이미지가 포함된 게시글을 삭제할때 또는 그림을 삭제할때 s3에 저장된 해당 이미지 파일도 똑같이 삭제되어야 하지 않을까?'

   라는 고민을 하였습니다. 게다가, s3는 용량이 커질수록 가격도 상승하기 때문에 최적화 로직을 설계하는것이 합리적이라고 판단하였습니다.  
   [s3객체를 삭제 로직을 유틸함수로](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/server/src/utils/s3.utils.ts#L5) 만들어서 s3를 최적화 하는데 사용하였습니다.  
   게시물에 여러 이미지가 업로드 될 수 있습니다. 여러 이미지를 한번에 업로드하고 그 게시물을 삭제할때 업로드 됐던 s3객체들을 골라서 삭제하여 최적화를 해줘야합니다.  
   이 과제에 직면한 저는 [board스키마에 imageKey라는 테이블](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/server/src/entities/board/imageKey.entity.ts#L16)을 생성하여 어떤 사용자가 어떤 이미지를 어느 게시물에 업로드 했는지 정보를 저장하였습니다.  
   그 결과, 게시물을 삭제할때 s3최적화를 완성하게 되었습니다.

4. 알림기능  
   <img width='100%' src="https://user-images.githubusercontent.com/90431864/171092733-6c49f7e6-b716-47d2-9bd9-5639c547ad8a.gif" />
   redis와 socket.io를 사용한 채팅기능과는 달리 알림기능은 DB와 socket.io를 사용하였습니다.  
   이 알림기능은 사용자가 자기의 게시물이 아닌 게시물에 댓글을 남기거나 좋아요 또는 싫어요를 눌렀을때  
   게시물을 올린 유저에게 알림이 갑니다.  
   [알림은 최신 20개만 저장이 되고 나머지는 사용자의 알림이 초기화될때 자동으로 삭제가 되도록 구현하였습니다.](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/server/src/socketio/initUser.ts#L27-L43)

   추가적으로, 채팅기능에도 자체적으로 알림 기능을 가지고 있습니다.  
   아래의 사진을 보시면 상대방에게 채팅 메세지를 받았기 때문에 채팅 아이콘에 알림이 생겼습니다.  
   또한, 오른쪽 상단을 보시면 프로필사진 위에 빨간점이 표시되어 있습니다.  
   [이것은 채팅 알림 또는 일반 알림(위에서 언급한) 중 1개라도 존재할 시, 표시됩니다.](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/client/src/layouts/Header/index.tsx#L45-L50)  
   그래서, 사용자는 프로필 위의 빨간점을 보고 채팅 알림 또는 일반 알림이 왔다고 인지할 수 있게 구현하였습니다.
   <img width='50%' src="https://user-images.githubusercontent.com/90431864/171133267-c9dadc39-c0b4-4858-be2d-adc08ce8e74a.png" />

5. 관리자 권한  
   관리자가 현장에서 관리할 수 있도록 관리자만이 가질 수 있는 권한을 설정하였습니다.  
    먼저, 관리자는 user테이블의 role칼럼값이 admin값을 가져야 관리자 권한을 사용할 수 있습니다.  
   관리자가 아닌 일반 사용자는 다른 사용자가 올린 게시글,그림, 댓글을 수정, 제거 할 수 없습니다.  
   그러나, 관리자는 다른 사용자가 올린 게시글이나 댓글들을 삭제할 수 있습니다.  
    아래의 그림을 보시면 관리자가 일반 사용자(그림에서는 tojaeung2)의 그림, 댓글을 수정, 삭제할 수 있는 버튼이 표시되어 있습니다.  
   <img width='100%' src="https://user-images.githubusercontent.com/90431864/171096901-1514ca99-32b2-4f3d-b62a-b990a49d75ac.png" />
   또한, 관리자는 불량유저에게 제재를 가하는 패널티 조치를 취할 수 있게 하였습니다.  
   패널티 조치를 받은 사용자는 [관리자가 정하는 일정기간 동안 서비스 이용에 제한을 받습니다.](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/server/src/controllers/user.controller.ts#L460-L489) (ex. 게시물, 그림, 좋아요, 싫어요 생성)  
   그리고, 이용을 제한당한 서비스에 접근할때마다 [penalty미들웨어](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/server/src/middlewares/penalty.middleware.ts#L9)를 통과하게 됩니다.  
   여기서 불량유저(패널티 조치를 받은 사용자)는 제재조치 기간이 만료되었는지 확인하고 만료되었다면 정상유저로 복귀가 됩니다.  
   <img width='40%' src="https://user-images.githubusercontent.com/90431864/171098938-1c7e3009-f152-4d39-8d33-980075e0d7c5.png" />
   <img width='50%' src="https://user-images.githubusercontent.com/90431864/171098943-cd765739-07b1-48ec-a8cd-3aa30f9f4fab.png" />

6. 커서페이징 무한스크롤  
   사용자의 프로필에는 자신이 그린 그림을 소개, 평가받기 위해 그림을 추가할 수 있습니다. (단, 예시는 사진파일로 대체)  
   사용자가 업로드한 그림정보를 모두 불러올 필요는 없기때문에 커서페이징을 활용한 무한스크롤을 구현하였습니다.  
   커서페이징을 구현하기 위해 [useObserver.ts라는 커스텀훅](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/client/src/hooks/useObserver.ts#L3)을 만들어서 사용하였습니다.  
   그리고,[프론트에서 cursor의 변수가 null값을 받을때](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/client/src/pages/profile/%5Bid%5D/Drawing.tsx#L18-L33) 더이상, [서버로 부터 그림정보를 받아오지 않게 하였습니다.](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/server/src/controllers/drawing.controller.ts#L68-L74).
   <img width='100%' src="https://user-images.githubusercontent.com/90431864/171117314-3a025812-73e1-4a61-84ea-be17ce15c174.gif" />

7. 신고기능  
   사용자들이 직접 커뮤니티 생태계를 자정작용 하도록 하기위해서 [신고기능](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/server/src/controllers/user.controller.ts#L372)을 만들었습니다.  
   신고를 한 내용은 관리자의 Slack으로 그 신고 내용이 전송됩니다.  
   그 뿐만아니라, 관리자가 신고에 발빠르게 조치할 수 있도록 신고발생 지점(URL)정보를 포함하여 Slack 메세지로 전송하게 구현하였습니다.  
   아래의 .gif파일에서 확인 할 수 있듯이, Slack 메세지의 확인하러가기 링크가 바로 그것입니다.

   <img width='100%' src="https://user-images.githubusercontent.com/90431864/171127501-de72ef28-6b40-4f9d-bc38-e2cb2c1f10f3.gif" />

8. CI/CD  
   CI/CD환경을 구축하기위해 Github-actions를 사용하였습니다.  
   저는 EC2 프리티어를 사용하는데 리엑트 빌드시, 메모리 초과로 오류가 발생하였습니다.  
   처음에는, 로컬환경에서 리엑트를 빌드하고 그 빌드한것을 scp명령어를 사용해서 직접 EC2에 복사하는 방법을 사용하였습니다.  
   그러나, 이 방법은 리엑트 빌드 폴더를 EC2로 수동으로 이동시키는 작업이기 때문에 CI/CD의 자동화 목적에 부합하지 않았습니다.  
   결과적으로, 리엑트를 빌드하는 문제는 Github-actions가 명령을 수행할때 사용하는 Docker 컨테이너를 이용하였습니다.  
   [Docker 컨테이너에 Node환경을 구축하고 리엑트를 빌드하는 방법을 사용하여 문제를 해결했습니다.](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/.github/workflows/deploy-main.yml#L12-L28)  
   scp수동명령 문제는, 구글링을 통해 Github-actions의 액션 중에 [scp명령 액션이 존재한다는것을 알게되어서 그것을 적용하여](https://github.com/Tojaeung/web-character-project/blob/e3f2a3125dd0a59e522ef2e89e4820bd8705d097/.github/workflows/deploy-main.yml#L30-L40) 문제를 해결하였습니다.
