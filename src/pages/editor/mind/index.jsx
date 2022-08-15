import { PageContainer } from '@ant-design/pro-layout';
import { Col, Row } from 'antd';
import GGEditor, { Mind } from 'gg-editor';
import { MindContextMenu } from './components/EditorContextMenu';
import { MindDetailPanel } from './components/EditorDetailPanel';
import EditorMinimap from './components/EditorMinimap';
import { MindToolbar } from './components/EditorToolbar';
import styles from './index.less';
import data from './worldCup2018.json';
GGEditor.setTrackable(false);
export default () => (
  <PageContainer content="">
    <GGEditor className={styles.editor}>
      <Row className={styles.editorHd}>
        <Col span={24}>
          <MindToolbar />
        </Col>
      </Row>
      <Row className={styles.editorBd}>
        <Col span={20} className={styles.editorContent}>
          <Mind data={data} className={styles.mind} />
        </Col>
        <Col span={4} className={styles.editorSidebar}>
          <MindDetailPanel />
          <EditorMinimap />
        </Col>
      </Row>
      <MindContextMenu />
    </GGEditor>
  </PageContainer>
);
