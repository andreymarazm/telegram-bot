import { Markup } from "telegraf"
import { IKeyboard } from "./keyboard.interface"

export class Keyboard implements IKeyboard {
    public keyboardStart(): ReturnType<typeof Markup.keyboard> {
        return Markup.keyboard([
            {text: 'Buttons'},
            {text: 'Edit my name'},
            {text: 'Show image'}
        ])
    }
}