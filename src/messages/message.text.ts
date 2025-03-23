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
        if (ctx.text === 'Buttons') {
            await ctx.sendMessage('Here you are', this.button.buttonHere())
        } else if (ctx.text === 'Edit my name') {
            ctx.session.name = '123'
            await ctx.sendMessage(`Okay, ${ctx.session.name}`)
        } else if (ctx.text === 'Show image') {
            await ctx.sendPhoto({ source: join(__dirname, '../', 'public', 'logo.jpg') })
        }

        this.bot.action('one', ctx => {
            ctx.editMessageText('One')
        })
        this.bot.action('two', ctx => {
            ctx.editMessageText('Two')
        })
        this.bot.action('three', ctx => {
            ctx.editMessageText('Three')
        })
    }
}