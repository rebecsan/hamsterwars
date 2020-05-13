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

// /hamsters/random Return random hamsterobject (GET)
router.get('/random', async (req, res) => {

        try {

            let hamster;
            let randId = Math.floor(Math.random() * 40) + 1;
            
            // Get all hamsters with the matching id from firebase
            let snapshot = await db
            .collection('hamsters')
            .where('id', '==', randId)
            .get();
            
            snapshot.forEach(doc => {
                hamster = doc.data()
            })
    
            res.send(hamster);
            
        } 
        catch (err) {
    
            res.status(500).send(err);
            
        }

})

// /hamsters/:id Return hamsterobject with requested ID (GET)
router.get('/:id([0-9]+)' /* Reg.exp. checks that id is numeric */, async (req, res) => {

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

            if (hamster === undefined) {
                
                res.status(500).send({ msg: 'Id does not exist'});

            } else {

                res.send(hamster);

            }
            
        } 
        catch (err) {
            
            res.status(500).send(err);
            
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

            // Check that only values 0 or 1 are passed in the request body
            if (req.body.wins !== (1 || 0) && req.body.defeats !== (1 || 0)) {

                res.status(500).send({msg: 'Values can only be 1 or 0.'})

            } else {

                // Check that the passed values are not equal
                if(req.body.wins !== req.body.defeats) {

                    // Store firebase-object as json in variable
                    let hamster = doc.data()
                    
                    hamster.wins += req.body.wins * 1;
                    hamster.defeats += req.body.defeats * 1;
                    hamster.games += 1;
                    
                    // Update database with new values
                    db
                    .collection('hamsters')
                    .doc(doc.id)
                    .update(hamster)
                    .then(res.send({msg: `Updated hamster ${req.params.id}`}))
                    .catch(err => { throw err })

                } else {

                    res.status(500).send({msg: 'Values cannot be equal'})

                }

            }

        })  

    }
    catch (err) {

        res.status(500).send(err);
        
    }

})

module.exports = router;