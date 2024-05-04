-- CreateTable
CREATE TABLE `aboutus` (
    `abid` INTEGER NOT NULL AUTO_INCREMENT,
    `about` TEXT NOT NULL,

    PRIMARY KEY (`abid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `additional_fees` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `get_id` VARCHAR(200) NOT NULL,
    `tid` VARCHAR(200) NOT NULL,
    `fee` VARCHAR(200) NOT NULL,
    `Amount` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attachment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `get_id` VARCHAR(200) NOT NULL,
    `tid` VARCHAR(200) NOT NULL,
    `attached_file` TEXT NOT NULL,
    `date_time` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `backup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tracking_id` VARCHAR(200) NOT NULL,
    `amount` VARCHAR(200) NOT NULL,
    `address` TEXT NOT NULL,
    `date_time` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `banner` (
    `banaid` INTEGER NOT NULL AUTO_INCREMENT,
    `bannar` TEXT NOT NULL,

    PRIMARY KEY (`banaid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `battachment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `get_id` VARCHAR(200) NOT NULL,
    `tid` VARCHAR(200) NOT NULL,
    `attached_file` TEXT NOT NULL,
    `date_time` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `borrowers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fname` VARCHAR(200) NOT NULL,
    `lname` VARCHAR(200) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `phone` VARCHAR(200) NOT NULL,
    `addrs1` TEXT NOT NULL,
    `addrs2` TEXT NOT NULL,
    `city` VARCHAR(200) NOT NULL,
    `state` VARCHAR(200) NOT NULL,
    `zip` VARCHAR(200) NOT NULL,
    `country` VARCHAR(200) NOT NULL,
    `comment` TEXT NOT NULL,
    `account` VARCHAR(200) NOT NULL,
    `balance` DECIMAL(18, 2) NOT NULL,
    `image` VARCHAR(200) NULL,
    `date_time` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `status` VARCHAR(200) NOT NULL,

    UNIQUE INDEX `account`(`account`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `collateral` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idm` VARCHAR(200) NOT NULL,
    `tid` VARCHAR(200) NOT NULL,
    `name` VARCHAR(200) NOT NULL,
    `type_of_collateral` VARCHAR(200) NOT NULL,
    `model` VARCHAR(200) NOT NULL,
    `make` VARCHAR(200) NOT NULL,
    `serial_number` VARCHAR(200) NOT NULL,
    `estimated_price` VARCHAR(200) NOT NULL,
    `proof_of_ownership` TEXT NOT NULL,
    `cimage` TEXT NOT NULL,
    `observation` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `countries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL DEFAULT '',
    `alpha_2` VARCHAR(200) NOT NULL DEFAULT '',
    `alpha_3` VARCHAR(200) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `emp_permission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tid` VARCHAR(200) NOT NULL,
    `module_name` VARCHAR(350) NOT NULL,
    `pcreate` VARCHAR(20) NOT NULL,
    `pread` VARCHAR(20) NOT NULL,
    `pupdate` VARCHAR(20) NOT NULL,
    `pdelete` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `emp_role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `etemplates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sender` VARCHAR(200) NOT NULL,
    `receiver_email` VARCHAR(350) NOT NULL,
    `subject` VARCHAR(350) NOT NULL,
    `msg` TEXT NOT NULL,
    `time_date` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faqs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `topic` TEXT NOT NULL,
    `content` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fin_info` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `get_id` VARCHAR(200) NOT NULL,
    `tid` VARCHAR(200) NOT NULL,
    `occupation` TEXT NOT NULL,
    `mincome` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `footer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(200) NOT NULL,
    `pho` VARCHAR(200) NOT NULL,
    `face` VARCHAR(200) NOT NULL,
    `webs` VARCHAR(200) NOT NULL,
    `conh` VARCHAR(200) NOT NULL,
    `twi` VARCHAR(200) NOT NULL,
    `gplus` VARCHAR(200) NOT NULL,
    `ins` VARCHAR(200) NOT NULL,
    `yous` VARCHAR(200) NOT NULL,
    `about` TEXT NOT NULL,
    `apply` TEXT NOT NULL,
    `mission` TEXT NOT NULL,
    `objective` TEXT NOT NULL,
    `map` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hiw` (
    `hid` INTEGER NOT NULL AUTO_INCREMENT,
    `hiw` TEXT NOT NULL,

    PRIMARY KEY (`hid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `loan_info` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `borrower` VARCHAR(200) NOT NULL,
    `baccount` VARCHAR(200) NOT NULL,
    `desc` TEXT NOT NULL,
    `amount` VARCHAR(200) NOT NULL,
    `date_release` VARCHAR(200) NOT NULL,
    `agent` VARCHAR(200) NOT NULL,
    `g_name` VARCHAR(200) NOT NULL,
    `g_phone` VARCHAR(200) NOT NULL,
    `g_address` TEXT NOT NULL,
    `rela` VARCHAR(200) NOT NULL,
    `g_image` VARCHAR(200) NOT NULL,
    `status` VARCHAR(200) NOT NULL,
    `remarks` TEXT NOT NULL,
    `pay_date` VARCHAR(200) NOT NULL,
    `amount_topay` VARCHAR(200) NOT NULL,
    `teller` VARCHAR(200) NOT NULL,
    `remark` TEXT NOT NULL,
    `upstatus` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sender_id` VARCHAR(200) NOT NULL,
    `sender_name` VARCHAR(200) NOT NULL,
    `msg_to` VARCHAR(200) NOT NULL,
    `subject` VARCHAR(300) NOT NULL,
    `message` TEXT NOT NULL,
    `date_time` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mywallet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tid` VARCHAR(200) NOT NULL,
    `t_to` VARCHAR(200) NOT NULL,
    `Amount` VARCHAR(200) NOT NULL,
    `Desc` VARCHAR(200) NOT NULL,
    `wtype` VARCHAR(200) NOT NULL,
    `tdate` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pay_schedule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `get_id` VARCHAR(200) NOT NULL,
    `tid` VARCHAR(200) NOT NULL,
    `schedule` VARCHAR(200) NOT NULL,
    `balance` VARCHAR(200) NOT NULL,
    `interest` VARCHAR(200) NOT NULL,
    `payment` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_schedule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idm` VARCHAR(200) NOT NULL,
    `tid` VARCHAR(200) NOT NULL,
    `term` VARCHAR(200) NOT NULL,
    `day` VARCHAR(200) NOT NULL,
    `schedule` VARCHAR(200) NOT NULL,
    `interest` VARCHAR(200) NOT NULL,
    `penalty` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tid` VARCHAR(200) NOT NULL,
    `account` VARCHAR(200) NOT NULL,
    `account_no` VARCHAR(200) NOT NULL,
    `customer` VARCHAR(200) NOT NULL,
    `loan` VARCHAR(200) NOT NULL,
    `pay_date` VARCHAR(200) NOT NULL,
    `amount_to_pay` VARCHAR(200) NOT NULL,
    `remarks` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sms_gateway` TEXT NOT NULL,
    `username` TEXT NOT NULL,
    `password` TEXT NOT NULL,
    `api` TEXT NOT NULL,
    `status` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `systemset` (
    `sysid` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `name` VARCHAR(200) NOT NULL,
    `footer` TEXT NOT NULL,
    `abb` VARCHAR(200) NOT NULL,
    `fax` TEXT NOT NULL,
    `currency` TEXT NOT NULL,
    `website` TEXT NOT NULL,
    `mobile` TEXT NOT NULL,
    `image` VARCHAR(200) NOT NULL,
    `address` TEXT NOT NULL,
    `email` TEXT NOT NULL,
    `map` TEXT NOT NULL,
    `stamp` VARCHAR(350) NOT NULL,
    `timezone` TEXT NOT NULL,
    `sms_charges` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`sysid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `txid` VARCHAR(200) NOT NULL,
    `t_type` VARCHAR(200) NOT NULL,
    `acctno` VARCHAR(200) NOT NULL,
    `fn` VARCHAR(200) NOT NULL,
    `ln` VARCHAR(200) NOT NULL,
    `email` VARCHAR(300) NOT NULL,
    `phone` VARCHAR(200) NOT NULL,
    `amount` DECIMAL(18, 2) NOT NULL,
    `date_time` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `username` VARCHAR(50) NULL,
    `isSync` BIT(1) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `twallet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tid` VARCHAR(200) NOT NULL,
    `Total` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `userid` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `phone` VARCHAR(200) NOT NULL,
    `addr1` TEXT NOT NULL,
    `addr2` TEXT NOT NULL,
    `city` VARCHAR(200) NOT NULL,
    `state` VARCHAR(200) NOT NULL,
    `zip` VARCHAR(200) NOT NULL,
    `country` VARCHAR(200) NOT NULL,
    `comment` VARCHAR(200) NOT NULL,
    `username` VARCHAR(200) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `id` VARCHAR(200) NOT NULL,
    `image` TEXT NOT NULL,
    `role` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`userid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
