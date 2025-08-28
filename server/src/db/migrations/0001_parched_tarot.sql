CREATE TABLE `refresh_tokens` (
	`id` varchar(256) NOT NULL DEFAULT 'ad7a8d60-1d56-41dd-b855-e4033c93050a',
	`token` varchar(256) NOT NULL,
	`user_id` varchar(256) NOT NULL,
	`expires_at` timestamp NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`is_revoked` boolean DEFAULT false,
	CONSTRAINT `refresh_tokens_id` PRIMARY KEY(`id`),
	CONSTRAINT `refresh_tokens_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `user_sessions` (
	`id` varchar(256) NOT NULL DEFAULT 'dad6edb6-3ab3-40eb-98f6-2560920681ec',
	`user_id` varchar(256) NOT NULL,
	`session_token` varchar(256) NOT NULL,
	`ip_address` varchar(45),
	`user_agent` varchar(256),
	`last_activity` timestamp DEFAULT (now()),
	`expires_at` timestamp NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `user_sessions_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_sessions_session_token_unique` UNIQUE(`session_token`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `id` varchar(256) NOT NULL DEFAULT '68ad3bf4-8247-45e2-9f48-6fcc9b65853f';--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `email` varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `password` varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `created_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `users` ADD `is_active` boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE `refresh_tokens` ADD CONSTRAINT `refresh_tokens_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_sessions` ADD CONSTRAINT `user_sessions_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `token_idx` ON `refresh_tokens` (`token`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `refresh_tokens` (`user_id`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `users` (`email`);