/* global kakao */
import React, { useEffect } from 'react';

const { kakao } = window;

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
            strokeColor: '#000000', // 선의 색깔입니다
            strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid', // 선의 스타일입니다
        });
        return ret;
    }
    return ret;
};

const KakaoMap = ({ roadData }) => {
    useEffect(() => {
        console.log(roadData);
        // const linePath = roadData.map(road=>{
        //     return new kakao.maps.LatLng(road.location[0],road.location[1]);
        // })
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(
                roadData[0].location[0],
                roadData[0].location[1]
            ),
            level: 3,
        };
        var map = new kakao.maps.Map(container, options);
        map.setZoomable(true);
        // var polyline = new kakao.maps.Polyline({
        //     path: linePath, // 선을 구성하는 좌표배열 입니다
        //     strokeWeight: 10, // 선의 두께 입니다
        //     strokeColor: '#FFAAAA', // 선의 색깔입니다
        //     strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        //     strokeStyle: 'solid' // 선의 스타일입니다
        // });
        for (let i = 0; i < roadData.length - 1; i++) {
            const polyline = roadLine(roadData[i], roadData[i + 1]);
            polyline.setMap(map);
        }

        //polyline.setMap(map);
    }, [roadData]);
    return (
        <div style={{ display: 'inline-block', marginLeft: '100px' }}>
            <div id="map" style={{ width: '600px', height: '600px' }}></div>
        </div>
    );
};

export default KakaoMap;
