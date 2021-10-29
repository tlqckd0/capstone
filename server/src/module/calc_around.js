'use strict';
/**
 * 위도  
1분 : 약 1.8km
1초 : 약 30m
//분은 (1/60) 초는 (1/3600).
경도는 
1분 : 약 1.479km
1초 : 약 24m
 */

//근처 100m에 있는 8개의 점 반환
const calc_around = (longitude, latitude) => {
    const ret = [];
    const long = longitude * 1;
    const lat = latitude * 1;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            ret.push({
                longitude: (long + (i * 2) / 1200).toFixed(4),
                latitude: (lat + (j * 2) / 1200).toFixed(4),
            });
        }
    }
    return ret;
};

module.exports = calc_around;

const stateChange = (beforeState, curState) => {
    //10초동안 차이.
    const diff_longitude = curState.longitude - beforeState.longitude;
    const diff_latitude = curState.latitude - beforeState.latitude;

    //미터 변환
    const sec_diff_longtitude = diff_longitude * 3600 * 24;
    const sec_diff_latitude = diff_latitude * 3600 * 30;

    //기울기 구하고.
    const gradient = sec_diff_longtitude / sec_diff_latitude;
    const r_gradient = -1 / gradient;

    const geo_point = new Array(9);
    let cnt = 0;
    for (let i = 0; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            geo_point[cnt++] = {
                longitude: curState.longitude * 1 + diff_longitude * 10 * i,
                latitude: curState.latitude * 1 + diff_latitude * 10 * j,
            };
        }
    }
    //왼쪽(6) 오른쪽(7) 10배, 직진 20배(2)

    console.log(`현재 위치 ${curState.longitude},${curState.latitude}`);
    console.log(
        '10초간 이동거리',
        Math.round(sec_diff_latitude),
        Math.round(sec_diff_longtitude)
    );
    //console.log(gradient, r_gradient);

    return geo_point;
};
