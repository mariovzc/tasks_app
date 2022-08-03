import bycript from "bcrypt";


async function hashPassword () {
  const myPass = "admin123"

  const hash = await bycript.hash(myPass, 10)
  console.log(hash);

}

hashPassword()
