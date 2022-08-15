import { Table, Tag } from 'antd';
const { Column, ColumnGroup } = Table;

const CoverPageTemplateTable3 = () => {
  const columns = [
    {
      title: 'Template ID',
      dataIndex: 'templateId',
      key: 'templateId',
      //render: (text) => <a>{text}</a>,
    },
    {
      title: 'Template Name',
      dataIndex: 'templateName',
      key: 'templateName',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (_, { status }) => (
        <>
          {status.map((tag) => {
            let color = 'green';

            if (tag === 'Active') {
              color = 'green';
            } else if (tag === 'In Progress') {
              color = 'orange';
            } else if (tag === 'Inactive') {
              color = 'volcano';
            }

            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Last Edited',
      dataIndex: 'lastEdited',
      key: 'lastEdited',
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (_, record) => (
    //     <Space size="middle">
    //       {/* <a>View {record.name}</a>
    //       <a>Open</a> */}
    //       <Button icon={<EyeOutlined size='small'/>} onClick={() => setStep1(true)} />

    //     </Space>
    //   ),
    // },
  ];

  const data = [
    {
      key: 1,
      templateId: '0056',
      templateName: 'Government Method Statment Cover Page',
      status: ['Active'],
      lastEdited: '2022/03/10 18:00',
    },
    {
      key: 2,
      templateId: '0024',
      templateName: 'Shek Wu Temp. Work Design Cover Page New',
      status: ['In Progress'],
      lastEdited: '2022/03/10 18:00',
    },
    {
      key: 3,
      templateId: '0055',
      templateName: 'Record RD Cover Page Tuen Mun 2022',
      status: ['Active'],
      lastEdited: '2022/03/10 18:00',
    },
    {
      key: 4,
      templateId: '0052',
      templateName: 'Shek Wu Temp. Work Design Cover Page New',
      status: ['Inactive'],
      lastEdited: '2022/03/10 18:00',
    },
  ];

  return <Table dataSource={data} columns={columns} />;
};

export default CoverPageTemplateTable3;
