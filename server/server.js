const express = require('express');
const bodyParser = require('body-parser');

const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');

const { Todo } = require('./models/todo');
const { User } = require('./models/user');



var app = express();

const port = process.env.PORT || 3000;



//middleware to tell the format received
app.use(bodyParser.json());

//Post 
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
        //  console.log('saved \n', doc);
    }, (err) => {
        res.status(400).send(err);
    });
});



//get
app.get('/todos', (req, res) => {

    Todo.find().then((todos) => {
        res.send({ todos });
    }, (err) => {
        res.status(400).send(err);
    });

});


//get by id
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('ID Not Valid');
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.status(200).send({ todo });

    }, (err) => {
        return res.status(400).send();
    }).catch((e) => {
        return res.status(400).send();
    });
});


//delete
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndDelete(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.status(200).send(todo);
    }, (err) => {
        return res.status(400).send();
    }).catch((e) => {
        console.log('ERROR', e);
    });
});





app.listen(port, () => {
    console.log(`Started in port ${port}`);
});
module.exports = { app };






/*
var newTodo = new Todo({
    text: ' sa ',
    completed: true
});

newTodo.save().then((doc) => {
    console.log(JSON.stringify(doc, undefined, 2));
}, (err) => {
    console.log('Unable to save todo', err);
});




var newUser = new User({
    email: '   email@mail.com'
});

newUser.save().then((doc) => {
    console.log(JSON.stringify(doc, undefined, 2));
}, (err) => {
    console.log('Unable to save the user', err);
});
*/



