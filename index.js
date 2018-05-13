
require('parse.js');
require('ieee754.js');
require('ir.js');
require('pascal_demo.js');
require('llvm.js/compiler.js');

const TelegramBot = require('node-telegram-bot-api');

const TOKEN = '582781742:AAEdHk29QT-MAYqG8697qjocsY5hOUnzqgk';

const bot = new TelegramBot(TOKEN, {polling: true});

bot.on('message', msg => {
    GetText = msg.text;
    ParseText = doParse(GetText);
    bot.sendMessage(msg.chat.id, 'Parsing result: ');
    bot.sendMessage(msg.chat.id, ParseText);
    IRText = doIR(ParseText);
    bot.sendMessage(msg.chat.id, 'IR result: ');
    bot.sendMessage(msg.chat.id, IRText);
    OptimizeText = doOptimize(IRText);
    bot.sendMessage(msg.chat.id, 'Optimize result: ');
    bot.sendMessage(msg.chat.id, OptimizeText);
    CompileText = doCompile(OptimizeText);
    bot.sendMessage(msg.chat.id, 'Compile result: ');
    bot.sendMessage(msg.chat.id, CompileText);
    ExecuteText = doExecute(CompileText);
    bot.sendMessage(msg.chat.id, 'Execute result: ');
    bot.sendMessage(msg.chat.id, ExecuteText);
});

