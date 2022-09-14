import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Button, Col, Input, Row, Select, Space, Typography, message } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

import { getSubmissionTypeList, getTradeList, createSubmission, checkDocumentNumber, getApprovalFlowList, getReveiwerList } from '@/services/swagger/submission'
import { getUserListByProjectId, getTemplateList, getTemplateDetail } from '@/services/swagger/library'
import { getProjectDetail } from '@/services/swagger/projects'
import { RESPONSIBLE_PARTIES, DISCIPLINE_CODE } from '@/const'

import './index.less';

const formSchema = Yup.object().shape({
  name: Yup.string().required(),
  submission_type: Yup.number().required(),
  trade: Yup.number().required(),
  responsible_party: Yup.string().required(),
  person_in_charge: Yup.number().required(),
  discipline_code: Yup.string().required(),
  purpose_chosen: Yup.number().required(),
  template_id: Yup.number().required(),
  document_number: Yup.number().required(),
  approval_flow: Yup.number().required(),
  target_recipient: Yup.number().required(),
  description: Yup.string().required()
})

export default function Create() {

  const history = useHistory();
  const { projectId } = useParams()

  const [submissionTypes, setSubmissionTypes] = useState([]);
  const [tradeList, setTradeList] = useState([])
  const [users, setUsers] = useState([])
  const [purposes, setPurposes] = useState([])
  const [templates, setTemplates] = useState([])
  const [isCreating, setIsCreating] = useState(false)
  const [checkingDocNum, setCheckingDocNum] = useState(false)
  const [approvalList, setApprovalList] = useState([])
  const [reviewerList, setReviewerList] = useState([])

  const formik = useFormik({
    initialValues: {
      name: '',
      submission_type: '',
      trade: '',
      person_in_charge: '',
      discipline_code: '',
      responsible_party: '',
      purpose_chosen: '',
      template_id: '',
      document_number: '',
      approval_flow: '',
      target_recipient: '',
      description: ''
    },
    validationSchema: formSchema,
    onSubmit: values => {
      console.log(values)
      setIsCreating(true)
      getTemplateDetail(values.template_id).then((res) => {
        console.log(res)
        const postBody = {
          header_submission: res.header_template,
          salutation_submission: res.salutation_template,
          title_submission: res.title_template,
          reference_submission: res.reference_template,
          attachment_submission: res.attachment_template ?? {
            attachment: false
          },
          descriptionofcontent_submission: res.descriptionofcontent_template,
          aboutthissubmission_submission: {
            // ...res.aboutthissubmission_template,
            purpose_chosen: values.purpose_chosen,
            record_reply: false,
            anticipated_date_of_reply: "2022-10-30"
          },
          futurereply_submission: res.futurereply_template,
          order_of_blocks: res.order_of_blocks,
          name: values.name,
          project: res.project,
          submission_type: values.submission_type,
          person_in_charge: values.person_in_charge,
          trade: values.trade,
          discipline_code: values.discipline_code,
          responsible_party: values.responsible_party,
          document_number: values.document_number,
          approval_flow: values.approval_flow,
          circulation_identification_visible: res.circulation_identification_visible,
          signoff_has_submitter: res.signoff_has_submitter,
          description: values.description,
          target_recipient: values.target_recipient,
          target_recipient_respondent: 10
        }

        createSubmission(postBody).then((res) => {
          console.log(res)
          message.success('Success to create new submission')
          setIsCreating(false)
          history.push('/submission/list')
        }).catch((err) => {
          console.log(err.response)
        }).finally(() => {
          setIsCreating(false)
        })
      }).finally(() => {
        setIsCreating(false)
      })
    },
  });

  const handleCheckDocumentNumber = () => {
    setCheckingDocNum(true)
    checkDocumentNumber(projectId, formik.values.document_number).then((res) => {
      message.info(res)
    }).catch(() => {
      message.error('Another submission with same document number exists under this project for the duplication criterium chosen, please use a different value')
    }).finally(() => {
      setCheckingDocNum(false)
    })
  }

  useEffect(() => {
    getSubmissionTypeList().then((res) => {
      setSubmissionTypes(res);
    });

    getTradeList().then((res) => {
      setTradeList(res)
    })

    getUserListByProjectId({
      projectId: projectId
    }).then((res) => {
      setUsers(res.data)
    })

    getProjectDetail(projectId).then((res) => {
      setPurposes(res.purposes)
    })

    getTemplateList({
      project_id: projectId,
      // submission_type: 1,
      status: 1,
      user_id: JSON.parse(localStorage.getItem('user')).uid
    }).then((res) => {
      setTemplates(res.map((cell) => ({ id: cell.id, name: cell.name })))
    })

    getApprovalFlowList().then((res) => {
      setApprovalList(res.map((cell) => ({
        approval_flow_id: cell.approval_flow_id,
        name: cell.name
      })))
    })

    getReveiwerList(projectId).then((res) => {
      setReviewerList(res.data.map((cell) => ({
        reviewer_id: cell.reviewer_id,
        primary_name: cell.reviewer.primary_name
      })))
    })
  }, []);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Row align="middle" style={{ marginBottom: '2.25rem' }}>
          <Col flex="none">
            <Space
              style={{ display: 'flex', alignItems: 'center', color: 'black' }}
              size="middle"
              align="middle"
            >
              <LeftOutlined></LeftOutlined>
              <Typography.Title level={3} style={{ marginBottom: 0 }}>
                Create New Submission
              </Typography.Title>
            </Space>
          </Col>
          <Col flex="auto">
            <Row flex="auto" justify="end">
              <Space>
                <Button onClick={() => history.push('/submission/list')}>Cancel</Button>
                <Button type="primary" onClick={formik.handleSubmit} loading={isCreating}>Create</Button>
              </Space>
            </Row>
          </Col>
        </Row>
        <div>
          <div style={{ fontSize: '18px', color: 'rgba(0, 54, 115, 1)' }} className="mb">
            <b>Generl Information</b>
          </div>
          <div className="top-row mb-2">
            <div className="input-group">
              <div className="label">
                <span className="req-icon">*</span>
                <div>Title</div>
              </div>
              <Input
                placeholder="Please input"
                name='name'
                onChange={formik.handleChange}
                value={formik.values.name}
                status={(formik.errors.name && formik.touched.name) ? "error" : ""}
              />
            </div>
            <div className="input-group">
              <div className="label">
                <span className="req-icon">*</span>
                <div>Submission Reference Number</div>
              </div>
              <div className="top-row-right">
                <div>KLCWJV-1027-CSF-</div>
                <div className="badge purple">
                  <div>Submission Type (Abbr.)</div>
                  <div>(Auto Refresh)</div>
                </div>
                -
                <div className="badge blue">
                  <div>Submission Type (Abbr.)</div>
                  <div>(Auto Refresh)</div>
                </div>
                -<Input
                  placeholder="Input document no."
                  name='document_number'
                  onChange={formik.handleChange}
                  value={formik.values.document_number}
                  status={(formik.errors.document_number && formik.touched.document_number) ? "error" : ""}
                  type='number'
                />
                <Button type="primary" loading={checkingDocNum} onClick={handleCheckDocumentNumber}>Duplicate Check</Button>
              </div>
            </div>
          </div>

          <div className="inputs mb-2">
            <div className="input-group">
              <div className="label">
                <span className="req-icon">*</span>
                <div>Description</div>
              </div>
              <Input.TextArea
                placeholder="Please input"
                name='description'
                onChange={formik.handleChange}
                value={formik.values.description}
                status={(formik.errors.description && formik.touched.description) ? "error" : ""}
              />
            </div>
          </div>

          <div className="inputs">
            <div className="input-group">
              <div className="label">
                <span className="req-icon">*</span>
                <div>Template</div>
              </div>
              <Select
                placeholder="Please select"
                name='template_id'
                onChange={(value) => formik.setFieldValue('template_id', value)}
                value={formik.values.template_id}
                status={(formik.errors.template_id && formik.touched.template_id) ? "error" : ""}
              >
                {
                  templates.map((cell) => (
                    <Select.Option value={cell.id} key={cell.id}>{cell.name}</Select.Option>
                  ))
                }
              </Select>
            </div>

            <div className="input-group">
              <div className="label">
                <span className="req-icon">*</span>
                <div>Submission Type</div>
              </div>
              <Select
                placeholder="Please select"
                name='submission_type'
                onChange={(value) => formik.setFieldValue('submission_type', value)}
                value={formik.values.submission_type}
                status={(formik.errors.submission_type && formik.touched.submission_type) ? "error" : ""}
              >
                {
                  submissionTypes.map((submissionType) => (
                    <Select.Option value={submissionType.submission_type_id} key={submissionType.submission_type_id}>
                      {submissionType.display_name}
                    </Select.Option>
                  ))
                }
              </Select>
            </div>
            <div className="input-group">
              <div className="label">
                <span className="req-icon">*</span>
                <div>Select Purpose</div>
              </div>
              <Select
                placeholder="Please select"
                onChange={(value) => formik.setFieldValue('purpose_chosen', value)}
                value={formik.values.purpose_chosen}
                status={(formik.errors.purpose_chosen && formik.touched.purpose_chosen) ? "error" : ""}
              >
                {
                  purposes.map((purpose) => (
                    <Select.Option value={purpose.purpose_id} key={purpose.purpose_id}>{purpose.name}</Select.Option>
                  ))
                }
              </Select>
            </div>
            <div className="input-group">
              <div className="label">
                <span className="req-icon">*</span>
                <div>Trade</div>
              </div>
              <Select
                placeholder="Please select"
                name='trade'
                onChange={(value) => formik.setFieldValue('trade', value)}
                value={formik.values.trade}
                status={(formik.errors.trade && formik.touched.trade) ? "error" : ""}
              >
                {
                  tradeList.map((trade) => (
                    <Select.Option value={trade.trade_id} key={trade.trade_id}>
                      {trade.name}
                    </Select.Option>
                  ))
                }
              </Select>
            </div>

            <div className="input-group">
              <div className="label">
                <span className="req-icon">*</span>
                <div>Responsible Party</div>
              </div>
              <Select
                placeholder="Please select"
                name='responsible_party'
                onChange={(value) => formik.setFieldValue('responsible_party', value)}
                value={formik.values.responsible_party}
                status={(formik.errors.responsible_party && formik.touched.responsible_party) ? "error" : ""}
              >
                {
                  RESPONSIBLE_PARTIES.map((cell) => (
                    <Select.Option value={cell.data} key={cell.data}>{cell.label}</Select.Option>
                  ))
                }
              </Select>
            </div>
            <div className="input-group">
              <div className="label">
                <span className="req-icon">*</span>
                <div>Person-in-Charge</div>
              </div>
              <Select
                placeholder="Please select"
                name='person_in_charge'
                onChange={(value) => formik.setFieldValue('person_in_charge', value)}
                value={formik.values.person_in_charge}
                status={(formik.errors.person_in_charge && formik.touched.person_in_charge) ? "error" : ""}
              >
                {
                  users.map((user) => (
                    <Select.Option value={user.id} key={user.id}>{user.name}</Select.Option>
                  ))
                }
              </Select>
            </div>
            <div className="input-group">
              <div className="label">
                <span className="req-icon">*</span>
                <div>Discipline Code</div>
              </div>
              <Select
                placeholder="Please select"
                name='discipline_code'
                onChange={(value) => formik.setFieldValue('discipline_code', value)}
                value={formik.values.discipline_code}
                status={(formik.errors.discipline_code && formik.touched.discipline_code) ? "error" : ""}
              >
                {
                  DISCIPLINE_CODE.map((cell) => (
                    <Select.Option value={cell.data} key={cell.data}>{cell.label}</Select.Option>
                  ))
                }
              </Select>
            </div>
            <div className="input-group">
              <div className="label">
                <span className="req-icon">*</span>
                <div>Approval Flow</div>
              </div>
              <Select
                placeholder="Please select"
                name='approval_flow'
                onChange={(value) => formik.setFieldValue('approval_flow', value)}
                value={formik.values.approval_flow}
                status={(formik.errors.approval_flow && formik.touched.approval_flow) ? "error" : ""}
              >
                {
                  approvalList.map((cell) => (
                    <Select.Option value={cell.approval_flow_id} key={cell.approval_flow_id}>{cell.name}</Select.Option>
                  ))
                }
              </Select>
            </div>
            <div className="input-group">
              <div className="label">
                <span className="req-icon">*</span>
                <div>Recipient</div>
              </div>
              <Select
                placeholder="Please select"
                name='target_recipient'
                onChange={(value) => formik.setFieldValue('target_recipient', value)}
                value={formik.values.target_recipient}
                status={(formik.errors.target_recipient && formik.touched.target_recipient) ? "error" : ""}
              >
                {
                  reviewerList.map((cell) => (
                    <Select.Option value={cell.reviewer_id} key={cell.reviewer_id}>{cell.primary_name}</Select.Option>
                  ))
                }
              </Select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
