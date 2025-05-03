const { scrapeWebsite } = require('./Components/scrapping')
const { geminiAI } = require('./Components/AI_Models/gemini')
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()
const qs = require('qs')
const cheerio = require('cheerio');
const { GoogleGenerativeAI } = require('@google/generative-ai')
require('dotenv').config()

app.use(express.json())
app.use(cors())

const URL = 'https://www.g2.com/products/jira/reviews'

app.use('/scrap/search', async (req, res) => { // fetch all lead  
    try {
        await scrapeWebsite(URL).then(value =>
            res.json(value)
            // geminiAI(value).then(val => res.json(val))
        )
    } catch (error) {
        console.log(error);
    }
})

// running the node in 3002 port
const PORT = 3002
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});