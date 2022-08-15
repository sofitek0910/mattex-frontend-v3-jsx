import { PlusOutlined } from '@ant-design/icons';
import { GridContent, PageContainer, RouteContext } from '@ant-design/pro-layout';
import { Badge, Button, Card, Form, Input, Modal, Steps } from 'antd';
import { useState } from 'react';
import { history } from 'umi';
import CoverPageSearchBar from './components/CoverPageSearchBar';
import CoverPageTemplateTable from './components/CoverPageTemplateTable';
import SpecificationNameTable from './components/SpecificationNameTable';
import SpecificationSetTable from './components/SpecificationSetTable';
import styles from './style.less';

const { Step } = Steps;
const ButtonGroup = Button.Group;
const { TextArea } = Input;

const columns = [
  {
    title: 'operation type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'operator',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'result status',
    dataIndex: 'status',
    key: 'status',
    render: (text) => {
      if (text === 'agree') {
        return <Badge status="success" text="success" />;
      }

      return <Badge status="error" text="rejected" />;
    },
  },
  {
    title: 'update at',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: 'memo',
    dataIndex: 'memo',
    key: 'memo',
  },
];

const Advanced = () => {
  const [tabStatus, seTabStatus] = useState({
    tabActiveKey: 'SpecificationSets',
  });
  // const { data = {}, loading } = useRequest(queryAdvancedProfile);
  // //const { advancedOperation1, advancedOperation2, advancedOperation3 } = data;
  // const { coverPageTemplateColumns, coverPageTemplateDatas,
  //   SpecificationNameColumns, SpecificationNameDatas,
  //   SpecificationSetsColumns, SpecificationSetsDatas } = data;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
    history.push('/library/editor');
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const contentList = {
    CoverPageTemplate: <CoverPageTemplateTable />,
    SpecificationName: <SpecificationNameTable />,
    SpecificationSets: <SpecificationSetTable />,
  };

  const onTabChange = (tabActiveKey) => {
    seTabStatus({ ...tabStatus, tabActiveKey });
  };

  const extra = (
    <div className={styles.moreInfo}>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Create Cover Page Template
      </Button>
    </div>
  );
  const description = (
    <RouteContext.Consumer>{({ isMobile }) => <CoverPageSearchBar />}</RouteContext.Consumer>
  );

  return (
    <>
      <PageContainer
        title="Asset Library"
        // extra={action}
        className={styles.pageHeader}
        content={description}
        extraContent={extra}
        tabActiveKey={tabStatus.tabActiveKey}
        onTabChange={onTabChange}
        tabList={[
          {
            key: 'CoverPageTemplate',
            tab: 'Cover Page Template',
          },
          {
            key: 'SpecificationName',
            tab: 'Specification Name',
          },
          {
            key: 'SpecificationSets',
            tab: 'Specification Sets',
          },
        ]}
      >
        <div className={styles.main}>
          <GridContent>
            <Card
              className={styles.tabsCard}
              bordered={false}
              // tabList={operationTabList}
              onTabChange={onTabChange}
            >
              {contentList[tabStatus.tabActiveKey]}
            </Card>
          </GridContent>
        </div>
      </PageContainer>

      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <h3>Create Specification Set</h3>

        <Form name="createSpecificationSet">
          <div style={{ margin: '24px 0' }} />
          <h5>Set Title</h5>
          <Form.Item
            name="setTitle"
            rules={[
              {
                required: true,
                message: `Title is required.`,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <div style={{ margin: '24px 0' }} />
          <h5>Set Description</h5>
          <Form.Item
            name="setDescription"
            rules={[
              {
                required: true,
                message: `Description is required.`,
              },
            ]}
          >
            <TextArea
              //onChange={e => setValue(e.target.value)}
              placeholder=""
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Advanced;
