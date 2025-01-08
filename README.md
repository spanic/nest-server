<div align="center">
  <img src="./assets/abstract-dark-curved-shape.png" alt="Abstract dark curved shape logo" width="300"/>
</div>

# Nest.js server

## Public access

**[server.eviterno.online/api](https://server.eviterno.online/api)** ⚡️

## Description

[Nest.js](https://github.com/nestjs/nest) data server, provides some test data for interviews, hobby projects, etc.

## Docker

```bash
docker run -it --rm -p 4201:4201 --env DEFAULT_USER_ID=local_test_user public.cr.cloud.ru/nest-server:main
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Then open `/api` to access Swagger UI

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

This repository is covered by [MIT license](LICENSE).
