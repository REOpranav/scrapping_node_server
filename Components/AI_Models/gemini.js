const { GoogleGenerativeAI } = require("@google/generative-ai")

const geminiAI = async (incomingSearchingData) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_TEXTENHANCER_KEY)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

        // const prompt = `${incomingSearchingData}.Read this and give this elabratly in HTML code with best css.Don't give images , videos or any multimedia`
        // const prompt = `give the official link for ${incomingSearchingData}.give link only.`
        
        const prompt = `Give information about ${incomingSearchingData?.heading[0]} from ${incomingSearchingData?.name}`
        const result = (await model?.generateContent(prompt)).response.candidates[0].content.parts;         
        console.log('gemini runned');
        return result[0]
    } catch (err) {
        return err.message
    }
}

module.exports = { geminiAI }