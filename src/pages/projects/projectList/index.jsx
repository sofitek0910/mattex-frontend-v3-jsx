import { useState, useEffect } from 'react';
import { useRequest } from 'ahooks';

import { SettingOutlined } from '@ant-design/icons';
import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Row, Space } from 'antd';
import Search from 'antd/lib/input/Search';

import ProjectListTable from './components/ProjectListTable';

import { getProjectList } from '@/services/swagger/projects';
import useException from '@/utils/useException';

import styles from './style.less';

const Advanced = () => {
  const [projects, setProjects] = useState([]);
  const [searchKey, setSearchKey] = useState('');

  const [tabStatus, seTabStatus] = useState({
    tabActiveKey: 'All',
  });

  const onTabChange = (tabActiveKey) => {
    seTabStatus({ ...tabStatus, tabActiveKey });
  };

  const { run, loading } = useRequest(() => getProjectList(), {
    manual: true,
    onSuccess: (res) => {
      setProjects(res.data);
    },
    onError: (err) => {
      console.log(err);
    },
    throwOnError: true,
    onError: useException,
  });

  const extra = [
    <span className={styles.moreInfo}>
      <Row flex="auto" justify="end">
        <Space>
          <Search
            style={{ width: '16.5rem' }}
            placeholder="Search Project"
            onChange={(e) => setSearchKey(e.target.value)}
          ></Search>
          <Button>
            <SettingOutlined></SettingOutlined>
          </Button>
        </Space >
      </Row >
    </span >,
  ];

  useEffect(() => {
    run();
  }, []);

  return (
    <>
      <PageContainer
        title="Projects"
        extra={extra}
        className={styles.pageHeader}
        tabActiveKey={tabStatus.tabActiveKey}
        onTabChange={onTabChange}
        tabList={[
          {
            key: 'All',
            tab: 'All',
          },
          {
            key: 'Active',
            tab: 'Active',
          },
          {
            key: 'Inactive',
            tab: 'Inactive',
          },
        ]}
      >
        <div className={styles.main}>
          <GridContent>
            <Card className={styles.tabsCard} bordered={false} onTabChange={onTabChange}>
              <ProjectListTable
                tab={tabStatus.tabActiveKey}
                projects={projects.filter((project) => project.project_name.includes(searchKey))}
                loading={loading}
              />
            </Card>
          </GridContent>
        </div>
      </PageContainer>
    </>
  );
};

export default Advanced;
