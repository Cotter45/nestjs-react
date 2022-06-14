import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

// initialize the Prisma Client
const prisma = new PrismaClient();

async function main() {
  const email = 'sd.cotter45@gmail.com';

  // check if user exists
  await prisma.user.delete({ where: { email } }).catch(() => {
    return;
  });

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: await bcrypt.hash('password', 10),
    },
    create: {
      name: 'Sean Cotter',
      email: 'sd.cotter45@gmail.com',
      password: await bcrypt.hash('password', 10),
    },
  });

  // create two dummy articles
  const post1 = await prisma.article.upsert({
    where: { title: 'Prisma Adds Support for MongoDB' },
    update: {},
    create: {
      title: 'Prisma Adds Support for MongoDB',
      body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
      description:
        "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
      published: false,
      authorId: user.id,
    },
  });

  const post2 = await prisma.article.upsert({
    where: { title: "What's new in Prisma? (Q1/22)" },
    update: {},
    create: {
      title: "What's new in Prisma? (Q1/22)",
      body: 'Our engineers have been working hard, issuing new releases with many improvements...',
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
      published: true,
      authorId: user.id,
    },
  });

  console.log({ post1, post2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close the Prisma Client at the end
    await prisma.$disconnect();
  });
