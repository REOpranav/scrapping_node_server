const { insertOneClient, updateClient } = require("./mongoDB");

const storingNewURldata = (data) => {
    try {
        insertOneClient('heads', [data]).then((value) => {
            res?.json(value)
        })
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({
            message: error.message,
            error: error.response ? error.response.data : null
        });
    }
}

const patchTheStoringURL = (clientUrlID, updatedData) => {
    try {
        updateClient('heads', clientUrlID, Array.isArray(updatedData) ? updatedData : [updatedData]).then((value) => {
            res?.json(value)
        })
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({
            message: error.message,
            error: error.response ? error.response.data : null
        });
    }
}

module.exports = { storingNewURldata, patchTheStoringURL }