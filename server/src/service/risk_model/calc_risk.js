function get_time_window(level, current) {
    let ret;
    if (level === '12') {
        if (current <= 12) {
            ret = '0~12';
        } else {
            ret = '12~24';
        }
    }
    if (level === '6') {
        if (current <= 6) {
            ret = '0~6';
        } else if (current <= 12) {
            ret = '6~12';
        } else if (current <= 18) {
            ret = '12~18';
        } else {
            ret = '18~24';
        }
    }
    return ret;
}
/**
 * 
0~12는 50000~80000
12~24는 100000~110000정도 나옵니다

0~6 15000~20000
6~12 40000~50000
12~18 50000~60000
18~24 40000~50000
 */
function getTraffic(timeWindow, current) {
    let ret = 0;
    if (timeWindow === '12') {
        if (current <= 12) {
            ret = Math.random() * 30000 + 50000;
        } else {
            ret = Math.random() * 10000 + 100000;
        }
    }

    if (timeWindow === '6') {
        if (current <= 6) {
            ret = Math.random() * 5000 + 15000;
        } else if (current <= 12) {
            ret = Math.random() * 10000 + 40000;
        } else if (current <= 18) {
            ret = Math.random() * 10000 + 50000;
        } else {
            ret = Math.random() * 10000 + 40000;
        }
    }
    ret = Math.floor(ret);
    console.log('현재 통행량 : ', ret);
    return ret;
}

const calc_risk = async (
    include_road,
    timeWindow,
    rain,
    road_info,
    current,
    day,
    coefficient
) => {
    return new Promise((resolve, reject) => {
        //1. 절편
        let value = coefficient.intercept;
        //console.log('1. 절편 : ',value);

        //2. time 자르기
        value += coefficient.time[get_time_window(timeWindow, current)];
        //console.log('2. 시간 : ',value);

        //3. 요일
        value += coefficient.day[day];
        //console.log('3. 요일 : ',value);

        //4. 강우
        if (rain) {
            value += coefficient.weather.rain;
        } else {
            value += coefficient.weather.clear;
        }
        //console.log('4. 날씨(비) : ',value);

        //5. 현재 통행량?(랜덤으로)
        value += getTraffic(timeWindow, current) * coefficient.traffic;
        //console.log('5. 통행량 : ',value);
        let total = 0;
        const ret = road_info.map((item) => {
            let riskValue = value + item.length * coefficient.length;
            riskValue = riskValue < 0 ? 0 : riskValue;
            //console.log(item.name, riskValue);
            item.risk = riskValue.toFixed(3);
            return item;
        });

        //console.log('7 total : ',total);
        resolve(ret);
    });
};

module.exports = calc_risk;

//12시간 단위는 0~0.5가 안전, 0.5~1.5 보통 1.5~는 위험 정도로 구분하면 될거같고
//6시간 단위는 0~0.3 안전, 0.3~0.7 보통, 0.7~ 위험으로 하면 될거같아요
