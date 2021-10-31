import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import styled from 'styled-components';
const Styles = styled.div`
    padding: 1rem;

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
    let redCode = Math.floor(value * 255).toString(16);
   // let greenCode = Math.floor(255 - value * 255).toString(16);
    //(greenCode.length === 1 ? '0' + greenCode : greenCode) +
    ret =
        '#' +
        (redCode.length === 1 ? '0' + redCode : redCode) +
        'aaaa';
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
