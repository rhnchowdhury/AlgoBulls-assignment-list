// import React from 'react';

// const Test = () => {
//     return (
//         <div>

//         </div>
//     );
// };

// export default Test;


import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import dayjs from 'dayjs';

export type TableListItem = {
    key: number;
    name: string;
    creator: string;
    createdAt: number;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['rai', 'tan', 'tal', 'tav', 'mai'];

for (let i = 0; i < 1; i += 1) {
    tableListDataSource.push({
        key: i,
        name: 'AppName',
        creator: creators[Math.floor(Math.random() * creators.length)],
        createdAt: Date.now() - Math.floor(Math.random() * 100000),
    });
}

const columns: ProColumns<TableListItem>[] = [
    {
        title: 'ami',
        dataIndex: 'name',
        render: (_) => <a>{_}</a>,
        formItemProps: {
            lightProps: {
                labelFormatter: (value) => `app-${value}`,
            },
        },
    },
    {
        title: 'tmi',
        dataIndex: 'startTime',
        valueType: 'dateRange',
        hideInTable: true,
        initialValue: [dayjs(), dayjs().add(1, 'day')],
    },
    {
        title: 'sei',
        dataIndex: 'creator',
        valueType: 'select',
        valueEnum: {
            all: { text: '全部' },
            付小小: { text: '付小小' },
            曲丽丽: { text: '曲丽丽' },
            林东东: { text: '林东东' },
            陈帅帅: { text: '陈帅帅' },
            兼某某: { text: '兼某某' },
        },
    },
];

export default () => {
    return (
        <ProTable<TableListItem>
            columns={columns}
            request={(params, sorter, filter) => {
                // 表单搜索项会从 params 传入，传递给后端接口。
                console.log(params, sorter, filter);
                return Promise.resolve({
                    data: tableListDataSource,
                    success: true,
                });
            }}
            headerTitle="Light Filter"
            rowKey="key"
            pagination={{
                showQuickJumper: true,
            }}
            options={false}
            search={{
                filterType: 'light',
            }}
            dateFormatter="string"
        />
    );
};