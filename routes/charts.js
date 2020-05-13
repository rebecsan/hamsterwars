const { Router } = require('express');
const { auth, db } = require('./../firebase');

const router = new Router();

// /charts/top GET Returnerar en array med top 5 mest vinnande hamsterobject.

// /charts/bottom GET Returnerar en array med top 5 mest förlorande hamsterobject.


module.exports = router;