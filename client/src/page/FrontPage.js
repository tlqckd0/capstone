import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import ChooseRoadLength from './option/ChooseRoadLength';
import ChooseTimeWindow from './option/ChooseTimeWindow';

import styled from 'styled-components';
import {get} from 'axios';
const Styles = styled.div`
    .optionSelector {
        display: block;
    }
    .option {
        border: 1px grey solid;
        padding: 1px;
        margin-top: 10px;
        margin: 5px;
    }
    .delete {
        border: 1px black solid;
        border-radius: 50%;
    }
    .delete:hover {
        background-color: red;
    }
`;

const FrontPage = () => {
    const [optionList, setOptionList] = useState([]);
    const [timeWindow, setTimeWindow] = useState(24);
    const [lengthSelect, setLengthSelect] = useState('false');
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
            const riskData = await get(`api/risk2/${'경부'}/${timeWindow}/${lengthSelect}`);
            setDataList([...dataList,riskData.data]);
            setOptionList([...optionList, `${timeWindow}&${lengthSelect}`]);
        } else {
            alert('이미 존재하는 옵션입니다.');
        }
    };
    const delete_option_handler = (e) => {
        e.preventDefault();
        const value = e.target.parentElement.children[0].innerText;
        let idx = optionList.findIndex((e) => e === value);
        if (idx === -1) {
            alert('에러');
        } else {
            setOptionList(
                optionList
                    .slice(0, idx)
                    .concat(optionList.slice(idx + 1, optionList.length))
            );
        }
    };

    const showResult = () => {
        return (
            <div>
                <span>{timeWindow}</span>
                <span>{lengthSelect}</span>
            </div>
        );
    };

    const showOptionList = optionList.map((item, idx) => {
        return (
            <span key={idx} class="option">
                <span>{item}</span>
                <span class="delete" onClick={delete_option_handler}>
                    {' '}
                    X{' '}
                </span>
            </span>
        );
    });
    return (
        <Styles>
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
            <div>{showOptionList}</div>
            <hr />
            {showResult()}
            <div>ㅇㅅㅇ</div>
            <div></div>

        </Styles>
    );
};

export default FrontPage;
