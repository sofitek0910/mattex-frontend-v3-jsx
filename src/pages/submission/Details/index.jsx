import React, { useEffect, useState } from 'react'
import classNames from 'classnames';
import { useParams, useModel } from 'umi'
import { useRequest } from 'ahooks';

import { EditOutlined, EllipsisOutlined, EyeOutlined, HistoryOutlined, MessageOutlined } from '@ant-design/icons';
import TabPane from '@ant-design/pro-card/lib/components/TabPane';
import { Col, Row, Space, Button, Table, Tabs, Typography, Modal, Tooltip } from 'antd';

import InternalNotes from './InternalNotes';
import Overview from './Overview';
import ResponseForReviewers from './ResponseForReviewers'
import DateExtension from './DateExtension'
import Edit from './Edit';

import { icons } from '@/utils/icons';
import useException from '@/utils/useException';
import { getSubmissionDetail, getSubmissionRevList, updateSubmission } from '@/services/swagger/submission'

import iconImg from './icon.png';
import './index.less';

const { Title } = Typography;

const milestoneStatusData = [
  {
    btnStyles: { background: 'rgba(229, 229, 229, 1)', boxShadow: '' },
    boxStyles: {
      background: 'rgba(249, 249, 249, 0.99)',
      border: '1px solid rgba(187, 187, 187, 1)',
    },
    titleColor: 'rgba(187, 187, 187, 1)',
  },
  {
    titleColor: 'rgba(20, 176, 252, 1)',
    btnStyles: { background: 'rgba(20, 176, 252, 1)', boxShadow: '0px 0px 4px #14B0FC' },
    boxStyles: { background: '#DDF4FF', border: '1px solid rgba(0, 142, 211, 1)' },
  },
  {
    titleColor: 'rgba(20, 182, 57, 1)',
    btnStyles: {
      background: 'rgba(20, 182, 57, 1)',
      boxShadow: '0px 0px 4px rgba(20, 182, 57, 1)',
    },
    boxStyles: { background: '#DDF4FF', border: '1px solid rgba(20, 182, 57, 1)' },
  },
];

const Milestone = ({ status, text, daysLeft, intDate, extDate, icon, showLine }) => {
  const statusObj = milestoneStatusData[status];

  return (
    <div className="milestone mb-12">
      <Button
        style={statusObj.btnStyles}
        className={classNames('step-btn', { 'show-line': showLine })}
      >
        {icon}
      </Button>
      <div className="milestone-card" style={statusObj.boxStyles}>
        <div className="title" style={{ color: statusObj.titleColor }}>
          {text}
        </div>
        <div className="days-left">
          <div>-</div>
          <div>{daysLeft}</div>
        </div>
        <div className="date">
          <div>Int. Target Date: {intDate}</div>
          <div>Ext. Target Date: {extDate}</div>
        </div>
      </div>
    </div>
  );
};

const tagData = [
  { text: 'In progress', color: 'rgba(0, 142, 211, 1)', bgColor: 'rgba(221, 244, 255, 1)' },
  { text: 'Awaiting approval', color: 'rgba(234, 162, 9, 1)', bgColor: 'rgba(255, 244, 219, 1)' },
  { text: 'Internally approved', color: 'rgba(20, 182, 57, 1)', bgColor: 'rgba(222, 250, 221, 1)' },
  { text: 'Rejected', color: 'rgba(210, 51, 1, 1)', bgColor: 'rgba(255, 238, 238, 1)' },
  { text: 'Submitted to SRM', color: 'rgba(1, 98, 75, 1)', bgColor: 'rgba(237, 255, 251, 1)' },
  { text: 'Approved from SRM', color: 'rgba(1, 98, 75, 1)', bgColor: 'rgba(237, 255, 251, 1)' },
  { text: 'Rejected from SRM', color: 'rgba(113, 112, 112, 1)', bgColor: 'rgba(244, 244, 244, 1)' }
];

const columns = [
  { title: 'Rev.', dataIndex: 'rev', key: 'rev' },
  {
    title: 'Generated At',
    dataIndex: 'document_date',
    key: 'document_date',
    render: (document_date) => (
      <>{new Date(document_date).toLocaleString()}</>
    )
  },
  { title: 'Internal Circulation', dataIndex: 'circulation_identification', key: 'circulation_identification' },
  {
    title: 'Submitted to SRM At',
    dataIndex: 'submittedToSMM',
    key: 'submittedToSMM',
    render: () => (
      <>2023-01-03 15:32(Demo)</>
    )
  },
  {
    title: 'SRM Status',
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
    title: 'Response Due Date',
    dataIndex: 'response_date',
    key: 'response_date',
    render: () => (
      <>2022-01-13(Demo)</>
    )
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    render: (actions, record) => (
      <Space size="small">
        <Button className="icon-btn">
          <EyeOutlined />
        </Button>
        <Button className="icon-btn">
          <HistoryOutlined />
        </Button>
        {/* {actions.type === 1 && (
          <>
            <Button className="icon-btn">
              <img src={iconImg} />
              <div className="count-badge">{actions.count}</div>
            </Button>
            <Button className="icon-btn">
              <EllipsisOutlined />
            </Button>
          </>
        )}
        {record.status === 3 && (
          <Button onClick={record.onClickOnWithdraw} style={{ color: 'rgba(228, 17, 17, 1)' }}>
            Withdraw
          </Button>
        )}
        {record.status === 5 && (
          <Tooltip
            placement="bottomLeft"
            color="rgba(255, 255, 255, 1)"
            style={{ color: 'black' }}
            title={
              <div>
                <b>{record.withdrawlRemark.title}</b>
                <div>{record.withdrawlRemark.text}</div>
              </div>
            }
          >
            <Button>
              <MessageOutlined></MessageOutlined>
            </Button>
          </Tooltip>
        )} */}
      </Space>
    ),
  },
];

const dummyHistoryLog = [
  { action: 'Some action taken', date: new Date() },
  { action: 'Some action taken', date: new Date() },
  { action: 'Some action taken', date: new Date() },
  { action: 'Some action taken', date: new Date() },
  { action: 'Some action taken', date: new Date() },
  { action: 'Some action taken', date: new Date() },
  { action: 'Some action taken', date: new Date() },
  { action: 'Some action taken', date: new Date() },
  { action: 'Some action taken', date: new Date() },
  { action: 'Some action taken', date: new Date() },
  { action: 'Some action taken', date: new Date() },
];

const historyTableCols = [
  { title: 'Action Taken', key: 'action', dataIndex: 'action' },
  {
    title: 'Date and time',
    key: 'date',
    dataIndex: 'date',
    render: (date) => (
      <>
        {date.getFullYear()}-{date.getMonth() + 1}-{date.getDate()} {date.getHours()}:
        {date.getMinutes()}
      </>
    ),
  },
];

const Details = () => {

  const { system_id } = useParams()

  const [submissionDetail, setSubmissionDetail] = useState()
  const [purpose, setPurpose] = useState('')
  const [revList, setRevList] = useState([])
  const [updatedData, setUpdatedData] = useState({})

  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const { initialState, setInitialState } = useModel('@@initialState');

  const { run } = useRequest(
    () =>
      getSubmissionDetail(system_id),
    {
      manual: true,
      onSuccess: (res) => {
        for (const [key, value] of Object.entries(res.aboutthissubmission_submission.purpose_of_submission)) {
          console.log(`${key}: ${value}`);
          if (value === true) {
            setPurpose(key)
          }
        }
        setSubmissionDetail(res)
      },
      throwOnError: true,
      onError: useException,
    },
  );

  const handleChangeData = (val) => {
    setUpdatedData({ ...updatedData, [val.name]: val.value })
  }

  const handleSaveOverview = () => {
    updateSubmission(system_id, updatedData).then((res) => {
      console.log(res)
      setInitialState((s) => ({ ...s, editingSubmission: false }))
      run()
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    run()

    getSubmissionRevList(system_id).then((res) => {
      setRevList(res)
    })
  }, [])

  return (
    <div className="details-top-content">
      <Modal title="Edit target dates"></Modal>
      <Modal
        title="Withdraw"
        okText="Yes"
        cancelText="No"
        visible={showWithdrawModal}
        onOk={() => setShowWithdrawModal(false)}
        onCancel={() => setShowWithdrawModal(false)}
      >
        Are you sure you want to withdraw?
      </Modal>
      <Modal
        title="History Log"
        okButtonProps={{ style: { display: 'none' } }}
        visible={showHistoryModal}
        onCancel={() => setShowHistoryModal(false)}
      >
        <Table columns={historyTableCols} dataSource={dummyHistoryLog}></Table>
      </Modal>
      <Row
        className="mb"
        style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
      >
        <div></div>
        <Button onClick={() => setShowHistoryModal(true)}>
          <HistoryOutlined></HistoryOutlined>
          History
        </Button>
      </Row>
      <Row gutter={12}>
        <Col span={18}>
          <div className="detials-card card">
            <div className="blue-heading">General Information</div>
            <Row>
              <Col span={6} className="paragraph">
                <div>Submission Reference Number:</div>
                <div>{submissionDetail?.submission_reference_number}</div>
              </Col>
              <Col span={6} className="paragraph">
                <div>Submission Type:</div>
                <div>
                  {
                    submissionDetail?.submission_type.display_name
                  }
                </div>
              </Col>
              <Col span={6} className="paragraph">
                <div>Trade:</div>
                <div>{submissionDetail?.trade.name}</div>
              </Col>
              <Col span={6} className="paragraph">
                <div>Purpose:</div>
                <div>{purpose}</div>
              </Col>
            </Row>
            <Row>
              <Col span={6} className="paragraph">
                <div>Responsible Party:</div>
                <div>{submissionDetail?.responsible_party}</div>
              </Col>
              <Col span={6} className="paragraph">
                <div>Discipline Codes (if any):</div>
                <div>{submissionDetail?.discipline_code}</div>
              </Col>
              <Col span={6} className="paragraph">
                <div>Person-in-charge:</div>
                <div>{submissionDetail?.person_in_charge.username}</div>
              </Col>
              <Col span={6} className="paragraph">
                <div>Remark:</div>
                <div>{submissionDetail?.remark}</div>
              </Col>
            </Row>
          </div>
          <div className="card" style={{ padding: '1rem 1rem' }}>
            <div className="blue-heading" style={{ marginBottom: '0.75rem' }}>
              Versions
            </div>
            <Table
              dataSource={revList.map((x) => ({
                ...x,
                onClickOnWithdraw: () => setShowWithdrawModal(true)
              }))}
              columns={columns}
              pagination={false}
              bordered={false}
            />
          </div >
        </Col >
        <Col span={6} className="card" style={{ padding: '1rem' }}>
          <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="blue-heading mb-2">Milestone</div>
            <Button>
              <Space size="small">
                <EditOutlined />
                <div>Edit</div>
              </Space>
            </Button>
          </Row>
          <Milestone
            daysLeft=""
            intDate={submissionDetail?.prepare_int_target_date ? new Date(submissionDetail.prepare_int_target_date).toJSON().split('T')[0] : ""}
            extDate={submissionDetail?.prepare_ext_target_date ? new Date(submissionDetail.prepare_ext_target_date).toJSON().split('T')[0] : ""}
            text="Prepare"
            status={1}
            showLine={true}
            icon={icons.openBox}
          />
          <Milestone
            daysLeft=""
            intDate={submissionDetail?.int_circulation_int_target_date ? new Date(submissionDetail.int_circulation_int_target_date).toJSON().split('T')[0] : ""}
            extDate={submissionDetail?.int_circulation_ext_target_date ? new Date(submissionDetail.int_circulation_ext_target_date).toJSON().split('T')[0] : ""}
            text="Internal Circulation"
            status={0}
            showLine={true}
            icon={icons.openBox}
          />
          <Milestone
            daysLeft=""
            intDate={submissionDetail?.submitted_int_target_date ? new Date(submissionDetail.submitted_int_target_date).toJSON().split('T')[0] : ""}
            extDate={submissionDetail?.submitted_ext_target_date ? new Date(submissionDetail.submitted_ext_target_date).toJSON().split('T')[0] : ""}
            text="Submit for Approval"
            status={0}
            showLine={false}
            icon={icons.openBox}
          />
        </Col>
      </Row >
      <Tabs className="main-tabs" tabPosition="left">
        <TabPane key="1" tab="Submission Package">
          {
            initialState.editingSubmission ? (
              <Edit
                detail={submissionDetail}
                handleChangeData={handleChangeData}
                handleSave={handleSaveOverview}
              />)
              :
              <Overview detail={submissionDetail} />
          }
        </TabPane >
        <TabPane key="2" tab="Internal Notes">
          <InternalNotes submissionId={submissionDetail?.id} />
        </TabPane>
        <TabPane key="3" tab="Response from Reviewers">
          <ResponseForReviewers />
        </TabPane>
        <TabPane key="4" tab="Due Date Extension Request">
          <DateExtension />
        </TabPane>
      </Tabs >
    </div >
  );
};

export default Details;
