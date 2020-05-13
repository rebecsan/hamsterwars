const { Router } = require('express');
const { auth, db } = require('./../firebase');

const router = new Router();

// /games GET Returnerar en array med samtliga matchobject som hållits.
router.get('/', async (req, res) => {

    try {

        let games = [];
        
        // Get all games from firebase
        let snapshot = await db
        .collection('games')
        .get();

        snapshot.forEach(game => {
            games.push(game.data())
        })

        res.send(games);
        
    } 
    catch (err) {

        res.status(500).send(err);
        
    }

})



// /games Saves a game to firestore collection games (POST)
router.post('/', async (req, res) => {
    
    let game = {
            id: req.body.id,
            timeStamp: Date.now(),
            contestants: [
                { hamster1: (req.body.contestants[0].hamster1) },
                { hamster2: req.body.contestants[1].hamster2 }
            ],
            winner: req.body.winner
        }
    
    try {

        await db
        .collection('games')
        .doc()
        .set(game);

        res.send({msg: 'Game uploaded to database'})

    }
    catch(err) {

        res.status(500).send(err);

    }
})

module.exports = router;