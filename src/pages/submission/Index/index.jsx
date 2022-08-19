import { Button, Col, Input, Row, Select, Space, Table, Tabs, Tag } from 'antd';
import { Typography } from 'antd';
import Search from 'antd/lib/input/Search';
import './index.less';
import { ArrowLeftOutlined, EyeOutlined, LeftOutlined, SettingOutlined } from '@ant-design/icons';
import { useState } from 'react';
const { Title } = Typography;
const { TabPane } = Tabs;
const dummyList = [
  {
    refNo: 'KLCWJV-1027-CSF-CV-0017',
    systemId: '0147-MS-0022',
    name: 'Stee Fabric Mesh',
    personInCharge: 'Philip Wong',
    status: Math.floor(Math.random() * 6),
    version: 1,
    type: Math.floor(Math.random() * 4),
  },
  {
    refNo: 'KLCWJV-1027-CSF-CV-0017',
    systemId: '0147-MS-0022',
    name: 'Stee Fabric Mesh',
    personInCharge: 'Philip Wong',
    status: Math.floor(Math.random() * 6),
    version: 1,
    type: Math.floor(Math.random() * 4),
  },
  {
    refNo: 'KLCWJV-1027-CSF-CV-0017',
    systemId: '0147-MS-0022',
    name: 'Stee Fabric Mesh',
    personInCharge: 'Philip Wong',
    status: Math.floor(Math.random() * 6),
    version: 1,
    type: Math.floor(Math.random() * 4),
  },
  {
    refNo: 'KLCWJV-1027-CSF-CV-0017',
    systemId: '0147-MS-0022',
    name: 'Stee Fabric Mesh',
    personInCharge: 'Philip Wong',
    status: Math.floor(Math.random() * 6),
    version: 1,
    type: Math.floor(Math.random() * 4),
  },
  {
    refNo: 'KLCWJV-1027-CSF-CV-0017',
    systemId: '0147-MS-0022',
    name: 'Stee Fabric Mesh',
    personInCharge: 'Philip Wong',
    status: Math.floor(Math.random() * 6),
    version: 1,
    type: Math.floor(Math.random() * 4),
  },
  {
    refNo: 'KLCWJV-1027-CSF-CV-0017',
    systemId: '0147-MS-0022',
    name: 'Stee Fabric Mesh',
    personInCharge: 'Philip Wong',
    status: Math.floor(Math.random() * 6),
    version: 1,
    type: Math.floor(Math.random() * 4),
  },
  {
    refNo: 'KLCWJV-1027-CSF-CV-0017',
    systemId: '0147-MS-0022',
    name: 'Stee Fabric Mesh',
    personInCharge: 'Philip Wong',
    status: Math.floor(Math.random() * 6),
    version: 1,
    type: Math.floor(Math.random() * 4),
  },
  {
    refNo: 'KLCWJV-1027-CSF-CV-0017',
    systemId: '0147-MS-0022',
    name: 'Stee Fabric Mesh',
    personInCharge: 'Philip Wong',
    status: Math.floor(Math.random() * 6),
    version: 1,
    type: Math.floor(Math.random() * 4),
  },
  {
    refNo: 'KLCWJV-1027-CSF-CV-0017',
    systemId: '0147-MS-0022',
    name: 'Stee Fabric Mesh',
    personInCharge: 'Philip Wong',
    status: Math.floor(Math.random() * 6),
    version: 1,
    type: Math.floor(Math.random() * 4),
  },
  {
    refNo: 'KLCWJV-1027-CSF-CV-0017',
    systemId: '0147-MS-0022',
    name: 'Stee Fabric Mesh',
    personInCharge: 'Philip Wong',
    status: Math.floor(Math.random() * 6),
    version: 1,
    type: Math.floor(Math.random() * 4),
  },
  {
    refNo: 'KLCWJV-1027-CSF-CV-0017',
    systemId: '0147-MS-0022',
    name: 'Stee Fabric Mesh',
    personInCharge: 'Philip Wong',
    status: Math.floor(Math.random() * 6),
    version: 1,
    type: Math.floor(Math.random() * 4),
  },
  {
    refNo: 'KLCWJV-1027-CSF-CV-0017',
    systemId: '0147-MS-0022',
    name: 'Stee Fabric Mesh',
    personInCharge: 'Philip Wong',
    status: Math.floor(Math.random() * 6),
    version: 1,
    type: Math.floor(Math.random() * 4),
  },
  {
    refNo: 'KLCWJV-1027-CSF-CV-0017',
    systemId: '0147-MS-0022',
    name: 'Stee Fabric Mesh',
    personInCharge: 'Philip Wong',
    status: Math.floor(Math.random() * 6),
    version: 1,
    type: Math.floor(Math.random() * 4),
  },
  {
    refNo: 'KLCWJV-1027-CSF-CV-0017',
    systemId: '0147-MS-0022',
    name: 'Stee Fabric Mesh',
    personInCharge: 'Philip Wong',
    status: Math.floor(Math.random() * 6),
    version: 1,
    type: Math.floor(Math.random() * 4),
  },
  {
    refNo: 'KLCWJV-1027-CSF-CV-0017',
    systemId: '0147-MS-0022',
    name: 'Stee Fabric Mesh',
    personInCharge: 'Philip Wong',
    status: Math.floor(Math.random() * 6),
    version: 1,
    type: Math.floor(Math.random() * 4),
  },
  {
    refNo: 'KLCWJV-1027-CSF-CV-0017',
    systemId: '0147-MS-0022',
    name: 'Stee Fabric Mesh',
    personInCharge: 'Philip Wong',
    status: Math.floor(Math.random() * 6),
    version: 1,
    type: Math.floor(Math.random() * 4),
  },
  {
    refNo: 'KLCWJV-1027-CSF-CV-0017',
    systemId: '0147-MS-0022',
    name: 'Stee Fabric Mesh',
    personInCharge: 'Philip Wong',
    status: Math.floor(Math.random() * 6),
    version: 1,
    type: Math.floor(Math.random() * 4),
  },
  {
    refNo: 'KLCWJV-1027-CSF-CV-0017',
    systemId: '0147-MS-0022',
    name: 'Stee Fabric Mesh',
    personInCharge: 'Philip Wong',
    status: Math.floor(Math.random() * 6),
    version: 1,
    type: Math.floor(Math.random() * 4),
  },
  {
    refNo: 'KLCWJV-1027-CSF-CV-0017',
    systemId: '0147-MS-0022',
    name: 'Stee Fabric Mesh',
    personInCharge: 'Philip Wong',
    status: Math.floor(Math.random() * 6),
    version: 1,
    type: Math.floor(Math.random() * 4),
  },
  {
    refNo: 'KLCWJV-1027-CSF-CV-0017',
    systemId: '0147-MS-0022',
    name: 'Stee Fabric Mesh',
    personInCharge: 'Philip Wong',
    status: Math.floor(Math.random() * 6),
    version: 1,
    type: Math.floor(Math.random() * 4),
  },
  {
    refNo: 'KLCWJV-1027-CSF-CV-0017',
    systemId: '0147-MS-0022',
    name: 'Stee Fabric Mesh',
    personInCharge: 'Philip Wong',
    status: Math.floor(Math.random() * 6),
    version: 1,
    type: Math.floor(Math.random() * 4),
  },
];
const submissionTypes = [
  { id: 0, name: 'Method Statement' },
  { id: 1, name: 'Shop Drawing' },
  { id: 2, name: 'Material' },
  { id: 3, name: 'General' },
];

const tagData = [
  { text: 'Work in Progress', color: 'rgba(0, 142, 211, 1)', bgColor: 'rgba(221, 244, 255, 1)' },
  { text: 'Approved', color: 'rgba(20, 182, 57, 1)', bgColor: 'rgba(222, 250, 221, 1)' },
  {
    text: 'Approved with Comments',
    color: 'rgba(1, 98, 75, 1)',
    bgColor: 'rgba(237, 255, 251, 1)',
  },
  { text: 'Awaiting Approval', color: 'rgba(234, 162, 9, 1)', bgColor: 'rgba(255, 244, 219, 1)' },
  { text: 'Cancelled', color: 'rgba(113, 112, 112, 1)', bgColor: 'rgba(244, 244, 244, 1)' },
  { text: 'Rejected', color: 'rgba(210, 51, 1, 1)', bgColor: 'rgba(255, 238, 238, 1)' },
];

const columns = [
  {
    title: 'Submission Reference Number',
    dataIndex: 'refNo',
    key: 'refNo',
  },
  {
    title: 'System ID',
    dataIndex: 'systemId',
    key: 'systemId',
  },
  {
    title: 'Submission Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Person In Charge',
    dataIndex: 'personInCharge',
    key: 'personInCharge',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (statusId) => {
      const tag = tagData[statusId];
      return (
        <div className="status-tag" style={{ backgroundColor: tag.bgColor, color: tag.color }}>
          {tag.text}
        </div>
      );
    },
  },
  {
    title: 'Ver',
    dataIndex: 'version',
    key: 'version',
    render: (version) => 'V' + version,
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    render: () => (
      <Button>
        <EyeOutlined></EyeOutlined>
      </Button>
    ),
  },
];

export default function Index() {
  const [activeTabKey, setActiveTabKey] = useState(0);
  return (
    <div>
      <Row align="middle" style={{ marginBottom: '2.25rem' }}>
        <Col flex="none">
          <Space style={{ display: 'flex', alignItems: 'center' }} size="middle" align="middle">
            <LeftOutlined></LeftOutlined>
            <Title level={3} style={{ marginBottom: 0 }}>
              List of Submission
            </Title>
            <Select style={{ width: '10.5rem' }} placeholder="Status">
              <Option value="Status1">Status1</Option>
              <Option value="Status2">Status2</Option>
              <Option value="Status3">Status3</Option>
            </Select>
          </Space>
        </Col>
        <Col flex="auto">
          <Row flex="auto" justify="end">
            <Space>
              <Search style={{ width: '16.5rem' }} placeholder="Search Submission"></Search>
              <Button type="primary">Create Submission</Button>
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
          {submissionTypes.map((x) => {
            const items = dummyList.filter((s) => s.type === x.id);

            return (
              <TabPane
                key={(x.id + 1).toString()}
                tab={
                  <div className="submission-tab">
                    <div>{x.name}</div>
                    <div className="number-badge">{items.length}</div>
                  </div>
                }
              >
                <Table columns={columns} dataSource={items}></Table>
              </TabPane>
            );
          })}
          <TabPane
            tab={
              <div className="submission-tab">
                <div>All</div>
                <div className="number-badge">{dummyList.length}</div>
              </div>
            }
            key="5"
          >
            <Table columns={columns} dataSource={dummyList}></Table>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
