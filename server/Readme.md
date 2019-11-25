This project is a REST Api made with dotnet core 3.0

## Prerequisites

* [Dotnet Core 3.0 SDK](https://dotnet.microsoft.com/download).

## Running the project

Update the database `dotnet ef database update`

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