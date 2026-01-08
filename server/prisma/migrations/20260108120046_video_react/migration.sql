/*
  Warnings:

  - You are about to drop the `VideoLike` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "VideoLike" DROP CONSTRAINT "VideoLike_userId_fkey";

-- DropForeignKey
ALTER TABLE "VideoLike" DROP CONSTRAINT "VideoLike_videoId_fkey";

-- DropTable
DROP TABLE "VideoLike";

-- CreateTable
CREATE TABLE "VideoReaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "type" "ReactionType" NOT NULL,

    CONSTRAINT "VideoReaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VideoReaction_userId_videoId_key" ON "VideoReaction"("userId", "videoId");

-- AddForeignKey
ALTER TABLE "VideoReaction" ADD CONSTRAINT "VideoReaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoReaction" ADD CONSTRAINT "VideoReaction_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
