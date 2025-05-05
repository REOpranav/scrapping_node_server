const { scrapeWebsite } = require('./Components/scrapping')
const { geminiAI } = require('./Components/AI_Models/gemini')
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()
const qs = require('qs')
const cheerio = require('cheerio');
const { GoogleGenerativeAI } = require('@google/generative-ai')
const { getDataFromDB } = require('./DB/mongoDB')
require('dotenv').config()

app.use(express.json())
app.use(cors())

app.use('/scrap/search', async (req, res) => {
    try {
        const html = await scrapeWebsite(req.body.formData)
        res.json(html)
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while scraping the website.');
    }

    // try {
    //     getDataFromDB('users').then((value) => {
    //         res.json(value)
    //     })
    // } catch (error) {
    //     res.status(error.response ? error.response.status : 500).json({
    //         message: error.message,
    //         error: error.response ? error.response.data : null
    //     });
    // }
})

// running the node in 3002 port
const PORT = 3002
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});