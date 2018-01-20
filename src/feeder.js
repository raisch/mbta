'use strict'
/* eslint-env node, es6 */

const _ = require('lodash')
const axios = require('axios')
const parser = require('csv-parse')

const DATAURL = 'http://developer.mbta.com/lib/gtrtfs/Departures.csv'

const fixup = (data) => _.map(data, rec => {
  rec.TimeStamp = new Date(Number(rec.TimeStamp)*1000).toLocaleTimeString()
  rec.ScheduledTime = new Date(Number(rec.ScheduledTime)*1000).toLocaleTimeString()
  return rec
})

const parse = (data) => {
  return new Promise((resolve,reject)=>{
    parser(data, {auto_parse:true, columns:true}, (err,res)=>{
      if(err) {
        reject(err)
        return
      }
      resolve(res)
    })
  })
}

async function getData(url = DATAURL) {
  const result = await axios.get(url).then(resp=>resp.data).catch(console.error)
  console.log(result)
  return result
}

getData().then(parse).then(fixup).then(console.log)
