import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';
const RiskBarChart = ({ roadData }) => {
    //RISK 값에 따라서 초록색 ~ 빨간색.
    return (
        <div>
            <BarChart
                width={800}
                height={300}
                data={roadData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="length" fill="#8884d8" />
                <Bar dataKey="risk" fill="#82ca9d" />
            </BarChart>
        </div>
    );
};

export default RiskBarChart;
