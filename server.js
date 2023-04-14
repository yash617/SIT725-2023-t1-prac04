var express = require("express")
var app = express()
const {MongoClient} = require('mongodb');
const uri = 'mongodb+srv://admin:admin@cluster0.ggzuodr.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);
let dbCollection;

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/cats',(req,res) => {
    res.json({statusCode: 200, data: cardList, message:"Success"})
})

function dbConnection(collectionName) {
        client.connect(err => {
        dbCollection = client.db().collection(collectionName);
        if (!err) {
            console.log('DB Connected');
            console.log(dbCollection);
        } else {
            console.log(err);
        }
    });
}

app.post('/api/cats', (req, res) => {
    let cat = req.body;
    insert(cat, (err, result) => {
        if (err) {
            res.json({statusCode:400, message: err});
        } else {
            res.json({statusCode: 200, data: result, message: 'Cat successfully added'});
        }
    });
});

app.get('/api/cats',(req,res) => {
    getAllCats((error, result) => {
        if (error) {
            res.json({statusCode:400, message: err});
        } else {
            res.json({statusCode: 200, data: result, message: 'Successfully'});
        }
    });
});

function insert(cat, callback) {
    dbCollection.insertOne(cat, callback);
}

function getAllCats(callback) {
    dbCollection.find().toArray(callback);
}

var port = process.env.port || 3000;

app.listen(port,()=>{
    console.log('App listening to: ' + port);
    dbConnection('Cats');
})