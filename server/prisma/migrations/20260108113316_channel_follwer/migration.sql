/*
  Warnings:

  - A unique constraint covering the columns `[userId,channelId]` on the table `ChannelFollower` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ChannelFollower_userId_channelId_key" ON "ChannelFollower"("userId", "channelId");
