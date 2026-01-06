/*
  Warnings:

  - You are about to drop the `ChannelSubscriber` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChannelSubscriber" DROP CONSTRAINT "ChannelSubscriber_channelId_fkey";

-- DropForeignKey
ALTER TABLE "ChannelSubscriber" DROP CONSTRAINT "ChannelSubscriber_userId_fkey";

-- DropTable
DROP TABLE "ChannelSubscriber";

-- CreateTable
CREATE TABLE "ChannelFollower" (
    "userId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,

    CONSTRAINT "ChannelFollower_pkey" PRIMARY KEY ("userId","channelId")
);

-- AddForeignKey
ALTER TABLE "ChannelFollower" ADD CONSTRAINT "ChannelFollower_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelFollower" ADD CONSTRAINT "ChannelFollower_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
