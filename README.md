#App

GymPass app

## Functional Requirements

- [✅] Should be able register a new user;
- [✅] Should be able authenticate;
- [✅] Should be able get a user profile when logged;
- [❌] Should be able get how many check-ins were made by the user;
- [❌] Should be able user get a history of their check-ins;
- [❌] Should be able user search gyms nearby;
- [❌] Should be able user search gyms by name;
- [❌] Should be able user make a check-in in a gym;
- [❌] Should be able validate a check-in of a user;
- [❌] Should be able register a new gym;

## Business Rules

- [✅] A user should not be able to register with duplicate email;
- [❌] A user should not be able 2 check-ins in same day;
- [❌] A user should not be able check-in if not near (100m) the gym;
- [❌] Check-in must only be validated within 20 minutes of creation;
- [❌] Check-in must only be validated only by administrators;
- [❌] A gyms must only register by administrators;

## NonFunctional Requeriments

- [✅] Users passwords must be encrypted;
- [✅] Application data must be persisted in a PostgreSQL database;
- [❌] All data lists must be paginated with 20 items per page;
- [❌] A user must be identified by a JWT(Json Web Token);
