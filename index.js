const { scrapeWebsite } = require('./Components/scrapping')
const { geminiAI } = require('./Components/AI_Models/gemini')
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()
const qs = require('qs')
const cheerio = require('cheerio');
const { GoogleGenerativeAI } = require('@google/generative-ai')
const { getDataFromDB, insertOneClient, getParticularclient } = require('./DB/mongoDB')
const { storingNewURldata, patchTheStoringURL } = require('./DB/utils')
require('dotenv').config()

app.use(express.json())
app.use(cors())

app.use('/scrap/search', async (req, res) => { // scrabing the data
    try {
        let scrappedResponce = await scrapeWebsite(req?.body?.formData)
        res.send(scrappedResponce)
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while scraping the website.');
    }
})

app.use('/db/heads', async (req, res) => { // storing data in mongoDB Atlas
    if (req.body.timer >= 5 && req.body.timer <= 100000) {
        const CheckingUrlExist = await getParticularclient('heads', req?.body?.dbStoringHeadsAndURL?.URLName).then(val => { return val })
        
        if (CheckingUrlExist && (Array.isArray(CheckingUrlExist) && CheckingUrlExist.length > 0)) {
            let id = CheckingUrlExist.map(val => val._id)
            patchTheStoringURL(...id, req?.body?.dbStoringHeadsAndURL)
        } else {
            storingNewURldata(req?.body?.dbStoringHeadsAndURL)
        }
    }
})

// running the node in 3002 port
const PORT = 3002
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});