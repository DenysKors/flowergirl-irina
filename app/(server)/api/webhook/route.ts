// import { bot } from "@/app/bot";
import { webhookCallback } from "grammy";

import { Bot } from "grammy";

const token: string = process.env.BOT_TOKEN || "";

export const bot = new Bot(token);

bot.on("message", async (ctx) => {
  await ctx.reply("Hi there!");
});

// webhookCallback will make sure that the correct middleware(listener) function is called
export const POST = webhookCallback(bot, "std/http");
