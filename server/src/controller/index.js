const express = require('express');
const roadList = require('../module/roadList');
const router = express.Router();
const roadRiskService = require('../service/roadRiskService');

router.get('/risk/:latitude/:longitude/:speed', async (req,res)=>{
    const {longitude, latitude} = req.params;
    const roadInfo = await roadList(longitude, latitude);    
    res.json(roadInfo);
})

router.get('/risk/:road_name',async(req,res)=>{
    const {road_name} = req.params;
    console.log(road_name);
    const road_risk_weather = await roadRiskService(road_name);

    res.json(road_risk_weather);
})


module.exports = router;