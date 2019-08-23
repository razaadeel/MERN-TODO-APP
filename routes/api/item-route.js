const router = require('express').Router();
const auth = require('../../midddleware/auth');


//Item Model
const Item = require('../../models/Items');

//Route GET /api
///Get all items
router.get('/', (req, res) => {
    Item.find()
        .sort({ asc: 1 })
        .then(items => res.json(items))
})

//Route POST /api
//Create items
//Private: Only authanticated user can create
router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name
    })

    newItem.save().then(item => res.json(item))
        .catch(err => {
            console.log("NOT SAVE MESSAGE: " + err.message)
        });
})

//Route DELETE /api
///Deletes item
//Private: Only authanticated user can Delete
router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove()
            .then(() => res.json({ success: true }))
        )
        .catch(err => { res.status(404).json({ success: false }) })
})



//Private: Only authanticated user can Edit
router.put('/:id/:name', (req, res) => {
    Item.findByIdAndUpdate(
        req.params.id,
        { name: req.params.name }
    )
        .then(() => res.json({ success: true }))
        .catch(err => { res.status(404).json({ success: false }) })
})
module.exports = router; 