import bycript from "bcrypt";


async function hashPassword () {
  const myPass = "admin123"
  const hash = "$2b$10$OenMI7fZ/M51TRxxj7aZ3e0kZaBaSQxcBKYmNkXwEPcQoLBFTjGHS";

  const isMatch = await bycript.compare(myPass, hash);

  console.log(isMatch);

}

hashPassword()
