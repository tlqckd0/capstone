import { Button, Paper, Box } from '@material-ui/core';
import React, { useState } from 'react';
import ChooseRoadLength from './option/ChooseRoadLength';
import ChooseTimeWindow from './option/ChooseTimeWindow';
//import RoadRiskPage from './TotalRoadRiskPage';

import styled from 'styled-components';
import { get } from 'axios';
import KakaoMap2 from '../component/map/KakaoMap2';
import MaterialTable from '../component/table/MaterialTable';
import RelationTable from '../component/table/RelatiohTable';
import SelectedInfo from './info/SelectedInfo';
import OptionSelector from './option/OptionSelector';

const Styles = styled.div`
    .optionSelector {
        display: block;
    }
    .option {
        border: 1px grey solid;
        padding: 5px;
        margin-top: 10px;
        margin: 5px;
        border-radius: 30px;
    }
    .delete {
        border: 1px grey solid;
        border-radius: 50%;
        margin: 5px;
        padding: 2px;
        display: inline-block;
    }
    .delete:hover {
        background-color: grey;
    }
    .optionList {
        border: 1px grey solid;
        padding: 20px;
        display: inline-block;
        margin-left: 100px;
        border-radius: 50px;
    }
`;

const FrontPage = () => {
    const [timeWindow, setTimeWindow] = useState(12);
    const [useLengthSelect, setUseLengthSelect] = useState('true');
    const [roadData, setRoadData] = useState({});
    const [roadRiskData, setRoadRiskData] = useState([]);
    const [init, setInit] = useState(false);
    const [selectRoadIdx, setSelectRoadIdx] = useState([0]);

    const [correlation, setCorrelation] = useState(false);
    const [correlationData, setCorrelationData] = useState(null);
    const [coefficient, setCoefficient] = useState([]);

    const handleTimeWindow = (e) => {
        e.preventDefault();
        setTimeWindow(e.target.value);
    };

    const handleRoadOption = (e) => {
        e.preventDefault();
        setUseLengthSelect(e.target.value);
    };

    const handleSelectRoadIdx = (e, value) => {
        e.preventDefault();
        setSelectRoadIdx(value);
    };

    const handleShowCorrelation = async (e) => {
        e.preventDefault();
        setCorrelation(!correlation);
        if (correlationData === null) {
            const getData = await get(`api/correlation`);
            setCorrelationData(getData.data);
        }
    };



    const add_option_handler = async (e) => {
        e.preventDefault();
        const getData = await get(`api/risk/${timeWindow}/${useLengthSelect}`);
        setInit(true);
        //데이터 담기(이거 어떻게 분리할까?)

        setCoefficient(Object.keys(getData.data.coefficient).map((keyName) => {
            return { name: keyName, value: getData.data.coefficient[keyName] };
        }));
        setRoadRiskData(getData.data.road);
        setRoadData(getData.data);
    };

    return (
        <Styles style={{ marginLeft: '50px', marginRight: '50px' }}>
            <OptionSelector
                handleTimeWindow={handleTimeWindow}
                handleRoadOption={handleRoadOption}
            />
            <br />
            <Button
                style={{
                    margin: '10px',
                }}
                variant="contained"
                color="primary"
                onClick={add_option_handler}
            >
                옵션선택
            </Button>
            <Button
                style={{
                    margin: '10px',
                }}
                onClick={handleShowCorrelation}
                variant="contained"
                color="inherit"
            >
                {correlation === true ? '상관계수 닫기' : '상관계수 보기'}
            </Button>

            <hr />
            {!init ? (
                <h3>옵션을 선택해 주세요</h3>
            ) : (
                <SelectedInfo
                coefficient={coefficient}
                    timeWindow={timeWindow}
                    useLengthSelect={useLengthSelect}
                />
            )}
            {correlation === true && correlationData !== null ? (
                <div>
                    <hr />
                    <RelationTable correlationData={correlationData} />
                </div>
            ) : (
                <div></div>
            )}
            <hr />
            <h5>※ 위험도(EPDO) = 12 × 사망사고 + 3 × 부상사고+ 물피사고</h5>
            <hr />
            <div
                style={{
                    width: '1200px',
                    margin: '10px',
                }}
            >
                <KakaoMap2 roadData={roadData} selectRoadIdx={selectRoadIdx} />
                {!init ? (
                    <Box
                        style={{
                            display: 'inline-block',
                            height: '700px',
                            width: '300px',
                        }}
                    >
                        <Paper
                            color="primary"
                            variant="outlined"
                            style={{
                                display: 'inline-block',
                                height: '700px',
                                width: '300px',
                            }}
                        />
                    </Box>
                ) : (
                    // <InfoTable roadData={roadRisk} />
                    <MaterialTable
                        roadData={roadRiskData}
                        roadData1={roadData}
                        handleSelectRoadIdx={handleSelectRoadIdx}
                    />
                )}
            </div>
        </Styles>
    );
};

export default FrontPage;
