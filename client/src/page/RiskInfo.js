import React from 'react';
import styled from 'styled-components';
import RiskBarChart from '../component/graph/RiskBarChart';

const Styles = styled.div`
    .data-box {
        border: 1px black solid;
        margin: 10px;
        width: 800px;
        height: 400px;
        display: inline-block;
    }
`;

const RiskInfo = ({ data }) => {
    console.log(data);
    return (
        <Styles style={{ display: 'inline-block' }}>
            <div>
                <span> {data.timeWindow}시간 범위 & </span>
                <span>{data.length==="true"?(
                    "도로 길이 포함"
                ):(
                    "도로 길이 제외"
                )}</span>
            </div>
            <div class="data-box">
                
                <RiskBarChart roadData={data.road} />
            </div>
        </Styles>
    );
};

export default RiskInfo;
