import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      password: 'password1',
      isActive: true,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      password: 'password2',
      isActive: true,
    },
  });

  const videoCall1 = await prisma.videoCall.create({
    data: {
      roomId: 'room1',
    },
  });

  const videoCall2 = await prisma.videoCall.create({
    data: {
      roomId: 'room2',
    },
  });

  await prisma.peer.create({
    data: {
      videoCallId: videoCall1.id,
    },
  });

  await prisma.peer.create({
    data: {
      videoCallId: videoCall2.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
