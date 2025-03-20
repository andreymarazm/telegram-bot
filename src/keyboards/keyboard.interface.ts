import { Markup } from "telegraf"

export interface IKeyboard {
    keyboardStart(): ReturnType<typeof Markup.keyboard>
}