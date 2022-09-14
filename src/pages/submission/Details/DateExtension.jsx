import {
  DownloadOutlined,
  EyeOutlined,
  PaperClipOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import Icon from '@ant-design/icons';

import TabPane from '@ant-design/pro-card/lib/components/TabPane';
import { Button, Space, Table, Tabs } from 'antd';
import { useState } from 'react';
import fileImg from './file.png';
import { icons } from '@/utils/icons';
const VersionIcon = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.08695 11.9712L12.3172 7.89773L13.4739 8.79901L7.08695 13.7667L0.699951 8.79901L1.84961 7.90483L7.08695 11.9712ZM7.08695 10.1687L0.699951 5.201L7.08695 0.233337L13.4739 5.201L7.08695 10.1687ZM7.08695 2.02879L3.01346 5.201L7.08695 8.37321L11.1604 5.201L7.08695 2.02879Z"
      fill="currentColor"
    />
  </svg>
);

const rows = [
  {
    requestedAt: { date: new Date(), version: 'B.02' },
    requestedBy: 'Username',
    responseDueDate: { original: '2022-01-10', proposed: '2022-01-24' },
    remark: 'We would like to have more time.',
    reply: {
      title: 'Rejected',
      remark: 'There should be no more time.',
      newDate: '',
    },
  },
  {
    requestedAt: { date: new Date(), version: 'A.02' },
    requestedBy: 'Username',
    responseDueDate: { original: '2022-01-10', proposed: '2022-01-24' },
    remark: 'We would like to have more time.',
    reply: {
      title: 'Re-proposed New Due Date',
      remark: 'Too late',
      newDate: '2022-01-03',
    },
  },
];
const formatDate = (date) => {
  const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return {
    time: date.toLocaleTimeString(),
    date: dateString,
  };
};

const columns = [
  {
    title: 'Request At',
    dataIndex: 'requestedAt',
    key: 'requestedAt',
    render: (requestedAt) => {
      const date = formatDate(requestedAt.date);
      return (
        <div className="requested-at">
          <div>{date.date}</div>
          <div>{date.time}</div>

          <div className="version">
            {VersionIcon}
            {requestedAt.version}
          </div>
        </div>
      );
    },
  },
  {
    title: 'Request By',
    dataIndex: 'requestedBy',
    key: 'requestedBy',
  },
  {
    title: 'Response Due Date',
    dataIndex: 'responseDueDate',
    key: 'responseDueDate',
    render: (dueDate) => (
      <div className="due-date">
        <div className="blue-heading">Original: </div>
        <div>{dueDate.original}</div>
        <div className="blue-heading">Proposed: </div>
        <div>{dueDate.proposed}</div>
      </div>
    ),
  },
  {
    title: 'Remark',
    dataIndex: 'remark',
    key: 'remark',
  },
  {
    title: 'Reply',
    dataIndex: 'reply',
    key: 'reply',
    render: (reply) => (
      <div className="reply">
        <div>{reply.title}</div>
        {reply.newDate && (
          <>
            <div className="blue-heading">Proposed Due Date:</div>
            <div>{reply.newDate}</div>
          </>
        )}

        <div className="blue-heading">Remark: </div>
        <div>{reply.remark}</div>
      </div>
    ),
  },
];
const DateExtension = () => {
  const [tabKey, setTabKey] = useState('1');
  return (
    <div className="extension card">
      <Tabs
        defaultActiveKey="1"
        activeKey={tabKey}
        onChange={(k) => setTabKey(k)}
        type="card"
        tabBarExtraContent={{
          left: (
            <div className="blue-heading" style={{ marginRight: '1rem' }}>
              Due Date Extensin Request
            </div>
          ),
        }}
      >
        <TabPane
          tab={
            <div className="tab">
              {VersionIcon}
              B.02
            </div>
          }
          key="1"
        >
          <Table columns={columns} dataSource={rows}></Table>
        </TabPane>
        <TabPane
          tab={
            <div className="tab">
              {VersionIcon}
              A.01
            </div>
          }
          key="2"
        >
          <Table pagination={false} columns={columns} dataSource={rows}></Table>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default DateExtension;
