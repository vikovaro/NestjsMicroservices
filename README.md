# Микросервисы NestJS/RabbitMQ

Репозиторий содержит пример приложения, построенного на микросервисной архитектуре, используя NestJS и RabbitMQ.

## Используемые технологии

- Node.js
- RabbitMQ
- Docker

## Установка

### Содержимое env файла

```
RABBITMQ_USER=
RABBITMQ_PASSWORD=
RABBITMQ_HOST=
RABBITMQ_PORT=
```

### Установка зависимостей

```
npm install
```

### Запуск Docker

Сборка образов:
```
docker-compose build
```

Запуск всех сервисов:
```
docker-compose up -d
```

## Запуск приложения

```
cd service1 && npm run start
cd service2 && npm run start
```