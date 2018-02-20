const db = require('./db');

function increment(word) {
   const sql = 'SELECT count FROM words WHERE word =\'' + word + '\'';
   db.serialize(() => {
      db.all(sql, (err, res) =>{
         if (err) throw err;
         if (res.length) {
            const count = res[0].count + 1;
            const sql = 'UPDATE words SET count = ' + count + ' WHERE word =\'' + word + '\'';
            db.run(sql);
         }
      });
   });
};

function reset(word) {
   const count = 0;
   const sql = 'UPDATE words SET count = ' + count + ' WHERE word =\'' + word + '\'';
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
      const word = res.messages[0].text;
      const reaction = event.reaction;
      if (reaction == 'negative_squared_cross_mark') {
         reset(word);
      } else if (reaction == 'white_check_mark') {
         increment(word);
      }
      const sql = 'SELECT meaning FROM words WHERE word =\'' + word + '\'';
      db.serialize(() => {
         db.all(sql,(dberr, dbres) =>{
            if (dbres.length) {
               const meaning = dbres[0].meaning;
               const newtext = word + "\n" + meaning;
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
