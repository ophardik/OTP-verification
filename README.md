# OTP Verification Service

An SMS one-time-password flow over Twilio: request an OTP, receive it by SMS,
validate it against a time-limited record.

The only one of my repos with a test suite — mocha and chai cover the request
and validate paths.

## Stack

Node.js · Express · MongoDB (Mongoose) · Twilio · otp-generator · mocha · chai

## Flow

1. `POST` a phone number — the service generates an OTP, stores it against the
   number with a timestamp, and sends it via the Twilio API.
2. `POST` the number and the code — the service checks the stored value and its
   age, then marks it used so a code cannot be replayed.

## Layout

```
index.js         server entry
connection.js    MongoDB connection
routes/          endpoints
controller/      request handlers
helper/          OTP generation and Twilio client
model/           Mongoose schemas
test/            mocha + chai integration tests
```

## Running it

```bash
npm install
cp .env.example .env     # TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_MOBILE_NUMBER
npm test
npm run dev
```

> Twilio credentials belong in `.env`, which is gitignored. Never commit them.
