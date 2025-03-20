import { Markup } from "telegraf"
import { IButton } from "./button.interface"

export class Button implements IButton {
    public buttonHere(): ReturnType<typeof Markup.inlineKeyboard> {
        return Markup.inlineKeyboard([
            {text: '1', callback_data: 'one'},
            {text: '2', callback_data: 'two'},
            {text: '3', callback_data: 'three'}
        ])
    }
}