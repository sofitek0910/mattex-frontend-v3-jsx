import { PageContainer, RouteContext } from '@ant-design/pro-layout';
import { Card, Descriptions, PageHeader, Typography, Button } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import styles from './style.less';

import SortableInputField from './components/SortableInputField';

const { Text } = Typography;

const data = [
  { label: 'New Title', value: '' }
]


const description = (
  <RouteContext.Consumer>
    {({ isMobile }) => (
      <Descriptions className={styles.headerList} size="small" column={1}>
        <Descriptions.Item>0041 - The Mattex Office Rennovation (Material)</Descriptions.Item>
        <Descriptions.Item>Testing Cover Page</Descriptions.Item>
        <Descriptions.Item>No Description</Descriptions.Item>
      </Descriptions>
    )}
  </RouteContext.Consumer>
);

const header = (
  <PageHeader
    onBack={() => {}}
    title={
      <>
        {/*<div>{project?.project_display_name}</div>*/}
        {/*<div>{selectedTemp.description ? selectedTemp.description : 'No Description'}</div>*/}
        <Text style={{ width: 900, fontSize: '12px' }} ellipsis>
          {/*selectedTemp.description ? selectedTemp.description : 'No Description'*/}
          {'No Description'}
        </Text>
      </>
    }
    extra={[
      <Button key="1" type="primary">
        Save Set
      </Button>,
    ]}
  />
);


const Basic = () => {
  const [dataSource,setDataSource]  = useState(data);
  const search = useLocation().search;
  const title = new URLSearchParams(search).get('title');
  const description = new URLSearchParams(search).get('description');

  const saveHandler = () => {
    console.log('dataSource:',dataSource)
  }

  return (
    <PageContainer
      header={{
        onBack: () => {},
        title: (
          <>
            {/*<div>{project?.project_display_name}</div>*/}
            <div>{title}</div>
            {/*<div>{selectedTemp.description ? selectedTemp.description : 'No Description'}</div>*/}
            <Text style={{ width: 900, fontSize: '12px' }} ellipsis>
              {description ? description : 'No Description'}
              {/*'No Description'*/}
            </Text>
          </>
        ),
        extra: [
          <Button key="1" type="primary" onClick={saveHandler}>
            Save Set
          </Button>,
        ],
      }}
    >
      <Card bordered={false}>
        <DndProvider backend={HTML5Backend}>
          <SortableInputField editing dataSource={dataSource} setDataSource={setDataSource}/>
        </DndProvider>
      </Card>
    </PageContainer>
  );
};
//SortableInputField -> InputComponent
export default Basic;
