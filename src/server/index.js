import express, { response } from 'express';
import cors from 'cors';
import { renderToString} from 'react-dom/server';
import App from '../shared/App';
import React from 'react';
import { serialize } from 'uri-js';
import { matchPath, StaticRouter } from 'react-router-dom';
import routes from '../shared/routes'
import { ServerStyleSheet } from 'styled-components';
import cookieParser from "cookie-parser";
import fetch from 'node-fetch';


// express middleware 
const app = express()
app.use(cors())
const sheet = new ServerStyleSheet()
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser());


// products api variables

const token = '70876bc3a88f6644c53af702622edcd8'
const url = `https://integrations.yaxint.com/api/products?api_token=${token}`


// get products

app.post('/api/get-products', (req,res) => {

    fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data){
            res.send(data)
        }else{
            res.send({error: true, message: "Couldn't get products"})
        }
    })


})



/////////////////////////////////////////////////////////////////////////////////////// SERVER SIDE RENDERING
app.get('*', (req,res,next) => {
    const activeRoute = routes.find((route)=> matchPath(req.url, route)) || {}
    const sheet = new ServerStyleSheet();
    const context = req.query.coreCartId
    const markup = renderToString(sheet.collectStyles(<StaticRouter location={req.url} context={context}><App /></StaticRouter>))

    

res.send(`
    <!DOCTYPE html>
    <html>
        <head>
            <title> Produkty </title>
            <script src='/bundle.js' defer></script>
            ${sheet.getStyleTags()}
            <link rel="stylesheet" href="App.css">
            <link rel="stylesheet" href="Carousel.css">
            <link rel="stylesheet" href="node_modules/react-multi-carousel/lib/styles">
            <script>window.__INITIAL_DATA__ = "${context}"</script>
            <meta
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script src="https://mapa.ecommerce.poczta-polska.pl/widget/scripts/ppwidget.js ">   </script> 
            <script async src="https://geowidget.easypack24.net/js/sdk-for-javascript.js"></script>
            <link rel="stylesheet" href="https://geowidget.easypack24.net/css/easypack.css"/>
        </head>
        <body style="margin: 0">
            <div id='app'>${markup}</div>
        <body/>
    </html>
    `)
})

app.listen(4000, () =>{
    console.log('server run  on 4000')
})

