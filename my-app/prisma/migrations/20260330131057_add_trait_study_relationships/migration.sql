-- CreateTable
CREATE TABLE `charactertrait` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `charactertrait_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `study` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    UNIQUE INDEX `study_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `charactertraittostudy` (
    `charactertraitId` INTEGER NOT NULL,
    `studyId` INTEGER NOT NULL,

    PRIMARY KEY (`charactertraitId`, `studyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `charactertraittostudy` ADD CONSTRAINT `charactertraittostudy_charactertraitId_fkey` FOREIGN KEY (`charactertraitId`) REFERENCES `charactertrait`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `charactertraittostudy` ADD CONSTRAINT `charactertraittostudy_studyId_fkey` FOREIGN KEY (`studyId`) REFERENCES `study`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
