import { Command } from "./command.class"
import { Telegraf } from "telegraf"
import { IBotContext } from "../context/context.interface"
import { IKeyboard } from "../keyboards/keyboard.interface"

export class StartCommand extends Command {
    constructor(public bot: Telegraf<IBotContext>, private readonly keyboard: IKeyboard) {
        super(bot)
    }
    
    public handle(): void {
        this.bot.start(ctx => {
            ctx.session.name = ctx.message.from.username!
            ctx.sendMessage(`Welcome, ${ctx.session.name}`, this.keyboard.keyboardStart())
        })
    }
}