import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const CoefficientTable = ({ coefficient }) => {
    return (
        <TableContainer
            style={{
                display: 'inline-block',
                width: '400px',
                color: 'white',
            }}
            component={Paper}
        >
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>구분</TableCell>
                        <TableCell>이름</TableCell>
                        <TableCell align="right">값</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {coefficient.map((row, idx) => (
                        <TableRow
                            hover={true}
                            key={row.name}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell align="left">{idx} </TableCell>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CoefficientTable;
