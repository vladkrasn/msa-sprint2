# Изменения

* Все Три Apollo-Graphql сервиса были переделаны на Typescript и Bun.
* `Booking subgraph` использует [ConnectRPC](https://connectrpc.com/) для запросов в `Booking Service`, верифицируя `req.headers['userid']`.
* `Hotel subgraph` просто делает HTTP-запросы в монолит/api/hotels.
* `Gateway` собирает схемы из верхних двух сервисов с помощью `IntrospectAndCompose`. [Not suitable for producion, by the way](https://www.apollographql.com/docs/apollo-server/using-federation/apollo-gateway-setup#composing-subgraphs-with-introspectandcompose)
