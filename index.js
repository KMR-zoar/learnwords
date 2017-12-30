if (!process.env.token) {
   console.log('Error: Specify token in environment.');
   process.exit(1);
}

var Botkit = require('botkit');
var controller = Botkit.slackbot({
   debug: false
});

var bot = controller.spawn({
   token: process.env.token
}).startRTM(function(err, bot, payload) {
   if (err) {
      console.log('Error: Cannot to Slack');
      process.exit(1);
   }
});

controller.hears('q',['ambient'],(bot, message) => {
   bot.reply(message, 'Hello World!', (err, res) => {
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
});