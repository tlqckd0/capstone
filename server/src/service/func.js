function coef_fileName(use_length, timeWindow) {
    let fileName = '';
    if (use_length === 'true') {
        fileName += 'length_';
    } else {
        fileName += 'range_';
    }
    fileName += timeWindow;

    return fileName;
}

function road_fileName(use_length){
    if(use_length == 'true'){
        return 'length_road';
    }else{
        return 'range_road';
    }

}

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
    return ret;
}

module.exports ={
    coef_fileName,
    road_fileName,
    get_time_window,
    getTraffic
}