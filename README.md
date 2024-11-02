# Authentication System

This project is an authentication system or you can say backend starter project built using **Express.js**, **TypeScript**, and **MongoDB**. It includes endpoints for user signup, signin, email verification, forgot password, and password reset functionality.

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
  - [POST /signup](#post-signup)
  - [POST /signin](#post-signin)
  - [POST /verify-email](#get-verify-email)
  - [POST /forgot-password](#post-forgot-password)
  - [POST /reset-password](#post-reset-password)
- [Error Handling](#error-handling)
- [Examples](#examples)
- [License](#license)

## Overview

This authentication system provides essential functionality for user management, including:

- User registration with email verification
- Secure login with token-based authentication
- Password recovery and reset flow

## Technologies Used

- **Express.js**: Web framework for Node.js
- **TypeScript**: Typed JavaScript for better maintainability
- **MongoDB**: NoSQL database for storing user data
- **ZOD**: A library which helps us to validate data

## Getting Started

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/badaruddinomar/backend-starter-kit.git .

npm install

npm run dev
```

### Create a .env file and add the following variables

```env
PORT =
MONGO_URI =

CLIENT_URL =
NODE_ENV = development

JWT_SECRET =
JWT_EXPIRATION =

SMPT_SERVICE=gmail
SMPT_MAIL=yourmail@gmail.com
SMPT_PASSWORD=
SMPT_HOST=
SMPT_PORT=
```

## API Endpoints

### POST /signup

- Description: Register a new user.
- Request Body:

  - `name` (string, required): User's full name.
  - `email` (string, required): User's email address.
  - `password` (string, required): User's password.

```json
{
  "name": "John Doe",
  "email": "XK5kM@example.com",
  "password": "password123"
}
```

### Example Response:

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "_id": "63f8d8f6b1b9e0b5b0b1b1b1",
    "name": "John Doe",
    "email": "XK5kM@example.com",
    "isVerified": false,
    "createdAt": "2022-12-15T00:00:00.000Z",
    "updatedAt": "2022-12-15T00:00:00.000Z",
    "__v": 0
  }
}
```

### POST /signin

- Description: Sign in a user.
- Request Body:

  - `email` (string, required): User's email address.
  - `password` (string, required): User's password.

```json
{
  "email": "XK5kM@example.com",
  "password": "password123"
}
```

### Example Response:

```json
{
  "success": true,
  "message": "User signed in successfully",
  "data": {
    "_id": "63f8d8f6b1b9e0b5b0b1b1b1",
    "name": "John Doe",
    "email": "XK5kM@example.com",
    "isVerified": false,
    "createdAt": "2022-12-15T00:00:00.000Z",
    "updatedAt": "2022-12-15T00:00:00.000Z",
    "__v": 0
  }
}
```

### POST /verify-email

- Description: Verify a user's email address.
- Request Body:

  - `email` (string, required): User's email address.
  - `verificationCode` (string, required): User's verification code.

```json
{
  "verificationCode": "123456"
}
```

### Example Response:

```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

### POST /forgot-password

- Description: Send a password reset link to a user's email address.
- Request Body:

  - `email` (string, required): User's email address.

```json
{
  "email": "XK5kM@example.com"
}
```

### Example Response:

```json
{
  "success": true,
  "message": "Password reset link sent successfully"
}
```

### POST /reset-password?token=<token>

- Description: Reset a user's password.
- Request Body:

  - `email` (string, required): User's email address.
  - `password` (string, required): User's new password.
  - `forgotPasswordToken` (string, required): User's forgot password token.

```json
{
  "email": "XK5kM@example.com",
  "password": "newpassword123"
}
```

### Example Response:

```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

## Error Handling

### All error responses include a success boolean and a message string:

```json
{
  "success": false,
  "message": "Error message"
}
```

### Example api usage:

```javascript
axios
  .post('http://localhost:5000/signup', {
    email: 'user@example.com',
    password: 'StrongPassword123!',
    name: 'John Doe',
  })
  .then((response) => console.log(response.data))
  .catch((error) => console.error(error.response.data));
```

## License

### This project is licensed under the MIT License.

```css
Feel free to customize the details, endpoints, and examples to fit your project's needs.
```