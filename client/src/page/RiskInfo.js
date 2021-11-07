import React from 'react';
import styled from 'styled-components';
import RiskBarChart from '../component/graph/RiskBarChart';
import KakaoMap from '../component/map/KakaoMap';

const Styles = styled.div`
    .data-box {
        border: 1px black solid;
        margin: 10px;
        width: 1500px;
        height: 600px;
        display: inline-block;
    }
`;

const RiskInfo = ({ data }) => {
    return (
        <Styles style={{ display: 'inline-block' }}>
            <div>
                <h3> {data.timeWindow}시간 범위 & {data.length==="true"?(
                    "도로 길이 포함"
                ):(
                    "도로 길이 제외"
                )}</h3>
            </div>
            <div class="data-box">
                
                <RiskBarChart style={{display:'inline-block'}} roadData={data.road} />
                <KakaoMap roadData={data.road} />
            </div>
        </Styles>
    );
};

export default RiskInfo;
