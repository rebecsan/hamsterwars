const { Router } = require('express');
const { auth, db } = require('./../firebase');

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

        res.send(`${games.length} rundor har spelats`);
        
    } 
    catch (err) {

        res.status(500).send(err);
        
    }

})

// /stats/{opt} GET Känner er fria att sammanställa annan spännande statistik, ex. hur många % gillar majs? Vad är medelåldern på samtliga hamstrar, etc.

/* {
    totalGames: Number
    ... // custom stats
} */

module.exports = router;