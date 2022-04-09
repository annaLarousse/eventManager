![Logo](./front-end/src/assets/logo.svg)

Basic event management application

## Quick Setup

`git clone https://github.com/annaLarousse/eventManager.git && cd eventManager/back-end && npm install && cd ../front-end && npm install`

in back-end folder -> `npm run start:dev`

in front-end folder -> `npm start`

## Back-End

this is a Node.js Express server developped in Typescript.

### Development server

Run `npm run start:dev` for a dev server. Navigate to `http://localhost:8081/`. The application will automatically reload if you change any of the source files.

### Running unit tests

Run `npm test` to execute the unit tests via Jest. The tests will automatically reload if you change any of the source files.
The test coverage is available.

### Features:

- ✅ Api GET/events
- ✅ Api POST/event
- ✅ Data validation -> required fields (name, start date, end date) + name length (32 char) + date validation (end date cannot be before start date)
- ✅ Unit testing
- ⬛ Api PUT/event
- ⬛ Api DELETE/event
- ⬛ Api GET/event/{id}
- ⬛ Use data validators (express-validator?)

## Front-End

This is an Angular (v13.3.1) project, using [Angular Material](https://material.angular.io/).

### Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Running unit tests

Run `npm test` to execute the unit tests via Jest. The tests will automatically reload if you change any of the source files.
The test coverage is available.

### Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Features:

- ✅ Display all events
- ✅ Add a new event
- ✅ Form validation -> required fields (name, start date, end date) + name length (32 char)
- ✅ Unit testing (service, components)
- ⬛ Dates validation -> end date cannot be before start date
- ⬛ Edit an event
- ⬛ Delete an event
- ⬛ E2E testing
- ⬛ Add NGRX Store (sst)
