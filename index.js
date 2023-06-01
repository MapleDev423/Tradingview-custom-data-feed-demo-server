const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');
const moment = require('moment')

// Create a new Express server instance
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json())

// https://demo_feed.tradingview.com/config
app.get('/config',(req,res)=>{
  console.log('config')
  res.status(200).json(
    {
      "supports_search":true,
      "supports_group_request":false,
      "supports_marks":true,
      "supports_timescale_marks":true,
      "supports_time":true,
      "exchanges":[
        {"value":"","name":"All Exchanges","desc":""},
        {"value":"NasdaqNM","name":"NasdaqNM","desc":"NasdaqNM"},
        {"value":"NYSE","name":"NYSE","desc":"NYSE"},
        {"value":"NCM","name":"NCM","desc":"NCM"},
        {"value":"NGM","name":"NGM","desc":"NGM"}
      ],
      "symbols_types":[
        {"name":"All types","value":""},
        {"name":"Stock","value":"stock"},
        {"name":"Index","value":"index"}
      ],
      "supported_resolutions":["D","2D","3D","W","3W","M","6M"]
    }
  )
})

// https://demo_feed.tradingview.com/time
app.get('/time',(req,res)=>{
  //res.status(200).json(Date.now() / 1000)
  res.status(200).json(1685611050)
})

// https://demo_feed.tradingview.com/marks?symbol=AAPL&from=1484317800&to=2114352000&resolution=D
app.get('/marks',(req,res)=>{
  res.status(200).json(
    {
      "id":[0,1,2,3,4,5],
      "time":[1522108800,1521763200,1521504000,1521504000,1520812800,1519516800],
      "color":["red","blue","green","red","blue","green"],
      "text":["Red","Blue","Green + Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","Red again","Blue","Green"],
      "label":["A","B","CORE","D","EURO","F"],
      "labelFontColor":["white","white","red","#FFFFFF","white","#000"],
      "minSize":[14,28,7,40,7,14]
    }
  )
})

// https://demo_feed.tradingview.com/timescale_marks?symbol=AAPL&from=1484317800&to=2114352000&resolution=D
app.get('/timescale_marks',(req,res)=>{
  res.status(200).json(
    [
      {"id":"tsm1","time":1522108800,"color":"#F23645","label":"A","tooltip":""},
      {"id":"tsm2","time":1521763200,"color":"#2962FF","label":"D","tooltip":["Dividends: $0.56","Date: Fri Mar 23 2018"]},
      {"id":"tsm3","time":1521504000,"color":"#089981","label":"D","tooltip":["Dividends: $3.46","Date: Tue Mar 20 2018"]},
      {"id":"tsm4","time":1520812800,"color":"#F23645","label":"E","tooltip":["Earnings: $3.44","Estimate: $3.60"],"shape":"earningDown"},
      {"id":"tsm7","time":1519516800,"color":"#089981","label":"E","tooltip":["Earnings: $5.40","Estimate: $5.00"],"shape":"earningUp"},
      {"id":"tsm8","time":1519516800,"color":"#FF9800","label":"S","tooltip":["Split: 4/1","Date: Sun Feb 25 2018"]}
    ]
  )
})

// https://demo_feed.tradingview.com/history?symbol=AAPL&resolution=1D&from=1684756244&to=1685620244&countback=2
app.get('/history',(req,res)=>{
  console.log('history')
  res.status(200).json(
    {
      "t":[1522022400,1522108800],
      "o":[168.07,173.68],
      "h":[173.1,175.15],
      "l":[166.44,166.92],
      "c":[172.77,168.34],
      "v":[36272617,38962839],
      "s":"ok"
    }
  )
})

// Start the server on port 5000
server = app.listen(5000, () => {
  console.log('Server listening on port 5000');
});

module.exports = app;