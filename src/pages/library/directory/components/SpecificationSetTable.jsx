import { CopyOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Space, Table } from 'antd';
const { Column, ColumnGroup } = Table;

const columns = [
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
    //render: (text) => <a>{text}</a>,
  },
  {
    title: 'Specification Name',
    dataIndex: 'specificationName',
    key: 'specificationName',
  },
  {
    title: 'Owner',
    dataIndex: 'owner',
    key: 'owner',
    render: (text) => <a>{text}</a>,
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
        <Button icon={<EyeOutlined size="small" />} />
        <Button icon={<CopyOutlined size="small" />} />
        {record.owner === 'You' ? <Button icon={<EditOutlined size="small" />} /> : <></>}
        {record.owner === 'You' ? <Button icon={<DeleteOutlined size="small" />} danger /> : <></>}
      </Space>
    ),
  },
];

const data = [
  {
    key: 1,
    code: '0056',
    specificationName: 'Government Method Statment Cover Page',
    owner: 'Luk Advisor',
    lastEdited: '2022/03/10 18:00',
  },
  {
    key: 2,
    code: '0024',
    specificationName: 'Shek Wu Temp. Work Design Cover Page New',
    owner: 'You',
    lastEdited: '2022/03/10 18:00',
  },
  {
    key: 3,
    code: '0055',
    specificationName: 'Record RD Cover Page Tuen Mun 2022',
    owner: 'Mattex',
    lastEdited: '2022/03/10 18:00',
  },
  {
    key: 4,
    code: '0052',
    specificationName: 'Shek Wu Temp. Work Design Cover Page New',
    owner: 'Mattex',
    lastEdited: '2022/03/10 18:00',
  },
];

const CoverPageTemplateTable = () => <Table dataSource={data} columns={columns} />;

export default CoverPageTemplateTable;
