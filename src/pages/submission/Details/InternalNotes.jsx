import { useState, useEffect } from 'react';
import { useRequest } from 'ahooks';
import { useParams } from 'umi';

import TabPane from '@ant-design/pro-card/lib/components/TabPane';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Space, Tabs, Modal, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import { icons } from '@/utils/icons';
import { getInternalCommentList, createInternalComment } from '@/services/swagger/submission';
import { getBetweenTwoDates } from '@/utils/utils';
import useException from '@/utils/useException';

import userImage from './user-img.png';

const VersionIcon = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.08695 11.9712L12.3172 7.89773L13.4739 8.79901L7.08695 13.7667L0.699951 8.79901L1.84961 7.90483L7.08695 11.9712ZM7.08695 10.1687L0.699951 5.201L7.08695 0.233337L13.4739 5.201L7.08695 10.1687ZM7.08695 2.02879L3.01346 5.201L7.08695 8.37321L11.1604 5.201L7.08695 2.02879Z"
      fill="currentColor"
    />
  </svg>
);

const revisions = [
  { title: 'C.03', id: '3' },
  { title: 'B.02', id: '2' },
  { title: 'A.01', id: '1' },
];

const Note = (props) => {
  const { comment } = props;

  const agoVal = getBetweenTwoDates(new Date().toLocaleString(), comment.created_at);

  return (
    <div className="note">
      <img src={comment.author.avatar === '' ? userImage : comment.author.avatar} />
      <div className="content">
        <div className="header">
          <div className="username">{comment.author.name}</div>
          <div className="days-ago">{`${agoVal.value} ${agoVal.unit} ago`}</div>
          <div className="rev">
            Revision {revisions.find((x) => x.id === (comment.submission.rev + 1).toString()).title}
          </div>
        </div>
        <div className="text">{comment.text}</div>
        <div className="footer">
          <div className="like">
            {icons.like} <div>0</div>
          </div>
          <div className="like">
            {icons.dislike} <div>0</div>
          </div>
          <div className="reply-to">Reply to</div>
        </div>
      </div>
    </div>
  );
};

const InternalNotes = (props) => {
  const { system_id } = useParams();

  const { submissionId } = props

  const [tabKey, setTabKey] = useState('1');
  const [commentList, setCommentList] = useState([]);
  const [newNoteModal, setNewNoteModal] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');

  const { run } = useRequest(
    () =>
      getInternalCommentList({
        submission: system_id,
      }),
    {
      manual: true,
      onSuccess: (res) => {
        console.log(res);
        setCommentList(res);
      },
      throwOnError: true,
      onError: useException,
    },
  );

  const addNewNote = () => {
    const postBody = {
      text: newNoteText,
      submission: submissionId
    }
    createInternalComment(postBody).then(() => {
      run()
      setNewNoteModal(false);
      setNewNoteText('');
    }).catch(() => {
      message.error('Faild for new note')
    })
  };

  useEffect(() => {
    run();
  }, []);

  return (
    <div className="notes card">
      <Modal
        visible={newNoteModal}
        onCancel={() => {
          setNewNoteModal(false);
          setNewNoteText('');
        }}
        title={<h3>Add Internal Note</h3>}
        onOk={addNewNote}
      >
        <TextArea
          rows={7}
          value={newNoteText}
          onChange={(e) => setNewNoteText(e.target.value)}
        />
      </Modal>
      <Tabs
        defaultActiveKey="1"
        activeKey={tabKey}
        onChange={(k) => setTabKey(k)}
        type="card"
        tabBarExtraContent={{
          left: (
            <div className="blue-heading" style={{ marginRight: '1rem' }}>
              Internal Notes
            </div>
          ),
          right: (
            <Space size={'small'}>
              <Button>
                <UserOutlined />
                Filter
              </Button>
              <Button onClick={() => setNewNoteModal(true)} type="primary">
                <PlusOutlined></PlusOutlined>
                Internal Notes
              </Button>
            </Space>
          ),
        }}
      >
        {revisions.map((rev) => (
          <TabPane
            tab={
              <div className="tab">
                {VersionIcon}
                {rev.title}
              </div>
            }
            key={rev.id}
          >
            {commentList
              .filter((comment) => (comment.submission.rev + 1).toString() === rev.id)
              .map((comment) => (
                <Note comment={comment}></Note>
              ))}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default InternalNotes;
