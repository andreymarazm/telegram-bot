import { Markup } from "telegraf"
import { IButton } from "./button.interface"

export class Button implements IButton {
    public buttonHere(): ReturnType<typeof Markup.inlineKeyboard> {
        return Markup.inlineKeyboard([

        ])
    }
}