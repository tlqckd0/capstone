import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
    .footer {
        margin-bottom: 0px;
        height: 100px;
        background-color: black;
        color: white;
        padding: 15px 0;
        text-align: center;
        left: 0;
        bottom: 0;
        width: 100%;
    }
`;

const Footer = () => {
    return (
        <Styles>
            <div className="footer">
                <br/>
                <div>동국대학교 컴퓨터공학과 캡스톤디자인</div>
                <br/>
                <div>라온힐조</div>
            </div>
        </Styles>
    );
};

export default Footer;
