const express = require('express');
const app = express.Router();

const notesRoutes = require('./notes');

app.use('/notes', notesRoutes);

module.exports = app;


function newArray (numberArray,funcNumber){
    const newNumberArray = [];
    for (let i = 0; i < numberArray.length; i++) {
        newNumberArray.push(funcNumber(numberArray[i]));
    }
    return newNumberArray;
}