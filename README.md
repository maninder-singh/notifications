# notifications

A module to cron notification and send via mail.

## Prerequisite Tools

* [NodeJs](https://nodejs.org/)
* [MySql](https://www.mysql.com/)

## DB Schema
* Load [schema](./schema.sql) into mysql.

## Setup Guide
```
$ cd notifications/
$ npm install
$ PORT={PORT} ENV={ENV} npm start

// PORT = any avaiable port on machine.
// ENV = dev,qa,prod.
// Application run on following http://localhost:{PORT}
```

