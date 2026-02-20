import { bot } from "@/services/telegram";

const webhook: string = process.env.WEBHOOK || "";

const webhookUrl = `${webhook}/api/webhook`;

void bot.api.setWebhook(webhookUrl);
