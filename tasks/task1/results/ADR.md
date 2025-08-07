# Первые шаги по переходу с монолитной на микросервисную архитектуру

## Автор: Владимир Красночуб

### Дата: 02/08/2025

### Функциональные требования

Целью этого ADR является определение первых шагов, которые можно предпринять, переводя приложение на микросервисную архитектуру.
В текущей реализации интерзависимость сервисов можно видеть, посмотрев зависимости классов `**Service.java`.

|**№**|**Действующие лица или системы**|**Use Case**|**Описание**|
| :-: | :- | :- | :- |
|1|Monolith Application|Логика, не заключенная в отдельные сервисы|Практически отсутствует, в приложении нет никакой центральной/оркестрирующей логики, от которой зависит все остальное (например, аутентификация)|
|2|App User Service|Юзеры, их статус|Нет зависимостей|
|3|Booking Service|Бронирования, их цены|Большое количество зависимостей от других сервисов|
|4|Hotel Service|Отели|Нет зависимостей|
|5|Promo Code Service|Промокоды|Зависят от юзеров|
|6|Review Service|Ревью|Нет зависимостей|

### Нефункциональные требования

|**№**|**Требование**|
| :-: | :- |
|1|Максимальное количество логики перенести в микросервисы|
|2|Observabilty|
|3|Scalability|
|4|Будущее использование GraphQL|

### Решение

Начать переход на микросервискую архитектуру можно с `Hotel Service`. Это просто сервис только с GET-запросами, без зависимостей (а, следовательно, и сделанный из него микросервис не будет иметь зависимостей от других сервисов или монолита).
Его можно вынести в отдельный простой REST сервис, развертываемый рядом с монолитом. Начинать переход с простого сервиса - самое то, команда учится это делать.

Внутри монолита можно добавить переменную окружения `HOTEL_SERVICE`, и заменить текущие вызовы сервиса на HTTP запрос. Strangler Fig задушил.
После этого подобный подход можно провернуть и с другими сервисами, и таким образом текущий монолит будет постепеннно превращаться в Backend for Frontend с минимум функционала, который потом можно относительно легко заменить на GraphQL сервис.

```plantuml
@startuml
!includeurl https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Component.puml

System_Boundary(hotelio, "Hotelio Monolith") {

  Container(monolith, "Monolith Application", "Spring Boot", "Legacy app exposing REST endpoints for hotel booking") {

    ' Controllers
    Component(bookingController, "BookingController", "Spring MVC", "/api/bookings")
    Component(hotelRedirect, "HotelRedirect", "Spring MVC", "/api/hotels")
    Component(promoController, "PromoCodeController", "Spring MVC", "/api/promos")
    Component(reviewController, "ReviewController", "Spring MVC", "/api/reviews")
    Component(userController, "UserController", "Spring MVC", "/api/users")

    ' Services
    Component(bookingService, "BookingService", "Java Service", "Validates and creates bookings")
    Component(userService, "UserService", "Java Service", "Validates user status and blacklist")
    Component(promoService, "PromoCodeService", "Java Service", "Applies discounts and rules")
    Component(reviewService, "ReviewService", "Java Service", "Manages hotel reviews")

    ' DB
    ComponentDb(postgres, "Monolith DB", "PostgreSQL", "Stores users, bookings, reviews, promos")

    ' Controller-Service relations
    Rel(bookingController, bookingService, "Uses")
    Rel(promoController, promoService, "Uses")
    Rel(reviewController, reviewService, "Uses")
    Rel(userController, userService, "Uses")

    ' Service-Service and Service-DB
    Rel(bookingService, hotelRedirect, "Calls")
    Rel(bookingService, userService, "Calls")
    Rel(bookingService, promoService, "Calls")
    Rel(bookingService, reviewService, "Calls")

    Rel(bookingService, postgres, "Reads/Writes")
    Rel(userService, postgres, "Reads")
    Rel(promoService, postgres, "Reads")
    Rel(reviewService, postgres, "Reads/Writes")
  }
}

System_Boundary(HotelMicroservice, "Hotel Microservice Domain") {
  Container(HotelMicroserviceS, "Hotel Microservice", "Go", "Modern Backend application") {

    ' Controllers
    Component(hotelController, "HotelController", "Go", "/hotels")

    ' Services
    Component(hotelService, "HotelService", "Go", "Retrieves hotel details")
  }  
    ' DB
    ComponentDb(hotelpg, "Hotel DB", "PostgreSQL", "Stores hotels")

    ' Controller-Service relations
    Rel(hotelController, hotelService, "Uses")

    Rel(hotelService, hotelpg, "Reads")
}

Person(user, "User", "Interacts with frontend")
Rel(user, bookingController, "Uses")
Rel(user, hotelRedirect, "Uses")
Rel(user, promoController, "Uses")
Rel(user, reviewController, "Uses")
Rel(user, userController, "Uses")
Rel(hotelRedirect, hotelController, "Uses")
@enduml 
```

### Альтернативы

Начать переход можно с любого другого сервиса, главное чтобы он был попроще и с меньшим количеством зависимостей.
Построение нового сервиса на HTTP максимально просто, но можно пробовать и другие протоколы (gRPC).

#### Недостатки, ограничения, риски

Недостатком является то что сложно придумать внятный план когда сервис явно нереалистичный, только GET-запросы.
Также, предложенное решение негативно скажется на производительности при не супер сильных нагрузках - делать HTTP запрос это дольше чем вызывать Java-метод из соседнего файла.
Но в этой ситуации разница в произодительности вряд ли будет заметной. А при сильных нагрузках помогут кеш или скейлинг микросервиса.
