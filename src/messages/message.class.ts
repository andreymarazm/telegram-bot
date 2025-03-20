import { Context, Telegraf } from "telegraf"
import { IBotContext } from "../context/context.interface"

export abstract class MessageClass {
    constructor(public bot: Telegraf<IBotContext>) {}
    
    public abstract send(ctx: Context): void 
}