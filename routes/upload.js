const { Router } = require('express');
const { db } = require('../firebase');

const router = Router();

// /upload Save new hamster object to database (POST)
router.post('/', async (req, res) => {
        
    let dbLength = 0;
    await db
            .collection('hamsters')
            .get()
            .then(snapshot => {
                dbLength = snapshot.size; // Will return number of objects in db
            });

    let hamster = {
        age: req.body.age,
        favFood: req.body.favFood,
        id: dbLength + 1,
        imgName: req.body.imgName,
        wins: 0,
        defeats: 0,
        games: 0,
        loves: req.body.loves,
        name: req.body.name
    }

    try {

        await db
        .collection('hamsters')
        .doc()
        .set(hamster);

        res.status(201).send({msg: 'Hamster data uploaded to database'})

    }
    catch(err) {

        res.status(500).send(err);

    }
})

module.exports = router;