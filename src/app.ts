import { Telegraf } from 'telegraf'
import { IConfigService } from './config/config.interface'
import { ConfigService } from './config/config.service'
import { IBotContext } from './context/context.interface'
import { Command } from './commands/command.class'
import { StartCommand } from './commands/start.command'
import LocalSession from 'telegraf-session-local'
import { Keyboard } from './keyboards/keyboard.class'
import { MessageText } from './messages/message.text'
import { Button } from './buttons/button.class'

class Bot {
    private bot: Telegraf<IBotContext>
    private commands: Command[] =[]
    
    constructor(private readonly configService: IConfigService) {
        this.bot = new Telegraf<IBotContext>(this.configService.get('TOKEN'))
        this.bot.use((new LocalSession({ database: 'sessions.json' })).middleware())

        this.bot.telegram.setMyCommands([
            { command: 'start', description: 'Start the bot' },
          ])
    } 

    public init() {
        this.commands = [new StartCommand(this.bot, new Keyboard)]
        for (const command of this.commands) command.handle()

        this.bot.on('message', ctx => {new MessageText(this.bot, new Button).send(ctx)})
        this.bot.launch()
    }

}

const bot = new Bot(new ConfigService())
bot.init()