![Logo](./front-end/src/assets/logo.svg)

Basic event management application

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
- ✅ `name` max length validation -> 32 char
- ✅ Unit testing (service, components)
- ⬛ Dates validation -> `endDate` cannot be before `startDate`
- ⬛ Edit an existing event
- ⬛ Delete an existing event
- ⬛ E2E testing
- ⬛ Add NGRX Store (ssf)

## Back-End

### Features:

- ✅ Api GET/events
- ✅ Api POST/event
- ✅ `name` max length validation -> 32 char
- ✅ Dates validation -> `endDate` cannot be before `startDate`
- ✅ Unit testing
- ⬛ Api PUT/event
- ⬛ Api DELETE/event
- ⬛ Api GET/event/{id}
