-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `category_name` VARCHAR(191) NOT NULL,
    `category_status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`category_name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pictures` (
    `id` VARCHAR(191) NOT NULL,
    `pic_title` VARCHAR(191) NOT NULL,
    `pic_desc` VARCHAR(191) NULL,
    `pic_category_name` VARCHAR(191) NOT NULL,
    `pic_image` VARCHAR(191) NULL,
    `pic_ext` VARCHAR(191) NULL,
    `pic_status` BOOLEAN NOT NULL DEFAULT true,
    `pic_create_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pictures` ADD CONSTRAINT `pictures_pic_category_name_fkey` FOREIGN KEY (`pic_category_name`) REFERENCES `categories`(`category_name`) ON DELETE RESTRICT ON UPDATE CASCADE;
