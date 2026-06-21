FROM eclipse-temurin:25-jdk-alpine
WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests
EXPOSE 8080
CMD ["java", "-jar", "target/journaling-0.0.1-SNAPSHOT.jar"]