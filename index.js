const port = process.env.PORT || 9000
const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')

const app = express()

globalarticles = []

indiaarticles = []

techindiaarticles = []

entertainmentindiaarticles = []

cryptoarticles = []



globalnewssites = [
    {
        name: "ndtv",
        type: "Global",
        url: "https://www.ndtv.com/world-news"
    },
    {
        name: "republicbharat",
        type: "Global",
        url: "https://bharat.republicworld.com/world-news"
    },
    {
        name: "Thenewyorktimes",
        type: "Global",
        url: "https://www.nytimes.com/section/world"
    },
]

indianewssites = [
    {
        name: "ndtv",
        type: "india",
        url: "https://www.ndtv.com/india"
    },
    {
        name: "republicbharat",
        type: "india",
        url: "https://bharat.republicworld.com/india-news"
    },

]

technewssites = [
    {
        name: "gadget360",
        type: "tech",
        url: "https://gadgets.ndtv.com/"
    },
    {
        name: "republicbharat",
        type: "tech",
        url: "https://bharat.republicworld.com/technology-news"
    },
]

entertainnewssites = [
    {
        name: "ndtv",
        type: "entertainment",
        url: "https://www.ndtv.com/entertainment"
    },
    {
        name: "republicbharat",
        type: "entertainment",
        url: "https://bharat.republicworld.com/entertainment-news"
    },
]

cryptonewssites = [
    {
        name: "ndtv",
        type: "crypto",
        url: "https://www.ndtv.com/business/cryptocurrency/news"
    },
]

function inArray(target, array) {

    /* Caching array.length doesn't increase the performance of the for loop on V8 (and probably on most of other major engines) */

    for (var i = 0; i < array.length; i++) {
        if (array[i].title === target) {
            return true;
        }
    }

    return false;
}




app.get('/', (req, res) => {
    res.json(' Welcome to MR.NewsAPI - by Swapan Lalotra')
})

app.get('/news', async (req, res) => {

    try {

        await globalnewssites.forEach(async site => {

            const response = await axios.get(site.url)
            const html = await response.data
            const $ = cheerio.load(html)


            if (site.name == "ndtv") {
                $('.news_Itm').each(function () {
                    const title = $(this).find('h2').text().trim()
                    const url = $(this).find('h2').find('a').attr('href')
                    const imgurl = $(this).find('img').attr('src')

                    // console.log("URL : " + url + "\nTITLE :" + title)
                    if (title != "" && !inArray(title, globalarticles)) {
                        globalarticles.push({
                            title,
                            url,
                            imgurl,
                            source: site.name,

                        })

                    }



                })
            } else if (site.name == "republicbharat") {
                // console.log("IM in Republic bharat")
                // console.log($(this))

                $('article').each(async function () {
                    const title = $(this).text().trim()
                    const url = $(this).find('a').attr('href')
                    const imgurl = $(this).find('a').find('img').attr('data-src')
                    // console.log("URL : " + url + "\nTITLE :" + title + "\nIMG :" + imgurl + "\nSource : " + site.name)
                    // console.log($(this).text())
                    if (!inArray(title, globalarticles)) {
                        globalarticles.push({
                            title,
                            url,
                            imgurl,
                            source: site.name,

                        })
                    }


                })

            } else if (site.name == "Thenewyorktimes") {
                const baseurl = "https://www.nytimes.com/"
                $('ol').find('li').each(function () {
                    const title = $(this).find('a').text().trim()
                    const furl = $(this).find('a').attr('href')
                    const imgurl = $(this).find('img').attr('src')
                    // console.log("URL : " + furl + "\nTITLE :" + title + "\nIMG :" + imgurl + "\nSource : " + site.name)
                    // console.log($(this))
                    const url = baseurl + furl;
                    if (imgurl != null && !inArray(title, globalarticles)) {
                        globalarticles.push({
                            title,
                            url,
                            imgurl,
                            source: site.name,

                        })
                    }

                })
            }
        });
        res.json(globalarticles.length > 0  ? globalarticles : {"message":"Refresh/ fetch again for result ... "})

    } catch (err) {
        res.json("ERROR in Global News Websites." + err)

    }




})

app.get('/news/india', async (req, res) => {

    try {

        await indianewssites.forEach(async site => {

            const response = await axios.get(site.url)
            const html = await response.data
            const $ = cheerio.load(html)


            if (site.name == "ndtv") {
                $('.news_Itm').each(function () {
                    const title = $(this).find('h2').text().trim()
                    const url = $(this).find('h2').find('a').attr('href')
                    const imgurl = $(this).find('img').attr('src')

                    // console.log("URL : " + url + "\nTITLE :" + title)
                    if (title != "" && !inArray(title, indiaarticles)) {
                        indiaarticles.push({
                            title,
                            url,
                            imgurl,
                            source: site.name,

                        })

                    }



                })
            } else if (site.name == "republicbharat") {
                // console.log("IM in Republic bharat")
                // console.log($(this))

                $('article').each(async function () {
                    const title = $(this).text().trim()
                    const url = $(this).find('a').attr('href')
                    const imgurl = $(this).find('a').find('img').attr('data-src')
                    // console.log("URL : " + url + "\nTITLE :" + title + "\nIMG :" + imgurl + "\nSource : " + site.name)
                    // console.log($(this).text())
                    if (!inArray(title, indiaarticles)) {
                        indiaarticles.push({
                            title,
                            url,
                            imgurl,
                            source: site.name,

                        })
                    }


                })

            }
        });
        res.json(indiaarticles.length > 0 ? indiaarticles : {"message":"Refresh/ fetch again for result ... "})

    } catch (err) {
        res.json("ERROR in India news Websites." + err)

    }




})


app.get('/news/india/tech', async (req, res) => {

    try {

        await technewssites.forEach(async site => {
            const response = await axios.get(site.url)
            const html = await response.data
            const $ = cheerio.load(html)


            if (site.name == "gadget360") {
                $('.tech_news_widget').find('li').each(function () {
                    const title = $(this).text().trim()
                    const url = $(this).find('a').attr('href')
                    const imgurl = $(this).find('img').attr('src')

                    // console.log("URL : " + url + "\nTITLE :" + title + "\nIMG :" + imgurl + "\nSource : " + site.name)
                    if (imgurl != null && !inArray(title, techindiaarticles)) {
                        techindiaarticles.push({
                            title,
                            url,
                            imgurl,
                            source: site.name,

                        })

                    }



                })
            } else if (site.name == "republicbharat") {
                // console.log("IM in Republic bharat")
                // console.log($(this))

                $('article').each(async function () {
                    const title = $(this).text().trim()
                    const url = $(this).find('a').attr('href')
                    const imgurl = $(this).find('a').find('img').attr('data-src')
                    // console.log("URL : " + url + "\nTITLE :" + title + "\nIMG :" + imgurl + "\nSource : " + site.name)
                    // console.log($(this).text())
                    if (imgurl != null && !inArray(title, techindiaarticles)) {
                        techindiaarticles.push({
                            title,
                            url,
                            imgurl,
                            source: site.name,

                        })
                    }

                })

            }

        })

        res.json(techindiaarticles.length > 0 ? techindiaarticles : {"message":"Refresh/ fetch again for result ... "})
    } catch (err) {
        res.json("ERROR in india tech NEWS SITES " + err)
    }
})

app.get('/news/india/entertainment', async (req, res) => {

    try {

        await entertainnewssites.forEach(async site => {
            const response = await axios.get(site.url)
            const html = await response.data
            const $ = cheerio.load(html)


            if (site.name == "ndtv") {
                $('a').each(function () {
                    const title = $(this).text().trim()
                    const url = $(this).attr('href')
                    const imgurl = $(this).find('img').attr('data-src')

                    // console.log("URL : " + url + "\nTITLE :" + title)
                    if (title && imgurl != null && !inArray(title, entertainmentindiaarticles)) {
                        entertainmentindiaarticles.push({
                            title,
                            url,
                            imgurl,
                            source: site.name,

                        })

                    }



                })
            } else if (site.name == "republicbharat") {
                // console.log("IM in Republic bharat")
                // console.log($(this))

                $('article').each(async function () {
                    const title = $(this).text().trim()
                    const url = $(this).find('a').attr('href')
                    const imgurl = $(this).find('a').find('img').attr('data-src')
                    // console.log("URL : " + url + "\nTITLE :" + title + "\nIMG :" + imgurl + "\nSource : " + site.name)
                    // console.log($(this).text())
                    if (!inArray(title, entertainmentindiaarticles) && imgurl != null) {
                        entertainmentindiaarticles.push({
                            title,
                            url,
                            imgurl,
                            source: site.name,

                        })
                    }

                })

            }

        })

        res.json(entertainmentindiaarticles.length > 0 ? entertainmentindiaarticles : {"message":"Refresh/ fetch again for result ... "})
    } catch (err) {
        res.json("ERROR in indian Entertainment NEWS SITES " + err)
    }
})

app.get('/news/crypto', async (req, res) => {

    try {

        await cryptonewssites.forEach(async site => {

            const response = await axios.get(site.url)
            const html = await response.data
            const $ = cheerio.load(html)


            if (site.name == "ndtv") {
                $('.news_Itm').each(function () {
                    const title = $(this).find('h2').text().trim()
                    const url = $(this).find('h2').find('a').attr('href')
                    const imgurl = $(this).find('img').attr('src')

                    // console.log("URL : " + url + "\nTITLE :" + title + "\nIMG :" + imgurl + "\nSource : " + site.name)
                    // console.log("TITLE EXISTS : " + inArray(title, cryptoarticles))
                    if (!inArray(title, cryptoarticles) && title != "") {
                        cryptoarticles.push({
                            title,
                            url,
                            imgurl,
                            source: site.name,

                        })

                    }



                })
            }

        });
        res.json(cryptoarticles.length > 0 ? cryptoarticles : {"message":"Refresh/ fetch again for result ... "})
    } catch (err) {
        res.json("ERROR in CRYPTO Websites." + err)

    }

})




app.listen(port, () => console.log("Server is Running on PORT:" + port))