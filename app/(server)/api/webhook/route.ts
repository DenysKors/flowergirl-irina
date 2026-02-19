import { bot } from "@/services/telegram";
import { webhookCallback } from "grammy";

export const POST = webhookCallback(bot, "std/http");
