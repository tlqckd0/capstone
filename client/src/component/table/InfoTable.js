import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import styled from 'styled-components';
const Styles = styled.div`
    height: 700px;
    width:300px;
    overflow: scroll;
    table {
        border-spacing: 0;
        border: 1px solid black;

        tr {
            :last-child {
                td {
                    border-bottom: 0;
                }
            }
        }

        th,
        td {
            margin: 0;
            padding: 0.5rem;
            border-bottom: 1px solid black;
            border-right: 1px solid black;

            :last-child {
                border-right: 0;
            }
        }
    }
`;
function back_color(num) {
    const value = Math.abs(num * 1);
    let ret = '';
    if(value < 0.5) ret = '#40e0d0';

    if(value >=0.5 && value < 1.0){
        ret = '#ff8c00';
    }

    if(value >= 1.0) ret = '#ff0080';

    return ret;
}
const InfoTable = ({ roadData }) => {
    const data = useMemo(() => roadData, [roadData]);
    const columns = useMemo(
        () => [
            {
                Header: '도로 이름',
                accessor: 'name', // accessor is the "key" in the data
            },
            {
                Header: '도로 길이(km)',
                accessor: 'length',
            },
            {
                Header: '위험도',
                accessor: 'risk',
            },
        ],
        []
    );
        console.log(columns);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({
            columns,
            data,
        });

    return (
        <Styles style={{display: 'inline-block'}}>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td
                                            style={{
                                                backgroundColor:
                                                    cell.column.id === 'risk'
                                                        ? back_color(cell.value)
                                                        : '#ffffff',
                                            }}
                                            {...cell.getCellProps()}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Styles>
    );
};

export default InfoTable;
