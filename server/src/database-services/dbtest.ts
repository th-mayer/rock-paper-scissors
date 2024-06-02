import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // const user = await prisma.user.create({
  //   data: {
  //     email: "example@example.com",
  //     username: "nickname",
  //     hash: "notapasswd",
  //   },
  // });
  // console.log(user);

  // const finduser = await prisma.user.findUnique({
  //   where: {
  //     username: "nickname",
  //   },
  // });
  // console.log("finduser: " + finduser);
  // console.log(finduser?.id, finduser?.email, finduser?.username, finduser?.hash);

  const updatedUser = await prisma.user.update({
    where: {
      id: 6,
    },
    data: {
      items: {
        createMany: {
          data: {
            modifier: 0.2,
            kind: 0,
          },
        },
      },
      itemCoin: 1,
    },
    include: {
      items: true,
    },
  });
  console.log(updatedUser);
}

// async function main() {
//   const deleteAllUsers = await prisma.user.deleteMany({});
// }

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });