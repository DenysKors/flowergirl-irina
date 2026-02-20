import { bot } from "@/app/(server)/api/webhook/route";
import { webhookCallback } from "grammy";

// webhookCallback will make sure that the correct middleware(listener) function is called
export default webhookCallback(bot, "next-js");
