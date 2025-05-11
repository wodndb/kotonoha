# Kotonoha

개인적인 목적으로 만든 일본어 단어장 웹 앱.

# 개발자를 위한 프로젝트 실행 방법

## 개발환경 설정

1. VSCode 설치 (다른 편집기 또는 IDE 사용한다면 패스)
2. nvm (node 22), yarn 설치
3. docker, docker compose 설치 (별도의 DB를 준비해두었다면 패스)

## 프로젝트 실행 (로컬 개발 환경 기준)

1. `.template.env` 파일을 복사하여 `.env` 파일로 저장한 뒤, 본인 환경에 맞게 값 수정
   ```bash
   cp .template.env .env
   ```
2. `docker compose up -d` 명령어로 DB 서버 실행
   (Adminer는 [http://localhost:8080](http://localhost:8080)에서 접속 가능)
3. `yarn` 명령어로 의존성 패키지 설치
4. `yarn prisma generate` 명령어로 Prisma Client 생성
5. `yarn prisma db push` 명령어로 DB 스키마 생성
6. `yarn dev` 명령어로 Next.js 애플리케이션 실행

# 개발자를 위한 데이터베이스 업데이트 절차 (작성 예정)