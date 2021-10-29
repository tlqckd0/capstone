const fs = require('fs');
const weather_API = require('../API/weather_API');
const path = require('path');
const roadRiskService = async(road_name)=>{
    
    //1. 지금 있는 도로코드에 맞는 구간별 교통량 구하기
    const roadInfo = JSON.parse(fs.readFileSync(path.join(__dirname,`/road_info/${road_name}.json`)));
    //2. 그 지역의 날씨 구하기
    const weather = await weather_API(37.1817844445838, 127.09200181930568);
    console.log(weather.data.weather);    
    //3. 위험도 계산
    const ret = roadInfo.map((item)=>{
        item.risk = (Math.random() *2-1).toFixed(2);
        return item;
    })
    //ret.push(weather.data.weather);
    console.log(ret);

    return ret;
}

module.exports = roadRiskService;