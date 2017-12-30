var db = require('./db');

function searchmeaning(bot,event) {
   bot.api.channels.replies({
      channel: event.item.channel,
      thread_ts: event.item.ts
   },
   (err, res) => {
      var word = res.messages[0].text;
      var sql = 'SELECT count FROM words WHERE word =' + '\'word\'';
      db.all(sql, (dberr, dbres) =>{
         var count = dbres[0].count + 1;
         console.log(count);
         var sql = 'UPDATE words SET count = ' + count + ' WHERE word =' + '\'word\'';
         db.run(sql,);
         console.log(sql);
      });
      /*
      bot.api.chat.update({
         channel: event.item.channel,
         ts: event.item.ts,
         text: 'poison'
      });
      */
   });
};

module.exports = searchmeaning;