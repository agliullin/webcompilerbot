const TelegramBot = require('node-telegram-bot-api');

const TOKEN = '582781742:AAEdHk29QT-MAYqG8697qjocsY5hOUnzqgk';

const bot = new TelegramBot(TOKEN, {polling: true});

const Xray = require('x-ray');

const request = require('request');

const cheerio = require('cheerio');

const fs = require('fs');

const xray = new Xray();

var url = 'https://en.wikipedia.org/wiki/';


bot.on('message', msg => {


    request(url + msg.text, function(err, res, body){
        if (err) {
            console.log(err);
        } else{
            $ = cheerio.load(body);
            var results = [];
            $('#mw-content-text p').each(function(){
                results.push({
                    value:$(this).text()
                });
            });

            results.forEach(function(result, index) {
                bot.sendMessage(msg.chat.id, result.value);
            });

        }
    });

    //.write('results.json');
});


/*
bot.on('message', msg => {
    xray('https://tproger.ru/translations/web-scraping-node-js/', 'div', [{
        title: 'h2',
        content: 'p'
    }])(function(err, results) {
        results.forEach(function(result, index) {
            bot.sendMessage(msg.chat.id, result.title);
        });
    });
    //.write('results.json');
});
*/



