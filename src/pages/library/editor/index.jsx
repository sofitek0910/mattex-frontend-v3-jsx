import { PageContainer, RouteContext } from '@ant-design/pro-layout';
import { Card, Descriptions } from 'antd';
import styles from './style.less';

// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import NestedDNDPanel from './components/NestedDNDPanel';
import DNDPanel from './components/DNDPanel/DNDPanel'

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

const Basic = () => {
  return (
    <PageContainer content={description}>
      <Card bordered={false}>
        {/* <DndProvider backend={HTML5Backend}>
          <NestedDNDPanel />
        </DndProvider> */}
        <DNDPanel/>
      </Card>

    </PageContainer>
  );
};

export default Basic;
