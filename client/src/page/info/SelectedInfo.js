import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import CoefficientTable from '../../component/table/CoefficientTable';

const SelectedInfo = ({ coefficient, timeWindow, useLengthSelect }) => {
    const [showCoefficient, setShowCoefficient] = useState(false);
    const handleShowCoefficient = (e) => {
        e.preventDefault();
        setShowCoefficient(!showCoefficient);
    };

    return (
        <div>
            <h3>
                ▶{' '}
                {`시간간격 : ${timeWindow} 시간 & ${
                    useLengthSelect === 'true'
                        ? '도로 정보 사용'
                        : '구간 통계 사용'
                }`}
                <Button
                    style={{
                        margin: '10px',
                    }}
                    onClick={handleShowCoefficient}
                    variant="contained"
                    color="inherit"
                >
                    {!showCoefficient ? (
                        <span>계산식, 계수 보기</span>
                    ) : (
                        <span>계산식, 계수 닫기</span>
                    )}
                       
                </Button>
            </h3>
            {(showCoefficient && coefficient !== null)?(
                <div>
                    <div><h4 style={{display:'inline-block'}}>▶ EPDO </h4> {useLengthSelect === 'true'?(
                        <span> = intercept(0) + time(1) + day(2) + weather(3) + (현재통행량 X traffic(4)) + (도로길이 X length(5)) + (구간최소곡룰반경 X curvature(6)) + (구간 교량 개수 X bridge(7))</span>
                    ):(
                        <span> = intercept(0) + time(1) + day(2) + weather(3) + (현재통행량 X traffic(4)) + (구간계수)</span>
                    )}</div>
                    <div>
                        <CoefficientTable coefficient={coefficient}/>
                    </div>
                </div>
            ):(

                <div></div>
            )}
            <h4>▶ 표에서 도로이름을 클릭하시면 이동합니다.</h4>
        </div>
    );
};

export default SelectedInfo;
