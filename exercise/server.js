const app = require('express')();
const bodyParser = require('body-parser');

const args = process.argv;

const PORT = 4040;
const HOSTNAME = 'prod' === args[2] ? '0.0.0.0' : 'localhost';

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("backend works");
});

app.get('/users', (req, res) => {
    const data = [
        { id: 1, name: 'Name1' },
        { id: 2, name: 'Name2' },
        { id: 3, name: 'Name3' },
        { id: 4, name: 'Name4' },
    ];
    res.send(data);
});


app.listen(PORT, HOSTNAME, () => console.log('Server is listening on ' + HOSTNAME + ':' + PORT));
