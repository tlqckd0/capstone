import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Tooltip } from '@mui/material';


import { styled } from '@mui/material/styles';

function back_color(num) {
    if (num === 1) return '#FFFFFF';
    if (Math.abs(num) > 0.6) return '#87ceeb';
    //0.6 이상이면 '#87ceeb' (sky blue)
    //0까지 white
    let value = 0.6 - Math.abs(num);
    value = (value * 10) / 6;
    const R = parseInt('86', 16) + (255 - parseInt('86', 16)) * value;
    const G = parseInt('CE', 16) + (255 - parseInt('CE', 16)) * value;
    const B = parseInt('EB', 16) + (255 - parseInt('EB', 16)) * value;
    return `rgb(${R},${G},${B})`;
}


const RelationTable = ({ correlationData }) => {
    return (
        <TableContainer
            style={{
                width: '1000px',
                margin: '20px',
            }}
            component={Paper}
        >
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <Tooltip
                            title="Add"
                            enterDelay={100}
                            leaveDelay={100}
                            followCursor
                        >
                            <TableCell
                                style={{
                                    border: '1px solid grey',
                                }}
                            >
                                상관관계
                            </TableCell>
                        </Tooltip>

                        {correlationData.header.map((item) => {
                            return (
                                <TableCell
                                    style={{
                                        padding: '1px',
                                        border: '1px solid grey',
                                        fontSize: '15px',
                                    }}
                                    align="right"
                                >
                                    {item}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {correlationData.value.map((list, row) => {
                        return (
                            <TableRow
                                key={correlationData.header[row]}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell
                                    style={{
                                        padding: '1px',
                                        border: '1px solid grey',
                                        fontSize: '15px',
                                    }}
                                    component="th"
                                    scope="row"
                                >
                                    {correlationData.header[row]}
                                </TableCell>
                                {list.map((val, col) => {
                                    return (
                                        <Tooltip
                                            title={`${correlationData.header[row]} / ${correlationData.header[col]}`}
                                            arrow
                                        >
                                            <TableCell
                                                style={{
                                                    border: '2px solid white',
                                                    backgroundColor: `${back_color(
                                                        val
                                                    )}`
                                                }}
                                                padding="normal"
                                                align="right"
                                            >
                                                {val}
                                            </TableCell>
                                        </Tooltip>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default RelationTable;
