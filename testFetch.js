// const fetch = require('node-fetch');
var fetch = require('node-fetch')

fetch("localhost:8080/sensor/light").then((res) => {
    console.log('connect server');
    console.log("from client: res => " + res);
 }).catch((err) => { 
    console.log(err);
 })