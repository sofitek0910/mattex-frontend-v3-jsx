import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Breadcrumb, Row, Col, Space } from 'antd';
import { useState, useEffect, useCallback } from 'react';
import { history } from 'umi';
import styles from './style.less';
import { EditOutlined } from '@ant-design/icons';
import { useLocation, Link } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { STRUCTURE_TYPE } from './blockTypeDefinition';
import StructureBlock from './components/StructureBlock';
import SortableBlockPanel from './components/SortableBlockPanel';

const Advanced = () => {
  const search = useLocation().search;
  const projid = new URLSearchParams(search).get('projid');

  //get proj data and ref no. structure by projid
  //const projName = NAME_GET_FROM_API
  const projName =
    'Fanling North New Development Area, Phase 1: Fanling Bypass Eastern Section (Shek Wu San Tsuen North to Lung Yeuk Tau)';

  //"field_project_id" is actually the "project_code" in project detail API response, not the project_id
  // STRUCTURE_TYPE['field_project_id'].description = project_code_GET_FROM_API
  STRUCTURE_TYPE['field_project_id'].description = "0997";  

  //const [refStructure, setRefStructure] = useState(STRUCTURE_GET_FROM_API)
  const [refStructure, setRefStructure] = useState([
    'field_contractor',
    '-',
    'field_project_id',
    '-',
    'CSF',
    '/',
    'field_submission_type',
    '-',
    'field_discipline_code',
    '-',
    'field_document_no',
    '-',
    'field_ext_trig_id',
    '/',
    'field_year',
  ]);
  useEffect(() => {
    console.log('refStructure: ', refStructure);
  }, [refStructure]);

  const [restoreStructure, setRestoreStructure] = useState([]);
  const [editing, setEditing] = useState(false);

  const editHandler = () => {
    setRestoreStructure(refStructure);
    setEditing(true);
  };

  const saveHandler = () => {
    setRestoreStructure([]);
    setEditing(false);
    //POST API for storing new refStructure
  };

  const cancelHandler = () => {
    setRefStructure(restoreStructure);
    setRestoreStructure([]);
    setEditing(false);
  };

  const addBlockCallback = useCallback((blockType) => {
    if (blockType === 'field_free_text') {
      setRefStructure([...refStructure, '　']);
      //if '', ' ' or undefined is stored, the whole item disappear when the list is reordered, so fullwidth space is used
    } else {
      setRefStructure([...refStructure, blockType]);
    }
  });

  const structureBlock = (item, usage, setList) => {
    console.log('structureBlock(index): ', item, usage);
    return <StructureBlock blockType={item} usage={usage} setList={setList} />;
  };

  const breadcrumb = (
    <Breadcrumb>
      <Breadcrumb.Item>
        <a href="/projects/projectList">Projects</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <a
          href=""
          onClick={() => {
            history.push(`/projects/submissionList?projid=${projid}`);
          }}
        >
          {projName}
        </a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>Setting</Breadcrumb.Item>
    </Breadcrumb>
)

  return (
    <>
      <PageContainer
        title="Setting"
        className={styles.pageHeader}
        onBack={() => {
          history.push(`/projects/submissionList?projid=${projid}`);
        }}
        header={{
          breadcrumb: breadcrumb,
        }}
      >
        <div className={styles.main}>
          <GridContent>
            <Card
              className={styles.tabsCard}
              bordered={false}
              title="Submission Refernce Number Configuration"
              extra={
                <Space>
                {!editing
                  ? [
                      <Button icon={<EditOutlined />} onClick={editHandler}>
                        Edit
                      </Button>,
                    ]
                  : [
                      <Button onClick={cancelHandler}>Cancel</Button>,
                      <Button type="primary" onClick={saveHandler}>
                        Save
                      </Button>,
                    ]
                }
                </Space>
              }
            >
              {!editing ? (
                <div style={{ borderStyle: 'solid', borderWidth: '1px', padding: '8px' }}>
                  {refStructure.map((item, index) => structureBlock(item, 'preview'))}
                </div>
              ) : (
                <>
                  <Row>
                    <Col span={4} />
                    <Col span={8}>
                      <Card
                        className={styles.tabsCard}
                        //bordered={false}
                        title="Blocks"
                      >
                        {Object.keys(STRUCTURE_TYPE).map((item, index) =>
                          structureBlock(item, 'addable', addBlockCallback),
                        )}
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card
                        className={styles.tabsCard}
                        //bordered={false}
                        title="Configured Submission Reference Number"
                      >
                        <DndProvider backend={HTML5Backend}>
                          <SortableBlockPanel
                            editing
                            dataSource={refStructure}
                            setDataSource={setRefStructure}
                          />
                        </DndProvider>
                      </Card>
                    </Col>
                    <Col span={4} />
                  </Row>
                </>
              )}
            </Card>
          </GridContent>
        </div>
      </PageContainer>
    </>
  );
};

export default Advanced;
