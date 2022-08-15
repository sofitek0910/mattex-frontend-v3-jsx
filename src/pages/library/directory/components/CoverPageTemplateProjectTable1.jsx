import { Button, Space, Table } from 'antd';
const { Column, ColumnGroup } = Table;

import { RightOutlined } from '@ant-design/icons';

const CoverPageTemplateTable1 = ({ step2, setStep2, step3, setStep3 }) => {
  const columns = [
    {
      title: 'Project ID',
      dataIndex: 'projectId',
      key: 'projectId',
    },
    {
      title: 'Project Name',
      dataIndex: 'projectName',
      key: 'projectName',
    },
    {
      title: 'Last Edited',
      dataIndex: 'lastEdited',
      key: 'lastEdited',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* <a>View {record.name}</a>
          <a>Open</a> */}
          <Button type="link" block onClick={() => setStep2(true)}>
            <RightOutlined />
          </Button>
        </Space>
      ),
      width: 50,
    },
  ];

  const data = [
    {
      key: 1,
      projectId: '1025',
      projectName: 'Main Contract for the Proposed Composite Development at No. 18 Hang',
      lastEdited: '2022/03/10 18:00',
    },
    {
      key: 2,
      projectId: '0992',
      projectName: 'Shek Wu Hui Effluent Polishing Plant',
      lastEdited: '2022/03/10 18:00',
    },
    {
      key: 3,
      projectId: '0968',
      projectName: 'DC/2018/09 Rehabilitation of Trunk Sewers in Tuen Mun',
      lastEdited: '2022/03/10 18:00',
    },
    {
      key: 4,
      projectId: '0997',
      projectName:
        '0997 Kwu Tung North Development Area, Phase 1: Roads and Drains Between Kwu Tung North...',
      lastEdited: '2022/03/10 18:00',
    },
  ];

  return <Table dataSource={data} columns={columns} />;
};

export default CoverPageTemplateTable1;
