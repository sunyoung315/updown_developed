# Base image
FROM openjdk:17-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 빌드된 JAR 파일을 Docker 이미지에 복사
COPY build/libs/updown-0.0.1-SNAPSHOT.jar app.jar

# 애플리케이션 실행
ENTRYPOINT ["java", "-jar", "app.jar"]
