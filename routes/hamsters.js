const { Router } = require('express');
const { auth, db } = require('./../firebase');

const router = new Router();

// /hamsters Return array with all hamsterobjects (GET)
router.get('/', async (req, res) => {

    try {

        let hamsters = [];
        
        // Get all hamsters from firebase
        let snapshot = await db
        .collection('hamsters')
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

// /hamsters/:id Return hamsterobject with requested ID (GET)
router.get('/:id', async (req, res) => {

    if(req.params.id !== 'random'){

        try {
            
            let hamster;
            
            // Get all hamsters with the matching id from firebase
            let snapshot = await db
            .collection('hamsters')
            .where('id', '==', (req.params.id)*1)
            .get();
            
            snapshot.forEach(doc => {
                hamster = doc.data()
            })
            
            res.send(hamster);
            
        } 
        catch (err) {
            
            res.status(500).send(err);
            
        }
        
    } else {
        
        // /hamsters/random Returns a random hamsterobject
        try {

            let hamster;
            let randId = Math.floor(Math.random() * 40) + 1;
            
            // Get all hamsters with the matching id from firebase
            let snapshot = await db
            .collection('hamsters')
            .where('id', '==', randId)
            .get();
    
            console.log(randId)
            
            snapshot.forEach(doc => {
                hamster = doc.data()
            })
    
            res.send(hamster);
            
        } 
        catch (err) {
    
            res.status(500).send(err);
            
        }

    }
})


// /hamsters/:id/result Updates wins/defeats and games with +1 on requested hamsterobject (PUT)
router.put('/:id/result', async (req, res) => {

    try {
        
        // Get all hamsters with the matching id from firebase
        let snapshot = await db
        .collection('hamsters')
        .where('id', '==', (req.params.id)*1)
        .get();

        // Loop through results
        snapshot.forEach(doc => {

            // Check that no more than one game, win or defeat can be added in one request
            if (req.body.wins !== 1 || req.body.defeats !== 1 && req.body.games !== 1) {

                res.send({msg: 'Values can only be 1 or null'})

            } else {
                
                // Store firebase-object as json in variable
                let hamster = doc.data()
                
                if(req.body.wins) {

                    hamster.wins += req.body.wins * 1;

                }

                if(req.body.defeats) {

                    hamster.defeats += req.body.defeats * 1;

                }

                hamster.games += req.body.games * 1;
                
                // Update database with new values
                db
                .collection('hamsters')
                .doc(doc.id)
                .update(hamster)
                .then(res.send({msg: `Updated hamster ${req.params.id}`}))
                .catch(err => { throw err })
            }

        })  

    }
    catch (err) {

        res.status(500).send(err);
        
    }

})

module.exports = router;