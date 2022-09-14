import { Table, Tag } from 'antd';

const CoverPageTemplateTable3 = (props) => {

  const { data } = props

  const columns = [
    {
      title: 'Template ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Template Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (_, { status }) => {
        let color = 'green';

        if (status === 'Active') {
          color = 'green';
        } else if (status === 'In Progress') {
          color = 'orange';
        } else if (status === 'Inactive') {
          color = 'volcano';
        }
        return (
          <Tag color={color}>
            {status.toUpperCase()}
          </Tag>
        );
      }
    },
    {
      title: 'Last Edited',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (_, { updated_at }) => (
        <>
          {new Date(updated_at).toLocaleString()}
        </>
      )
    }
  ];

  return <Table dataSource={data} columns={columns} />;
};

export default CoverPageTemplateTable3;
