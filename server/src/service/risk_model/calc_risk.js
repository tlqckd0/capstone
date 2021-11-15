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
    use_length,
    timeWindow,
    rain,
    road_info,
    current,
    day,
    coefficient
) => {
    if (use_length === 'true') {
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

            //5. 현재 통행량?(랜덤으로)
            value += getTraffic(timeWindow, current) * coefficient.traffic;
            const ret = road_info.map((item) => {
                let riskValue = value + item.length * coefficient.length;
                riskValue = riskValue < 0 ? 0 : riskValue;
                //console.log(item.name, riskValue);
                item.risk = riskValue.toFixed(3);
                return item;
            });

            resolve(ret);
        });
    } else {
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

            //5. 현재 통행량?(랜덤으로)
            value += getTraffic(timeWindow, current) * coefficient.traffic;

            const ret = road_info.map((item) => {
                item.risk = item.value.toFixed(3);
                return item;
            });

            resolve(ret);
        });
    }
};

module.exports = calc_risk;
