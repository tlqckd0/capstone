import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const MaterialTable = ({ roadData,handleSelectRoadIdx }) => {
    return (
        <TableContainer
            style={{
                overflow: 'scroll',
                height: '700px',
                display: 'inline-block',
                width: '400px',
                color:'white'
            }}
            component={Paper}
        >
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>도로이름</TableCell>
                        <TableCell align="right">도로 길이(km)</TableCell>
                        <TableCell align="right">위험도(EPDO)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {roadData.map((row,idx) => (
                        <TableRow
                        style={{
                            "&:hover":"grey"
                        }}
                            onClick = {(e)=>{
                                handleSelectRoadIdx(e,idx);
                            }}
                            hover={true}
                            key={row.name}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.length}</TableCell>
                            <TableCell align="right">{row.risk}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MaterialTable;
