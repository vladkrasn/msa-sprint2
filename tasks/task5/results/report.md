# Report

1. Cоздал `deployment-v1.yaml` и 2, которые описывают два деплоймента сервиса
2. Создал `service.yaml`, где описывается сам сервис.
3. Создал `destination-rule.yaml`, который определяет, что за `booking-service` в кластере прячутся `v1` и `v2` с тегами соответствующими
4. Создал `virtual-service.yaml`, который определяет правила роутинга, когда тыкаешь в `booking-service`. Куда идет трафик.
5. Побаловался с weighted роутингом, по хедеру. Добавил circut breaking и retries.
