const express = require('express')
const cors = require('cors')
const app = express()
const { getParticularclient } = require('./DB/mongoDB')
const { storingNewURldata, patchTheStoringURL } = require('./DB/utils')
const { searching } = require('./Components/Searching')
require('dotenv').config()

app.use(express.json())
app.use(cors())

// scrabing the data
app.use('/scrap/search', async (req, res) => {
    try {
        let scrappedResponce = await searching(req?.body?.formData)
        res.send(scrappedResponce)
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while scraping the website.');
    }
})

// storing data in mongoDB Atlas
app.use('/db/heads', async (req, res) => {
    if (req?.body?.dbStoringHeadsAndURL) {
        if (req.body.timer >= 5 && req.body.timer <= 100000) { // checking the time different between one request to next request.if it is greater than 5 secound ,that datas are only store in DB

            const CheckingUrlExist = await getParticularclient('heads', req?.body?.dbStoringHeadsAndURL?.URLName)

            if (CheckingUrlExist?.length > 0) { // checking is there already exist and call the function based on the reult
                let id = CheckingUrlExist.map(val => val._id)
                let putMessageState = await patchTheStoringURL(...id, req?.body?.dbStoringHeadsAndURL)
                res.json(putMessageState)
            } else {
                let patchMessageState = storingNewURldata(req?.body?.dbStoringHeadsAndURL)
                res.json(patchMessageState)
            }
        }
    }
})

const PORT = 3002
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});