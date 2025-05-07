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


module.exports = { storingNewURldata, patchTheStoringURL, isURL, DBSearching }