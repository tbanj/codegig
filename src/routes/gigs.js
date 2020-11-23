const express = require('express');
const db = require('../config/database');
const Gig = require('../models/gigs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { addGigs, getGigs, addGigForm } = require('../controllers/gigs');

const router = express.Router();

// get Gig List
router.get('/', getGigs);

router.post('/add', addGigs)
    .get('/add', addGigForm);

router.get('/search', (req, res) => {
    let { term } = req.query;
    // term = term.toUpperCase();
    Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
        .then((gigs) => res.render('gigs', { gigs }))
        .catch(err => console.log('Error', err))

})

/* Gig.findAll()
    .then(gigs => {
        // console.log(gigs);
        // res.status(200).json({ data: gigs });
        res.render('gigs', { gigs });
    })
    .catch((err) => console.log('Error: ', err)) */

module.exports = router;