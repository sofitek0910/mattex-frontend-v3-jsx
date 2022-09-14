import { RightOutlined } from '@ant-design/icons';
import { Button, Space, Table } from 'antd';

const CoverPageTemplateTable2 = (props) => {

  const { setStep3, submissionTypes } = props

  const columns = [
    {
      title: 'Submission Type',
      dataIndex: 'display_name',
      key: 'display_name',
    },
    {
      title: 'Last Edited',
      dataIndex: 'updated_at',
      key: 'updated_at',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" block onClick={() => setStep3(true)}>
            <RightOutlined />
          </Button>
        </Space>
      ),
      width: 50,
    },
  ];

  return <Table dataSource={submissionTypes} columns={columns} />;
};

export default CoverPageTemplateTable2;
