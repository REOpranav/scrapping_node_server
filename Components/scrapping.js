const { default: axios } = require("axios");
const cheerio = require("cheerio");

const scrapeWebsite = async (URL) => {
    let responceData = ""
    try {
        const response = await axios.get(URL);
        const html = response.data;
        const $ = cheerio.load(html);
        
        $('div').each((i, elem) => {
            let urlHeading = $(elem).text()
            if (urlHeading) {
                responceData += `${urlHeading} ,`
            }
        });
        return responceData
    } catch (error) {
        console.error('Error scraping the website:', error.message);
    }
}

module.exports = { scrapeWebsite }