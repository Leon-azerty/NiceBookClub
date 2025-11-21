/*
  Warnings:

  - You are about to drop the column `BookId` on the `Loan` table. All the data in the column will be lost.
  - Added the required column `bookId` to the `Loan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Loan" DROP COLUMN "BookId",
ADD COLUMN     "bookId" TEXT NOT NULL;
