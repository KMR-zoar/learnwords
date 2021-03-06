if (!process.env.token) {
   console.log('Error: Specify token in environment.');
   process.exit(1);
}

const Botkit = require('botkit');
const controller = Botkit.slackbot({
   debug: false
});

const bot = controller.spawn({
   token: process.env.token
}).startRTM(function(err, bot, payload) {
   if (err) {
      console.log('Error: Cannot to Slack');
      process.exit(1);
   }
});

const sendWord = require('./modules/message');
const reactionprocess = require('./modules/reactionprocess');

controller.hears('q',['ambient'],(bot, message) => {
   sendWord(bot, message);
});

controller.on('reaction_added',(bot, event) => {
   if ((event.user == 'U0LMFP6Q0') &&
       (event.item_user == 'U8MB8MZ9U')) {
      reactionprocess(bot, event);
   };
});