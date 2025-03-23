import { Telegraf } from 'telegraf'
import { IConfigService } from './config/config.interface'
import { ConfigService } from './config/config.service'
import { IBotContext, SessionData } from './context/context.interface'
import { Command } from './commands/command.class'
import { StartCommand } from './commands/start.command'
import { Keyboard } from './keyboards/keyboard.class'
import { MessageText } from './messages/message.text'
import { Button } from './buttons/button.class'
import { ConfigDataSource } from './session/session.database'
import { Session } from './session/session.entity'

declare module "telegraf" {
    interface Context {
        session: SessionData
    }
}  

class Bot {
    private bot: Telegraf<IBotContext>
    private commands: Command[] =[]
    private configDataSource: ConfigDataSource
    
    constructor(private readonly configService: IConfigService) {
        this.configDataSource = new ConfigDataSource(configService)

        this.configDataSource.initialize()
            .then(() => console.log("Database connected!"))
            .catch((error) => console.error("Error during Data Source initialization:", error))

        this.bot = new Telegraf<IBotContext>(this.configService.get('TOKEN'))
        // this.bot.use((new LocalSession({ database: 'sessions.json' })).middleware())

        this.bot.use(async (ctx, next) => {
            const sessionRepo = this.configDataSource.getRepository(Session)
          
            let session = await sessionRepo.findOneBy({ id: ctx.chat?.id?.toString() || "" })
            
            if (!session) {
                session = sessionRepo.create({
                id: ctx.chat?.id?.toString() || "",
                data: {},
            })
              await sessionRepo.save(session)
            }
          
            ctx.session = session.data
          
            await next()
          
            session.data = ctx.session
            await sessionRepo.save(session)
          })

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