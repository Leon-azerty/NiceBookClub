/*
  Warnings:

  - A unique constraint covering the columns `[memberCardId]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "StatusCard" AS ENUM ('FREE', 'IN_USE', 'ARCHIVED');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "memberCardId" UUID;

-- CreateTable
CREATE TABLE "Loan" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "BookId" TEXT NOT NULL,
    "loanDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Loan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "authorId" UUID NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberCard" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "status" "StatusCard" NOT NULL DEFAULT 'FREE',

    CONSTRAINT "MemberCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_memberCardId_key" ON "user"("memberCardId");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_memberCardId_fkey" FOREIGN KEY ("memberCardId") REFERENCES "MemberCard"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;
