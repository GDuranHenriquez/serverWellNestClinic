const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const { PORT_LISTENER, FORCE_DB } = process.env;


// Syncing all the models at once.
conn.sync({ force: FORCE_DB }).then(() => {
      server.listen(PORT_LISTENER, () => {
      console.log('%s listening at 3001'); // eslint-disable-line no-console
    });  
});