import { EditOutlined, FilePdfOutlined } from '@ant-design/icons';
import TabPane from '@ant-design/pro-card/lib/components/TabPane';
import { Space, Row, Col, Button, Tabs } from 'antd';
import { useState } from 'react';
import icon1 from './icon1.png';
import icon2 from './icon2.png';
import icon3 from './icon3.png';

const VersionIcon = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.08695 11.9712L12.3172 7.89773L13.4739 8.79901L7.08695 13.7667L0.699951 8.79901L1.84961 7.90483L7.08695 11.9712ZM7.08695 10.1687L0.699951 5.201L7.08695 0.233337L13.4739 5.201L7.08695 10.1687ZM7.08695 2.02879L3.01346 5.201L7.08695 8.37321L11.1604 5.201L7.08695 2.02879Z"
      fill="currentColor"
    />
  </svg>
);
const TabContent = () => {
  return (
    <>
      <div className="blue-heading mb">Entity Logo and Headers</div>
      <Space className="logo-row" size="middle">
        <div className="card2">
          <img src={icon1}></img>
        </div>
        <div className="card2">
          <img src={icon2}></img>
        </div>
        <div className="card2 center-card">
          <div className="card2">Contract No. : DL-11:YTM</div>
          <div className="card2">
            Tai Kok Tsui - NPS. 5-13 Ash Street Proposed Composte Developement{' '}
          </div>
        </div>
        <div className="card2">
          <img src={icon3}></img>
        </div>
        <div className="card2 center-card">
          <div className="card2">Form Control</div>
          <div className="card2"></div>
        </div>
      </Space>
      <div className="mb blue-heading">Salutation</div>
      <div className="mb-2">
        <b>To: </b>Architectural Team Lead
      </div>
      <div className="mb blue-heading">Title</div>
      <div className="mb-2">
        <b>Title of Submission: </b>Method Statement for Steel Fabric Mesh
      </div>
      <div className="mb blue-heading">Reference</div>
      <table className="mb-2">
        <tbody>
          <tr>
            <td>
              <b>Drawing Reference</b>
            </td>
            <td>Excellent Drawing</td>
          </tr>
          <tr>
            <td>
              <b>Submission Master Ref:</b>
            </td>
            <td>Excellent Drawing</td>
          </tr>
          <tr>
            <td>
              <b>BD Reference:</b>
            </td>
            <td>Excellent Drawing</td>
          </tr>
        </tbody>
      </table>
      <div className="mb blue-heading">Description of Content</div>
      <div className="mb">
        Please review the content and make approval as it is close to deadline now.
      </div>
      <table className="mb-2">
        <tbody>
          <tr>
            <td>
              <b>Description of Contents:</b>
            </td>
            <td>AC Shop Drawing - MVAC Installation - Typical Floor Layout Plan</td>
          </tr>
          <tr>
            <td>
              <b>Drawing No:</b>
            </td>
            <td>BS/MIC/AC/101</td>
          </tr>
          <tr>
            <td>
              <b>Brand Name:</b>
            </td>
            <td>Asahi</td>
          </tr>
          <tr>
            <td>
              <b>Model No:</b>
            </td>
            <td>Refer to attachement</td>
          </tr>
        </tbody>
      </table>
      <div className="mb blue-heading">About this Submission</div>

      <div>
        <b>Purpose Of Submission: </b>Architectural Team Lead
      </div>
      <br />
      <div>
        <b>Purpose Of Submission: </b>Architectural Team Lead
      </div>
      <br />
      <div>
        <b>Purpose Of Submission: </b>Architectural Team Lead
      </div>
    </>
  );
};
const Overview = () => {
  const [tabKey, setTabKey] = useState('1');
  return (
    <div className="overview card">
      <Tabs
        defaultActiveKey="1"
        activeKey={tabKey}
        onChange={(k) => setTabKey(k)}
        type="card"
        tabBarExtraContent={{
          left: (
            <div className="blue-heading" style={{ marginRight: '1rem' }}>
              Submission Package
            </div>
          ),
          right: (
            <Space size={'small'}>
              <Button type="primary">
                {/* <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1895_8223)">
                    <path
                      d="M3.72306 2.24153C3.64163 2.48599 3.6006 2.7404 3.60007 2.99496C3.60059 2.74018 3.64167 2.48556 3.72322 2.2409C3.88251 1.76303 4.18812 1.3474 4.59676 1.05287C5.00539 0.758337 5.49634 0.599847 6.00006 0.599847C6.50378 0.599847 6.99473 0.758337 7.40337 1.05287C7.812 1.3474 8.11761 1.76303 8.2769 2.2409C8.34692 2.45096 8.38711 2.66837 8.3974 2.88691C8.38711 2.66859 8.34697 2.4514 8.27706 2.24153C8.11784 1.76354 7.81224 1.34778 7.40357 1.05316C6.99489 0.758541 6.50387 0.599998 6.00006 0.599998C5.49626 0.599998 5.00523 0.758541 4.59655 1.05316C4.18788 1.34778 3.88228 1.76354 3.72306 2.24153ZM0.600061 10.7998V11.3998V9.59985V10.7998Z"
                      fill="#464646"
                      stroke="white"
                      stroke-width="1.2"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1895_8223">
                      <rect width="12" height="12" fill="white" />
                    </clipPath>
                  </defs>
                </svg> */}
                Submit for Internal Circulation
              </Button>
              <Button>
                <FilePdfOutlined></FilePdfOutlined>
                Preview C.03 PDF
              </Button>
              <Button>
                <EditOutlined></EditOutlined>
                Preview C.03 PDF
              </Button>
            </Space>
          ),
        }}
      >
        <TabPane tab={<div className="tab">{VersionIcon}C.03</div>} key="1">
          <TabContent></TabContent>
        </TabPane>
        <TabPane tab={<div className="tab">{VersionIcon}B.02</div>} key="2">
          <TabContent></TabContent>
        </TabPane>
        <TabPane tab={<div className="tab">{VersionIcon}A.01</div>} key="3">
          <TabContent></TabContent>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Overview;
