const express = require('express')
const router = express.Router()
const { User } = require('../database/User')

router.post('/add', (req, res) => {
    User.findOne({ displayName: req.body.displayName }, (err, result) => {
        if (err) {
            console.log(err)
        }
    })
        .then((result) => {
            let arr = result.reservations
            if (!arr.includes(req.body.reservations))
                arr.push(req.body.reservations)
            result.updateOne({ reservations: arr })
                .then((data) => {
                    console.log('saved')
                    res.json(data)
                })
                .catch((err) => {
                    console.log('error')
                })
        })

})

router.post('/delete', (req, res) => {
    User.findOne({ displayName: req.body.displayName }, (err, result) => {
        if (err) {
            console.log(err)
        }
    })
        .then((result) => {
            let arr = result.reservations
            let index = -1
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].name === req.body.reservations.name){
                    index = i
                }
                   
            }

            console.log(index)
            arr.splice(index, 1)
            result.updateOne({ reservations: arr })
                .then((data) => {
                    res.json(data)
                    console.log('saved')
                })
                .catch((err) => {
                    console.log('error')
                })
        })
})


module.exports = router