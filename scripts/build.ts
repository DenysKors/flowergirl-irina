import { bot } from "@/services/telegram";

const host = process.env.WEBHOOK;
const webhook = `${host}/api/webhook`;

void bot.api.setWebhook(webhook);
