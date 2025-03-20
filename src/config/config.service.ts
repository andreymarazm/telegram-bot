import { config, DotenvParseOutput } from "dotenv"
import { IConfigService } from "./config.interface"

export class ConfigService implements IConfigService {
    private config: DotenvParseOutput
    
    constructor() {
        const { error, parsed } = config()
        
        if (error) throw new Error('Cant find .env')
        else if (!parsed)throw new Error('.env is empty')

        this.config = parsed
    }
    
    public get(key: string): string {
        const res = this.config[key]

        if(!res) throw new Error('There isnt that key')
        return res
    }
}