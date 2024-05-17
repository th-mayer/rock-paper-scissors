import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// async function main() {
//   const user = await prisma.user.create({
//     data: {
//       email: "example@example.com",
//       username: "nickname",
//       hash: "notapasswd",
//     },
//   })
//   console.log(user);
// }

async function main2() {
  const finduser = await prisma.user.findUnique({
    where: {
      username: "nickname",
    },
  });
  console.log("finduser: " + finduser);
  console.log(finduser?.id, finduser?.email, finduser?.username, finduser?.hash);
}

// async function main() {
//   const deleteAllUsers = await prisma.user.deleteMany({});
// }

//main();
main2()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
