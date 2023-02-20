import type {
    ActionType,
    EditableFormInstance,
    ProColumns,
    ProFormInstance,
} from '@ant-design/pro-components';
import {
    EditableProTable,
    ProCard,
    ProForm,
    ProFormDependency,
    ProFormDigit,
} from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';

type DataSourceType = {
    id: React.Key;
    associate?: string;
    questionsNum?: number;
    type?: string;
    fraction?: number;
    scoringMethod?: string;
};

const defaultData: DataSourceType[] = [
    {
        id: 624748504,
        associate: 'abc',
        questionsNum: 10,
        type: 'multiple',
        scoringMethod: 'continuous',
        fraction: 20,
    },
    {
        id: 624691229,
        associate: 'def',
        questionsNum: 10,
        scoringMethod: 'continuous',
        type: 'radio',
        fraction: 20,
    },
    {
        id: 624748503,
        associate: 'ghi',
        questionsNum: 10,
        type: 'judge',
        scoringMethod: 'continuous',
        fraction: 20,
    },
    {
        id: 624691220,
        associate: 'jkl',
        questionsNum: 10,
        scoringMethod: 'continuous',
        type: 'vacant',
        fraction: 20,
    },
];

const Home = () => {
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() => []);
    const formRef = useRef<ProFormInstance<any>>();
    const actionRef = useRef<ActionType>();
    const editableFormRef = useRef<EditableFormInstance>();
    const columns: ProColumns<DataSourceType>[] = [
        {
            title: 'Timestamp created',
            dataIndex: 'associate',
            valueType: 'text',
            ellipsis: true,
        },
        {
            title: 'Title',
            key: 'type',
            dataIndex: 'type',
            valueType: 'select',
            valueEnum: {
                multiple: { text: 's', status: 'Default' },
                radio: { text: 'p', status: 'Warning' },
                vacant: {
                    text: 'q',
                    status: 'Error',
                },
                judge: {
                    text: 'r',
                    status: 'Success',
                },
            },
        },
        {
            title: 'Description',
            dataIndex: 'questionsNum',
            valueType: 'digit',
        },
        {
            title: 'Due Date',
            dataIndex: 'scoringMethod',
            valueType: 'select',
            request: async () => [
                {
                    value: 'discrete',
                    label: 'x',
                },
                {
                    value: 'continuous',
                    label: 'y',
                },
            ],
            fieldProps: (_, { rowIndex }) => {
                return {
                    onSelect: () => {

                        editableFormRef.current?.setRowData?.(rowIndex, { fraction: [] });
                    },
                };
            },
        },
        {
            title: 'Tag',
            width: 150,
            dataIndex: 'fraction',
            valueType: (record) => {
                const scoringMethod = record?.scoringMethod;
                if (scoringMethod === 'discrete') return 'select';
                return 'digit';
            },
            fieldProps: {
                mode: 'multiple',
            },
            request: async () =>
                ['A', 'B', 'D', 'E', 'F'].map((item, index) => ({
                    label: item,
                    value: index,
                })),
        },
        {
            title: 'Status',
            valueType: 'option',
            render: (_, row) => [
                <a
                    key="delete"
                    onClick={() => {
                        const tableDataSource = formRef.current?.getFieldValue('table') as DataSourceType[];
                        formRef.current?.setFieldsValue({
                            table: tableDataSource.filter((item) => item.id !== row?.id),
                        });
                    }}
                >
                    2
                </a>,
                <a
                    key="edit"
                    onClick={() => {
                        actionRef.current?.startEditable(row.id);
                    }}
                >
                    1
                </a>,
            ],
        },
    ];

    return (
        <ProCard>
            <div
                style={{
                    maxWidth: 800,
                    margin: 'auto',
                }}
            >
                <ProForm<{
                    table: DataSourceType[];
                }>
                    formRef={formRef}
                    initialValues={{
                        table: defaultData,
                    }}
                >
                    <ProFormDependency name={['table']}>
                        {({ table }) => {
                            const info = (table as DataSourceType[]).reduce(
                                (pre, item) => {
                                    return {
                                        totalScore: pre.totalScore + parseInt((item?.fraction || 0).toString(), 10),
                                        questions: pre.questions + parseInt((item?.questionsNum || 0).toString(), 10),
                                    };
                                },
                                { totalScore: 0, questions: 0 },
                            );
                            return (
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 16,
                                        paddingBlockEnd: 16,
                                    }}
                                >
                                    {/* <div style={{ flex: 1 }}>89：{info.totalScore}</div>
                                    <div style={{ flex: 1 }}>90：{info.questions}</div> */}
                                    <div style={{ flex: 2 }}>
                                        <ProFormDigit label="a" />
                                    </div>
                                    <div style={{ flex: 2 }}>
                                        <ProFormDigit label="b" />
                                    </div>
                                </div>
                            );
                        }}
                    </ProFormDependency>
                    <EditableProTable<DataSourceType>
                        rowKey="id"
                        scroll={{
                            x: true,
                        }}
                        editableFormRef={editableFormRef}
                        controlled
                        actionRef={actionRef}
                        formItemProps={{
                            label: 'A Title',
                            // rules: [
                            //     {
                            //         validator: async (_, value) => {
                            //             if (value.length < 1) {
                            //                 throw new Error('请至少添加一个题库');
                            //             }

                            //             if (value.length > 5) {
                            //                 throw new Error('最多可以设置五个题库');
                            //             }
                            //         },
                            //     },
                            // ],
                        }}
                        maxLength={10}
                        name="table"
                        columns={columns}
                        recordCreatorProps={{
                            record: (index) => {
                                return { id: index + 1 };
                            },
                        }}
                    // editable={{
                    //     type: 'multiple',
                    //     editableKeys,
                    //     onChange: setEditableRowKeys,
                    // }}
                    />
                </ProForm>
            </div>
        </ProCard>
    );
};
export default Home;