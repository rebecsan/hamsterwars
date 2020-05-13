const { Router } = require('express');
const { auth, db } = require('./../firebase');

const router = new Router();

// /games GET Returnerar en array med samtliga matchobject som hållits.

// /games POST Sparar en match med formatet:

/* {
    id: Number,
    timeStamp: Date,
    contestants: [
        { hamsterobject },
        { hamsterobject }
    ],
    winner: { hamsterobject }
} */





module.exports = router;