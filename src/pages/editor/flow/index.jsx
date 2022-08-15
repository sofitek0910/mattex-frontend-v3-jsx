import { PageContainer } from '@ant-design/pro-layout';
import { Col, Row } from 'antd';
import GGEditor, { Flow } from 'gg-editor';
import { FlowContextMenu } from './components/EditorContextMenu';
import { FlowDetailPanel } from './components/EditorDetailPanel';
import { FlowItemPanel } from './components/EditorItemPanel';
import EditorMinimap from './components/EditorMinimap';
import { FlowToolbar } from './components/EditorToolbar';
import styles from './index.less';
GGEditor.setTrackable(false);
export default () => (
  <PageContainer content="">
    <GGEditor className={styles.editor}>
      <Row className={styles.editorHd}>
        <Col span={24}>
          <FlowToolbar />
        </Col>
      </Row>
      <Row className={styles.editorBd}>
        <Col span={4} className={styles.editorSidebar}>
          <FlowItemPanel />
        </Col>
        <Col span={16} className={styles.editorContent}>
          <Flow className={styles.flow} />
        </Col>
        <Col span={4} className={styles.editorSidebar}>
          <FlowDetailPanel />
          <EditorMinimap />
        </Col>
      </Row>
      <FlowContextMenu />
    </GGEditor>
  </PageContainer>
);
