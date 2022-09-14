import React, { useEffect, useState } from 'react'
import { useRequest } from 'ahooks';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space, Table, message } from 'antd';

import { getLabraryList, deleteLibrary } from '@/services/swagger/library'
import useException from '@/utils/useException';

const CoverPageTemplateTable = (props) => {

  const { filterOptions, isModalVisible } = props

  const [data, setData] = useState([])

  const { run, loading } = useRequest(
    () =>
      getLabraryList({
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

  const handleDeleteSpec = (id) => {
    deleteLibrary(id).then(() => {
      message.success('Success')
    }).catch(() => {
      message.error('Failed')
    }).finally(() => {
      run()
    })
  }

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
      title: 'Last Edited',
      dataIndex: 'created_at',
      key: 'created_at',
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
          <Button icon={<EditOutlined size="small" />} />
          <Button icon={<DeleteOutlined size="small" />} danger onClick={() => handleDeleteSpec(record.id)} />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    run()
  }, [filterOptions, isModalVisible])

  return (
    <Table loading={loading} dataSource={data} columns={columns} />
  )
};

export default CoverPageTemplateTable;
