const TelegramBot = require('node-telegram-bot-api');

const TOKEN = '582781742:AAEdHk29QT-MAYqG8697qjocsY5hOUnzqgk';

const bot = new TelegramBot(TOKEN, {polling: true});

const Xray = require('x-ray');

const request = require('request');

const fs = require('fs');

const xray = new Xray();

var url = 'https://ru.wikipedia.org/wiki/';

bot.on('message', msg => {

    xray(url + msg.text, '.infobox.vcard', [{
        title: 'td',
        content: 'td a'
    }]).write('results.json');
});




