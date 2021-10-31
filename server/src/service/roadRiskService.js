const fs = require('fs');
const weather_API = require('../API/weather_API');
const path = require('path');
const roadRiskService = async(road_name)=>{
    
    const ret = {weather:null, road:null};
    //1. 지금 있는 도로코드에 맞는 구간별 교통량 구하기
    const roadInfo = JSON.parse(fs.readFileSync(path.join(__dirname,`/road_info/${road_name}.json`)));

    //2. 그 지역의 날씨 구하기
    const weather = await weather_API(37.1817844445838, 127.09200181930568);
    ret.weather = weather.data.main;
    //켈빈 -> 섭씨
    ret.weather.temp -= 273.15;
    //3. 위험도 계산
    ret.road = roadInfo.map((item)=>{
        item.risk = (Math.random() *2-1).toFixed(2);
        return item;
    })

    return ret;
}

const roadRiskService2 = async(road_name,timeWindow,length)=>{
    const includeLength = length === "true"? true:false;
    const windowLevel = timeWindow;
    //console.log(includeLength, windowLevel);

    const ret = {weather:null, road:null};

    //1. 지금 있는 도로코드에 맞는 구간별 교통량 구하기
    const roadInfo = JSON.parse(fs.readFileSync(path.join(__dirname,`/road_info/${road_name}.json`)));

    //2. 그 지역의 날씨 구하기
    const weather = await weather_API(37.1817844445838, 127.09200181930568);
    ret.weather = weather.data.main;
    //켈빈 -> 섭씨
    ret.weather.temp -= 273.15;
    //3. 위험도 계산
    ret.road = roadInfo.map((item)=>{
        item.risk = (Math.random() *2-1).toFixed(2);
        return item;
    })

    return ret;
}

module.exports = {
    roadRiskService,
    roadRiskService2
}