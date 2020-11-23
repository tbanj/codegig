const express = require('express');
const db = require('../config/database');
const Gig = require('../models/gigs');

const getGigs = (req, res) => Gig.findAll()
    .then(gigs => {
        // console.log('gigs', gigs);
        res.render('gigs', { gigs: gigs })
    })
    .catch((err) => console.log('Error: ', err));

//    Add gig
const addGigs = (req, res) => {
    // const data = {
    //     title: 'Simple Prestatshop Website',
    //     technologies: 'Wordpress, PHP, html, css',
    //     budget: '$3500',
    //     description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. ... A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.',
    //     contactEmail: 'user2@gmail.com',
    // }

    let { title, technologies, budget, description, contactEmail } = req.body;
    let errors = [];
    if (!title) {
        errors.push({ text: 'Please add a title' })
    }
    if (!description) {
        errors.push({ text: 'Please add a description' })
    }
    if (!technologies) {
        errors.push({ text: 'Please add a technology' })
    }
    if (!contactEmail) {
        errors.push({ text: 'Please add a contact email' })
    }

    if (errors.length > 0) {
        res.render('add', {
            errors,
            title, technologies, budget, description, contactEmail
        })
    } else {
        if (!budget) {
            budget = 'Unknown';
        } else { budget = `$${budget}`; }

        // Make lowercase and remove space after comma
        technologies = technologies.toLowerCase().replace(/, /g, ',');

        // Insert into table
        Gig.create({ title, technologies, budget, description, contactEmail })
            .then((gig) => res.redirect('/gigs'))
            .catch(err => console.log('Error: ', err));
    }

};

const addGigForm = (req, res) => res.render('add');
module.exports = { getGigs, addGigs, addGigForm };