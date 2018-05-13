load('parse.js');
load('ieee754.js');
load('ir.js');
load('pascal_demo.js');
load('llvm.js/compiler.js');



const TelegramBot = require('node-telegram-bot-api')

const TOKEN = '582781742:AAEdHk29QT-MAYqG8697qjocsY5hOUnzqgk'

const bot = new TelegramBot(TOKEN, {polling: true})

bot.on('message', msg => {
    var GetText = msg.text;
    var ParseText = doParse(GetText);
    bot.sendMessage(msg.chat.id, 'Parsing result: ');
    bot.sendMessage(msg.chat.id, ParseText);
    var IRText = doIR(ParseText);
    bot.sendMessage(msg.chat.id, 'IR result: ');
    bot.sendMessage(msg.chat.id, IRText);
    var OptimizeText = doOptimize(IRText);
    bot.sendMessage(msg.chat.id, 'Optimize result: ');
    bot.sendMessage(msg.chat.id, OptimizeText);
    var CompileText = doCompile(OptimizeText);
    bot.sendMessage(msg.chat.id, 'Compile result: ');
    bot.sendMessage(msg.chat.id, CompileText);
    var ExecuteText = doExecute(CompileText);
    bot.sendMessage(msg.chat.id, 'Execute result: ');
    bot.sendMessage(msg.chat.id, ExecuteText);
})

