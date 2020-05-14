const { Router } = require('express');
const { db } = require('./../firebase');

const router = new Router();

// /stats/total Returns a stats-object with the total number of games (GET)
router.get('/total', async (req, res) => {

    try {

        let games = [];
        
        // Get all games from firebase
        let snapshot = await db
        .collection('games')
        .get();

        snapshot.forEach(game => {
            games.push(game.data())
        })

        res.send(`${games.length} games have been played`);
        
    } 
    catch (err) {

        res.status(500).send(err);
        
    }
})

module.exports = router;