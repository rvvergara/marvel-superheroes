# Marvel Superheroes Express API

## Background

.

A little fun building an API that connects to Marvel's [Developer Portal](https://developer.marvel.com/) and be able to fetch and display data on superheroes, villains, etc.

## Installation

### System Requirements

The following should be installed in your machine:

- Node JS (Go [here](https://nodejs.org/en/download/) for the specific file you need to download and install and other installation instructions)

- Redis (See [here](https://redis.io/topics/quickstart) for installation instructions)

.

### Credentials requirements

In order to be able to query Marvel's database you should first create an account [here](https://www.marvel.com/signin?referer=https%3A%2F%2Fdeveloper.marvel.com%2Faccount) and get your public and private keys.

.

### Cloning the repo and installing dependencies

Clone this repository and then run:

```
npm install
```

To install all dependencies.

.

### Configuration

Make sure you create a `.env` file in the root of the project directory. This `.env` file should have the following content:

```
PORT=8080
REDIS_PORT=6379
PUBLIC_KEY=<your Marvel API public key>
PRIVATE_KEY=<your Marvel API private key>
```

.

## Building and Running

Once you have successfully installed all dependencies and have your `.env` file ready run the following in your terminal (make sure you're running your terminal in the project's root directory):

```
npm start
```

In order to test the API and also view it's documentation please open `localhost:8080/api-docs` in your browser.

## Technologies Used

.

- ExpressJS
- Axios
- Redis
- SwaggerUI (for documentation)

## Maintained by

[Ryan Vergara](https://linkedin.com/in/rvvergara)
