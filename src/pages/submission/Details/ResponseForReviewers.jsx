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

const responses = [
  {
    isMarked: true,
    followUpComments: {
      text: 'Some dummy comment',
      files: [{ name: 'File name.pdf', size: '400KB', img: fileImg }],
    },
    version: 'B.02',
    reply: {
      editing: true,
      text: '',
      attachments: [],
    },
  },

  {
    isMarked: false,
    followUpComments: {
      text: 'Some dummy comment',
      files: [{ name: 'File name.pdf', size: '400KB', img: fileImg }],
    },
    version: 'A.02',
    reply: {
      editing: false,
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. In neque nulla culpa debitis? Quae voluptas odit consequuntur necessitatibus, consectetur obcaecati ipsa placeat aliquam voluptatibus accusamus, recusandae hic. Earum, officia atque.',
      attachments: [],
    },
  },
  {
    isMarked: false,
    followUpComments: {
      text: 'Some dummy comment',
      files: [{ name: 'File name.pdf', size: '400KB', img: fileImg }],
    },
    version: 'A.02',
    reply: {
      editing: false,
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. In neque nulla culpa debitis? Quae voluptas odit consequuntur necessitatibus, consectetur obcaecati ipsa placeat aliquam voluptatibus accusamus, recusandae hic. Earum, officia atque.',
      attachments: [],
    },
  },
];

const columns = [
  {
    title: <StarOutlined></StarOutlined>,
    dataIndex: 'isMarked',
    key: 'isMarked',
    render: (isMarked) =>
      isMarked ? (
        <Icon style={{ color: 'rgba(234, 162, 9, 1)' }} component={StarFilled}></Icon>
      ) : (
        <StarOutlined color="rgba(215, 215, 215, 1)"></StarOutlined>
      ),
  },
  {
    width: '40%',
    title: 'Follow-up Comments',
    dataIndex: 'followUpComments',
    key: 'followUpComments',

    render: (comment) => {
      return (
        <div className="follow-up-comment">
          <div className="comment-text">{comment.text}</div>
          <div className="files">
            {comment.files.map((file) => (
              <div className="file">
                <img src={file.img} alt="" />
                <div className="file-details">
                  <div className="file-name">{file.name}</div>
                  <div className="file-size">{file.size}</div>
                </div>
                <Space size="small">
                  <EyeOutlined></EyeOutlined>
                  <DownloadOutlined></DownloadOutlined>
                </Space>
              </div>
            ))}
          </div>
        </div>
      );
    },
  },
  {
    title: 'Version Source',
    width: '93px',
    key: 'version',
    dataIndex: 'version',
    render: (v) => (
      <Space
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        size="small"
      >
        {VersionIcon}
        <div>{v}</div>
      </Space>
    ),
  },
  {
    title: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} size="middle">
        <div>Our Reply</div>
        {icons.info}
      </div>
    ),
    key: 'reply',
    dataIndex: 'reply',
    render: (reply) => {
      if (reply.editing) {
        return (
          <div className="reply">
            <textarea rows="5"></textarea>
            <div className="upload">
              <PaperClipOutlined style={{ color: 'rgba(61, 137, 222, 1)' }}></PaperClipOutlined>
              <div>Upload attachment</div>
            </div>
          </div>
        );
      } else {
        return <div className="reply-text">{reply.text}</div>;
      }
    },
  },
];

const ResponseForReviewers = () => {

  const [tabKey, setTabKey] = useState('1');

  return (
    <div className="response card">
      <Tabs
        defaultActiveKey="1"
        activeKey={tabKey}
        onChange={(k) => setTabKey(k)}
        type="card"
        tabBarExtraContent={{
          left: (
            <div className="blue-heading" style={{ marginRight: '1rem' }}>
              Response from Reviewers
            </div>
          ),
          right: (
            <Space size={'small'}>
              <Button disabled>Save</Button>
            </Space>
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
          <Table columns={columns} dataSource={responses}></Table>
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
          <Table pagination={false} columns={columns} dataSource={responses}></Table>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ResponseForReviewers;
