const { insertOneClient, updateClient } = require("./mongoDB");

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

module.exports = { storingNewURldata, patchTheStoringURL }