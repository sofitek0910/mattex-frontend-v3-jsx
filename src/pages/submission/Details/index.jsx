import { EditOutlined, EllipsisOutlined, EyeOutlined, HistoryOutlined } from '@ant-design/icons';
import { Col, Row, Typography, Space, Button, Table } from 'antd';
import iconImg from './icon.png';
import './index.less';
import Overview from './Overview';
const { Title } = Typography;
const versions = [
  {
    rev: 'C.03',
    generatedAt: '2023-01-01 12:30:21',
    circulation: 'Not yet started',
    submittedToSMM: '2023-01-03 15:32',
    status: 0,
    dueDate: '2022-01-13',
    actions: { count: 0, type: 0 },
  },
  {
    rev: 'B.02',
    generatedAt: '2023-01-01 12:30:21',
    circulation: 'Not yet started',
    submittedToSMM: '2023-01-03 15:32',
    status: 1,
    dueDate: '2022-01-13',
    actions: { count: 1, type: 1 },
  },
  {
    rev: 'A.01',
    generatedAt: '2023-01-01 12:30:21',
    circulation: 'Not yet started',
    submittedToSMM: '2023-01-03 15:32',
    status: 2,
    dueDate: '2022-01-13',
    actions: { count: 2, type: 1 },
  },
];
const tags = [
  {
    text: 'N/A',
    styles: {
      color: 'rgba(113, 112, 112, 1)',
      background: 'white',
      border: '1px solid #D7D7D7',
    },
  },
  {
    text: 'Approved with Comments',
    styles: {
      color: 'rgba(20, 182, 57, 1)',
      background: 'rgba(222, 250, 221, 1)',
      fontWeight: 500,
    },
  },
  {
    text: 'Rejected',
    styles: {
      color: 'rgba(210, 51, 1, 1)',
      background: 'rgba(255, 238, 238, 1)',
      fontWeight: 500,
    },
  },
];
const columns = [
  { title: 'Rev.', dataIndex: 'rev', key: 'rev' },
  { title: 'Generated At', dataIndex: 'generatedAt', key: 'generatedAt' },
  { title: 'Internal Circulation', dataIndex: 'circulation', key: 'circulation' },
  { title: 'Submitted to SRM At', dataIndex: 'submittedToSMM', key: 'submittedToSMM' },
  {
    title: 'SRM Status',
    dataIndex: 'status',
    key: 'status',
    render: (statusId) => {
      const tag = tags[statusId];
      return (
        <div className="status-tag" style={tag.styles}>
          {tag.text}
        </div>
      );
    },
  },
  { title: 'Response Due Date', dataIndex: 'dueDate', key: 'dueDate' },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    render: (actions) => (
      <Space size="small">
        <Button className="icon-btn">
          <EyeOutlined></EyeOutlined>
        </Button>
        <Button className="icon-btn">
          <HistoryOutlined></HistoryOutlined>
        </Button>
        {actions.type === 1 && (
          <>
            <Button className="icon-btn">
              <img src={iconImg}></img>
              <div className="count-badge">{actions.count}</div>
            </Button>
            <Button className="icon-btn">
              <EllipsisOutlined></EllipsisOutlined>
            </Button>
          </>
        )}
      </Space>
    ),
  },
];
const Details = () => {
  return (
    <div className="details-top-content">
      <Row gutter={12}>
        <Col span={18}>
          <div className="detials-card card">
            <div className="blue-heading">General Information</div>
            <Row>
              <Col span={6} className="paragraph">
                <div>Submission Reference Number:</div>
                <div>KLCWJV-1027-CSF-CV-0017</div>
              </Col>
              <Col span={6} className="paragraph">
                <div>Submission Type:</div>
                <div>Method Statement</div>
              </Col>
              <Col span={6} className="paragraph">
                <div>Trade:</div>
                <div>Structure</div>
              </Col>
              <Col span={6} className="paragraph">
                <div>Purpose:</div>
                <div>For Review</div>
              </Col>
            </Row>
            <Row>
              <Col span={6} className="paragraph">
                <div>Responsible Party:</div>
                <div>Sub Contractor</div>
              </Col>
              <Col span={6} className="paragraph">
                <div>Discipline Codes (if any):</div>
                <div>Civil</div>
              </Col>
              <Col span={6} className="paragraph">
                <div>Person-in-charge:</div>
                <div>Philip Wong (Site Engineer)</div>
              </Col>
              <Col span={6} className="paragraph">
                <div>Remark:</div>
                <div>Sample Text</div>
              </Col>
            </Row>
          </div>
          <div className="card" style={{ padding: '1rem 1rem' }}>
            <div className="blue-heading" style={{ marginBottom: '0.75rem' }}>
              Versions
            </div>
            <Table dataSource={versions} columns={columns}></Table>
          </div>
        </Col>
        <Col span={6} className="card">
          <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="blue-heading">Milestone</div>
            <Button>
              <Space size="small">
                <EditOutlined></EditOutlined>
                <div>Edit</div>
              </Space>
            </Button>
          </Row>
        </Col>
      </Row>
      <Overview></Overview>
    </div>
  );
};

export default Details;
