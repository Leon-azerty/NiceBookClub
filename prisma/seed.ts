import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

function formatCardName(n: number) {
  return `BB${String(n).padStart(9, '0')}`;
}

async function main() {
  const cards = Array.from({ length: 100 }, (_, i) => ({
    name: formatCardName(i + 1),
  }));

  const result = await prisma.memberCard.createMany({ data: cards });
  console.log('Created member cards count:', result.count);

  await prisma.author.create({
    data: {
      name: 'F. Scott Fitzgerald',
      books: {
        create: [
          { name: 'The Great Gatsby', genre: 'Fiction' },
          { name: 'Tender Is the Night', genre: 'Fiction' },
        ],
      },
    },
  });

  await prisma.author.create({
    data: {
      name: 'J.K. Rowling',
      books: {
        create: [
          { name: "Harry Potter and the Sorcerer's Stone", genre: 'Fantastic' },
          {
            name: 'Harry Potter and the Chamber of Secrets',
            genre: 'Fantastic',
          },
          {
            name: 'Harry Potter and the Prisoner of Azkaban',
            genre: 'Fantastic',
          },
          { name: 'Harry Potter and the Goblet of Fire', genre: 'Fantastic' },
          {
            name: 'Harry Potter and the Order of the Phoenix',
            genre: 'Fantastic',
          },
          {
            name: 'Harry Potter and the Half-Blood Prince',
            genre: 'Fantastic',
          },
          { name: 'Harry Potter and the Deathly Hallows', genre: 'Fantastic' },
        ],
      },
    },
  });

  await prisma.author.create({
    data: {
      name: 'John Green',
      books: {
        create: [{ name: 'Our Fault in the Stars', genre: 'Love' }],
      },
    },
  });
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
