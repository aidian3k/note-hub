FROM openjdk:17-jdk-slim

# Creating directory for app
WORKDIR /app

# Copying necessary files for running application
COPY gradle/wrapper gradle/wrapper
COPY gradlew .
COPY build.gradle .
COPY settings.gradle .
COPY gradlew.bat .
COPY src/ ./src

# Running application
ENV SPRING_PROFILES_ACTIVE=prod
RUN ./gradlew build -x test
EXPOSE 8082

ENTRYPOINT ["java", "-jar", "build/libs/keycloak-initializer-0.0.1-SNAPSHOT.jar"]
