const express = require('express');
const router = express.Router();
const {roadRiskService,roadRiskService2} = require('../service/roadRiskService');


router.get('/risk1/:road_name',async(req,res)=>{
    const {road_name} = req.params;
    const road_risk_weather = await roadRiskService(road_name);

    res.json(road_risk_weather);
})

router.get('/risk2/:road_name/:timeWindow/:length',async(req,res)=>{
    const {road_name,timeWindow, length} = req.params;
    console.log(road_name,timeWindow, length);
    const road_risk_weather = await roadRiskService(road_name,timeWindow,length);

    res.json(road_risk_weather);
})

module.exports = router;