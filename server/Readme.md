This project is a REST Api made with dotnet core 3.0

## Prerequisites

* [Dotnet Core 3.0 SDK](https://dotnet.microsoft.com/download).

## Running the project

Update the database `dotnet ef database update`

Restore packages `dotnet restore`

Run the project `dotnet run`

Listens on [http://localhost:5000](http://localhost:5000) or [https://localhost:5001](https://localhost:5001).

To test the API, call route [http://localhost:5000/values](http://localhost:5000/values).

If using Postman, deactivate SSL certificate verification.

## Updating the database

1. Modify data classes in server/Data/Entities
2. Generate the migration script `dotnet ef migrations add [migration_name]`
3. Update the database `dotnet ef database update`

## Project structure

```sh
.
|
├── Common/ # Shared logic.
├── DTO/ # Data models exposed from the api.
├── Controllers/ # Api endpoint definition.
├── Data/ # Database related code.
|   └── Entities/ # Classes used to create/interact with the database.
└── Migrations/ # Entity framework generated code for updating the database.
└── Services/ # Business logic (eg. database calls).
```

## Routes (WIP)

Follow naming conventions from [here](https://restfulapi.net/resource-naming/)

- POST https://localhost:5001/games: create a game

```json
{
    "id": 3,
    "hostId": "b76ce637-1549-45e0-8268-551d39f91ae5",
    "status": "PENDING_START",
    "creationDate": "2019-11-25T22:43:14.2937504Z",
    "playerIds": [
        "b76ce637-1549-45e0-8268-551d39f91ae5"
    ]
}
```

- GET https://localhost:5001/games/3: get game 3 details

```json
{
    "id": 3,
    "hostId": "b76ce637-1549-45e0-8268-551d39f91ae5",
    "status": "IN_PROGRESS",
    "creationDate": "2019-11-25T22:43:14.2937504",
    "playerIds": [
        "1a706910-b52f-45f4-a374-91633986c652",
        "6be25ae1-68b5-4609-92cc-966391fd1141",
        "70da2d92-313c-47bb-9ed0-9402d3b301ea",
        "ad91f360-a4a9-43d3-9a84-d29fcfcb3acc",
        "b76ce637-1549-45e0-8268-551d39f91ae5"
    ]
}
```

- POST https://localhost:5001/games/3/players: add player to game 3

```json
{
    "playerId": "ad91f360-a4a9-43d3-9a84-d29fcfcb3acc"
}
```