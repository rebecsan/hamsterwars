const express = require('express');
const app = express();

// Serve static files from public-folder
app.use(express.static('public'));

// All post.body  > json
app.use(express.json());

// ROUTES
const assetsRoute = require('./routes/assets')
app.use('/assets', assetsRoute);

const chartsRoute = require('./routes/charts')
app.use('/charts', chartsRoute);

const gamesRoute = require('./routes/games')
app.use('/games', gamesRoute);

const hamstersRoute = require('./routes/hamsters')
app.use('/hamsters', hamstersRoute);

const statsRoute = require('./routes/stats')
app.use('/stats', statsRoute);


// Run server on port 3000
app.listen(3000, () => {
    console.log('Server running on port 3000');
})