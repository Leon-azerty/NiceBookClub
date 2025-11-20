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
