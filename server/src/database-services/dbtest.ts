import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    orderBy: {
      wins: "desc",
    },
  });
  const usersWithoutHash: {id: number, email: string, username: string, itemCoin: number, wins: number}[] = [];
  users.forEach(user => {
    const { hash, ...userWithoutHash } = user;
    usersWithoutHash.push(userWithoutHash);
  });
  // const user = await prisma.user.create({
  //   data: {
  //     email: "example@example.com",
  //     username: "nickname",
  //     hash: "notapasswd",
  //     items: {
  //       create: [
  //         {}
  //       ]
  //     }
  //   },
  // });
  console.log(usersWithoutHash);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
