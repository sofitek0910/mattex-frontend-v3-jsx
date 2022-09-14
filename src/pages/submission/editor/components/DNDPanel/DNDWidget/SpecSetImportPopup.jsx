import { Input, Modal, Skeleton, List, Divider, Button, Row, Col, Space } from 'antd';
import { useEffect, useState } from 'react';
import { RightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';

const { Search } = Input;

//example data copy from api
const exampleData = [
  {
    id: 3,
    name: 'Specification set for material-1',
    spec_set: {
      set: ['color', 'brand', 'size'],
    },
    description: 'Specification set to be used with material type',
    created_at: '2022-09-02T04:11:38.131729Z',
    updated_at: '2022-09-02T04:11:38.131759Z',
    creator: {
      id: 2,
      password:
        'pbkdf2_sha256$320000$GWkV0PCECSRkdUbXUQ17A3$oUMKcasvcAUu3+bD90z1fNlqpAFw4IzwkNdT0Kaol3A=',
      last_login: '2022-08-29T08:14:03.108940Z',
      is_superuser: false,
      username: 'contractor-a@mattex.com',
      first_name: '',
      last_name: '',
      is_staff: false,
      is_active: true,
      date_joined: '2022-08-18T09:10:10.375315Z',
      email: 'contractor-a@mattex.com',
      emat_user_id: 8969,
      name: 'Contactor A User',
      title: 'mr',
      job_title: 'Site Admin',
      initials: 'CA',
      status: 1,
      emat_status: 1,
      signature:
        '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',
      signature_short:
        'iVBORw0KGgoAAAANSUhEUgAAABgAAAApCAYAAAAvUenwAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAAKQAAAAB+dOSbAAAC1UlEQVRIDbVWS2sUQRCuqpnNmNU8jIoEVIIRhQT0EAW9xYOC4tEcchX/gnjd3+BNwaMg8eJBI6hgLt5M8GCOKkLwGTAPd5Mdd7usmp2abZJLZnZs6P2+/nbqq35Mdw+AlJm5uUCr8rILQY3p+6djj7UqLyOB32GamXiCYnpTa8p7y7Gjw+G3j6ODqCmkKBf4nTQK/kzDArUh0g7D1OhiQJGr9JmXz03Li1vQX7WYgU0YohjibN59bg/lRRp0fy0m5iYRE26b4HPT8mK00czextDRIU3QbyY+Ny0vxtW+oxbDzCcoYDxlgs9Ny4shtpzEtLQK+xIC0jAwd3yU91palWFACNUmgMARs8tW3edF88hWvWGxTG6cwoA+m+Bz0/IiMoxZTACuTu2WGzLB56blRQY+bTGOgzo5okuZ4HHT8iOOW0wIbp2QnR4PSfG5aQVwNItpNldkF6O+VmnxuWnFcaF2eVsT/Opa+Lyr9sIkgfvaNfB5Vy3ImhpHAcYLgg2tKRfae5Eb4JG6hO1W0JYtl2y2hPfunTjIOTSvRA67yhnz9LlpeRERX0nv3zea0QuNJWDYykx8nol7J9fuzUfS8ytysh1YrJ3XaQfCwE46eZ88vnfb7pObjZELaeugqUTooqzhcdPyIEF7On3+p8WFEQ4sNaD+UAXl9kcRZMBZjZOPiA8WH768c64ujdsm9IgTnXh8bj7ZhW9CUZysLWdfJ31ceWo+pSUYqa5np/Lru1MbpScAx9c7prwqi5DewboPyiqIZ1OrB75leQkYjqsxOXjmJ0huf18ozBGW5FT4sRoPL/oepYxg6v67ipjPImB1uTYZl55g39r2STEN5cIf882VlzICdJQuMO+a8nISIB7u9BzX/ssIZP7tkz07gyxRKSNg5IvpCP6YsWEpCeQGS9ZAFnnFjA1LSSBmRxJDgrdmbLhr1e2PPCiX1q0209Uq7n+zM+4fyc7iE6plnNwAAAAASUVORK5CYII=',
      emat_admin: 1,
      avatar: '',
      emat_token:
        'eyJhbGciOiJSUzI1NiIsImtpZCI6IjIwOWJlNmRmLTdlNzYtNDk2NS04OGYxLWE3N2I0NDliNGU0MCIsInR5cCI6IkpXVCJ9.eyJjbGllbnQiOiJleUpqYkdsbGJuUmZhV1FpT2pJc0ltUnZiV0ZwYmlJNkltaDBkSEJ6T2k4dmMyRnVaR0p2ZUMxamFIVnVkMjh1YldGMGRHVjRMbU52YlM1b2F5SXNJbWRoZEdWM1lYa2lPaUpvZEhSd2N6b3ZMMkZ3YVM1ellXNWtZbTk0TFdOb2RXNTNieTV0WVhSMFpYZ3VZMjl0TG1ockluMD0iLCJjb250cmFjdG9yX2lkIjoyLCJleHAiOjE2NjIxMTM4NjcsImlhdCI6MTY2MjA5MjI2NywiaXNzIjoiaHR0cHM6Ly9zYW5kYm94LWVtYXQubWF0dGV4LmNvbS5oayIsInJvb3RfaWF0IjoxNjYyMDkyMjY3LCJzY3AiOlsic2hvd19wcmljZSIsImNhbmNlbF9nciIsInBlcmZvcm1fcHVyY2hhc2VfcmVxdWVzdCIsInBlcmZvcm1fcmVjb25jaWxpYXRpb24iLCJ2aWV3X3ByZV9hcHByb3ZlZF9wcm9kdWN0cyIsInZpZXdfcHVyY2hhc2Vfb3JkZXIiLCJjcmVhdGVfYW5kX2VkaXRfZG8iLCJjcmVhdGVfYW5kX2VkaXRfZ3IiLCJyZXBvcnRzX2RlbGl2ZXJ5IiwiYWNjZXNzX3NtbSIsInZpZXdfYXdhaXRpbmdfYXBwcm92YWxfZGFzaGJvYXJkIiwidmlld19hd2FpdGluZ19zaXRlX3Byb2Nlc3NfZGFzaGJvYXJkIl0sInN1YiI6ImNvbnRyYWN0b3ItYUBtYXR0ZXguY29tIiwidHlwZSI6ImlkcCIsInVpZCI6ODk2OX0.TPMMV3ECvAU7AufN-BnjXjOaWMLgKH6Lsibsnm1UTiAtVIN3AX8XY3g70lb5ajEbu3W0QcYWk9OPvT9vFrTiQP8NBug9cFA7_BHkjm5V0SfmIHMCU2VSC8eEmvuNN6cqlrvzoOnbqT7kGv_ehr8IyO1fz7B17BFUPoeiM0eYlgZyc3FUkFd6UYUo_NdClAKmq7ucbpyuC7-vIA7hxCBQnkQY2F79XUgzjOQVR0O_1HeWeIOq9rUvNFH2d-rS4EBcoC4bOwLRgKJcjQ9svXneln3fr8_znzZW_0ASn3V_d-w2MCbh5oH0zcRQVFlCuhvA902VigGjNHFRTTVSf3yUIw',
      groups: [],
      user_permissions: [],
    },
  },
  {
    id: 4,
    name: 'Specification set for material-2',
    spec_set: {
      set: ['a', 'b', 'c'],
    },
    description: 'Specification set to be used with material type',
    created_at: '2022-09-02T04:11:38.131729Z',
    updated_at: '2022-09-02T04:11:38.131759Z',
    creator: {
      id: 2,
      password:
        'pbkdf2_sha256$320000$GWkV0PCECSRkdUbXUQ17A3$oUMKcasvcAUu3+bD90z1fNlqpAFw4IzwkNdT0Kaol3A=',
      last_login: '2022-08-29T08:14:03.108940Z',
      is_superuser: false,
      username: 'contractor-a@mattex.com',
      first_name: '',
      last_name: '',
      is_staff: false,
      is_active: true,
      date_joined: '2022-08-18T09:10:10.375315Z',
      email: 'contractor-a@mattex.com',
      emat_user_id: 8969,
      name: 'Contactor A User',
      title: 'mr',
      job_title: 'Site Admin',
      initials: 'CA',
      status: 1,
      emat_status: 1,
      signature:
        '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',
      signature_short:
        'iVBORw0KGgoAAAANSUhEUgAAABgAAAApCAYAAAAvUenwAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAAKQAAAAB+dOSbAAAC1UlEQVRIDbVWS2sUQRCuqpnNmNU8jIoEVIIRhQT0EAW9xYOC4tEcchX/gnjd3+BNwaMg8eJBI6hgLt5M8GCOKkLwGTAPd5Mdd7usmp2abZJLZnZs6P2+/nbqq35Mdw+AlJm5uUCr8rILQY3p+6djj7UqLyOB32GamXiCYnpTa8p7y7Gjw+G3j6ODqCmkKBf4nTQK/kzDArUh0g7D1OhiQJGr9JmXz03Li1vQX7WYgU0YohjibN59bg/lRRp0fy0m5iYRE26b4HPT8mK00czextDRIU3QbyY+Ny0vxtW+oxbDzCcoYDxlgs9Ny4shtpzEtLQK+xIC0jAwd3yU91palWFACNUmgMARs8tW3edF88hWvWGxTG6cwoA+m+Bz0/IiMoxZTACuTu2WGzLB56blRQY+bTGOgzo5okuZ4HHT8iOOW0wIbp2QnR4PSfG5aQVwNItpNldkF6O+VmnxuWnFcaF2eVsT/Opa+Lyr9sIkgfvaNfB5Vy3ImhpHAcYLgg2tKRfae5Eb4JG6hO1W0JYtl2y2hPfunTjIOTSvRA67yhnz9LlpeRERX0nv3zea0QuNJWDYykx8nol7J9fuzUfS8ytysh1YrJ3XaQfCwE46eZ88vnfb7pObjZELaeugqUTooqzhcdPyIEF7On3+p8WFEQ4sNaD+UAXl9kcRZMBZjZOPiA8WH768c64ujdsm9IgTnXh8bj7ZhW9CUZysLWdfJ31ceWo+pSUYqa5np/Lru1MbpScAx9c7prwqi5DewboPyiqIZ1OrB75leQkYjqsxOXjmJ0huf18ozBGW5FT4sRoPL/oepYxg6v67ipjPImB1uTYZl55g39r2STEN5cIf882VlzICdJQuMO+a8nISIB7u9BzX/ssIZP7tkz07gyxRKSNg5IvpCP6YsWEpCeQGS9ZAFnnFjA1LSSBmRxJDgrdmbLhr1e2PPCiX1q0209Uq7n+zM+4fyc7iE6plnNwAAAAASUVORK5CYII=',
      emat_admin: 1,
      avatar: '',
      emat_token:
        'eyJhbGciOiJSUzI1NiIsImtpZCI6IjIwOWJlNmRmLTdlNzYtNDk2NS04OGYxLWE3N2I0NDliNGU0MCIsInR5cCI6IkpXVCJ9.eyJjbGllbnQiOiJleUpqYkdsbGJuUmZhV1FpT2pJc0ltUnZiV0ZwYmlJNkltaDBkSEJ6T2k4dmMyRnVaR0p2ZUMxamFIVnVkMjh1YldGMGRHVjRMbU52YlM1b2F5SXNJbWRoZEdWM1lYa2lPaUpvZEhSd2N6b3ZMMkZ3YVM1ellXNWtZbTk0TFdOb2RXNTNieTV0WVhSMFpYZ3VZMjl0TG1ockluMD0iLCJjb250cmFjdG9yX2lkIjoyLCJleHAiOjE2NjIxMTM4NjcsImlhdCI6MTY2MjA5MjI2NywiaXNzIjoiaHR0cHM6Ly9zYW5kYm94LWVtYXQubWF0dGV4LmNvbS5oayIsInJvb3RfaWF0IjoxNjYyMDkyMjY3LCJzY3AiOlsic2hvd19wcmljZSIsImNhbmNlbF9nciIsInBlcmZvcm1fcHVyY2hhc2VfcmVxdWVzdCIsInBlcmZvcm1fcmVjb25jaWxpYXRpb24iLCJ2aWV3X3ByZV9hcHByb3ZlZF9wcm9kdWN0cyIsInZpZXdfcHVyY2hhc2Vfb3JkZXIiLCJjcmVhdGVfYW5kX2VkaXRfZG8iLCJjcmVhdGVfYW5kX2VkaXRfZ3IiLCJyZXBvcnRzX2RlbGl2ZXJ5IiwiYWNjZXNzX3NtbSIsInZpZXdfYXdhaXRpbmdfYXBwcm92YWxfZGFzaGJvYXJkIiwidmlld19hd2FpdGluZ19zaXRlX3Byb2Nlc3NfZGFzaGJvYXJkIl0sInN1YiI6ImNvbnRyYWN0b3ItYUBtYXR0ZXguY29tIiwidHlwZSI6ImlkcCIsInVpZCI6ODk2OX0.TPMMV3ECvAU7AufN-BnjXjOaWMLgKH6Lsibsnm1UTiAtVIN3AX8XY3g70lb5ajEbu3W0QcYWk9OPvT9vFrTiQP8NBug9cFA7_BHkjm5V0SfmIHMCU2VSC8eEmvuNN6cqlrvzoOnbqT7kGv_ehr8IyO1fz7B17BFUPoeiM0eYlgZyc3FUkFd6UYUo_NdClAKmq7ucbpyuC7-vIA7hxCBQnkQY2F79XUgzjOQVR0O_1HeWeIOq9rUvNFH2d-rS4EBcoC4bOwLRgKJcjQ9svXneln3fr8_znzZW_0ASn3V_d-w2MCbh5oH0zcRQVFlCuhvA902VigGjNHFRTTVSf3yUIw',
      groups: [],
      user_permissions: [],
    },
  },
];

//generate bunch of dummy test data
let dummySet = [];
for (let i = 0; i < 20; i++) {
  dummySet.push(String.fromCharCode(65 + i));
}
let dummyData = [];
for (let i = 0; i < 70; i++) {
  dummyData[i] = {
    id: i + 5,
    name: i.toString(),
    spec_set: {
      set: dummySet.map((key) => i.toString() + key),
    },
  };
}

const SpecSetImportPopup = ({ isModalVisible, setIsModalVisible, setSpecSet }) => {
  //const data = DATA_FROM_API
  const data = exampleData.concat(dummyData);
  const [showData, setShowData] = useState(data);
  const [previewState, setPreviewState] = useState(false);
  const [selectedSetIndex, setSelectedSetIndex] = useState(-1);
  const [searchField, setSearchField] = useState('');

  const cancelHandler = () => {
    setIsModalVisible(false);
    setPreviewState(false);
    setSelectedSetIndex(-1);
    setSearchField('');
    setShowData(data);
  };

  const searchHandler = () => {
    if (searchField === '') {
      setShowData(data);
    } else {
      setShowData(
        data.filter((item) => item.name.toLowerCase().includes(searchField.toLowerCase())),
      );
    }
  };

  const setSelectHandler = (index) => {
    setPreviewState(true);
    setSelectedSetIndex(index);
    console.log('set', showData[index].spec_set.set);
  };

  const returnHandler = () => {
    setPreviewState(false);
    setSelectedSetIndex(-1);
  };

  const importHandler = () => {
    const tempArr = data[selectedSetIndex].spec_set.set.map((key) => ({
      key: key,
      value: '',
    }));
    setSpecSet(tempArr);
    setIsModalVisible(false);
    setPreviewState(false);
    setSelectedSetIndex(-1);
    setSearchField('');
    setShowData(data);
  };

  return (
    <Modal
      title={
        <Space>
          {previewState ? (
            <>
              <ArrowLeftOutlined onClick={returnHandler} />
              {data[selectedSetIndex].name}
            </>
          ) : (
            'Specification Sets'
          )}
        </Space>
      }
      visible={isModalVisible}
      footer={
        previewState ? (
          <>
            <Button key="back" onClick={returnHandler}>
              Return
            </Button>
            <Button key="submit" type="primary" onClick={importHandler}>
              Import This Template
            </Button>
          </>
        ) : null
      }
      onCancel={cancelHandler}
    >
      {previewState ? (
        <></>
      ) : (
        //search bar for searching set name
        //AutoComplete?
        <Search
          placeholder="input search text"
          allowClear
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          onSearch={searchHandler}
        />
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
          dataLength={data.length}
          //next={loadMoreData}
          // hasMore={data.length < 50}
          // loader={
          // <Skeleton
          //     paragraph={{
          //     rows: 1,
          //     }}
          //     active
          // />
          // }
          //endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          {previewState ? (
            //selected set to preview
            <List
              dataSource={showData[selectedSetIndex].spec_set.set}
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
                      placeholder="-"
                      disabled
                    />
                  </Input.Group>
                </List.Item>
              )}
            />
          ) : (
            //show list of set
            <List
              dataSource={showData}
              renderItem={(item, index) => (
                <List.Item key={index} style={{ padding: '2px 0' }}>
                  <Button
                    ghost
                    style={{ width: '100%', padding: 0, color: 'gray' }}
                    onClick={() => {
                      setSelectHandler(index);
                    }}
                  >
                    <Row>
                      <Col span={2} style={{ fontSize: '12px', padding: '2px 0 0 0' }}>
                        {item.id}
                      </Col>
                      <Col span={20} style={{ textAlign: 'left' }}>
                        {item.name}
                      </Col>
                      <Col span={2}>
                        <RightOutlined />
                      </Col>
                    </Row>
                  </Button>
                </List.Item>
              )}
            />
          )}
        </InfiniteScroll>
      </div>
    </Modal>
  );
};

export default SpecSetImportPopup;
