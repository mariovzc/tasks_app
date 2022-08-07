
/* eslint-disable no-console */
import jwt from "jsonwebtoken";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY1OTgzODU3MX0.iVgTlx2DZHECCnfyKZcAxCT9rEHMnRLtalnN8QQ-jlY"
const secret = "mySecretExample";

const verify_token  = (token, secret) => jwt.verify(token, secret);

const payload = verify_token(token, secret);

console.log(payload)
