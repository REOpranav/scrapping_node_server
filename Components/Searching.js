const { isURL, DBSearching } = require("../DB/utils");
const { scrapeWebsite } = require("./scrapping");

const searching = async (data) => {
    if (isURL(data)) {
        return await scrapeWebsite(data) // if paras is URL it will scrap the data
    } else {
        return await DBSearching(data) // if the url is word .it will search and return the data from DB
    }
}

module.exports = { searching }