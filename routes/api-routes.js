const router = require('express').Router();
//Item Model
const Item = require('../models/Items');


//Route GET /api
///Get all items
router.get('/', (req, res) => {
    Item.find()
        .sort({ asc: 1 })
        .then(items => res.json(items))
})

//Route POST /api
///Create items
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    })

    newItem.save().then(item => res.json(item));
})

//Route DELETE /api
///Deletes item
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove()
            .then(() => res.json({ success: true }))
        )
        .catch(err => { res.status(404).json({ success: false }) })
})
module.exports = router;