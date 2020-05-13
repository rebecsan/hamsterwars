const { Router } = require('express');
const { auth, db } = require('./../firebase');

const router = new Router();

// /stats/total GET Returnerar ett statsobject med totalt antal matcher som hållits.

// /stats/{opt} GET Känner er fria att sammanställa annan spännande statistik, ex. hur många % gillar majs? Vad är medelåldern på samtliga hamstrar, etc.

/* {
    totalGames: Number
    ... // custom stats
} */

module.exports = router;