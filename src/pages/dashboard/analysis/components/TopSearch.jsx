import { TinyArea } from '@ant-design/charts';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Card, Col, Row, Table, Tooltip } from 'antd';
import styles from '../style.less';
import NumberInfo from './NumberInfo';
import Trend from './Trend';
import numeral from 'numeral';

const columns = [
  {
    title: 'ranking',
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: 'keywords',
    dataIndex: 'keyword',
    key: 'keyword',
    render: (text) => <a href="/">{text}</a>,
  },
  {
    title: 'user count',
    dataIndex: 'count',
    key: 'count',
    sorter: (a, b) => a.count - b.count,
    className: styles.alignRight,
  },
  {
    title: 'weekly increaing range',
    dataIndex: 'range',
    key: 'range',
    sorter: (a, b) => a.range - b.range,
    render: (text, record) => (
      <Trend flag={record.status === 1 ? 'down' : 'up'}>
        <span
          style={{
            marginRight: 4,
          }}
        >
          {text}%
        </span>
      </Trend>
    ),
  },
];

const TopSearch = ({ loading, visitData2, searchData, dropdownGroup }) => (
  <Card
    loading={loading}
    bordered={false}
    title="hot keywords"
    extra={dropdownGroup}
    style={{
      height: '100%',
    }}
  >
    <Row gutter={68}>
      <Col
        sm={12}
        xs={24}
        style={{
          marginBottom: 24,
        }}
      >
        <NumberInfo
          subTitle={
            <span>
              searching user count
              <Tooltip title="index description">
                <InfoCircleOutlined
                  style={{
                    marginLeft: 8,
                  }}
                />
              </Tooltip>
            </span>
          }
          gap={8}
          total={numeral(12321).format('0,0')}
          status="up"
          subTotal={17.1}
        />
        <TinyArea xField="x" height={45} forceFit yField="y" smooth data={visitData2} />
      </Col>
      <Col
        sm={12}
        xs={24}
        style={{
          marginBottom: 24,
        }}
      >
        <NumberInfo
          subTitle={
            <span>
              average searching frequency
              <Tooltip title="index description">
                <InfoCircleOutlined
                  style={{
                    marginLeft: 8,
                  }}
                />
              </Tooltip>
            </span>
          }
          total={2.7}
          status="down"
          subTotal={26.2}
          gap={8}
        />
        <TinyArea xField="x" height={45} forceFit yField="y" smooth data={visitData2} />
      </Col>
    </Row>
    <Table
      rowKey={(record) => record.index}
      size="small"
      columns={columns}
      dataSource={searchData}
      pagination={{
        style: {
          marginBottom: 0,
        },
        pageSize: 5,
      }}
    />
  </Card>
);

export default TopSearch;
