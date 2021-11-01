const fs = require('fs');
const weather_API = require('../API/weather_API');
const path = require('path');
const calc_risk = require('./risk_model/calc_risk');

function coef_fileName(include_road,timeWindow){
    let fileName = '';
    if (include_road === 'true') {
        fileName += 'include_';
    } else {
        fileName += 'exclude_';
    }
    fileName += timeWindow;


    return fileName;
}

const roadRiskService = async (road_name, timeWindow, length) => {
    const ret = { weather: null, road: null };

    //1. 교통
    const roadInfo = JSON.parse(
        fs.readFileSync(path.join(__dirname, `/road_info/${road_name}.json`))
    );
    //1-1. 모델
    const coefficient = JSON.parse(
        fs.readFileSync(path.join(__dirname, `/risk_model/coefficient/${coef_fileName(length, timeWindow)}.json`))
    );

    //2. 그 지역의 날씨 구하기
    const weather = await weather_API(37.1817844445838, 127.09200181930568);
    //2-1. 비
    const rain = weather.data.weather.main === 'Rain' ? true : false;
    const hour = new Date().getHours();
    const day = `${new Date().getDay()}`;
    //켈빈 -> 섭씨
    //const temp = weather.data.main.temp - 273.15;

    //3. 위험도 계산
    ret.road = await calc_risk(length, timeWindow, rain, roadInfo, hour, day,coefficient);
    ret.weather =weather.data.weather;
    ret.timeWindow = timeWindow;
    ret.length = length;
    return ret;
};

module.exports = {
    roadRiskService
};
