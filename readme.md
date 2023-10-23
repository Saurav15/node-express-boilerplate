# Node.js Express Boilerplate

<p align="center">
  <img src="https://miro.medium.com/v2/resize:fit:365/1*Jr3NFSKTfQWRUyjblBSKeg.png" alt="Project Logo">
</p>

This Node.js Express Boilerplate is a comprehensive starting point for building robust web applications using Node.js and Express. It includes various features, routes, error handling, and utilities to help you kickstart your projects.

## Table of Contents
- [Features](#features)
- [Development Environment](#development-environment)
- [Getting Started](#getting-started)
- [Routes](#routes)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Configuration and Constants](#configuration-and-constants)
- [Input Validation](#input-validation)
- [Logging](#logging)
- [Database Integration](#database-integration)
- [Standard Response Schema](#standard-response-schema)

## Features

- **Health Check Route**: Verify server health, including database connectivity.
- **User Authentication**: Implement user registration, login, and JWT-based access control.
- **Custom Exception Handling**: Provides detailed error responses.
- **Configuration and Constants**: Store environment variables and constants for easy management.
- **Input Validation**: Ensure data integrity with Joi schema-based request validation.
- **Logging**: Utilizes Winston and Morgan for comprehensive request and event logging.
- **Database Integration**: Easily integrates with MongoDB for your data storage needs.
- **Standard Response Schema**: All responses follow a consistent data structure for clarity and consistency.

## Development Environment

This project follows best practices for code quality and consistency through the use of ESLint and Prettier. Additionally, a pre-commit hook has been set up to automatically enforce linting and formatting rules prior to committing your code.

### ESLint

We use ESLint to analyze and enforce a consistent coding style in our project. ESLint helps identify and fix problems in your JavaScript or TypeScript code.

### Prettier

Prettier is an opinionated code formatter used to ensure consistent code style. It automatically formats your code to adhere to project standards.

### Pre-Commit Hook

A pre-commit hook has been configured to run ESLint and Prettier on your code changes before you commit. This ensures that your code always meets the project's coding standards and style.


## Getting Started

1. Clone the repository.
2. Install dependencies: `npm install`
3. Create a `.env` file using `example.env` as a reference.
4. Configure environment variables as needed, such as database connection settings.
5. Start the server: `npm start`
6. The server will run at http://localhost:8081 by default.

## Routes

### Health Check

- **Route**: `/health-check`
- **Method**: GET
- **Description**: Verify server health, including database connectivity.

### Signup

- **Route**: `/signup`
- **Method**: POST
- **Description**: User registration route.

### Login

- **Route**: `/login`
- **Method**: POST
- **Description**: User login route.

### Private

- **Route**: `/private`
- **Method**: GET
- **Description**: A protected route that requires a valid access token.

## Authentication

This boilerplate includes authentication with JSON Web Tokens (JWT). Users can sign up, log in, and receive access tokens for protected routes.

## Error Handling

The project features custom exception handling. Errors are captured and returned with appropriate status codes and messages for easy debugging.

## Configuration and Constants

Configuration variables and constants are stored in a `.env` file. Refer to `example.env` for guidance on environment variable setup.

## Input Validation

Input validation is implemented using the Joi library. The `schema` folder contains files for validating request bodies.

## Logging

Winston and Morgan are used for logging. Logs are generated for various events and requests, providing you with detailed insights into application behavior.

## Database Integration

The boilerplate is configured to work with MongoDB for data storage. Update database connection settings in your `.env` file.

## Standard Response Schema

All responses adhere to a standard schema for consistency. This schema includes fields like `success`, `message`, and `data`.

Feel free to customize and extend this boilerplate to meet your project requirements.
