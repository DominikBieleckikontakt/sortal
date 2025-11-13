ALTER TABLE `accounts` ADD `id_token` text;--> statement-breakpoint
ALTER TABLE `accounts` ADD `access_token_expires_at` timestamp;--> statement-breakpoint
ALTER TABLE `accounts` ADD `refresh_token_expires_at` timestamp;--> statement-breakpoint
ALTER TABLE `accounts` ADD `password` text;--> statement-breakpoint
ALTER TABLE `accounts` ADD `scope` text;--> statement-breakpoint
ALTER TABLE `accounts` ADD `created_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `accounts` ADD `updated_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `sessions` ADD `token` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `sessions` ADD `updated_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `sessions` ADD `ip_address` varchar(45);--> statement-breakpoint
ALTER TABLE `sessions` ADD `user_agent` varchar(256);--> statement-breakpoint
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_token_unique` UNIQUE(`token`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `sessions` (`user_id`);--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `password`;