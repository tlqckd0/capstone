import React from 'react';
import styled from 'styled-components';
const Styles = styled.div`
    .color-grad {
        width: 80%;
        height:40px;
        border: 1px solid grey;
        margin-bottom: 30px;
        margin-left: auto;
        margin-right: auto;

        div{
            width: 50%;
            height:100%;
            display: inline-block;
        }
        .one-to-zero{
            background:linear-gradient(to left,#00aaaa,#ffaaaa)
        }
        .zero-to-one{
            background:linear-gradient(to right,#00aaaa,#ffaaaa)
        }
    }
    .row {
        display: fixed;
    }
    .rel_head {
        width: 50px;
        height: 50px;
        border: 1px solid grey;
        display: inline-block;
    }
    .item {
        width: 50px;
        height: 50px;
        border: 1px solid grey;
        display: inline-block;
        color: white;
    }
`;

function back_color(num) {
    const value = Math.abs(num * 1);

    let ret = '';
    let redCode = Math.floor(value * 255).toString(16);
    // let greenCode = Math.floor(255 - value * 255).toString(16);
    //(greenCode.length === 1 ? '0' + greenCode : greenCode) +
    ret = '#' + (redCode.length === 1 ? '0' + redCode : redCode) + 'aaaa';
    return ret;
}

const RelationTable = ({ roadData }) => {
    const header = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'n',
    ];
    const side_and_value = () => {
        const ret = header.map((item, idx) => {
            let temp = [];
            temp.push(item);
            for (let i = 0; i < header.length; i++) {
                temp.push((Math.random() * 2 - 1).toFixed(2));
            }
            return temp;
        });
        return ret;
    };

    const makeTable = () => {
        return (
            <div>
                <div className="row">
                    <div className="rel_head">.</div>
                    {header.map((item, idx) => (
                        <div key={`tab-${idx}`} className="rel_head">
                            {item}
                        </div>
                    ))}
                </div>
                {side_and_value().map((item, idx) => {
                    return (
                        <div className="row" key={`row-${idx}`}>
                            {item.map((cell, idx) => {
                                //header type
                                if (idx === 0) {
                                    return (
                                        <div
                                            key={`cell-${idx}`}
                                            className="rel_head"
                                        >
                                            {cell}
                                        </div>
                                    );
                                } else {
                                    //item type
                                    return (
                                        <div
                                            style={{
                                                backgroundColor:
                                                    back_color(cell),
                                            }}
                                            key={`cell-${idx}`}
                                            className="item"
                                        >
                                            {cell}
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <Styles style={{ display: 'inline-block' }}>
            <div className='color-grad'>
                <div className="one-to-zero">-1 ~ 0</div>
                <div className="zero-to-one"> 0 ~ 1</div>
            </div>

            {makeTable()}
        </Styles>
    );
};

export default RelationTable;

