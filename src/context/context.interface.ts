import { Context } from "telegraf"

export interface SessionData {}

export interface IBotContext extends Context {
    session: SessionData
}