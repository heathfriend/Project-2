const express = require('express')
const item = express.Router()
const Items = require('../models/items.js')
const seed = require('../models/seed.js')






/////NEW//////
item.get('/items/new', (req, res) => {
    res.render('new.ejs')
})

//////INDEX///////
item.get('/items' , (req, res) => {
    Items.find({}, (err, allItems) => {
        console.log(allItems);
        res.render('index.ejs',
        {
           items:allItems
        });

    })

});

/////DELETE///////
item.delete('/items/:id',
(req, res) => {
    Items.findByIdAndRemove(req.params.id,(err, deleted) => {
        res.redirect('/items')
    })
})

/////CREATE//////
item.post('/items', (req, res) => {
    if(req.body.inStock === 'on'){
        req.body.inStock = true
    } else {
        req.body.inStock = false
    }
    Items.create(req.body, (err, created) => {
        res.redirect('/items')
})

})
/////EDIT////////
item.get('/items/:id/edit', (req, res) => {
    Items.findById(req.params.id, (err, foundItem) => {
        res.render(
            'edit.ejs',
            {
                item: foundItem,
            }
        )

    })

})
////////UPDATE/////////
item.put('/items/:id', (req, res) => {
    if(req.body.inStock === 'on'){
        req.body.inStock = true
    } else {
        req.body.inStock = false
    }
    Items.findByIdAndUpdate(req.params.id, req.body,(err, updatedItem) => {
        res.redirect('/items/' + req.params.id)
    })
})

//////SEED ROUTE//////
item.get('/items/seed', (req, res) => {
    Items.create(
        seed,
        (err, seeded) => {
            res.redirect('/items')
        }
    )
})

///////SHOW/////
item.get('/items/:id', (req, res) => {
    Items.findById(req.params.id, (err, itemShown)=>{
        res.render(
            'show.ejs',
            {
                item:itemShown
            }
        )

    })

})
module.exports = item;
