import React, { useState, useEffect } from 'react'

import { Button, Space, Table } from 'antd';

import { RightOutlined } from '@ant-design/icons';

const CoverPageTemplateTable1 = (props) => {

  const { setStep2, projectDetail } = props
  const [data, setData] = useState([])

  const columns = [
    {
      title: 'Project ID',
      dataIndex: 'project_id',
      key: 'project_id',
    },
    {
      title: 'Project Name',
      dataIndex: 'project_name',
      key: 'project_name',
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
          <Button type="link" block onClick={() => setStep2(true)}>
            <RightOutlined />
          </Button>
        </Space>
      ),
      width: 50,
    },
  ];

  useEffect(() => {
    if (projectDetail) {
      setData([{
        project_id: projectDetail.project_id,
        project_name: projectDetail.project_name,
        updated_at: ''
      }])
    }
  }, [projectDetail])

  return <Table dataSource={data} columns={columns} />;
};

export default CoverPageTemplateTable1;
