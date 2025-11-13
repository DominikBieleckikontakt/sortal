ALTER TABLE `users` MODIFY COLUMN `email_verified` boolean;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `email_verified` boolean DEFAULT false;