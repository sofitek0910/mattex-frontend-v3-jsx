import React, { useEffect, useState } from 'react'
import { useRequest } from 'ahooks';

import { CopyOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Space, Table } from 'antd';

import { getLibrarySetList } from '@/services/swagger/library'
import useException from '@/utils/useException';

const CoverPageTemplateTable = (props) => {

  const { filterOptions } = props

  const [data, setData] = useState([])

  const columns = [
    {
      title: 'Code',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Specification Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Owner',
      dataIndex: 'creator',
      key: 'creator',
      render: (_, { creator }) => (
        <>{creator.name}</>
      ),
    },
    {
      title: 'Last Edited',
      dataIndex: 'created_at',
      key: 'updated_at',
      render: (_, { updated_at }) => (
        <>
          {new Date(updated_at).toLocaleString()}
        </>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EyeOutlined size="small" />} />
          <Button icon={<CopyOutlined size="small" />} />
          {record.owner === 'You' ? <Button icon={<EditOutlined size="small" />} /> : <></>}
          {record.owner === 'You' ? <Button icon={<DeleteOutlined size="small" />} danger /> : <></>}
        </Space>
      ),
    },
  ];

  const { run, loading } = useRequest(
    () =>
      getLibrarySetList({
        startswith: filterOptions.contains,
      }),
    {
      manual: true,
      onSuccess: (res) => {
        if (Array.isArray(res)) {
          setData(
            res.map((cell) => ({
              id: cell.id,
              name: cell.name,
              updated_at: cell.updated_at,
              creator: {
                id: cell.creator.id,
                name: cell.creator.name,
              },
            })),
          );
        }
      },
      throwOnError: true,
      onError: useException,
    },
  );

  useEffect(() => {
    run()
  }, [filterOptions])

  return (
    <Table loading={loading} dataSource={data} columns={columns} />
  )
};

export default CoverPageTemplateTable;
