const { isURL, DBSearching, GeminiSearch } = require("../DB/utils");
const { scrapeWebsite } = require("./scrapping");

const searching = async (data) => {
    if (isURL(data)) {
        return await scrapeWebsite(data) // if paras is URL it will scrap the data
    }

    let DbSearch = await DBSearching(data) // if the url is word .it will search and return the data from DB
    if (DbSearch.length == 0) {
        return await GeminiSearch(data)
    } else {
        return DbSearch
    }
}

module.exports = { searching }