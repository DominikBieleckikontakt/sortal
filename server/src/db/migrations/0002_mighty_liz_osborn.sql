CREATE TABLE `accounts` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`provider_account_id` varchar(255) NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`expires_at` timestamp,
	CONSTRAINT `accounts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`expires_at` timestamp NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `verification_tokens` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires_at` timestamp NOT NULL
);
--> statement-breakpoint
DROP TABLE `refresh_tokens`;--> statement-breakpoint
DROP TABLE `user_sessions`;--> statement-breakpoint
ALTER TABLE `users` RENAME COLUMN `password` TO `hashed_password`;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `id` varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `hashed_password` varchar(256);--> statement-breakpoint
ALTER TABLE `users` ADD `name` varchar(256);--> statement-breakpoint
ALTER TABLE `users` ADD `image` text;--> statement-breakpoint
CREATE INDEX `provider_providerAccountId_idx` ON `accounts` (`provider`,`provider_account_id`);--> statement-breakpoint
CREATE INDEX `verification_tokens_idx` ON `verification_tokens` (`identifier`,`token`);--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `is_active`;