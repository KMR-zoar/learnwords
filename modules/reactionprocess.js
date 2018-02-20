var db = require('./db');

function increment(word) {
   var sql = 'SELECT count FROM words WHERE word =\'' + word + '\'';
   db.serialize(() => {
      db.all(sql, (err, res) =>{
         if (err) throw err;
         if (res.length) {
            var count = res[0].count + 1;
            var sql = 'UPDATE words SET count = ' + count + ' WHERE word =\'' + word + '\'';
            db.run(sql);
         }
      });
   });
};

function reset(word) {
   var count = 0;
   var sql = 'UPDATE words SET count = ' + count + ' WHERE word =\'' + word + '\'';
   db.serialize(() => {
      db.run(sql);
   });
};

function searchmeaning(bot,event) {
   bot.api.channels.replies({
      channel: event.item.channel,
      thread_ts: event.item.ts
   },
   (err, res) => {
      var word = res.messages[0].text;
      var reaction = event.reaction;
      if (reaction == 'negative_squared_cross_mark') {
         reset(word);
      } else if (reaction == 'white_check_mark') {
         increment(word);
      }
      var sql = 'SELECT meaning FROM words WHERE word =\'' + word + '\'';
      db.serialize(() => {
         db.all(sql,(dberr, dbres) =>{
            if (dbres.length) {
               var meaning = dbres[0].meaning;
               var newtext = word + "\n" + meaning;
               bot.api.chat.update({
                  channel: event.item.channel,
                  ts: event.item.ts,
                  text: newtext
               });
            }
         });
      });
   });
};

module.exports = searchmeaning;
