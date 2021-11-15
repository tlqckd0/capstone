const express = require('express');
const router = express.Router();
const { roadRiskService } = require('../service/roadRiskService');
const { roadCorrelation } = require('../service/roadCorrelation');

router.get('/risk/:timeWindow/:length', async (req, res) => {
    const { timeWindow, length } = req.params;
    console.log(timeWindow, length);
    const road_risk_weather = await roadRiskService(timeWindow, length);

    res.json(road_risk_weather);
});

router.get('/correlation', async (req, res) => {
    const road_correlation = await roadCorrelation();
    console.log('상관관계 조회');
    res.json(road_correlation);
});

module.exports = router;
