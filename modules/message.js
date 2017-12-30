var db = require('./db');

function sendMessage(bot, message, body) {
   bot.reply(message, body.word, (err, res) => {
      bot.api.reactions.add({
         name: 'white_check_mark',
         channel: message.channel,
         timestamp: res.message.ts
      });
      bot.api.reactions.add({
         name: 'negative_squared_cross_mark',
         channel: message.channel,
         timestamp: res.message.ts
      });
   });
};

function choiceword(bot, message) {
   db.serialize(() => {
      db.all('select word, meaning, count from words',
         function (err, rows) {
            if (err) throw console.log(err);
            var index = Math.floor(Math.random() * rows.length);
            var text = rows[index - 1];
            sendMessage(bot, message, text);
     });
   });
 };

module.exports = choiceword;
