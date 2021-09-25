/*
  Warnings:

  - A unique constraint covering the columns `[questionId,index]` on the table `Alternative` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[questionId,alternativeId,userId]` on the table `Answer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[surveyId,index]` on the table `Question` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Alternative_questionId_index_key" ON "Alternative"("questionId", "index");

-- CreateIndex
CREATE UNIQUE INDEX "Answer_questionId_alternativeId_userId_key" ON "Answer"("questionId", "alternativeId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Question_surveyId_index_key" ON "Question"("surveyId", "index");
