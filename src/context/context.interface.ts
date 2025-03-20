import { Context } from "telegraf"

export interface SessionData {
    name: string
}

export interface IBotContext extends Context {
    session: SessionData
}