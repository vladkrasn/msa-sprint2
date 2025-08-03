# ✅ Регрессионные тесты Hotelio

## 🧪 Пример запуска

```bash
cd test/
docker build -t hotelio-tester .
docker run --rm \
  -e DB_HOST=host.docker.internal \
  -e DB_PORT=5432 \
  -e DB_NAME=hotelio \
  -e DB_USER=hotelio \
  -e DB_PASSWORD=hotelio \
  -e API_URL=http://host.docker.internal:8084 \
  -e BOOKING_DB_HOST=host.docker.internal \
  -e BOOKING_DB_PORT=5431 \
  -e BOOKING_DB_NAME=booking \
  -e BOOKING_DB_USER=booking \
  -e BOOKING_DB_PASSWORD=booking \
  -e BOOKING_API_URL=http://host.docker.internal:8079 \
  hotelio-tester
```
