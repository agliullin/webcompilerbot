const TelegramBot = require('node-telegram-bot-api')

const TOKEN = '582781742:AAEdHk29QT-MAYqG8697qjocsY5hOUnzqgk'

const bot = new TelegramBot(TOKEN, {polling: true})

bot.on('message', msg => {
    bot.sendMessage(msg.chat.id, `Hello ${msg.from.first_name}, it is compiler bot`)
})

