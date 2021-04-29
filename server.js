//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
require('dotenv').config()
const Items = require('./models/items.js')


//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;
//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;
// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);
// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));
//___________________
//Middleware
//___________________
//use public folder for static assets
app.use(express.static('public'));
// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form
//___________________
// Routes
//___________________
//localhost:3000
/////NEW//////
app.get('/items/new', (req, res) => {
    res.render('new.ejs')
})

//////INDEX///////
app.get('/items' , (req, res) => {
    Items.find({}, (err, allItems) => {
        res.render('index.ejs',
        {
           items:allItems
        });

    })

});

/////DELETE///////
app.delete('/items/:indexOfItemsArray',
(req, res) => {
    Items.findById(req.params.id, req.body, (err, deleted) => {
        items.splice(req.params.indexOfItemsArray, 1);
        res.redirect('/items')
    })
})

/////CREATE//////
app.post('/items', (req, res) => {
    Items.create(req.body, (err, created) => {
        if(req.body.inStock === 'on'){
            req.body.inStock = true
        } else {
            req.body.inStock = false
        }
        items.push(req.body)
        res.redirect('/items')
})

})
/////EDIT////////
app.get('/items/:indexOfItemsArray/edit', (req, res) => {
    res.render(
        'edit.ejs',
        {
            item:items[req.params.indexOfItemsArray],
            index: req.params.indexOfItemsArray
        }
    )
})

app.put('/items/:indexOfItemsArray', (req, res) => {
    if(req.body.inStock === 'on'){
        req.body.inStock = true
    } else {
        req.body.inStock = false
    }
    items[req.params.indexOfItemsArray] = req.body;
    res.redirect('/items')
})

//////SEED DATA//////
// app.get('/items/seed', (req, res) => {
//     Items.create(
//         [
//             {
//                 Brand: 'Titleist',
//                 Irons: 'AP3',
//                 Flex: 'stiff',
//                 Price: 1300,
//                 inStock: true,
//             },
//             {
//                 Brand: 'Taylormade',
//                 Irons: 'P790',
//                 Flex: 'stiff',
//                 Price: 1400,
//                 inStock: false
//             },
//             {
//                 Brand: 'Ping',
//                 Irons: 'G710',
//                 Flex: 'stiff',
//                 Price: 1300,
//                 inStock: true
//             }
//         ],
//         (err, seeded) => {
//             res.redirect('/items')
//         }
//     )
// })

///////SHOW/////
app.get('/items/:indexOfItemsArray', (req, res) => {
    Items.findById(req.params.indexOfItemsArray, (err, itemShown)=>{
        res.render(
            'show.ejs',
            {
                item:itemShown
            }
        )

    })

})
//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
