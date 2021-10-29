'use strict';
const road_API = require('../API/geo_road_API');
const calc_around = require('./calc_around');

//현재 위도 경도로 도로 리스트 반환.

const roadList = async (longitude, latitude) => {
    const list = [];
    const posList = calc_around(longitude, latitude);

    for (let i = 0; i < posList.length; i++) {
        const road_name = await road_API(
            posList[i].longitude,
            posList[i].latitude
        );
        // i == 4일 때
        if (road_name && road_name.land && road_name.land.name) {
            list.push(road_name.land.name);
            //console.log(i, road_name.land.name);
        } else {
            list.push('miss');
            // console.log(i, 'miss');
        }
    }
    return list;
};

//예시
//console.log(roadList(127.0404, 37.5009));

module.exports = roadList;
