<div align="center">
  <img src="./assets/abstract-dark-curved-shape.png" alt="Abstract dark curved shape logo" width="300"/>
</div>

# Nest.js server

## Swagger UI

**See [server.eviterno.online/api](https://server.eviterno.online/api)** ⚡️

## Description

[Nest.js](https://github.com/nestjs/nest) data server, provides some test data for interviews, hobby projects, etc.

## Installation

```bash
$ npm install
```

### Install using Docker

```
docker pull public.cr.cloud.ru/nest-server:main
```

```
docker run -d -p 4201:4201 public.cr.cloud.ru/nest-server:main
```

Then open [localhost:4201/api](http://localhost:4201/api) in browser

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

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
