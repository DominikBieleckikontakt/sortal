ALTER TABLE `accounts` RENAME COLUMN `provider` TO `provider_id`;--> statement-breakpoint
DROP INDEX `provider_providerAccountId_idx` ON `accounts`;--> statement-breakpoint
ALTER TABLE `accounts` ADD `provider_type` varchar(255);--> statement-breakpoint
CREATE INDEX `provider_providerAccountId_idx` ON `accounts` (`provider_id`,`account_id`);