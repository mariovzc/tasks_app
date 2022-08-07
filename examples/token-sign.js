/* eslint-disable no-console */
import jwt from "jsonwebtoken";

const secret = "mySecretExample";
const payload = {
  sub: 1,
  role: 'customer'
}

const sign_token  = (payload, secret) => jwt.sign(payload, secret);

const token = sign_token(payload, secret)

console.log(token)
