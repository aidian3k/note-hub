FROM openjdk:17-jdk-slim
WORKDIR /app

COPY gradle/wrapper gradle/wrapper
COPY gradlew .


COPY build.gradle .
COPY settings.gradle .
COPY src ./src

ENV SPRING_PROFILES_ACTIVE=prod
RUN ./gradlew build -x test

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "build/libs/note-hub-0.0.1-SNAPSHOT.jar"]