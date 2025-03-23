import { DataSource } from 'typeorm'
import { IConfigService } from '../config/config.interface'
import { Session } from './session.entity'

export class ConfigDataSource extends DataSource {
    constructor(private readonly configService: IConfigService) {
        super({
            type: 'postgres',
            host: configService.get('DB_HOST') || 'localhost',
            port: parseInt(configService.get('DB_PORT') || '5432'),
            username: configService.get('DB_USER') || 'postgres',
            password: configService.get('DB_PASSWORD') || 'password',
            database: configService.get('DB_NAME') || 'mydatabase',
            entities: [Session],
            synchronize: true,
        })
    }
}
