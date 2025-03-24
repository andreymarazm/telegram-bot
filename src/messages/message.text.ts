import { Context, Telegraf } from "telegraf"
import { MessageClass } from "./message.class"
import { IButton } from "../buttons/button.interface"
import { IBotContext } from "../context/context.interface"
import { join } from "path"

export class MessageText extends MessageClass {
    constructor(public bot: Telegraf<IBotContext>, private readonly button: IButton) {
        super(bot)
    }

    public async send(ctx: IBotContext): Promise<void> {
        
    }
}