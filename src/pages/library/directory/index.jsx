import { useState, useEffect } from 'react';
import { history } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import { GridContent, PageContainer, RouteContext } from '@ant-design/pro-layout';
import { Button, Card, Form, Input, Modal, message, Select } from 'antd';

import CoverPageSearchBar from './components/CoverPageSearchBar';
import CoverPageTemplateTable from './components/CoverPageTemplateTable';
import SpecificationNameTable from './components/SpecificationNameTable';
import SpecificationSetTable from './components/SpecificationSetTable';

import { createLibrary } from '@/services/swagger/library'
import { getProjectList } from '@/services/swagger/projects'
import { getSubmissionTypeList } from '@/services/swagger/submission'

import styles from './style.less';

const Advanced = () => {
  const [filterOptions, setFilterOptions] = useState({});

  const [tabStatus, seTabStatus] = useState({
    tabActiveKey: 'SpecificationSets',
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [projects, setProjects] = useState([])
  const [submissionTypes, setSubmissionTypes] = useState([])

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCoverPageTemplateOK = (values) => {
    setIsModalVisible(false);
    let description = '&description=';
    if (typeof values.description !== 'undefined') {
      description += values.description;
    }
    history.push(`/library/editor?title=${values.title}&project=${values.project}&submission_type=${values.submission_type}${description}`);
  };

  const handleSpecificationNameOK = (values) => {
    const postBody = {
      name: values.setTitle,
      description: values.setDescription
    }
    createLibrary(postBody).then(() => {
      setIsModalVisible(false);
    }).catch(() => {
      message.error('Failed to create new specification name.')
    })
  };

  const handleSpecificationSetsOK = (values) => {
    setIsModalVisible(false);
    let description = '&description=';
    if (typeof values.setDescription !== 'undefined') {
      description += values.setDescription;
    }
    history.push(`/library/setCreator?title=${values.setTitle}${description}`);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const contentList = {
    CoverPageTemplate: <CoverPageTemplateTable filterOptions={filterOptions} />,
    SpecificationName: <SpecificationNameTable filterOptions={filterOptions} isModalVisible={isModalVisible} />,
    SpecificationSets: <SpecificationSetTable filterOptions={filterOptions} />,
  };

  const onTabChange = (tabActiveKey) => {
    seTabStatus({ ...tabStatus, tabActiveKey });
  };

  const extra = (
    <div className={styles.moreInfo}>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        {tabStatus.tabActiveKey == 'CoverPageTemplate'
          ? 'Create Cover Page Template'
          : tabStatus.tabActiveKey == 'SpecificationName'
            ? 'Add Specification'
            : 'Create Specification Table'}
      </Button>
    </div>
  );

  const description = (
    <RouteContext.Consumer>
      {({ isMobile }) => (
        <CoverPageSearchBar
          handleChange={(e) => {
            setFilterOptions({
              ...filterOptions,
              [e.name]: e.value,
            });
          }}
          onReset={() => setFilterOptions({})}
        />
      )}
    </RouteContext.Consumer>
  );

  useEffect(() => {
    getProjectList().then((res) => {
      setProjects(res.data.map((cell) => ({ project_id: cell.project_id, project_display_name: cell.project_display_name })))
    })

    getSubmissionTypeList().then((res) => {
      setSubmissionTypes(res)
    })
  }, [])

  return (
    <>
      <PageContainer
        title="Asset Library"
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
            <Card className={styles.tabsCard} bordered={false} onTabChange={onTabChange}>
              {contentList[tabStatus.tabActiveKey]}
            </Card>
          </GridContent>
        </div>
      </PageContainer>

      <Modal
        title={
          tabStatus.tabActiveKey == 'CoverPageTemplate'
            ? 'Create Cover Template'
            : tabStatus.tabActiveKey == 'SpecificationName'
              ? 'Create Specification'
              : 'Create Specification Set'
        }
        visible={isModalVisible}
        okButtonProps={{
          htmlType: 'submit',
          form:
            tabStatus.tabActiveKey == 'CoverPageTemplate'
              ? 'createCoverTemplate'
              : tabStatus.tabActiveKey == 'SpecificationName'
                ? 'createSpecificationName'
                : 'createSpecificationSet',
        }}
        onCancel={handleCancel}
        okText="ok"
        cancelText="cancel"
      >
        {tabStatus.tabActiveKey == 'CoverPageTemplate' ? (
          <Form
            name="createCoverTemplate"
            id="createCoverTemplate"
            onFinish={handleCoverPageTemplateOK}
          >
            <div style={{ margin: '24px 0' }} />
            <h5>Template Title</h5>
            <Form.Item
              name="title"
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
            <h5>Description</h5>
            <Form.Item
              name="description"
            >
              <Input.TextArea
                placeholder=""
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </Form.Item>

            <div style={{ margin: '24px 0' }} />
            <h5>Link to Project</h5>
            <Form.Item
              name="project"
              rules={[
                {
                  required: true,
                  message: `Project is required.`,
                },
              ]}
            >
              <Select
                placeholder="Please select"
              >
                {
                  projects.map((project) => (
                    <Select.Option value={project.project_id} key={project.project_display_name}>{project.project_display_name}</Select.Option>
                  ))
                }
              </Select>
            </Form.Item>

            <div style={{ margin: '24px 0' }} />
            <h5>Submission Type</h5>
            <Form.Item
              name="submission_type"
              rules={[
                {
                  required: true,
                  message: `Submission is required.`,
                },
              ]}
            >
              <Select
                placeholder="Please select"
              >
                {
                  submissionTypes.map((submissionType) => (
                    <Select.Option value={submissionType.submission_type_id} key={submissionType.submission_type_id}>
                      {submissionType.display_name}
                    </Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
          </Form>
        ) : tabStatus.tabActiveKey == 'SpecificationName' ? (
          <Form
            name="createSpecificationName"
            id="createSpecificationName"
            onFinish={(values) => handleSpecificationNameOK(values)}
          >
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
            >
              <Input.TextArea
                placeholder=""
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </Form.Item>
          </Form>
        ) : (
          <Form
            name="createSpecificationSet"
            id="createSpecificationSet"
            onFinish={(values) => handleSpecificationSetsOK(values)}
          >
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
            >
              <Input.TextArea
                placeholder=""
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default Advanced;
