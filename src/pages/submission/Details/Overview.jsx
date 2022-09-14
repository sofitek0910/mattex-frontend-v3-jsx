import { useState } from 'react';
import axios from 'axios';
import { useParams, useModel } from 'umi'
import { useRequest } from 'ahooks';

import { EditOutlined, EyeOutlined, FilePdfOutlined } from '@ant-design/icons';
import TabPane from '@ant-design/pro-card/lib/components/TabPane';
import { Space, Row, Button, Tabs, Table, message } from 'antd';

import { icons } from '@/utils/icons';
import token from '@/utils/token';
import { PROXY_URL } from '@/const';
import { submitForApproval } from '@/services/swagger/submission'

import icon1 from './icon1.png';
import icon2 from './icon2.png';
import icon3 from './icon3.png';
import fileImg from './file.png';

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
    file: { size: '300KB', name: 'File name', status: 1, img: fileImg },
    fileType: ['File type 1', 'File type 2'],
    expirationDate: ['-', '-'],
    remark: ['Remark 1', 'Remark 2'],
  },
  {
    file: { size: '300KB', name: 'File name', status: 1, img: fileImg },
    fileType: ['File type 1', 'File type 2'],
    expirationDate: ['-', '-'],
    remark: ['Remark 1', 'Remark 2'],
  },
  {
    file: { size: '300KB', name: 'File name', status: 0, img: fileImg },
    fileType: ['File type 1'],
    expirationDate: ['-'],
    remark: ['Remark 1', 'Remark 2'],
  },
];

const filesData = [
  {
    name: 'File name',
    size: '300KB',
    status: 1,
    rows: [
      { type: 'File type 1', expirationDate: '-', remark: 'Sample remark' },
      { type: 'File type 1', expirationDate: '-', remark: 'Sample remark 2' },
    ],
  },
  {
    name: 'File name',
    size: '300KB',
    status: 1,
    rows: [{ type: 'File type 1', expirationDate: '2024-12-12', remark: 'Sample remark' }],
  },
  {
    name: 'File name',
    size: '300KB',
    status: 0,
    rows: [{ type: 'File type 1', expirationDate: '2024-12-12', remark: 'Sample remark' }],
  },
];

const fileStatus = [
  {
    styles: {
      background: 'rgba(255, 238, 238, 1)',
      color: 'rgba(210, 51, 1, 1)',
    },
    icon: (
      <svg
        width="12"
        height="13"
        viewBox="0 0 12 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11.52 0.52002L0.47998 12.48L11.52 0.52002Z" fill="#D23301" />
        <path
          d="M11.52 12.48L0.47998 0.52002M11.52 0.52002L0.47998 12.48"
          stroke="#D23301"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
    text: 'Excluded from Response',
  },
  {
    styles: {
      background: 'rgba(222, 250, 221, 1)',
      color: 'rgba(20, 182, 57, 1)',
    },
    text: 'Included in Submission Package',
    icon: (
      <svg
        width="15"
        height="13"
        viewBox="0 0 15 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.4988 1.18408L13.4989 1.18409L13.5008 1.1816C13.5152 1.16309 13.5399 1.15002 13.5678 1.15002H14.1226L5.59973 11.9502C5.59959 11.9504 5.59946 11.9506 5.59932 11.9507C5.56151 11.9976 5.49279 11.995 5.45859 11.9517L0.87604 6.14615L1.43162 6.14615C1.43169 6.14615 1.43175 6.14615 1.43182 6.14615C1.44507 6.14619 1.45815 6.14923 1.47007 6.15502C1.48206 6.16085 1.49257 6.16931 1.50081 6.17978L1.50111 6.18017L5.13516 10.7848L5.52761 11.282L5.92011 10.7848L13.4988 1.18408Z"
          fill="#14B639"
          stroke="#14B639"
        />
      </svg>
    ),
  },
];

const SignOffCard = ({ headerText, user, title, sign, date }) => {
  return (
    <div className="card card3">
      <div className="card-header">
        {headerText}: {user}
      </div>
      <div className="card-body">
        {icons.userProfile}
        <div className="color-gray">{title}</div>
        {icons.signature}
        <div className="color-gray-light">{sign}</div>
        {icons.calendar}
        <div className="color-gray-light">{date}</div>
      </div>
    </div>
  );
};

const columns = [
  {
    title: 'File(s)',
    dataIndex: 'file',
    key: 'file',
    render: (file) => {
      console.log(fileStatus[file.status]);
      return (
        <div className="file-table-cell">
          <img src={file.img}></img>
          <div className="file-details">
            <div className="file-name">{file.name}</div>
            <div className="file-size">{file.size}</div>
            <div className={`file-status`} style={fileStatus[file.status].styles}>
              {fileStatus[file.status].icon}
              {fileStatus[file.status].text}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    title: 'File Type',
    dataIndex: 'fileType',
    key: 'fileType',
    render: (types) => (
      <div className="nested-col">
        {types.map((col) => (
          <div className="nested-row">{col}</div>
        ))}
      </div>
    ),
  },
  {
    title: 'Expiration Date',
    dataIndex: 'expirationDate',
    key: 'expirationDate',
    render: (types) => (
      <div className="nested-col">
        {types.map((col) => (
          <div className="nested-row">{col}</div>
        ))}
      </div>
    ),
  },
  {
    title: 'Remark',
    dataIndex: 'remark',
    key: 'remark',
    render: (types) => (
      <div className="nested-col">
        {types.map((col) => (
          <div className="nested-row">{col}</div>
        ))}
      </div>
    ),
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    render: () => (
      <Space size="small">
        <Button>
          <EyeOutlined></EyeOutlined>
        </Button>
      </Space>
    ),
  },
  // {
  //   title: 'Actions',
  //   dataIndex: 'actions',
  //   key: 'actions',
  //   render: (actions) => (
  //     <Space size="small">
  //       <Button className="icon-btn">
  //         <EyeOutlined></EyeOutlined>
  //       </Button>
  //       <Button className="icon-btn">
  //         <HistoryOutlined></HistoryOutlined>
  //       </Button>
  //       {actions.type === 1 && (
  //         <>
  //           <Button className="icon-btn">
  //             <img src={iconImg}></img>
  //             <div className="count-badge">{actions.count}</div>
  //           </Button>
  //           <Button className="icon-btn">
  //             <EllipsisOutlined></EllipsisOutlined>
  //           </Button>
  //         </>
  //       )}
  //     </Space>
  //   ),
  // },
];

const TabContent = (props) => {

  const { detail } = props

  return (
    <>
      <div className="blue-heading mb">Entity Logo and Headers</div>
      <Space className="logo-row" size="middle">
        <div className="card2">
          <img src={icon1}></img>
        </div>
        <div className="card2">
          <img src={icon2}></img>
        </div>
        <div className="card2 center-card">
          <div className="card2">
            {`Contract No. : ${detail?.header_submission.contract_no}`}
          </div>
          <div className="card2">
            {detail?.header_submission.project_name}
          </div>
        </div>
        <div className="card2">
          <img src={icon3}></img>
        </div>

        <div className="card2 center-card">
          <div className="card2">Form Control</div>
          <div className="card2"></div>
        </div>
      </Space>
      <div className="mb blue-heading">Salutation</div>
      <div className="mb-2">
        <b>To:</b>&nbsp;&nbsp;{detail?.salutation_submission.to}
      </div>
      <div className="mb blue-heading">Title</div>
      <div className="mb-2">
        <b>Title of Submission:</b>&nbsp;&nbsp;{detail?.title}
        <table className="mb-2">
          <tbody>
            {
              detail?.title_submission.free_text_fields && Object.entries(detail?.title_submission.free_text_fields).map((value) => (
                <tr key={value[0]}>
                  <td>
                    <b>{Object.entries(value[1])[0][0]}</b>
                  </td>
                  <td>{Object.entries(value[1])[0][1]}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div className="mb blue-heading">Reference</div>
      <table className="mb-2">
        <tbody>
          {
            detail?.reference_submission.reference && Object.entries(detail?.reference_submission.reference).map((value) => (
              <tr key={value[0]}>
                <td>
                  <b>{Object.entries(value[1])[0][0]}</b>
                </td>
                <td>{Object.entries(value[1])[0][1]}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className="mb blue-heading">Description of Content</div>
      {
        detail?.descriptionofcontent_submission.show_top_free_text && (
          <div className="mb">
            {
              detail?.descriptionofcontent_submission.top_free_text
            }
          </div>
        )
      }
      <table className="mb-2">
        <tbody>
          {
            detail?.descriptionofcontent_submission.description_of_content && Object.entries(detail?.descriptionofcontent_submission.description_of_content).map((value) => (
              <tr key={value[0]}>
                <td>
                  <b>{Object.entries(value[1])[0][0]}</b>
                </td>
                <td>{Object.entries(value[1])[0][1]}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      {
        detail?.descriptionofcontent_submission.show_bottom_free_text && (
          <div className="mb-2">
            {
              detail?.descriptionofcontent_submission.bottom_free_text
            }
          </div>
        )
      }
      <div className="mb blue-heading">About this Submission</div>
      <div className="mb-8">
        <b>Purpose Of Submission:</b>&nbsp;&nbsp;
        {
          detail?.aboutthissubmission_submission.purpose_of_submission && (
            Object.entries(detail?.aboutthissubmission_submission.purpose_of_submission).filter((cell) => cell[1] === true)[0]
          )
        }
      </div>
      {/* <div className="mb-8">
        <b>Purpose Of Submission:</b>&nbsp;&nbsp;[Date of Submission] + 14 Days
      </div> */}
      <div className="mb-2">
        <b>Record Future Reply on Cover Page:</b>&nbsp;&nbsp;
        {
          detail?.aboutthissubmission_submission.record_reply ? 'Yes' : 'No'
        }
      </div>
      <Row style={{ display: 'flex' }} justify="space-between">
        <div className='mb-2'>
          <span className="blue-heading">Sign-offs</span>&nbsp;&nbsp;
          <i className="danger-text">
            (The signatures will appear on here and in PDF once internal circulation is fully
            approved.)
          </i>
        </div>
      </Row>
      <div className='mb-2'>
        <div className="blue-heading mb">Approval Flow: CW Method Statement TKT</div>
        <Space size="small" className="mb-2">
          {
            detail?.signoff_submission.blocks.map((block) => (
              <SignOffCard
                date="Date to be generated when this user approve"
                sign={block.initials}
                title={block.job_title}
                headerText="Prepared by"
                user={block.name}
                key={block.id}
              />
            ))
          }
        </Space>
      </div>
      <div className="blue-heading mb-12">Attachment</div>
      <Table
        className="files-table"
        columns={columns}
        bordered
        dataSource={rows}
        pagination={false}
      ></Table>
    </>
  );
};

const Overview = (props) => {

  const { detail } = props
  const { system_id } = useParams()

  const [tabKey, setTabKey] = useState('1');

  const { initialState, setInitialState } = useModel('@@initialState');

  const handlePreview = () => {
    axios.get(`${PROXY_URL}/api/pdf/${system_id}`, {
      headers: token.getHeader()
    }).then((res) => {
      window.open(`${PROXY_URL}/${res.data.local_path}`, '_blank')
    }).catch((err) => {
      console.log(err)
    })
  }

  const { run, loading } = useRequest(() => submitForApproval({
    system_id: system_id
  }),
    {
      manual: true,
      throwOnError: true,
      onSuccess: () => {
        message.success('Success')
      },
      onError: () => {
        message.error('Failed to approval')
      }
    })

  return (
    <div className="overview card">
      <Tabs
        defaultActiveKey="1"
        activeKey={tabKey}
        onChange={(k) => setTabKey(k)}
        type="card"
        tabBarExtraContent={{
          left: (
            <div className="blue-heading" style={{ marginRight: '1rem' }}>
              Submission Package
            </div>
          ),
          right: (
            <Space size={'small'}>
              <Button type="primary" onClick={run} loading={loading}>Submit for Internal Circulation</Button>
              <Button onClick={handlePreview}>
                <FilePdfOutlined></FilePdfOutlined>
                Preview C.03 PDF
              </Button>
              <Button onClick={() => setInitialState((s) => ({ ...s, editingSubmission: true }))}>
                <EditOutlined></EditOutlined>
                Edit
              </Button>
            </Space>
          ),
        }}
      >
        <TabPane tab={<div className="tab">{VersionIcon}C.03</div>} key="1">
          <TabContent detail={detail} />
        </TabPane>
        <TabPane tab={<div className="tab">{VersionIcon}B.02</div>} key="2">
          <TabContent detail={detail} />
        </TabPane>
        <TabPane tab={<div className="tab">{VersionIcon}A.01</div>} key="3">
          <TabContent detail={detail} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Overview;
