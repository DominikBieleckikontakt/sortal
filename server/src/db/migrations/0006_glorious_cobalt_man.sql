DROP INDEX `provider_providerAccountId_idx` ON `accounts`;--> statement-breakpoint
ALTER TABLE `accounts` ADD `account_id` varchar(255) NOT NULL;--> statement-breakpoint
CREATE INDEX `provider_providerAccountId_idx` ON `accounts` (`provider`,`account_id`);--> statement-breakpoint
ALTER TABLE `accounts` DROP COLUMN `provider_account_id`;