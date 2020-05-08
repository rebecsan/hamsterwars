# API Project: HAMSTERWARS
**Ditt projekt är att bygga en backend till kommande webplatsen HAMSTERWARS.** 
Webplatsen är en spinoff på [Kittenwar](http://www.kittenwar.com), en hemsida där matcher mellan två bilder slumpas fram och publiken röstar på den de finner gulligast. Poäng ska räknas, listor ska sammanställas. 

Själva gränssnittet kommer ni göra som slutprojekt efter en skiss ( där egna designideer får utrymme ).

## Relevanta mål

**Kunskaper**
- Backend-programmering med Node.js
- Pakethantering med NPM

**Färdigheter**
- Hantera paket med NPM vid utveckling av webbappplikationer
- Utveckla server-funktionalitet med JavaScript

**Kompetenser**
- Skapa en enklare server-lösning i JavaScript
- Kunna välja och motivera val av ramverk och teknologier utifrån webbapplikationens omfattning och funktionalitet

## Bedömning
**Godkänt**
- Utvecklar Backendprogrammering med Node.js
- Redogör för pakethantering med NPM
- Skapar användarvänliga webbapplikationer
- Utvecklar enklare serverfunktionalitet med JavaScript
- Väljer och motiverar val av ramverk och teknologier utifrån webbapplikationens omfattning och
funktionalitet

**Väl Godkänt**
- Utveckla *med säkerhet* Backendprogrammering med Node.js
- Skapa *med säkerhet* användarvänliga webbapplikationer
- Skapa *självständigt* en serverlösning i JavaScript


## Tekniker
- Node.js
- Express.js
- Firebase Firestore ( npm firebase-admin )

## Inlämning
- Ditt projekt ska inkomma senast **tors 14/5 kl 16**.
- Du lämnar in en github-repo-länk i en *textfil* via ITHSdistans.se ( ironic framework ).


## API spec
|Resurs|Metod|Förväntat svar|
---|---|---
|**/**|GET|Servar React-frontend senare.

```javascript
http://localhost:3000/
```

|Resurs|Metod|Förväntat svar|
---|---|---
|**/assets/**|GET|Servar bilderna via en *static route*.

```javascript
http://localhost:3000/assets/hamster-1.jpg
```

|Resurs|Metod|Förväntat svar|
---|---|---
|**/hamsters**|GET|Returnerar en array med samtliga ```hamsterobject```.
|**/hamsters/:id**|GET|Returnerar ett ```hamsterobject``` med efterfrågat id.
|**/hamsters/:id/result**|PUT|Updaterar ett ```hamsterobject``` egenskaper: *wins*, *defeats* och +1 på *games*.
|**/hamsters/random**|GET|Returnerar ett slumpat ```hamsterobject``` från databasen.

```javascript
// /hamsters
[ { hamsterobject } ]

// /hamsters/1
{ hamsterobject }

// /hamsters/random
{ hamsterobject }

```


|Resurs|Metod|Förväntat svar|
---|---|---
|**/charts/top**|GET|Returnerar en array med top 5 mest vinnande ```hamsterobject```.
|**/charts/bottom**|GET|Returnerar en array med top 5 mest förlorande ```hamsterobject```.

```javascript
[ { hamsterobject } ]
```


|Resurs|Metod|Förväntat svar|
---|---|---
|**/games**|GET|Returnerar en array med samtliga ```matchobject``` som hållits.
|**/games**|POST|Sparar en match med formatet ```{ timeStamp: Date, contestants: [{ hamsterobject }, { hamsterobject } ] }```.

```javascript
[ { gameobject } ]
```



|Resurs|Metod|Förväntat svar|
---|---|---
|**/stats/total**|GET|Returnerar ett ```statsobject``` med totalt antal matcher som hållits.
|**/stats/{opt}**|GET|Känner er fria att sammanställa annan spännande statistik, ex. hur många % gillar majs? Vad är medelåldern på samtliga hamstrar, etc.

```javascript
{ statsobject }
```


## Datamodeller

### hamster object

```javascript

{
    id: Number,
    name: String,
    imgName: String,    
    favFood: String,
    loves: String,
    imgName: String,
    wins: Number,
    defeats: Number,
    games: Number
}

```

### game object

```javascript
{
    id: Number,
    timeStamp: Date,
    contestants: [
        { hamsterobject },
        { hamsterobject }
    ],
    winner: { hamsterobject }
}

```

### stats object

```javascript
{
    totalGames: Number
    ... // custom stats
}

```


### Tänk på
- Designa erat API _innan_ ni kodar det. Använd papper och penna, alt mindmapverktyg eller dyl.
- Samtliga hamsterobjekt ska sparas i *Firebase firestore*. Varje hamster ska vara ett eget dokument.
- Samtliga resurser ska routas vidare till *egna moduler*.
- 40st bilder på hamstrar hittar du [här](https://www.dropbox.com/s/0v7ws0n9t5cfyww/hamsters.zip?dl=1). Samtliga bilder är CC licens och får användas.


## Level ups

### Säkra upp ditt API 
Säkra upp ditt API med nyckel och Auth-middleware.


### Chuck Norris level
#### Upload
Skapa funktionalitet där du själv kan ladda upp nya hamstrar.

#### Storage
Hosta bilderna i *Firebase/storage* istället för lokalt på din server.

