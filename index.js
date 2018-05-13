require('parse.js')
require('ieee754.js')
require('ir.js')
require('pascal_demo.js')
require('llvm.js/compiler.js')

const TelegramBot = require('node-telegram-bot-api')

const TOKEN = '582781742:AAEdHk29QT-MAYqG8697qjocsY5hOUnzqgk'

const bot = new TelegramBot(TOKEN, {polling: true})

bot.on('message', msg => {
    GetText = msg.text;
    ParseText = doParse(GetText, 'the_ast');
    IRText = doIR(ParseText, 'the_ir');
    OptimizeText = doOptimize(IRText, 'the_ir2');
    CompileText = doCompile(OptimizeText, 'the_js');
    ExecuteText = doExecute(CompileText, 'the_output');
    bot.sendMessage(msg.chat.id, ExecuteText);
})

