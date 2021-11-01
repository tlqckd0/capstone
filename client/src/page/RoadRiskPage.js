import React from 'react';
import RiskInfo from './RiskInfo';

const RoadRiskPage = ({ dataList }) => {
    //데이터 분배해주는 페이지.
    const renderRiskData = dataList.map((data,idx)=>{
        return <RiskInfo key={idx} data={data.data}/>
    })
    return (
        <div>
            {renderRiskData}
        </div>
    );
};

export default RoadRiskPage;
