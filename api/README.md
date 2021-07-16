# Planned Endpoints
## User
- /v1/users/register [POST]
- /v1/users/login [POST]
- /v1/users/{id} [GET]
- /v1/users/{id} [PATCH]
- /v1/users [GET]
- /v1/users/{id}/orders [GET]
- /v1/users/{id}/menus [GET]

## Departments
- /v1/departments [GET]
- /v1/departments/{id} [GET]
- /v1/departments [POST]
- /v1/departments/{id} [PATCH]
- /v1/departments/{id} [DELETE]
- /v1/departments/{id}/users [GET]

## Bowls
- /v1/bowls [GET]
- /v1/bowls/{id} [GET]
- /v1/bowls [POST]
- /v1/bowls/{id} [PATCH]
- /v1/bowls/{id} [DELETE]
- /v1/bowls/{id}/orders [GET]
- /v1/bowls/{id}/orders [POST]
- /v1/bowls/{id}/orders/{id} [PATCH]
- /v1/bowls/{id}/orders/{id} [DELETE]
- /v1/bowls/{id}/users [GET]
- /v1/bowls/{id}/users [POST]
- /v1/bowls/{id}/users/{userId} [DELETE]

## Orders
- /v1/orders/{id} [GET]

## Menus
- /v1/menus [GET]
- /v1/menus/{id} [GET]
- /v1/menus [POST]
- /v1/menus/{id} [PATCH]
- /v1/menus/{id} [DELETE]
- /v1/menus/{id}/items [GET]
- /v1/menus/{id}/items [POST]
- /v1/menus/{id}/items/{itemId} [PATCH]
- /v1/menus/{id}/items/{itemId} [DELETE]

## Categories
- /v1/categories [GET]
- /v1/categories [POST]
- /v1/categories/{id} [GET]

## Restaurants
- /v1/restaurants [GET]
- /v1/restaurants [POST]
- /v1/restaurants/{id} [GET]
- /v1/restaurants/{id} [PATCH]