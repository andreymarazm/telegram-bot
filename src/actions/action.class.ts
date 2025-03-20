import { Context, Telegraf } from "telegraf"
import { IBotContext } from "../context/context.interface"

export abstract class ActionClass {
    constructor(public bot: Telegraf<IBotContext>) {}
    
    public abstract action(ctx: Context): void 
}