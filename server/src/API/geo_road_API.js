const axios = require('axios');
const naver_key = require('../config/naver_key');

//위도 경도 적어주면 현재있는 도로 위치 알려줌.
const road_API = (longitude, latitude) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?request=coordsToaddr&coords=${longitude},${latitude}&sourcecrs=epsg:4326&output=json&orders=roadaddr`,
            headers: naver_key,
        })
            .then((res) => {
                resolve(res.data.results[0]);
            })
            .catch((err) => reject(err));
    });
};

// 37.5009 / 127.0404 /50
module.exports = road_API;