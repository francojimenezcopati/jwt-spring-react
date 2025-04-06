# Etapa 1: Build de la aplicación
FROM maven:3.9.6-eclipse-temurin-21 AS builder

# Crear y entrar al directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios para compilar
COPY pom.xml .
COPY src ./src

# Empaquetar la aplicación (salida: target/comeback-0.0.1-SNAPSHOT.jar)
RUN mvn clean package -DskipTests

# Etapa 2: Imagen final con JDK para ejecutar
FROM eclipse-temurin:21-jdk

# Directorio donde se alojará el jar
WORKDIR /app

# Copiar el jar desde la etapa de construcción
COPY --from=builder /app/target/comeback-0.0.1-SNAPSHOT.jar app.jar

# Puerto que expone la app
EXPOSE 8080

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
