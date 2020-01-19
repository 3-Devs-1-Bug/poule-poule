This project is a REST Api made with dotnet core 3.0

## Prerequisites

- [Dotnet Core 3.0 SDK](https://dotnet.microsoft.com/download).

## Running the project

Restore packages `dotnet restore`

Run the project `dotnet run`

Listens on [http://localhost:5000](http://localhost:5000) or [https://localhost:5001](https://localhost:5001).

To test the API, call route [http://localhost:5000/values](http://localhost:5000/values).

If using Postman, deactivate SSL certificate verification.

## Switching environments

Run the following commands in your terminal to change environments:

### Windows

- `$Env:ASPNETCORE_ENVIRONMENT = "Development"`
- `$Env:ASPNETCORE_ENVIRONMENT = "Production"`

### Mac OS

- `ASPNETCORE_ENVIRONMENT=Production`
- `ASPNETCORE_ENVIRONMENT=Development`

## Database setup

- Get Sql Server installer from link above from [here](https://go.microsoft.com/fwlink/?linkid=853017).
- Launch installer.
- Click on Download media/ LocalDB (45mo) and install.
- Database is created on Api project startup.

To run ef commands you need the install dotnet-ef globally. Due to [this bug](https://github.com/aspnet/EntityFrameworkCore/issues/18977) you need to specify the version.
`dotnet tool install --global dotnet-ef --version 3.0.0`

### Gotchas

[CREATE FILE encountered operating system error 5](https://github.com/aspnet/EntityFrameworkCore/issues/11329)

## Updating the database

1. Modify data classes in server/Data/Entities.
2. Generate the migration script `dotnet ef migrations add [migration_name]`.
3. Update the database `dotnet ef database update`.

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

We will use the naming conventions from [here](https://restfulapi.net/resource-naming/).

- POST https://localhost:5001/games: create a game

```json
{
  "id": 3,
  "hostId": "b76ce637-1549-45e0-8268-551d39f91ae5",
  "status": "PENDING_START",
  "creationDate": "2019-11-25T22:43:14.2937504Z",
  "playerIds": [
      {
        "id": "7739c775-11db-4bb4-9e22-3d1ccf47ca8a",
        "name": "Clint"
      }
  ]
}
```

- GET https://localhost:5001/games/3: get game 3 details

```json
{
    "id": 2,
    "hostId": "63a4cc39-fa9d-4096-87b9-bb302fa15449",
    "status": "PENDING_START",
    "creationDate": "2019-12-01T12:05:22.5023072",
    "players": [
        {
            "id": "63a4cc39-fa9d-4096-87b9-bb302fa15449",
            "name": "Lin"
        },
        {
            "id": "7739c775-11db-4bb4-9e22-3d1ccf47ca8a",
            "name": "Clint"
        }
    ]
}
```

- POST https://localhost:5001/games/3/players: add player to game 3

```json
{
    "id": "ac2e5cad-d5a4-422f-b1de-8002d1fb25f2",
    "name": "Emmy"
}
```
