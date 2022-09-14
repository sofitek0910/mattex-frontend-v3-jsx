import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { history } from 'umi';

import { PageContainer } from '@ant-design/pro-layout';
import { Card, Typography, Button } from 'antd';

import SortableInputField from './components/SortableInputField';

import { createLibrarySet } from '@/services/swagger/library'

const data = [
  { label: 'New Title', value: '' }
]

const Basic = () => {
  const [dataSource, setDataSource] = useState(data);
  const search = useLocation().search;
  const title = new URLSearchParams(search).get('title');
  const description = new URLSearchParams(search).get('description');

  const [isLoading, setIsLoading] = useState(false)

  const saveHandler = () => {
    setIsLoading(true)
    const postBody = {
      name: title,
      description: description,
      "spec_set": {
        "set": dataSource.map((cell) => cell.label)
      }
    }
    createLibrarySet(postBody).then(() => {
      history.push(`/library/directory`)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <PageContainer
      header={{
        onBack: () => { },
        title: (
          <>
            <div>{title}</div>
            <Typography.Text style={{ width: 900, fontSize: '12px' }} ellipsis>
              {description ? description : 'No Description'}
            </Typography.Text>
          </>
        ),
        extra: [
          <Button key="1" type="primary" onClick={saveHandler} loading={isLoading}>
            Save Set
          </Button>,
        ],
      }}
    >
      <Card bordered={false}>
        <DndProvider backend={HTML5Backend}>
          <SortableInputField editing dataSource={dataSource} setDataSource={setDataSource} />
        </DndProvider>
      </Card>
    </PageContainer>
  );
};

export default Basic;
