import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
    .header{
        height :100px;
        background-color:grey;
        color:white;
        padding-top : 50px;
        padding-left: 100px;
        text-align: left;
        margin-bottom:10px;
    }
`;

const Header = () => {
    return (
        <Styles>
            <div className='header'>
                <h1>교통사고 예측 시스템 v1</h1>
            </div>
        </Styles>
    );
};

export default Header;
