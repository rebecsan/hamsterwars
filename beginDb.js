const hamsters = require('./data.json');
const { db } = require('./firebase');

// Upload all hamsterobjects to firestore
(async() => {
    for (const hamster of hamsters) {
        try {
            await db
            .collection('hamsters')
            .doc()
            .set(hamster);
        }
        catch(err) {
            console.error(err);
        }
    }
})()