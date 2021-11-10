/* global kakao */
import React, { useEffect } from 'react';

const { kakao } = window;

function back_color(num) {
    const value = Math.abs(num * 1);
    let ret = '';
    if(value < 0.5) ret = '#40e0d0';

    if(value >=0.5 && value < 1.0){
        ret = '#ff8c00';
    }

    if(value >= 1.0) ret = '#ff0080';

    return ret;
}

const roadLine = (from, to) => {
    let ret = null;
    if (from && to) {
        const path = [
            new kakao.maps.LatLng(from.location[0], from.location[1]),
            new kakao.maps.LatLng(to.location[0], to.location[1]),
        ];
        ret = new kakao.maps.Polyline({
            path,
            strokeWeight: 10, // 선의 두께 입니다
            strokeColor: back_color(from.risk), // 선의 색깔입니다
            strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid', // 선의 스타일입니다
        });
        return ret;
    }
    return ret;
};

const KakaoMap2 = ({ roadData }) => {
    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
        };
        var map = new kakao.maps.Map(container, options);
        map.setZoomable(true);
        if (roadData && roadData.road) {
            console.log(roadData);
            const options = {
                center: new kakao.maps.LatLng(
                    roadData.road[0].location[0],
                    roadData.road[0].location[1]
                ),
                level: 3,
            };
            map = new kakao.maps.Map(container, options);
            for (let i = 0; i < roadData.road.length - 1; i++) {
                const polyline = roadLine(
                    roadData.road[i],
                    roadData.road[i + 1],
                );
                polyline.setMap(map);
            }
        }
    }, [roadData]);
    return (
        <div
            style={{
                width: '65%',
                display: 'inline-block',
                marginLeft: '5px',
                marginRight: '5px',
            }}
        >
            <div id="map" style={{ width: '99%', height: '700px' }}></div>
        </div>
    );
};

export default KakaoMap2;
