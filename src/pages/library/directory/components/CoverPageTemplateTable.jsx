import { Button, Space, Table, Tag } from 'antd';
const { Column, ColumnGroup } = Table;

import { EyeOutlined } from '@ant-design/icons';

import { useState } from 'react';
import CoverPageTemplateProjectTable1 from './CoverPageTemplateProjectTable1';
import CoverPageTemplateProjectTable2 from './CoverPageTemplateProjectTable2';
import CoverPageTemplateProjectTable3 from './CoverPageTemplateProjectTable3';

const CoverPageTemplateTable = () => {
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);

  const columns = [
    {
      title: 'Template ID',
      dataIndex: 'templateId',
      key: 'templateId',
      //render: (text) => <a>{text}</a>,
    },
    {
      title: 'Template Name',
      dataIndex: 'templateName',
      key: 'templateName',
    },
    {
      title: 'Projects',
      dataIndex: 'projects',
      key: 'projects',
      render: (_, { projects }) => (
        <>
          {projects.map((project) => {
            return (
              <Tag
                key={project}
                style={{ maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}
              >
                {project}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Submission Type',
      dataIndex: 'submissionType',
      key: 'submissionType',
    },
    {
      title: 'Client',
      dataIndex: 'clients',
      key: 'clients',
      render: (_, { clients }) => (
        <>
          {clients.map((client) => {
            return (
              <Tag
                key={client}
                style={{ maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}
              >
                {client}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (_, { status }) => (
        <>
          {status.map((tag) => {
            let color = 'green';

            if (tag === 'Active') {
              color = 'green';
            } else if (tag === 'In Progress') {
              color = 'orange';
            } else if (tag === 'Inactive') {
              color = 'volcano';
            }

            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
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
          <Button icon={<EyeOutlined size="small" />} onClick={() => setStep1(true)} />
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: 1,
      templateId: '0056',
      templateName: 'Government Method Statment Cover Page',
      projects: ['1025 Main Contract for the Proposed Composite Development at No. 18 Hang'],
      submissionType: 'Method Statement',
      clients: ['Mattex', 'Luk'],
      status: ['Active'],
      lastEdited: '2022/03/10 18:00',
    },
    {
      key: 2,
      templateId: '0024',
      templateName: 'Shek Wu Temp. Work Design Cover Page New',
      projects: ['0992 Shek Wu Hui Effluent Polishing Plant'],
      submissionType: 'Method Statement',
      clients: ['Mattex'],
      status: ['In Progress'],
      lastEdited: '2022/03/10 18:00',
    },
    {
      key: 3,
      templateId: '0055',
      templateName: 'Record RD Cover Page Tuen Mun 2022',
      projects: [
        '0968 DC/2018/09 Rehabilitation of Trunk Sewers in Tuen Mun',
        '0992 Shek Wu Hui Effluent Polishing Plant',
      ],
      submissionType: 'Method Statement',
      clients: ['Mattex', 'Luk'],
      status: ['Active'],
      lastEdited: '2022/03/10 18:00',
    },
    {
      key: 4,
      templateId: '0052',
      templateName: 'Shek Wu Temp. Work Design Cover Page New',
      projects: [
        '0997 Kwu Tung North Development Area, Phase 1: Roads and Drains Between Kwu Tung North...',
        '1025 Main Contract for the Proposed Composite Development at No. 18 Hang...',
      ],
      submissionType: 'Method Statement',
      clients: [],
      status: ['Inactive'],
      lastEdited: '2022/03/10 18:00',
    },
  ];

  console.log(`step1: ${step1}`);
  console.log(`step2: ${step2}`);
  console.log(`step3: ${step3}`);

  return (
    <>
      {!step1 && !step2 && !step3 ? <Table dataSource={data} columns={columns} /> : <></>}

      {step1 && !step2 && !step3 ? (
        <CoverPageTemplateProjectTable1 step2={step2} setStep2={setStep2} />
      ) : (
        <></>
      )}

      {step1 && step2 && !step3 ? (
        <CoverPageTemplateProjectTable2 step3={step3} setStep3={setStep3} />
      ) : (
        <></>
      )}

      {step1 && step2 && step3 ? <CoverPageTemplateProjectTable3 /> : <></>}
    </>
  );
};

export default CoverPageTemplateTable;
