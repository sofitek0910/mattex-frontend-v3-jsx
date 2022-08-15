import { Progress, TinyArea, TinyColumn } from '@ant-design/charts';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Row, Tooltip } from 'antd';
import numeral from 'numeral';
import styles from '../style.less';
import { ChartCard, Field } from './Charts';
import Trend from './Trend';
import Yuan from './../utils/Yuan';
const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: {
    marginBottom: 24,
  },
};

const IntroduceRow = ({ loading, visitData }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="total sales"
        action={
          <Tooltip title="index description">
            <InfoCircleOutlined />
          </Tooltip>
        }
        loading={loading}
        total={() => <Yuan>126560</Yuan>}
        footer={<Field label="daily sales" value={`￥${numeral(12423).format('0,0')}`} />}
        contentHeight={46}
      >
        <Trend
          flag="up"
          style={{
            marginRight: 16,
          }}
        >
          wekkly ratio
          <span className={styles.trendText}>12%</span>
        </Trend>
        <Trend flag="down">
          daily ratio
          <span className={styles.trendText}>11%</span>
        </Trend>
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="visitors"
        action={
          <Tooltip title="index description">
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={numeral(8846).format('0,0')}
        footer={<Field label="daily visitors" value={numeral(1234).format('0,0')} />}
        contentHeight={46}
      >
        <TinyArea
          color="#975FE4"
          xField="x"
          height={46}
          forceFit
          yField="y"
          smooth
          data={visitData}
        />
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="number of payments"
        action={
          <Tooltip title="index description">
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={numeral(6560).format('0,0')}
        footer={<Field label="convertion rate" value="60%" />}
        contentHeight={46}
      >
        <TinyColumn xField="x" height={46} forceFit yField="y" data={visitData} />
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        loading={loading}
        bordered={false}
        title="evetn effect"
        action={
          <Tooltip title="index description">
            <InfoCircleOutlined />
          </Tooltip>
        }
        total="78%"
        footer={
          <div
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            <Trend
              flag="up"
              style={{
                marginRight: 16,
              }}
            >
              weekly ratio
              <span className={styles.trendText}>12%</span>
            </Trend>
            <Trend flag="down">
              daily ratio
              <span className={styles.trendText}>11%</span>
            </Trend>
          </div>
        }
        contentHeight={46}
      >
        <Progress
          height={46}
          percent={0.78}
          color="#13C2C2"
          forceFit
          size={8}
          marker={[
            {
              value: 0.8,
              style: {
                stroke: '#13C2C2',
              },
            },
          ]}
        />
      </ChartCard>
    </Col>
  </Row>
);

export default IntroduceRow;
