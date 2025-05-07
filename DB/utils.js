const { GoogleGenerativeAI } = require("@google/generative-ai");
const { insertOneClient, updateClient, getDataFromDB } = require("./mongoDB");

const storingNewURldata = (data) => { // storing new data in DB
    try {
        let inserDataState = insertOneClient('heads', [data]) // calling the function which is in mongoDB
        return inserDataState
    } catch (error) {
        return error
    }
}

const patchTheStoringURL = async (clientUrlID, updatedData) => { // updating the data which is already exist
    try {
        let updatedState = await updateClient('heads', clientUrlID, updatedData) // calling the function which is in mongoDB
        return updatedState
    } catch (error) {
        return error
    }
}

const isURL = (input) => { // checking Incoming params is URL or not 
    console.log(input);
    const urlRegex = /^https?:\/\/[^\s/$.?#].[^\s]*$/i
    return urlRegex.test(input.trim())
}

const DBSearching = async (word) => { // searhcing the relevent keyword in DB
    let searchedDatas = [];
    const DBData = await getDataFromDB('heads')

    for (let element of DBData) {
        let found = false
        for (let value of element.heading) {
            for (let val of value) {
                if (val.trim().toLowerCase().includes(word.trim().toLowerCase())) {
                    searchedDatas.push(element)
                    found = true
                    break;
                }
            }
            if (found) break
        }
    }
    return searchedDatas;
};

const GeminiSearch = async (trasulationCount) => { // gemini search for extra usage
    console.log('come to gemini');

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_TEXTENHANCER_KEY)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
        // const prompt = `Translate this to ${value} .Give the responce in this language only and send the statement only ,without "\n". Use Google Translate for translation. The statement is: "${req.body.feedingValue}"`;
        const paras = `Give minimum 20 paras of detail about ${trasulationCount}.Give the responce in this English language only and send the statement only,without "\n",use Search.`
        const getURL = `Use Search and give a URL for ${trasulationCount} for studying about this.i need URL only.not any text or sentence`

        const result = {}
        result['paras'] = (await model?.generateContent(paras)).response.text().replace(/[\r\n]+/g, '');
        result['URL'] = (await model?.generateContent(getURL)).response.text().replace(/[\r\n]+/g, '');

        if (!result) {
            throw new Error('Model Failed....☹');
        }
        
        const sentences = result?.paras.split(/\.\s*/).filter(Boolean); // Remove empty strings
        result['paras'] = sentences

        return result
    } catch (err) {
        return err.message
    }
}

module.exports = { storingNewURldata, patchTheStoringURL, isURL, DBSearching, GeminiSearch }