# Stock_market_portfolio
## Prerequisites

Make sure you have installed all of the following prerequisites on your machine:
- Node(v18.13.0) - [Download & Install Node.js](https://nodejs.org/en/download)
- CockroachDB(v22.2.8) - [Download & Install CockroachDB](https://www.cockroachlabs.com/docs/v20.1/install-cockroachdb-windows)
- PostgreSQL - [Download & Install PostgreSQL](https://www.postgresql.org/download/)

## Generate API_KEY
- Alpha Vantage - [Create API KEY](https://www.alphavantage.co/)
-- Get Symbol - [API](https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo)
-- Get Stock Data - [API](https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo)
-- Get Stock History - [API](https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=demo)

## Environment Variables
To run this project, you will need to add the environment variables which is listed in .env.example file to your .env file, which will be placed in the .config/ directory.

## Run Project Locally
Clone the project
```sh
$ git clone https://github.com/kirtan18/Stock_Market_Portfolio.git
```
Go to the project directory
```sh
$ cd stock_market_portfolio
```
Install dependencies
```sh
$ npm install
```
Generate API Documentation
```sh
$ npm run docs
```
Start the server
```sh
$ npm start
```

## Tech Stack
- Database: CockroachDB, PostgreSQL
- Server: Node.js, Express.js


## Features

- API integration
- User registration and login
- User password forgot and reset using email notification
- Password security
- Stock search and historical data
- Email notification system


