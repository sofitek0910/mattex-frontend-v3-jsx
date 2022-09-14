import { useState, useEffect } from 'react';
import { useRequest } from 'ahooks';
import { Button, Space, Table, Tag } from 'antd';

import { EyeOutlined } from '@ant-design/icons';

import CoverPageTemplateProjectTable1 from './CoverPageTemplateProjectTable1';
import CoverPageTemplateProjectTable2 from './CoverPageTemplateProjectTable2';
import CoverPageTemplateProjectTable3 from './CoverPageTemplateProjectTable3';

import { getTemplateList } from '@/services/swagger/library';
import useException from '@/utils/useException';

const CoverPageTemplateTable = (props) => {
  const { filterOptions } = props;

  const [templateList, setTemplateList] = useState([]);
  const [templateDetail, setTemplateDetail] = useState();
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);

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
      title: 'Projects',
      dataIndex: 'project',
      key: 'project',
      render: (_, { project }) => (
        <>
          {project.project_name.length < 50
            ? project.project_name
            : `${project.project_name.substring(0, 50)}...`}
        </>
      ),
    },
    {
      title: 'Submission Type',
      dataIndex: 'submission_type',
      key: 'submission_type',
      render: (_, { submission_type }) => (
        <>
          {submission_type.map((submission) => (
            <Tag key={submission.submission_type_id} style={{ margin: '2px 2px 2px 0' }}>
              {submission.display_name}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Client',
      dataIndex: 'creator',
      key: 'creator',
      render: (_, { creator }) => (
        <Tag style={{ maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}>
          {creator.name}
        </Tag>
      ),
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
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Last Edited',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (_, { updated_at }) => <>{new Date(updated_at).toLocaleString()}</>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined size="small" />}
            onClick={() => {
              setTemplateDetail(record);
              setStep1(true);
            }}
          />
        </Space>
      ),
    },
  ];

  const { run, loading } = useRequest(
    () =>
      getTemplateList({
        project_id: 1,
        ...filterOptions,
      }),
    {
      manual: true,
      onSuccess: (res) => {
        console.log(res);
        setTemplateList(res);
      },
      throwOnError: true,
      onError: useException,
    },
  );

  useEffect(() => {
    run();
  }, [filterOptions]);

  return (
    <>
      {!step1 && !step2 && !step3 ? (
        <Table loading={loading} dataSource={templateList} columns={columns} />
      ) : (
        <></>
      )}

      {step1 && !step2 && !step3 ? (
        <CoverPageTemplateProjectTable1
          step2={step2}
          setStep2={setStep2}
          projectDetail={templateDetail.project}
        />
      ) : (
        <></>
      )}

      {step1 && step2 && !step3 ? (
        <CoverPageTemplateProjectTable2
          step3={step3}
          setStep3={setStep3}
          submissionTypes={templateDetail.submission_type ?? []}
        />
      ) : (
        <></>
      )}

      {step1 && step2 && step3 ? <CoverPageTemplateProjectTable3 data={templateList} /> : <></>}
    </>
  );
};

export default CoverPageTemplateTable;
