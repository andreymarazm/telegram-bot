import { Entity, PrimaryColumn, Column } from "typeorm"
import { SessionData } from "../context/context.interface"

@Entity()
export class Session {
    @PrimaryColumn()
    id: string = ''

    @Column("data")
    data: SessionData = {}
}