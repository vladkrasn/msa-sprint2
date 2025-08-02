FROM openjdk:17-jdk-slim

WORKDIR /app
COPY . .

#RUN gradlew build 

ENTRYPOINT ["java", "-jar", "./build/libs/hotelio-monolith-1.0.0.jar"]