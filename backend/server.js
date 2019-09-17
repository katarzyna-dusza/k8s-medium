const app = require('express')();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId =  require('mongodb').ObjectId;
const model = require('./movies-model');

const args = process.argv;

const PORT = 4000;
const HOSTNAME = 'prod' === args[2] ? '0.0.0.0' : 'localhost';
const MONGO_SERVICE_NAME = 'prod' === args[2] ? 'mongo' : 'localhost';
const MONGO_PORT = 27017;
const MONGO_DB_NAME = 'movies-db';
const MONGO_CONNECTION = 'mongodb://' + MONGO_SERVICE_NAME + ':' + MONGO_PORT + '/' + MONGO_DB_NAME;

app.use(bodyParser.json());

MongoClient.connect(MONGO_CONNECTION, function (err, db) {
    if (err) throw err;

    app.get('/', (req, res) => {
        res.send("backend works");
    });

    app.get('/movies', (req, res) => {
        model.Movies(db).getAll()
            .then(result => res.send(result))
            .catch(err => console.log(err));
    });

    app.get('/movies/:id', (req, res) => {
        const id = req.param('id');
        const mongoObjectId = new ObjectId(id);

        model.Movies(db).getById(mongoObjectId)
            .then(result => res.send(result))
            .catch(err => console.log(err));
    });

    app.post('/movies', (req, res) => {
        const data = {
            title: req.body.title,
            genres: req.body.genres,
            creator: req.body.creator,
            release: req.body.release,
            cast: req.body.cast,
            rate: req.body.rate,
            runtime: req.body.runtime
        };
         
        model.Movies(db).add(data)
            .then(result => res.send(result.insertedId))
            .catch(err => console.log(err));
    });

    app.put('/movies/:id', (req, res) => {
        const id = req.params.id;
        const mongoObjectId = new ObjectId(id);
        const data = {
            title: req.body.title,
            genres: req.body.genres,
            creator: req.body.creator,
            release: req.body.release,
            cast: req.body.cast,
            rate: req.body.rate,
            runtime: req.body.runtime
        };

        model.Movies(db).update(mongoObjectId, data)
            .then(result => res.send(result))
            .catch(err => console.log(err));
    });

    app.delete('/movies/:id', (req, res) => {
        const id = req.param('id');
        const mongoObjectId = new ObjectId(id);

        model.Movies(db).remove(mongoObjectId)
            .then(result => res.send(result))
            .catch(err => console.log(err));
    });

    app.listen(PORT, HOSTNAME, () => console.log('Server is listening on ' + HOSTNAME + ':' + PORT));
});
