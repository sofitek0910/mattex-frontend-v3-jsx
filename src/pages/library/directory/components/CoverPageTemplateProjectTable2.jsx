import { RightOutlined } from '@ant-design/icons';
import { Button, Space, Table } from 'antd';
const { Column, ColumnGroup } = Table;

const CoverPageTemplateTable2 = ({ step2, setStep2, step3, setStep3 }) => {
  const columns = [
    {
      title: 'Submission Type',
      dataIndex: 'submissionType',
      key: 'submissionType',
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
          <Button type="link" block onClick={() => setStep3(true)}>
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
      submissionType: 'Material',
      lastEdited: '2022/03/10 18:00',
    },
    {
      key: 2,
      submissionType: 'Model Statment',
      lastEdited: '2022/03/10 18:00',
    },
    {
      key: 3,
      submissionType: 'Material',
      lastEdited: '2022/03/10 18:00',
    },
    {
      key: 4,
      submissionType: 'Model Statement',
      lastEdited: '2022/03/10 18:00',
    },
  ];

  return <Table dataSource={data} columns={columns} />;
};

export default CoverPageTemplateTable2;
