import { Button, Col, Input, Row, Space, Tabs } from 'antd';
import Search from 'antd/lib/input/Search';
import { SettingOutlined } from '@ant-design/icons';
import { useState } from 'react';

const Projects = () => {
  const [tab, setTab] = useState(0);
  return (
    <div>
      <Row align="middle">
        <Col flex="none">
          <h1>Projects</h1>
        </Col>
        <Col flex="auto">
          <Row flex="auto" justify="end">
            <Space>
              <Search style={{ width: '16.5rem' }} placeholder="Search Project"></Search>
              <Button>
                <SettingOutlined></SettingOutlined>
              </Button>
            </Space>
          </Row>
        </Col>
      </Row>
      <Tabs></Tabs>
    </div>
  );
};

export default Projects;
