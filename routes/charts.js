const { Router } = require('express');
const { db } = require('./../firebase');

const router = new Router();

// /charts/top Return the top 5 hamsters ordered by wins (GET)
router.get('/top', async (req, res) => {

    try {

        let hamsters = [];
        
        // Get all hamsters from firebase
        let snapshot = await db
        .collection('hamsters')
        .orderBy('wins', 'desc')
        .limit(5)
        .get();

        snapshot.forEach(hamster => {
            hamsters.push(hamster.data())
        })

        res.send(hamsters);
        
    } 
    catch (err) {

        res.status(500).send(err);
        
    }

})

// /charts/bottom Return the top 5 hamsters ordered by defeats (GET)
router.get('/bottom', async (req, res) => {

    try {

        let hamsters = [];
        
        // Get all hamsters from firebase
        let snapshot = await db
        .collection('hamsters')
        // Order by most defeated
        .orderBy('defeats', 'desc')
        // Get only the top 5
        .limit(5)
        .get();

        snapshot.forEach(hamster => {
            hamsters.push(hamster.data())
        })

        res.send(hamsters);
        
    } 
    catch (err) {

        res.status(500).send(err);
        
    }

})

module.exports = router;