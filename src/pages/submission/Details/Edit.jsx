import { useState, useEffect } from 'react';
import { useModel } from 'umi'
import uuid from 'react-uuid';

import {
  DeleteOutlined,
  DownloadOutlined,
  EyeOutlined,
  MenuOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import TabPane from '@ant-design/pro-card/lib/components/TabPane';
import {
  Space,
  Row,
  Button,
  Tabs,
  Table,
  Select,
  Radio,
  Switch,
  DatePicker,
  Input,
  Modal
} from 'antd';

import { icons } from '@/utils/icons';
import { PURPOSE_SUBMISSIONS } from '@/const'
import icon1 from './icon1.png';
import icon2 from './icon2.png';
import icon3 from './icon3.png';
import fileImg from './file.png';
const { Option } = Select;

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
            <div>
              Included in Submission Package:{' '}
              <Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked></Switch>
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
          <div className="nested-row">
            <Select defaultValue="Option 1">
              <Option value="Option 1">Option 1</Option>
              <Option value="Option 2">Option 2</Option>
              <Option value="Option 3">Option 3</Option>
            </Select>
          </div>
        ))}

        <div className="nested-row">
          <Button className="add-row-btn">
            <PlusOutlined></PlusOutlined>Add File Type
          </Button>
        </div>
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
          <div className="nested-row">
            <DatePicker
              style={{ fontSize: '14px', width: '100%' }}
              placeholder="Select Date"
            ></DatePicker>
          </div>
        ))}
        <div className="nested-row" />
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
          <div className="nested-row">
            <Input placeholder="Input remark here" size="middle"></Input>
          </div>
        ))}
        <div className="nested-row" />
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

        <Button>
          <DownloadOutlined></DownloadOutlined>
        </Button>
        <Button>
          <DeleteOutlined style={{ color: 'rgba(210, 51, 1, 1)' }}></DeleteOutlined>
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

  const { detail, handleChangeData } = props

  const [references, setReferences] = useState([])
  const [descriptions, setDescriptions] = useState([])
  const [aboutSubmission, setAboutSubmission] = useState({})
  const [titles, setTitles] = useState([])
  const [showNewFieldModal, setShowNewFieldModal] = useState(false)
  const [newField, setNewField] = useState('')

  const handleRemoveField = (block, name) => {
    if (block === 'title') {
      let newVal = titles.filter((cell) => cell.name !== name)
      let titleVal = {}
      newVal.forEach((cell, index) => {
        let objVal = {}
        objVal[cell.name] = cell.value
        titleVal[index + 1] = objVal
      })

      handleChangeData({
        name: 'title_submission',
        value: {
          "free_text_fields": titleVal
        }
      })
      setTitles(newVal)
    } else if (block === 'reference') {
      let newVal = references.filter((cell) => cell.name !== name)
      let refVal = {}
      newVal.forEach((cell, index) => {
        let objVal = {}
        objVal[cell.name] = cell.value
        refVal[index + 1] = objVal
      })

      handleChangeData({
        name: 'reference_submission',
        value: {
          "reference": refVal
        }
      })
      setReferences(newVal)
    } else if (block === 'description') {
      let newVal = descriptions.filter((cell) => cell.name !== name)
      let descVal = {}
      newVal.forEach((cell, index) => {
        let objVal = {}
        objVal[cell.name] = cell.value
        descVal[index + 1] = objVal
      })

      handleChangeData({
        name: 'descriptionofcontent_submission',
        value: {
          "description_of_content": descVal
        }
      })
      setDescriptions(newVal)
    }
  }

  const handleAddNewField = (block) => {

  }

  const handleChangeTitle = (e) => {
    let newVal = titles
    newVal = newVal.map((cell) => cell.name === e.target.name ? { ...cell, value: e.target.value } : { ...cell })

    let titleVal = {}
    newVal.forEach((cell, index) => {
      let objVal = {}
      objVal[cell.name] = cell.value
      titleVal[index + 1] = objVal
    })

    handleChangeData({
      name: 'title_submission',
      value: {
        "free_text_fields": titleVal
      }
    })

    setTitles(newVal)
  }

  const handleChangeReference = (e) => {
    let newVal = references
    newVal = newVal.map((cell) => cell.name === e.target.name ? { ...cell, value: e.target.value } : { ...cell })

    let refVal = {}
    newVal.forEach((cell, index) => {
      let objVal = {}
      objVal[cell.name] = cell.value
      refVal[index + 1] = objVal
    })

    handleChangeData({
      name: 'reference_submission',
      value: {
        "reference": refVal
      }
    })

    setReferences(newVal)
  }

  const handleChangeDesc = (e) => {
    let newVal = descriptions
    newVal = newVal.map((cell) => cell.name === e.target.name ? { ...cell, value: e.target.value } : { ...cell })

    let descVal = {}
    newVal.forEach((cell, index) => {
      let objVal = {}
      objVal[cell.name] = cell.value
      descVal[index + 1] = objVal
    })

    handleChangeData({
      name: 'descriptionofcontent_submission',
      value: {
        "description_of_content": descVal
      }
    })

    setDescriptions(newVal)
  }

  const handleChangeAboutSubmission = ({ name, value }) => {
    const newVal = {
      ...aboutSubmission,
      [name]: value
    }
    handleChangeData({
      name: 'aboutthissubmission_submission',
      value: {
        record_reply: newVal.record_reply,
        purpose_of_submission: {
          "For Review": newVal.purpose_of_submission === 'For Review',
          "For Acceptance": newVal.purpose_of_submission === 'For Acceptance',
          "For Reference and Record": newVal.purpose_of_submission === 'For Reference and Record',
          "For Comment (if any) and/or for Acceptance": newVal.purpose_of_submission === 'For Comment (if any) and/or for Acceptance'
        }
      }
    })

    setAboutSubmission({
      ...aboutSubmission,
      [name]: value
    })
  }

  useEffect(() => {
    let _references = []
    Object.entries(detail.reference_submission.reference).forEach((cell) => {
      Object.entries(cell[1]).forEach((el) => {
        _references.push({ name: el[0], value: el[1] })
      })
    });
    setReferences(_references)

    let _desc = []
    Object.entries(detail.descriptionofcontent_submission.description_of_content).forEach((cell) => {
      Object.entries(cell[1]).forEach((el) => {
        _desc.push({ name: el[0], value: el[1] })
      })
    });
    setDescriptions(_desc)

    setAboutSubmission({
      purpose_of_submission: Object.entries(detail?.aboutthissubmission_submission.purpose_of_submission).find((cell) => cell[1] === true)[0],
      record_reply: (detail.aboutthissubmission_submission.record_reply)
    })

    let _titles = []
    Object.entries(detail.title_submission.free_text_fields).forEach((cell) => {
      Object.entries(cell[1]).forEach((el) => {
        _titles.push({ name: el[0], value: el[1] })
      })
    });
    setTitles(_titles)
  }, [detail])

  return (
    <>
      <div className="border-card mb-12">
        <div className="blue-heading mb">Entity Logo and Headers</div>
        <Space className="logo-row" size="middle">
          <div className="card2">
            <img src={icon1}></img>
          </div>
          <div className="card2">
            <img src={icon2}></img>
          </div>
          <div className="card2 center-card">
            {`Contract No. : ${detail?.header_submission.contract_no}`}
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
      </div>
      <div className="border-card mb-12">
        <div className="mb blue-heading">Salutation</div>
        <div className='d-flex align-items-center'>
          <b>To:</b>&nbsp;&nbsp;
          <Input
            defaultValue={detail?.salutation_submission.to}
            onChange={(e) => handleChangeData({ name: "salutation_submission", value: { "to": e.target.value } })}
          />
        </div>
      </div>

      <div className="border-card mb-12">
        <div className="mb blue-heading">Title</div>
        <div className='d-flex align-items-center mb-12'>
          <b>Title of Submission:</b>&nbsp;&nbsp;
          <Input
            defaultValue={detail?.title}
            onChange={(e) => handleChangeData({ name: "title", value: e.target.value })}
          />
        </div>
        <table>
          <tbody>
            {
              titles.map((cell) => (
                <tr key={cell.name}>
                  <td>
                    <b>{cell.name}</b>
                  </td>

                  <td className="editable-cell">
                    <input value={cell.value} name={cell.name} onChange={handleChangeTitle} />
                    <Button color="red" className="del-btn" onClick={() => handleRemoveField('title', cell.name)}>
                      <DeleteOutlined></DeleteOutlined>
                    </Button>
                  </td>
                </tr>
              ))
            }

            <tr>
              <td>
                <Button className="add-row-btn" onClick={() => setShowNewFieldModal(true)}>
                  <PlusOutlined></PlusOutlined>
                  Add Row
                </Button>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div >

      <div className="border-card mb-12">
        <div className="mb blue-heading">Reference</div>
        <table>
          <tbody>
            {
              references.map((cell) => (
                <tr key={cell.name}>
                  <td>
                    <b>{cell.name}</b>
                  </td>

                  <td className="editable-cell">
                    <input value={cell.value} name={cell.name} onChange={handleChangeReference} />
                    <Button color="red" className="del-btn" onClick={() => handleRemoveField('reference', cell.name)}>
                      <DeleteOutlined></DeleteOutlined>
                    </Button>
                  </td>
                </tr>
              ))
            }

            <tr>
              <td>
                <Button className="add-row-btn">
                  <PlusOutlined></PlusOutlined>
                  Add Row
                </Button>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div >

      <div className="border-card mb-12">
        <div className="mb blue-heading">Description of Content</div>
        <div className="mb">
          Please review the content and make approval as it is close to deadline now.
        </div>
        <table>
          <tbody>
            {
              descriptions.map((cell) => (
                <tr key={cell.name}>
                  <td>
                    <b>{cell.name}:</b>
                  </td>
                  <td className="editable-cell">
                    <input value={cell.value} name={cell.name} onChange={handleChangeDesc} />
                    <Button color="red" className="del-btn" onClick={() => handleRemoveField('description', cell.name)}>
                      <DeleteOutlined></DeleteOutlined>
                    </Button>
                  </td>
                </tr>
              ))
            }
            <tr>
              <td>
                <Button className="add-row-btn">
                  <PlusOutlined></PlusOutlined>
                  Add Row
                </Button>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div >

      <div className="border-card mb-12">
        <div className="mb blue-heading">About this Submission</div>
        <div className="mb-8">
          <b>Purpose Of Submission:</b>&nbsp;&nbsp;
          <Select
            value={aboutSubmission.purpose_of_submission}
            onChange={(val) => handleChangeAboutSubmission({ name: 'purpose_of_submission', value: val })}
            style={{ width: '150px' }}
          >
            {
              PURPOSE_SUBMISSIONS.map((cell) => (
                <Select.Option value={cell.data} key={cell.data}>{cell.label}</Select.Option>
              ))
            }
          </Select>
        </div>

        <div className="mb-8">
          <b>Purpose Of Submission:</b>&nbsp;&nbsp;[Date of Submission] + 14 Days
        </div>
        <div>
          <b>Record Future Reply on Cover Page:</b>&nbsp;&nbsp;
          <Radio.Group
            onChange={(e) => handleChangeAboutSubmission({
              name: 'record_reply',
              value: e.target.value === 0 ? true : false
            })}
            value={aboutSubmission.record_reply ? 0 : 1}
          >
            <Radio value={0}>Yes</Radio>
            <Radio value={1}>No</Radio>
          </Radio.Group>
        </div>
      </div>

      <div className="border-card mb">
        <Row style={{ display: 'flex' }} justify="space-between">
          <div>
            <span className="blue-heading">Sign-offs</span>&nbsp;&nbsp;
            <i className="danger-text">
              (The signatures will appear on here and in PDF once internal circulation is fully
              approved.)
            </i>
          </div>
          <div className="blue-heading mb">
            Approval Flow:{' '}
            <Select defaultValue="Option 1">
              <Option value="Option 1">Option 1</Option>
              <Option value="Option 2">Option 2</Option>
              <Option value="Option 3">Option 3</Option>
            </Select>
          </div>
          <Space size="small">
            {
              detail.signoff_submission.blocks.map((block) => (
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
        </Row>
      </div>

      <div className="blue-heading mb-12">Attachment</div>
      <Table
        className="files-table"
        columns={columns}
        bordered
        dataSource={rows}
        pagination={false}
      />

      <Modal
        visible={showNewFieldModal}
        onCancel={() => {
          setShowNewFieldModal(false);
          setNewField('');
        }}
        title={<h3>Specification Name Title</h3>}
        onOk={handleAddNewField}
      >
        <Select
          showSearch
          style={{ width: '100%' }}
          value=''
          onSelect={(val) => {

          }}
        // onSearch={(val) => setSearchValue(val)}
        >
          <Option value='test'>test</Option>
        </Select>
      </Modal>
    </>
  );
};

const Edit = (props) => {

  const { detail, handleChangeData, handleSave } = props

  const [tabKey, setTabKey] = useState('1');
  const { initialState, setInitialState } = useModel('@@initialState');

  return (
    <div className="edit card">
      <Tabs
        defaultActiveKey="1"
        activeKey={tabKey}
        onChange={(k) => setTabKey(k)}
        type="card"
        tabBarExtraContent={{
          left: (
            <div className="blue-heading" style={{ marginRight: '1rem' }}>
              Edit Submission Package
            </div>
          ),
          right: (
            <Space size={'small'}>
              <Button>
                <PlusOutlined></PlusOutlined>
                Add Block
              </Button>
              <Button onClick={() => setInitialState((s) => ({ ...s, editingSubmission: false }))}>
                {' '}
                Cancel Changes
              </Button>
              <Button
                type="primary"
                onClick={handleSave}
              >
                Save
              </Button>
            </Space>
          ),
        }}
      >
        <TabPane tab={<div className="tab">{VersionIcon}C.03</div>} key="1">
          {
            detail && (
              <TabContent detail={detail} handleChangeData={handleChangeData} />
            )
          }
        </TabPane>
        <TabPane tab={<div className="tab">{VersionIcon}B.02</div>} key="2">
          {
            detail && (
              <TabContent detail={detail} handleChangeData={handleChangeData} />
            )
          }
        </TabPane>
        <TabPane tab={<div className="tab">{VersionIcon}A.01</div>} key="3">
          {
            detail && (
              <TabContent detail={detail} handleChangeData={handleChangeData} />
            )
          }
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Edit;
