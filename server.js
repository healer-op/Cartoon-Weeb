// Make Npm Project And Install

/*
   1.npm init -y
   2.npm i cheerio axios express cors
   3.node server.js
   4.Change If You Want A Faster Server (Self Hosted)

   else the project is already running on a api
   PLEASE NOTE WE MAY NOT UPDATE THIS API AS FAST AS OURS

*/

const cheerio = require("cheerio");
const axios = require("axios");
const express = require('express')
const cors = require('cors')
const app = express()

const port = 3000

app.use(cors())

app.get('/tv', (req, res) => {
    var data={};
    data.imgs = [];
    data.titles = [];
    data.links = [];
    
    axios.get(`https://www.topcartoons.tv`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('div.item.col-lg-3.col-md-3.col-sm-12').each((i,element) =>{
            
            const link = $(element).find('a').attr('href')
            data.links.push(link.trim());
            const title = $(element).find('h3.title').text()
            data.titles.push(title.trim());
            const img = $(element).find('img').attr('src')
            data.imgs.push(img.trim());
            
        });
    })
    .then(() => {
        res.send(data);
    })

})

app.get('/tv/:li', async (req, res) => {
    var li = req.params.li;
    var lis = Buffer.from(li, 'base64').toString('ascii')
    var data={};
    data.titles = [];
    data.links = [];
    
        axios.get(`${lis}`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('div.item.col-lg-3.col-md-3.col-sm-12').each((i,element) =>{
            
            const link = $(element).find('a').attr('href')
            data.links.push(link.trim());
            const title = $(element).find('h3.title').text()
            data.titles.push(title.trim());
            
        });
    })
    .then(() => {
        res.send(data);
    })

})

app.get('/tv/video/:li', async (req, res) => {
    var li = req.params.li;
    let lis = Buffer.from(li, "base64").toString("ascii")
    let data = {}
    data.link;
    
    axios.get(`${lis}`).then(async res => {
        const $ = cheerio.load(res.data)
        let link = $(".embedded_videos").html()
        link = link.match(/(file: (.+\"))/g)
        link = link[0].replace(/(file: )/i, "").replace(/"/g, "")
        console.log(link)
    })
    .then(() => {
        res.send(data);
    })

})

app.get('/tv/search/:search', async (req, res) => {
    var search = req.params.search;
    var data={};
    data.titles = [];
    data.links = [];
    
        axios.get(`https://www.topcartoons.tv/?s=${search}`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('div.item.col-lg-3.col-md-3.col-sm-12').each((i,element) =>{
            
            const link = $(element).find('a').attr('href')
            data.links.push(link.trim());
            const title = $(element).find('h3.title').text()
            data.titles.push(title.trim());

            
        });
    })
    .then(() => {
        res.send(data);
    })

})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    console.log('MADE BY HEALER')
})
