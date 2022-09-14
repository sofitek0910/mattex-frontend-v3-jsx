import React, { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { history } from 'umi';

import { Button, Col, Row, Select, Space, Table, Tabs, Typography } from 'antd';
import { EyeOutlined, LeftOutlined, SettingOutlined } from '@ant-design/icons';

import Search from 'antd/lib/input/Search';
import { getSubmissionTypeList, getSubmissionList } from '@/services/swagger/submission';
import { SUBMISSION_STATUS } from '@/const';
import useException from '@/utils/useException';

import './index.less';

export default function Index() {
  const queryParams = new URLSearchParams(window.location.search);
  const projectId = queryParams.get('projid');

  const [activeTabKey, setActiveTabKey] = useState('all');
  const [submissionTypes, setSubmissionTypes] = useState([]);
  const [submissions, setSubmissions] = useState();
  const [submissionStatus, setSubmissionStatus] = useState();

  const tagData = [
    { text: 'In progress', color: 'rgba(0, 142, 211, 1)', bgColor: 'rgba(221, 244, 255, 1)' },
    { text: 'Awaiting approval', color: 'rgba(234, 162, 9, 1)', bgColor: 'rgba(255, 244, 219, 1)' },
    {
      text: 'Internally approved',
      color: 'rgba(20, 182, 57, 1)',
      bgColor: 'rgba(222, 250, 221, 1)',
    },
    { text: 'Rejected', color: 'rgba(210, 51, 1, 1)', bgColor: 'rgba(255, 238, 238, 1)' },
    { text: 'Submitted to SRM', color: 'rgba(1, 98, 75, 1)', bgColor: 'rgba(237, 255, 251, 1)' },
    { text: 'Approved from SRM', color: 'rgba(1, 98, 75, 1)', bgColor: 'rgba(237, 255, 251, 1)' },
    {
      text: 'Rejected from SRM',
      color: 'rgba(113, 112, 112, 1)',
      bgColor: 'rgba(244, 244, 244, 1)',
    },
  ];

  const columns = [
    {
      title: 'Submission Reference Number',
      dataIndex: 'submission_reference_number',
      key: 'submission_reference_number',
    },
    {
      title: 'System ID',
      dataIndex: 'system_id',
      key: 'system_id',
    },
    {
      title: 'Submission Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Person In Charge',
      dataIndex: 'person_in_charge',
      key: 'person_in_charge',
      render: (_, { person_in_charge }) => <>{person_in_charge.username}</>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const tag = tagData.find((cell) => cell.text === status);
        return (
          <div className="status-tag" style={{ backgroundColor: tag?.bgColor, color: tag?.color }}>
            {status}
          </div>
        );
      },
    },
    {
      title: 'Ver',
      dataIndex: 'rev',
      key: 'rev',
      render: (version) => 'V' + version,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <Button onClick={() => history.push(`/submission/${record.system_id}`)}>
          <EyeOutlined />
        </Button>
      ),
    },
  ];

  const { run, loading } = useRequest(
    () =>
      getSubmissionList({
        project_id: projectId ?? undefined,
        status: submissionStatus,
      }),
    {
      manual: true,
      throwOnError: true,
      onSuccess: (res) => {
        setSubmissions(res ?? []);
      },
      onError: useException,
    },
  );

  useEffect(() => {
    getSubmissionTypeList().then((res) => {
      setSubmissionTypes(res);
    });
  }, []);

  useEffect(() => {
    run();
  }, [submissionStatus]);

  return (
    <div>
      <Row align="middle" style={{ marginBottom: '2.25rem' }}>
        <Col flex="none">
          <Space style={{ display: 'flex', alignItems: 'center' }} size="middle" align="middle">
            <LeftOutlined />
            <Typography.Title level={3} style={{ marginBottom: 0 }}>
              List of Submission
            </Typography.Title>
            <Select
              style={{ width: '10.5rem' }}
              placeholder="Status"
              onChange={(val) => setSubmissionStatus(val)}
            >
              {SUBMISSION_STATUS.map((cell) => (
                <Select.Option value={cell.data} key={cell.data}>
                  {cell.label}
                </Select.Option>
              ))}
            </Select>
          </Space>
        </Col>
        <Col flex="auto">
          <Row flex="auto" justify="end">
            <Space>
              <Search style={{ width: '16.5rem' }} placeholder="Search Submission"></Search>
              <Button onClick={() => history.push(`/submission/${projectId}/create`)} type="primary">
                Create Submission
              </Button>
              <Button
                onClick={() => {
                  history.push(`/projects/setting?projid=${projid}`);
                }}
              >
                <SettingOutlined />
              </Button>
            </Space>
          </Row>
        </Col>
      </Row>
      <div>
        <Tabs
          defaultActiveKey="1"
          type="card"
          activeKey={activeTabKey}
          onChange={(k) => setActiveTabKey(k)}
        >
          {submissionTypes &&
            submissionTypes?.map((submissionType) => (
              <Tabs.TabPane
                key={submissionType.model_type}
                tab={
                  <div className="submission-tab">
                    <div>{submissionType.display_name}</div>
                    <div className="number-badge">
                      {
                        submissions?.filter(
                          (cell) => cell.submission_type === submissionType.submission_type_id,
                        ).length
                      }
                    </div>
                  </div>
                }
              >
                <Table
                  columns={columns}
                  loading={loading}
                  dataSource={submissions?.filter(
                    (cell) => cell.submission_type === submissionType.submission_type_id,
                  )}
                />
              </Tabs.TabPane>
            ))}
          <Tabs.TabPane
            tab={
              <div className="submission-tab">
                <div>All</div>
                <div className="number-badge">{submissions?.length}</div>
              </div>
            }
            key="all"
          >
            <Table columns={columns} loading={loading} dataSource={submissions} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}
