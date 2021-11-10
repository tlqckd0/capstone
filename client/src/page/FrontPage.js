import { Button, Paper, Box } from '@material-ui/core';
import React, { useState } from 'react';
import ChooseRoadLength from './option/ChooseRoadLength';
import ChooseTimeWindow from './option/ChooseTimeWindow';
//import RoadRiskPage from './TotalRoadRiskPage';

import styled from 'styled-components';
import { get } from 'axios';
import KakaoMap2 from '../component/map/KakaoMap2';
import InfoTable from '../component/table/InfoTable';
import MaterialTable from '../component/table/MaterialTable';

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
    const [lengthSelect, setLengthSelect] = useState('true');
    const [roadData, setRoadData] = useState({});
    const [roadRisk, setroadRisk] = useState([]);
    const [init, setInit] = useState(false);
    const handleTimeWindow = (e) => {
        e.preventDefault();
        setTimeWindow(e.target.value);
    };

    const handleRoadSelect = (e) => {
        e.preventDefault();
        setLengthSelect(e.target.value);
    };

    const add_option_handler = async (e) => {
        e.preventDefault();
        const riskData = { name: null, data: null };
        riskData.name = `${timeWindow}&${lengthSelect}`;
        const temp = await get(
            `api/risk2/${'경부'}/${timeWindow}/${lengthSelect}`
        );
        setInit(true);
        riskData.data = temp.data;
        setroadRisk(riskData.data.road);
        setRoadData(riskData.data);
    };

    return (
        <Styles style={{ marginLeft: '50px', marginRight: '50px' }}>
            <ChooseTimeWindow
                class="optionSelector"
                handleTimeWindow={handleTimeWindow}
            />
            <ChooseRoadLength
                class="optionSelector"
                handleRoadSelect={handleRoadSelect}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={add_option_handler}
            >
                옵션선택
            </Button>
            <hr/>
            {!init ? (
                <h3 >
                    옵션을 선택해 주세요
                </h3>
            ) : (
                <h3>
                    {`시간간격 : ${timeWindow} , 도로길이 선택 ${lengthSelect}`}
                </h3>
            )}
            <h4>
                위험도(EPDO) = 12 × 사망사고 + 3 × 부상사고+ 물피사고
            </h4>
            <hr />
            <div>
                <KakaoMap2 roadData={roadData} />
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
                    <MaterialTable roadData={roadRisk} />
                )}
            </div>
        </Styles>
    );
};

export default FrontPage;
