# UPDOWN

---

![logo](https://github.com/user-attachments/assets/9fde2379-bfe7-4861-afb1-093b9cdb44db)

# 목차

---

1. [개요](#1-개요)

2. [개발 환경](#2-개발-환경)

3. [서비스 화면](#3-서비스-화면)

4. [주요 기능](#4-주요-기능)

5. [기술 소개](#5-기술-소개)

6. [설계 문서](#6-설계-문서)

7. [팀원 소개](#7-팀원-소개)

   

# 1. 개요

---

## 프로젝트 소개

### [UPDOWN](https://updown.run)

-   이전에 간단히 제작했던 UPDOWN 프로젝트를 Develop 한 프로젝트입니다.
-   UPDOWN은 체중, 운동, 식단을 손쉽게 기록하여 관리할 수 있도록 도와주는 건강 관리 플랫폼입니다.

### 목적

-   건강 증진을 위해 어디서나 손쉽게 체중, 운동, 식단을 관리할 수 있도록 하는 목적으로 만들어졌습니다. 

### 타겟

-   식단 관리를 하는 다이어터
-   매일 운동을 하는 운동인
-   건강 관리를 하고 싶은 모든 사람들

### 서비스 개요

- UPDOWN은 건강 관리 서비스로, 사용자는 웹이나 앱을 통해 손쉽게 매일의 식단, 체중, 운동을 기록함으로써 건강을 유지할 수 있습니다.

  

# 2. 개발 환경

---

### Management Tool

![Git-F05032.svg](https://img.shields.io/badge/Git-F05032.svg?&style=for-the-badge&logo=Git&logoColor=white)![Github](https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white)![Notion-000000.svg](https://img.shields.io/badge/Notion-000000.svg?&style=for-the-badge&logo=Notion&logoColor=white)![Figma-F24E1E.svg](https://img.shields.io/badge/Figma-F24E1E.svg?&style=for-the-badge&logo=Figma&logoColor=white)

### IDE

![VS-CODE](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC.svg?&style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)![IntelliJ](https://img.shields.io/badge/IntelliJ%20IDEA-000000.svg?&style=for-the-badge&logo=IntelliJ%20IDEA&logoColor=white)

### Infra

![AWS](https://img.shields.io/badge/Amazon_AWS-232F3E.svg?&style=for-the-badge&logo=AmazonAWS_&logoColor=white)![Amazon_EC2](https://img.shields.io/badge/Amazon%20EC2-FF9900.svg?&style=for-the-badge&logo=Amazon%20EC2&logoColor=white)![Amazon_S3](https://img.shields.io/badge/Amazon%20S3-569A31.svg?&style=for-the-badge&logo=Amazon%20S3&logoColor=white)![nginx](https://img.shields.io/badge/NGINX-009639.svg?&style=for-the-badge&logo=NGINX&logoColor=white)![docker](https://img.shields.io/badge/Docker-2496ED.svg?&style=for-the-badge&logo=Docker&logoColor=white)![MariaDB](https://img.shields.io/badge/MariaDB-003545.svg?&style=for-the-badge&logo=MariaDB&logoColor=white)![Redis](https://img.shields.io/badge/Redis-DC3872D.svg?&style=for-the-badge&logo=Redis&logoColor=white)

### Frontend

![HTML5](https://img.shields.io/badge/HTML5-E34F26.svg?&style=for-the-badge&logo=HTML5&logoColor=white)![CSS3](https://img.shields.io/badge/CSS3-1572B6.svg?&style=for-the-badge&logo=CSS3&logoColor=white)![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?&style=for-the-badge&logo=JavaScript&logoColor=white)![SWC](https://img.shields.io/badge/Node.js-339933.svg?&style=for-the-badge&logo=Node\.js&logoColor=white)![Vite](https://img.shields.io/badge/Vite-646CFF.svg?&style=for-the-badge&logo=Vite&logoColor=white)![Axios](https://img.shields.io/badge/Axios-5A29E4.svg?&style=for-the-badge&logo=Axios&logoColor=white)

![React](https://img.shields.io/badge/React-61DAFB.svg?&style=for-the-badge&logo=React&logoColor=white)![TypeScript](https://img.shields.io/badge/TypeScript-3172C6.svg?&style=for-the-badge&logo=TypeScript&logoColor=white)![styled components](https://img.shields.io/badge/styled%20components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white)![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)

### Backend

![Java](https://img.shields.io/badge/Java-634533.svg?&style=for-the-badge)![SpringBoot](https://img.shields.io/badge/Spring_Boot-6DB33F.svg?&style=for-the-badge&logo=SpringBoot&logEoColor=white)![SpringSecurity](https://img.shields.io/badge/Spring_Security-6DB33F.svg?&style=for-the-badge&logo=SpringSecurity&logoColor=white)![SpringJPA](https://img.shields.io/badge/Spring_JPA-6DB33F.svg?&style=for-the-badge)



# 3. 서비스 화면

---

### 로그인 페이지

- **카카오 소셜 로그인**

  <img src="https://github.com/user-attachments/assets/afa6caad-3edc-410f-96fa-23fbbd287bb9" width="200" align="left">

  - 카카오 계정을 이용한 소셜 로그인을 지원합니다.
  
  - '**로그인**' 버튼을 누르면 로그인이 진행됩니다.
  
  - 카카오 계정은 별도의 회원 가입 절차 없이 카카오 로그인 시 자동으로 회원가입, 로그인이 됩니다.
  
    

### 회원가입 페이지

- **회원 가입 페이지**

  <img src="https://github.com/user-attachments/assets/5ba5ed8d-077c-49e4-a68a-f7d23da4080c" width="200" align="left">

  - 개인별 맞춤 건강 관리를 위해 성별, 나이, 키, 시작 체중, 목표 체중, 평소 활동량을 등록합니다.

  - 모든 정보를 등록하면 개인별 맞춤 계획을 보여줍니다.

    -   기초대사량, 활동대사량을 보여줍니다.

    -   목표 섭취 칼로리를 계산하여 목표 체중까지 예상되는 소요 기간을 보여줍니다.

    -   '**시작하기**' 버튼을 누르면 메인 페이지로 이동합니다.

        


### 마이페이지

- **테마 선택**

  <img src="https://github.com/user-attachments/assets/b7e75826-97d5-449c-a080-a665fd887067" width="200" align="left">

  -   테마 캐릭터 좌측 하단의 동그란 '🖼️' 버튼을 누르면 테마 선택 창이 뜹니다.
  -   원하는 테마를 선택하고 '**테마 변경하기**' 버튼을 누릅니다.
  -   메인 페이지로 이동하면 '하루 기록' 부분의 테마가 바뀐 것을 확인할 수 있습니다.


- **개인 정보 수정**

  <img src="https://github.com/user-attachments/assets/de5a7e28-8f24-4287-a3ea-9299f5b682af" width="200" align="left">

  -   '**나의 목표**' 를 누르면 회원가입 시 등록했던 정보( 성별, 나이, 키, 시작 체중, 목표 체중, 평소 활동량 )을 변경할 수 있습니다.
  -   목표 섭취 칼로리도 수정할 수 있습니다.

- **로그아웃**

  <img src="https://github.com/user-attachments/assets/383d3def-20f8-4937-b1eb-bf54d01fbd42" width="200" align="left">

  -   우측 상단의 로그아웃 아이콘을 누르면 로그아웃할 수 있습니다.
      -   로그아웃 아이콘을 누르면 로그아웃 여부를 다시 한번 확인합니다.

- **회원탈퇴**

  <img src="https://github.com/user-attachments/assets/4f312e9a-5085-4dfe-ace5-a2118135e269" width="200" align="left">

  - 우측 하단의 '**회원탈퇴**' 버튼을 누르면 탈퇴할 수 있습니다.

    - '**회원탈퇴**' 버튼을 누르면 회원탈퇴 여부를 다시 한번 확인합니다.

      


### 메인 페이지

- **앱 설치 유도**

  <img src="https://github.com/user-attachments/assets/39490bc7-8957-40bb-ab3b-add785c097b5"  width="200" align="left" />

  - 메인페이지 로드 시 앱 설치 유무를 확인하여 설치않은 사용자에게 Toast 창을 통해 설치를 유도합니다.

- **날짜 이동 헤더**

  <img src="https://github.com/user-attachments/assets/a58fe2d2-694b-4718-b7e0-625ca5d2636d"  width="200" align="left" />

  - 왼쪽, 오른쪽 화살표를 이동하여 날짜를 변경할 수 있습니다.
  - 날짜 옆의 '🗓' 버튼을 눌러 캘린더 화면으로 이동할 수 있습니다.

- **하루 기록**

  - 회원가입 시 설정한 목표 섭취칼로리 대비 실제 하루동안 섭취한 칼로리를 Gauge Chart를 통해 보여줍니다.
  - 하루 동안 운동으로 소모한 칼로리와 음식으로 섭취한 칼로리, 탄/단/지 섭취량을 계산하여 보여줍니다.
  - 화면의 색과 캐릭터는 마이페이지에서 설정한 테마로 로드됩니다.
  
- **식단**

  <img src="https://github.com/user-attachments/assets/dc5c92cf-cf5b-4ce2-81ee-c29c1f3e0a6a"  width="200" align="left" />

  - 아침 / 점심 / 저녁 / 간식으로 나누어 섭취한 칼로리와 등록한 사진을 보여줍니다.

    ( 사진 미등록 시, 기본 이미지를 제공합니다. )

  - 단식을 한 경우, '**단식했어요!**' 버튼을 통해 기록할 수 있습니다.

  - 식단을 등록하지 않은 경우 '➕' , 식단을 등록한 경우 '✔' 버튼을 통해 상세 식단 기록 페이지로 이동할 수 있습니다.

    ( 단식 버튼을 누른 경우, 상세 식단 기록 페이지로 이동할 수 없습니다. )

- **몸무게**

  <img src="https://github.com/user-attachments/assets/d3e77c7c-32e7-4ebb-a2b1-22b4d9118343"  width="200" align="left" />

  - '**몸무게**' 탭 
    - 오늘의 몸무게를 등록하고 수정할 수 있습니다.
    - 회원가입 시 입력한 키와 몸무게로 BMI 지수를 계산해 Gauge Chart로 보여줍니다.
  - '**기록**' 탭 
    - 최근 7일 간의 체중 기록을 Line Chart로 제공합니다. 

- **운동**

  <img src="https://github.com/user-attachments/assets/9bc50deb-2a07-4794-b7c6-3dc22ad83f27"  width="200" align="left" />

  - 당일 운동 요약 정보 ( 운동 사진, 총 시간, 총 소모 칼로리 )를 제공합니다.

    ( 사진 미등록 시, 기본 이미지를 제공합니다. )

  - '**기록하기**' 버튼을 통해 상세 운동 기록 페이지로 이동할 수 있습니다.



### 식단

- **식단 사진 업로드 및 삭제**

  <img src="https://github.com/user-attachments/assets/6cf03ac0-55a6-4fdd-a271-18f1333a0226"  width="200" align="left" />

  -   사진의 좌측 하단에 있는 '📷' 버튼을 누르면 운동 사진을 업로드할 수 있습니다.
      -   식단별 하나씩만 업로드 가능합니다.
      -   사진 촬영 또는 갤러리에 있는 사진을 업로드할 수 있습니다.
          -   사진촬영은 모바일 사용시에만 가능합니다.

- **해당 카테고리 영양 정보 조회**

  <img src="https://github.com/user-attachments/assets/e5cd7447-883c-4e56-86ac-c3c3cf7828de"  width="200" align="left" />

  -   해당 식단의 칼로리, 탄수화물, 단백질, 지방을 확인할 수 있습니다.
  -   우측 상단의 '**영양 성분 상세**' 버튼을 누르면 해당 식단의 더욱 상세한 영양 정보를 조회할 수 있습니다.

- **식단 리스트 조회**

  <img src="https://github.com/user-attachments/assets/033227f5-b8c1-4374-97d2-09dfe036f6cf"  width="200" align="left" />

  -   해당 카테고리에 등록된 식단 리스트를 조회할 수 있습니다.
  -   음식 이름, 음식 브랜드, 섭취량, 칼로리를 확인할 수 있습니다.

- **식단 삭제**

  -   식단 리스트 중 삭제하고자 하는 식단은 '✖' 버튼을 눌러 삭제할 수 있습니다.

- **식단 등록**

  - **식단 검색**

    <img src="https://github.com/user-attachments/assets/ada2e653-76c3-42a3-a9f0-2a6110f26a74"  width="200" align="left" />

    - '**검색**' 버튼을 눌러 검색창으로 이동합니다.

    - 검색어를 작성 후 '🔎'를 누르면 식단 정보를 조회할 수 있습니다.

      ( 검색어를 작성하지 않으면 검색이 불가합니다. )

    - 검색된 식단 리스트 중 원하는 식단의 '➕'를 눌러 식단을 등록할 수 있습니다.

    - 식단의 섭취량을 입력하면 그에 따른 칼로리와 영양성분이 자동으로 계산됩니다.

    - '**등록하기**' 버튼을 누르면 식단 리스트 화면으로 돌아와 등록된 식단을 확인할 수 있습니다.

  - **직접 등록**

    <img src="https://github.com/user-attachments/assets/748838cf-85e6-4707-a59d-42ca081ca836"  width="200" align="left" />

    -   '**직접 등록**' 버튼을 누르면 식단 등록 페이지로 이동합니다.
        -   음식 이름, 섭취량은 필수값으로 입력해야 합니다.
        -   브랜드 이름, 칼로리, 탄수화물, 단백질 등 상세 영양정보는 선택적으로 입력할 수 있습니다.
    -   '**등록하기**' 버튼을 누르면 식단이 등록됩니다.

- **식단 상세 조회**

  <img src="https://github.com/user-attachments/assets/b92f1068-d4f1-41c4-9db2-265cdc275996"  width="200" align="left" />

  -   조회하고자 하는 식단을 누르면 해당 식단의 상세페이지로 이동해 정보를 조회할 수 있습니다.

- **식단 수정**

  -   수정하고자 하는 식단을 눌러서 '**수정하기**' 버튼을 누르면 식단 수정 페이지로 이동합니다.
      -   검색 등록한 식단의 경우, 섭취량만 수정이 가능합니다.
  -   값을 수정한 후 '**수정완료**' 버튼을 누르면 수정이 완료됩니다.



### 운동

- **운동 사진 업로드 및 삭제** 

  <img src="https://github.com/user-attachments/assets/dd199841-afa7-487a-b225-8593b762c7a9" width="200" align="left">

  - 사진의 좌측 하단에 있는 '📷' 버튼을 누르면 운동 사진을 업로드할 수 있습니다.

    - 하루에 하나씩만 업로드 가능합니다.

    - 사진 촬영 또는 갤러리에 있는 사진을 업로드할 수 있습니다.

      ( 사진 촬영은 모바일 사용 시에만 가능합니다. )

- **해당 일자의 운동 정보**
  - 해당 일자의 총 운동 시간과 소모 칼로리를 계산하여 제공합니다.

- **운동 리스트 조회**

  <img src="https://github.com/user-attachments/assets/1b6d89a1-0298-4e3e-8279-a454e0dc0c0d" width="200" align="left">

  - 해당 일자에 등록된 운동 리스트를 조회할 수 있습니다.
  - 운동 이름, 운동 시간, 소모 칼로리, 상세 기록 ( 횟수, 무게, 거리 ) 정보를 리스트로 제공합니다.

- **운동 삭제**

  - 운동 리스트 중 삭제하고자 하는 운동은 '✖' 버튼을 눌러 삭제할 수 있습니다.

- **운동 등록**

  - **검색 등록**

    <img src="https://github.com/user-attachments/assets/ec250c84-ea7a-478f-8c58-35af7cb8d8e6" width="200" align="left">

    - '**검색**' 버튼을 눌러 검색창으로 이동합니다.

    - 검색어를 작성 후 '🔎'를 누르면 운동 정보를 조회할 수 있습니다.

      ( 검색어를 작성하지 않으면 검색이 불가합니다. )

    - 검색된 운동 리스트 중 원하는 운동의 '➕'를 눌러 등록할 수 있습니다.

    - 운동 시간을 입력하면 해당 운동의 MET 계수와 현재 몸무게, 운동시간으로 소모칼로리가 자동으로 계산됩니다.

    - 운동에 따라 횟수 / 무게 / 거리에 따라 운동 세트를 기록할 수 있습니다.

    - '**등록하기**' 버튼을 누르면 운동이 등록되면 Modal이 꺼져 추가로 검색된 운동을 등록할 수 있습니다.

  - **직접 등록**

    <img src="https://github.com/user-attachments/assets/17737e4a-0d5a-4ffe-a448-1f17bbbe0f16" width="200" align="left">

    - '**직접 등록**' 버튼을 누르면 운동 등록 페이지로 이동합니다.
      - 운동 이름, 운동 시간, 소모 칼로리 필수값으로 입력해야 합니다.
      - 상세 기록은 선택적으로 입력할 수 있습니다.
    
    - '**등록하기**' 버튼을 누르면 운동이 등록됩니다.

- **직접 등록 시 운동 상세 조회**

  <img src="https://github.com/user-attachments/assets/24746598-ec24-436a-b53d-12033b66d70d" width="200" align="left">

  - 조회하고자 하는 운동을 누르면 운동 상세 페이지로 이동해 정보를 조회할 수 있습니다.

- **직접 등록 시 운동 수정**

  - 상세 조회 화면에서 '**수정하기**' 버튼을 누르면 운동 수정 페이지로 이동합니다.
  - 값을 수정한 후 '**수정완료**' 버튼을 누르면 수정이 완료됩니다.

- **검색 등록시  운동 상세 조회 및 수정**

  <img src="https://github.com/user-attachments/assets/16c3c00b-c92c-4556-ac18-e3011f662258" width="200" align="left">

  -   조회하고자 하는 운동을 누르면 Modal이 열려 정보를 확인할 수 있습니다.
  -   값을 수정한 후 '**수정완료**' 버튼을 누르면 수정이 완료됩니다.




### 캘린더

-   **건강 기록 조회**
    
    <img src="https://github.com/user-attachments/assets/eb227a25-53fc-452b-be0f-970873299d06"  width="200" align="left" />

    -   원하는 날짜를 선택하면 해당 일자의 식단 / 운동 / 몸무게 기록을 조회할 수 있습니다.
        -   상단의 식단, 운동, 몸무게 버튼을 누르면 원하는 정보를 조회할 수 있습니다.
        -   식단의 경우, 단식한 경우에는 **'단식😷**', 사진만 등록한 경우에는 '**냠냠함🍽️**'으로 조회됩니다.
        
    -   '**선택 날짜로 이동**' 버튼을 누르면 해당 날짜의 메인 페이지로 이동합니다.
    -   '**오늘 날짜로 이동**' 버튼을 누르면 오늘 날짜의 메인 페이지로 이동합니다.
    
-   **연, 월 선택**
    
    <img src="https://github.com/user-attachments/assets/4123ebc3-e6b9-4185-9fb2-77588edc3556"  width="200" align="left" />
    
    -   상단의 날짜 옆의 화살표를 누르면 연도와 월을 선택할 수 있습니다.
    -   '**선택 완료**' 버튼을 누르면 해당 연, 월의 달력으로 이동합니다.




# 4. 주요 기능

---

<u>**회원관리 기능**</u>

-   로그인/로그아웃

    -   OAuth2를 이용한 카카오 소셜 로그인 지원

-   회원가입

-   마이페이지

    -   목표 칼로리 / 테마 설정

-   회원 탈퇴

    

<u>**메인페이지**</u>

-   하루 기록 요약 정보
-   식단 요약 정보
    -   아침/점심/저녁/간식 단식 기록

-   몸무게 정보
    -   BMI 지수 / 최근 7일 기록 차트

-   운동 요약 정보



**<u>식단</u>**

- 사진 조회 /  등록 / 수정 / 삭제
- 리스트 조회
- 상세 조회 / 수정 / 삭제
- 직접 / 검색 등록



**<u>몸무게</u>**

- 조회 / 등록 / 수정
- BMI 지수 / 최근 7일 몸무게 기록 차트



**<u>운동</u>**

- 사진 조회 /  등록 / 수정 / 삭제
- 리스트 조회
- 상세 조회 / 수정 / 삭제
- 직접 / 검색 등록



**<u>캘린더</u>**

- 선택된 날짜의 식단 / 몸무게 / 운동 요약 조회
- 오늘 / 선택 날짜로 이등



# 5. 기술 소개

-   **수동 배포**

    -   `Docker`, `Docker Hub`를 활용하여 수동 배포 구현

-   **로그인**

    -   `OAuth2` 기술을 이용한 카카오 소셜 로그인 구현
    -   `JWT` 기술을 활용한 비밀번호 보안 강화

-   **PWA**

    -   `PWA`를 이용한 웹앱 개발

    

# 6. 설계 문서

---

- **<u>ERD</u>**

  ![UPDOWN](https://github.com/user-attachments/assets/436d6278-a6b2-4ab6-b6eb-5636b3f2c90d)

  

<details>
	<summary>
    	<b><u>API 명세서</u></b>
    </summary>
    <div>
        <img src="https://github.com/user-attachments/assets/0a9def50-8fc1-4a11-8bcf-7ebe76015a38" alt="1" />
        <img src="https://github.com/user-attachments/assets/3f27c118-f574-404d-8a72-c240aa8d3ea8" alt="2" />
        <img src="https://github.com/user-attachments/assets/d208b321-44fa-48a0-a5ed-07990197831a" alt="3" />
        <img src="https://github.com/user-attachments/assets/eddefbe4-1157-441a-be83-e29242e5a601" alt="4" />
        <img src="https://github.com/user-attachments/assets/3653e124-074c-45b9-97ed-249c4d2890c8" alt="5" />
        <img src="https://github.com/user-attachments/assets/c33a3f26-9989-44ed-88dd-16f97604e562" alt="6" />
        <img src="https://github.com/user-attachments/assets/c7d98ba1-faee-4c06-a6d4-426b8fc19e9e" alt="7" />
    </div>
</details>



- **<u>아키텍처 구조도</u>**
  ![시스템 아키텍쳐.png](README_ASSETS/system_architecture.png)

  

- **<u>와이어 프레임</u>**

  ![UPDOWN](https://github.com/user-attachments/assets/6c0ea2b1-e55f-418a-bb3e-3236f01e7eda)

  

# 7. 팀원 소개

---

<table align="left">
    <tr align="center">
        <td>
            <a href="https://github.com/yukyung531">
              <img src="https://github.com/yukyung531.png" width="200">
              <br />
            </a>
        </td>
        <td>
            <a href="https://github.com/sunyoung315">
              <img src="https://github.com/sunyoung315.png" width="200">
                <br />
            </a> 
        </td>
    </tr>
    <tr align="center">
        <td>
            <a href="https://github.com/yukyung531">
                <b>권유경</b><br>
                Back-end<br>
            </a>
        </td>
        <td>
            <a href="https://github.com/sunyoung315">
                <b>김선영</b><br>
                Front-end<br>
            </a>
        </td>
    </tr>
</table>













