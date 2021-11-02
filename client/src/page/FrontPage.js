import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import ChooseRoadLength from './option/ChooseRoadLength';
import ChooseTimeWindow from './option/ChooseTimeWindow';
import RoadRiskPage from './RoadRiskPage';

import styled from 'styled-components';
import { get } from 'axios';
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
    const [optionList, setOptionList] = useState([]);
    const [timeWindow, setTimeWindow] = useState(12);
    const [lengthSelect, setLengthSelect] = useState('true');
    const [dataList, setDataList] = useState([]);

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
        let idx = optionList.findIndex(
            (e) => e === `${timeWindow}&${lengthSelect}`
        );

        if (idx === -1) {
            const riskData = { name: null, data: null };
            riskData.name = `${timeWindow}&${lengthSelect}`;
            const temp = await get(
                `api/risk2/${'경부'}/${timeWindow}/${lengthSelect}`
            );
            riskData.data = temp.data;
            setDataList([...dataList, riskData]);
            setOptionList([...optionList, `${timeWindow}&${lengthSelect}`]);
        } else {
            alert('이미 존재하는 옵션입니다.');
        }
    };
    const delete_option_handler = (e) => {
        e.preventDefault();
        const value = e.target.parentElement.children[0].innerText;
        let idx_info = optionList.findIndex((e) => e === value);
        let idx_data = dataList.findIndex((e) => e.name === value);
        if (idx_info === -1) {
            alert('에러');
        } else {
            setOptionList(
                optionList
                    .slice(0, idx_info)
                    .concat(optionList.slice(idx_info + 1, optionList.length))
            );
        }

        if (idx_data === -1) {
            alert('에러');
        } else {
            setDataList(
                dataList
                    .slice(0, idx_data)
                    .concat(dataList.slice(idx_data + 1, dataList.length))
            );
        }
    };

    const showOptionList = optionList.map((item, idx) => {
        return (
            <span key={idx} class="option">
                <span>{item}</span>
                <div class="delete" onClick={delete_option_handler}>
                    {' '}
                    삭제{' '}
                </div>
            </span>
        );
    });
    return (
        <Styles style={{ marginLeft: '5%', marginRight: '5%' }}>
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
                옵션추가
            </Button>
            <hr />
            {showOptionList}
            <hr />
            <RoadRiskPage dataList={dataList} />
        </Styles>
    );
};

export default FrontPage;
