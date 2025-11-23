/*
  Warnings:

  - Changed the type of `bookId` on the `Loan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "description" TEXT,
ADD COLUMN     "imageLink" TEXT,
ADD COLUMN     "publishedDate" TEXT,
ADD COLUMN     "publisher" TEXT;

-- AlterTable
ALTER TABLE "Loan" DROP COLUMN "bookId",
ADD COLUMN     "bookId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
