const express = require("express"),
    morgan = require("morgan");



const app = express();


const movieJSON = [
    {
        "title": "100% Wolf",
        "year": 2020,
        "votes": 65,
        "genreIds": [
            10751,
            16,
            14
        ],
        "description": "Freddy Lupin, heir to a proud family line of werewolves, is in for a shock when on his 14th birthday his first 'warfing' goes awry, turning him into a ferocious poodle. The pack elders give Freddy until the next moonrise to prove he has the heart of a wolf, or risk being cast out forever. With the help of an unlikely ally in a streetwise stray named Batty, Freddy must prove he's 100% Wolf."
    },
    {
        "title": "6 Underground",
        "year": 2019,
        "votes": 2869,
        "genreIds": [
            28,
            53
        ],
        "description": "After faking his death, a tech billionaire recruits a team of international operatives for a bold and bloody mission to take down a brutal dictator."
    },
    {
        "title": "Alone",
        "year": 2020,
        "votes": 197,
        "genreIds": [
            53,
            27,
            18
        ],
        "description": "A recently widowed traveler is kidnapped by a cold blooded killer, only to escape into the wilderness where she is forced to battle against the elements as her pursuer closes in on her."
    },
    {
        "title": "Assassin 33 A.D.",
        "year": 2020,
        "votes": 22,
        "genreIds": [
            878,
            28,
            12,
            9648
        ],
        "description": "When a billionaire gives a group of young scientists unlimited resources to study the science of matter transfer, the scientists unlock the secrets of time travel. But they soon find out that the project is backed by a militant extremist group, and the billionaire plans to go back in time and prove that Jesus never rose from the dead."
    },
    {
        "title": "Ava",
        "year": 2020,
        "votes": 1217,
        "genreIds": [
            28,
            80,
            18,
            53
        ],
        "description": "A black ops assassin is forced to fight for her own survival after a job goes dangerously wrong."
    },
    {
        "title": "Avengers: Infinity War",
        "year": 2018,
        "votes": 20925,
        "genreIds": [
            12,
            28,
            878
        ],
        "description": "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain."
    },
    {
        "title": "Bad Boys for Life",
        "year": 2020,
        "votes": 5936,
        "genreIds": [
            53,
            28,
            80
        ],
        "description": "Marcus and Mike are forced to confront new threats, career changes, and midlife crises as they join the newly created elite team AMMO of the Miami police department to take down the ruthless Armando Armas, the vicious leader of a Miami drug cartel."
    },
    {
        "title": "Bajocero",
        "year": 2021,
        "votes": 224,
        "genreIds": [
            28,
            80,
            53
        ],
        "description": "When a prisoner transfer van is attacked, the cop in charge must fight those inside and outside while dealing with a silent foe: the icy temperatures."
    },
    {
        "title": "Batman: Soul of the Dragon",
        "year": 2021,
        "votes": 82,
        "genreIds": [
            16,
            28,
            12,
            80
        ],
        "description": "Bruce Wayne faces a deadly menace from his past, with the help of three former classmates: world-renowned martial artists Richard Dragon, Ben Turner and Lady Shiva."
    },
    {
        "title": "Birds of Prey (and the Fantabulous Emancipation of One Harley Quinn)",
        "year": 2020,
        "votes": 6848,
        "genreIds": [
            28,
            80
        ],
        "description": "Harley Quinn joins forces with a singer, an assassin and a police detective to help a young girl who had a hit placed on her after she stole a rare diamond from a crime lord."
    },
    {
        "title": "Black Water: Abyss",
        "year": 2020,
        "votes": 112,
        "genreIds": [
            27,
            53,
            12
        ],
        "description": "An adventure-loving couple convince their friends to explore a remote, uncharted cave system in the forests of Northern Australia. With a tropical storm approaching, they abseil into the mouth of the cave, but when the caves start to flood, tensions rise as oxygen levels fall and the friends find themselves trapped. Unknown to them, the storm has also brought in a pack of dangerous and hungry crocodiles."
    },
    {
        "title": "Bloodshot",
        "year": 2020,
        "votes": 3564,
        "genreIds": [
            28,
            878
        ],
        "description": "After he and his wife are murdered, marine Ray Garrison is resurrected by a team of scientists. Enhanced with nanotechnology, he becomes a superhuman, biotech killing machine—'Bloodshot'. As Ray first trains with fellow super-soldiers, he cannot recall anything from his former life. But when his memories flood back and he remembers the man that killed both him and his wife, he breaks out of the facility to get revenge, only to discover that there's more to the conspiracy than he thought."
    },
    {
        "title": "Breach",
        "year": 2020,
        "votes": 215,
        "genreIds": [
            878,
            28
        ],
        "description": "A hardened mechanic must stay awake and maintain an interstellar ark fleeing the dying planet Earth with a few thousand lucky souls on board... the last of humanity. Unfortunately, humans are not the only passengers. A shapeshifting alien creature has taken residence, its only goal is to kill as many people as possible. The crew must think quickly to stop this menace before it destroys mankind."
    },
    {
        "title": "Chaco",
        "year": 2020,
        "votes": 39,
        "genreIds": [
            10752,
            18
        ],
        "description": "In 1934, Bolivia is at war with Paraguay. Liborio and Ticona and other Bolivian indigenous soldiers are lost in the hell of the Chaco, under the commandment of German Captain Kundt. They're looking for the Paraguayan enemy that they haven't seen for months, and that they will never find. They leave together in a search that will make them realize, progressively, the destiny they have been pushed into and the inevitable condition of a defeated troop. They're walking like shadows, wandering forever in the middle of dust and silence."
    },
    {
        "title": "Code 8",
        "year": 2019,
        "votes": 1065,
        "genreIds": [
            878,
            28,
            80,
            53
        ],
        "description": "In Lincoln City, some inhabitants have extraordinary abilities. Most live below the poverty line, under the close surveillance of a heavily militarized police force. Connor, a construction worker with powers, involves with a criminal gang to help his ailing mother. (Based on the short film “Code 8,” 2016.)"
    },
    {
        "title": "Devoto, la invasión silenciosa",
        "year": 2020,
        "votes": 2,
        "genreIds": [
            28,
            878,
            53
        ],
        "description": "Five strangers wake up locked in a strange building. They don't know who took them there or for what purpose. Throughout a night they will discover with surprise that an invasion is taking place outside that complex. And this motley group of strangers, for a reason they will have to figure out, are the ones chosen to try to stop it."
    },
    {
        "title": "Dory's Reef Cam",
        "year": 2020,
        "votes": 63,
        "genreIds": [
            10751,
            16,
            35,
            12
        ],
        "description": "Dive into the waters below and watch the aquatic wildlife from the world of Nemo and Dory."
    },
    {
        "title": "Dragonheart: Vengeance",
        "year": 2020,
        "votes": 194,
        "genreIds": [
            14,
            28,
            12
        ],
        "description": "Lukas, a young farmer whose family is killed by savage raiders in the countryside, sets out on an epic quest for revenge, forming an unlikely trio with a majestic dragon and a swashbuckling, sword-fighting mercenary, Darius."
    },
    {
        "title": "Extraction",
        "year": 2020,
        "votes": 3534,
        "genreIds": [
            18,
            28,
            53
        ],
        "description": "Tyler Rake, a fearless mercenary who offers his services on the black market, embarks on a dangerous mission when he is hired to rescue the kidnapped son of a Mumbai crime lord."
    },
    {
        "title": "Fast & Furious Presents: Hobbs & Shaw",
        "year": 2019,
        "votes": 4578,
        "genreIds": [
            28,
            12,
            35
        ],
        "description": "Ever since US Diplomatic Security Service Agent Hobbs and lawless outcast Shaw first faced off, they just have swapped smacks and bad words. But when cyber-genetically enhanced anarchist Brixton's ruthless actions threaten the future of humanity, both join forces to defeat him. (A spin-off of “The Fate of the Furious,” focusing on Johnson's Luke Hobbs and Statham's Deckard Shaw.)"
    },
];

// setup the logger
app.use(morgan('common'));




app.get('/movies', (req, res) => {

    res.json(movieJSON);

});

app.get('/', (req, res) => {

    res.send("Welcome to My Movie API");

});

app.use(express.static('public'));


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.get('/error-test', (req, res, next) => {    
    next(new Error('Test error!'));
}); 

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});

