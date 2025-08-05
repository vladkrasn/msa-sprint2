# Results

## Helm

В `helm/booking-service/templates/deployment.yaml` было добавлено

```yaml
env: 
  - name: ENABLE_FEATURE_X
    value:  "{{ .Values.env.ENABLE_FEATURE_X }}"
```

Которое считывает значения, выставляемые в `helm/booking-service/values-prod.yaml` и `helm/booking-service/values-test.yaml`. У них фича флаги разные, и соответственно эндпоинт есть в одном деплое, но нет в другом

## Gitlab Local

Этап `unit-test` делает внутрепроектные тесты, написанные на Go.
Этап `ping-test` запускает сервер в отдельном контейнере, делает по нему пинг, и грохает контейнер.
Этап `deploy` создает релиз.
