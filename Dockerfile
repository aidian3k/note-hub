FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy the Gradle Wrapper files
COPY gradle/wrapper gradle/wrapper
COPY gradlew .


COPY build.gradle .
COPY settings.gradle .
COPY src ./src

RUN ./gradlew build

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "build/libs/note-hub-0.0.1-SNAPSHOT.jar"]