import { Context, Telegraf } from "telegraf"
import { MessageClass } from "./message.class"
import { IButton } from "../buttons/button.interface"
import { IBotContext } from "../context/context.interface"

export class MessageText extends MessageClass {
    constructor(public bot: Telegraf<IBotContext>, private readonly button: IButton) {
        super(bot)
    }

    public async send(ctx: Context): Promise<void> {
        if (ctx.text === 'Buttons') {
            await ctx.sendMessage('Here you are', this.button.buttonHere())
        }

        this.bot.action('one', ctx => {
            ctx.editMessageText('One')
        })
        this.bot.action('two', ctx => {
            ctx.editMessageText('Two')
        })
        this.bot.action('Three', ctx => {
            ctx.editMessageText('Three')
        })
    }
}