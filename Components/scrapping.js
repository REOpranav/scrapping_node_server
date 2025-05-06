const { default: axios } = require("axios");
const cheerio = require("cheerio");

const scrapeWebsite = async (URL) => {
    console.log('---scrapeWebsite module loaded---');x
    console.log(URL);

    let dbStoringHeadsAndURL = {} // this datas only will be store in DB
    let totalHead = [] // store heading data only

    let totalHeadDetail = {} // store all nessesary detail (not include para module)
    let data = [] // storing relevant heading and it sub paras

    let totalAllDetial = {} // storig all detail (include para module)
    let imagesSrc = [] // stroing images link

    dbStoringHeadsAndURL['URLName'] = URL
    totalHeadDetail['URLName'] = URL;

    try {
        let fetchHTML = await fetch(URL, {
            "credentials": "include",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
                "Upgrade-Insecure-Requests": "1",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "cross-site",
                "Sec-Fetch-User": "?1",
                "Priority": "u=0, i",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache"
            },
            "method": "GET",
            "mode": "cors"
        })

        if (!fetchHTML.ok) { throw new Error(fetchHTML.statusText) }
        const fetchedHtml = await fetchHTML.text()
        const htmlOnly = fetchedHtml
            .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '') // removing script from document
            .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '') // removing inner css from document
            .replace(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi, ''); // removing outline css from document

        const parsingDOM = cheerio.load(htmlOnly); // load the cheerio
        const paragraphs = parsingDOM('p,li').map((i, el) => parsingDOM(el).text().trim()).get(); // get all P tag content

        parsingDOM('img').map((i, el) => { el.attributes.map(nameVal => nameVal.name == 'src' && imagesSrc.push(nameVal.value)) }) // get all images src

        const heading = parsingDOM('h1,h2,h3,h4').map((i, el) => parsingDOM(el).text().trim()).get() // get all images src
        totalHead.push(heading)

        parsingDOM('h1,h2,h3,h4').each((i, h1) => { // Getting <P> tag content
            const section = {
                heading: parsingDOM(h1).text().trim(),
                paragraphs: []
            };

            const travesingPtag = parsingDOM(h1).next()
            while (travesingPtag?.length) {
                for (let a = 0; a < travesingPtag?.length; a++) {
                    if (travesingPtag[a].tagName == 'p') {
                        section.paragraphs.push(travesingPtag.text())
                    }
                }
                data.push(section)
                return
            }
        });

        dbStoringHeadsAndURL['heading'] = totalHead
        totalHeadDetail['data'] = data
        totalAllDetial['paras'] = paragraphs
        totalAllDetial['images'] = imagesSrc

        return { dbStoringHeadsAndURL: dbStoringHeadsAndURL, totalHeadDetail: totalHeadDetail, totalDetail: totalAllDetial }
    } catch (err) {
        return err
    }
}

// axios.get('https://en.wikipedia.org/api/rest_v1/page/summary/reactjs').then(val => console.log(val.data)).catch(val => console.log(val))
module.exports = { scrapeWebsite }

// https://www.toptal.com/designers/web/ui-design-best-practices (testing)