# Angular - Components skeleton
###(Reusable Components in Angular: Design patterns, transclusion)
Application skeleton for angular web app with reusable components.
App is based on https://github.com/angular/angular-seed. 
Most of the components had been implemented in app.js. One component had been implemented in a separeate file as an example.
Implemented examples of unit tests and e2e tests.

### Install Dependencies


```
npm install
```

Behind the scenes this will also call `bower install`.

### Run the Application

The project had been preconfigured with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/app/index.html`.


## Testing

There are two kinds of tests in the application: Unit tests and End to End tests.

### Running Unit Tests

All unit tests:

```
npm test
```

Single run of the tests and then exit:

```
npm run test-single-run
```


### End to end testing

Start web server:

```
npm start
```

Update WebDriver:

```
npm run update-webdriver
```

Run the end-to-end tests:

```
npm run protractor
```
