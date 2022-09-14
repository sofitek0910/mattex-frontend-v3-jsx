import { useEffect, useState } from 'react';
import { history } from 'umi';
import { Button, Space, Table, Tag } from 'antd';
import { RightOutlined } from '@ant-design/icons';

const ProjectListTable = (props) => {
  const { tab, projects, loading } = props;

  const [filteredInfo, setFilteredInfo] = useState({});

  useEffect(() => {
    if (tab === 'All') {
      setFilteredInfo({});
    } else {
      setFilteredInfo({ status: [tab] });
    }
  }, [tab]);

  const proceedHandler = (record) => {
    history.push(`/projects/submissionList?projid=${record.project_id}`);
  };

  const columns = [
    {
      title: 'Project Code',
      dataIndex: 'project_code',
      key: 'project_code',
    },
    {
      title: 'Project Name',
      dataIndex: 'project_name',
      key: 'project_name',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => (
        <Tag color={status === 1 ? 'green' : 'volcano'} key={status}>
          {`${status === 1 ? 'Active' : 'Inactive'}`.toUpperCase()}
        </Tag>
      ),
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => {
        if (value === 'Active') {
          return record.status == 1;
        } else {
          return record.status != 1;
        }
      },
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<RightOutlined />} onClick={() => proceedHandler(record)} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={projects} columns={columns} loading={loading} />
    </>
  );
};

export default ProjectListTable;
