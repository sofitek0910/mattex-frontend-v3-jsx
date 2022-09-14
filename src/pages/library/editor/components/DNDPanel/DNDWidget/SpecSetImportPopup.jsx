import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRequest } from 'ahooks';

import { RightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Input, Modal, List, Button, Row, Col, Space } from 'antd';

const { Search } = Input;

import { getLibrarySetList } from '@/services/swagger/library'

const SpecSetImportPopup = ({ isModalVisible, setIsModalVisible, setSpecSet }) => {

  const [showData, setShowData] = useState([])
  const [previewState, setPreviewState] = useState(false)
  const [selectedSetId, setSelectedSetId] = useState(-1)
  const [searchField, setSearchField] = useState('')

  const { run: fetchSpecSet, loading } = useRequest(() => getLibrarySetList(
    {
      startswith: searchField
    }
  ), {
    manual: true,
    onSuccess: (res) => {
      setShowData(res.map((cell) => ({
        id: cell.id,
        name: cell.name,
        spec_set: cell.spec_set
      })))
    }
  })

  const cancelHandler = () => {
    setIsModalVisible(false)
    setPreviewState(false)
    setSelectedSetId(-1)
    setSearchField('')
  }

  const setSelectHandler = (id) => {
    setPreviewState(true)
    setSelectedSetId(id)
  }

  const returnHandler = () => {
    setPreviewState(false)
    setSelectedSetId(-1)
  }

  const importHandler = () => {
    const tempArr = showData.find((cell) => cell.id === selectedSetId).spec_set.set.map(
      key => ({
        'key': key,
        'value': ''
      })
    )
    setSpecSet(tempArr)
    setIsModalVisible(false)
    setPreviewState(false)
    setSelectedSetId(-1)
    setSearchField('')
  }

  useEffect(() => {
    fetchSpecSet()
  }, [])

  return (
    <Modal
      title={
        <Space>
          {previewState ?
            <>
              <ArrowLeftOutlined onClick={returnHandler} />
              {showData.find((cell) => cell.id === selectedSetId).name}
            </>
            : 'Specification Sets'}
        </Space>
      }
      visible={isModalVisible}
      footer={previewState ? (
        <>
          <Button key="back" onClick={returnHandler}>
            Return
          </Button>
          <Button key="submit" type="primary" onClick={importHandler}>
            Import This Template
          </Button>
        </>
      ) : null}
      onCancel={cancelHandler}
    >
      {previewState ? (<></>) : (
        //search bar for searching set name
        //AutoComplete?
        <Search
          placeholder="input search text"
          allowClear
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          onSearch={fetchSpecSet} />
      )}
      <div
        id="scrollableDiv"
        style={{
          height: 400,
          overflow: 'auto',
          padding: '0 16px',
          border: '1px solid rgba(140, 140, 140, 0.35)',
        }}
      >
        <InfiniteScroll
          dataLength={showData.length}
          scrollableTarget="scrollableDiv"
        >
          {previewState ? (
            //selected set to preview
            <List
              dataSource={showData.find((cell) => cell.id === selectedSetId).spec_set.set}
              renderItem={(item, index) => (
                <List.Item key={index} style={{ padding: '2px 0' }}>
                  <Input.Group
                    compact
                    style={{
                      margin: '4px 0px',
                      display: 'flex',
                      minHeight: '34px',
                    }}
                  >
                    <div
                      style={{
                        width: '40%',
                        backgroundColor: '#EAF4FF',
                        padding: '6px 12px',
                        borderRadius: '3px 0 0 3px',
                      }}
                    >
                      {item}
                    </div>

                    <Input
                      style={{
                        width: '60%',
                        borderRadius: '0 3px 3px 0',
                        border: '2px solid #EAF4FF',
                      }}
                      placeholder='-'
                      disabled
                    />
                  </Input.Group>
                </List.Item>
              )}
            />
          ) : (
            //show list of set
            <List
              loading={loading}
              dataSource={showData}
              renderItem={(item, index) => (
                <List.Item key={index} style={{ padding: '2px 0' }}>
                  <Button ghost style={{ width: '100%', padding: 0, color: 'gray' }} onClick={() => { setSelectHandler(item.id) }}>
                    <Row>
                      <Col span={2} style={{ fontSize: '12px', padding: '2px 0 0 0' }}>{item.id}</Col>
                      <Col span={20} style={{ textAlign: 'left' }}>{item.name}</Col>
                      <Col span={2}><RightOutlined /></Col>
                    </Row>
                  </Button>
                </List.Item>
              )}
            />
          )}
        </InfiniteScroll>
      </div>
    </Modal>
  )
}

export default SpecSetImportPopup
