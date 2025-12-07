# management_system

## Initilly clone the project in your laptop using
```
git clone https://github.com/Poorvanshi-sahu/management_system.git
```

## Go inside project and open the terminal, run this command to get all the dependencies
```
npm i
```

## Before running project make sure to add env variables, make .env file and add below provided varibles

# fields needed for env
```
MONGO_URI
PORT
```

## start the project
```
npm start
```



#Design Choices

```
- The project follows a layered architecture: Routes handle HTTP requests, Modules manage business logic, Controllers format responses, and Models handle data persistence.

- Validation and error handling are implemented to ensure robust and reliable APIs.

- Unit tests cover core logic with database calls mocked for isolation and speed.

- Tasks have clear fields (Title, Description, Due Date, Priority, Status) to enable filtering and maintain consistency.

- The folder structure and naming conventions prioritize readability, maintainability, and scalability.```

