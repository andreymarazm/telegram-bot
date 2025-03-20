import { Markup } from "telegraf"

export interface IButton {
    buttonHere(): ReturnType<typeof Markup.inlineKeyboard>
}