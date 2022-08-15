import ProForm, { ProFormDigit, ProFormSelect, ProFormText, StepsForm } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Alert, Button, Card, Descriptions, Divider, Result, Statistic } from 'antd';
import { useRef, useState } from 'react';
import styles from './style.less';

const StepDescriptions = ({ stepData, bordered }) => {
  const { payAccount, receiverAccount, receiverName, amount } = stepData;
  return (
    <Descriptions column={1} bordered={bordered}>
      <Descriptions.Item label="payment account"> {payAccount}</Descriptions.Item>
      <Descriptions.Item label="reciever account"> {receiverAccount}</Descriptions.Item>
      <Descriptions.Item label="recieve name"> {receiverName}</Descriptions.Item>
      <Descriptions.Item label="transaction amount">
        <Statistic
          value={amount}
          suffix={
            <span
              style={{
                fontSize: 14,
              }}
            >
              dollar
            </span>
          }
          precision={2}
        />
      </Descriptions.Item>
    </Descriptions>
  );
};

const StepResult = (props) => {
  return (
    <Result
      status="success"
      title="success"
      subTitle="reciever will recieve amount within 2 hours"
      extra={
        <>
          <Button type="primary" onClick={props.onFinish}>
            do another transaction
          </Button>
          <Button>view your bill</Button>
        </>
      }
      className={styles.result}
    >
      {props.children}
    </Result>
  );
};

const StepForm = () => {
  const [stepData, setStepData] = useState({
    payAccount: 'ant-design@alipay.com',
    receiverAccount: 'test@example.com',
    receiverName: 'Alex',
    amount: '500',
    receiverMode: 'alipay',
  });
  const [current, setCurrent] = useState(0);
  const formRef = useRef();
  return (
    <PageContainer content="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。">
      <Card bordered={false}>
        <StepsForm
          current={current}
          onCurrentChange={setCurrent}
          submitter={{
            render: (props, dom) => {
              if (props.step === 2) {
                return null;
              }

              return dom;
            },
          }}
        >
          <StepsForm.StepForm
            formRef={formRef}
            title="enter transaction message"
            initialValues={stepData}
            onFinish={async (values) => {
              setStepData(values);
              return true;
            }}
          >
            <ProFormSelect
              label="payment account"
              width="md"
              name="payAccount"
              rules={[
                {
                  required: true,
                  message: 'please select payment account',
                },
              ]}
              valueEnum={{
                'ant-design@alipay.com': 'ant-design@alipay.com',
              }}
            />

            <ProForm.Group title="reciever account" size={8}>
              <ProFormSelect
                name="receiverMode"
                rules={[
                  {
                    required: true,
                    message: 'please enter reciever account',
                  },
                ]}
                valueEnum={{
                  alipay: 'alipay',
                  bank: 'bank account',
                }}
              />
              <ProFormText
                name="receiverAccount"
                rules={[
                  {
                    required: true,
                    message: 'please enter recieve account',
                  },
                  {
                    type: 'email',
                    message: 'username should be in email format',
                  },
                ]}
                placeholder="test@example.com"
              />
            </ProForm.Group>
            <ProFormText
              label="revieve name"
              width="md"
              name="receiverName"
              rules={[
                {
                  required: true,
                  message: 'revieve name',
                },
              ]}
              placeholder="revieve name"
            />
            <ProFormDigit
              label="transaction amount"
              name="amount"
              width="md"
              rules={[
                {
                  required: true,
                  message: 'please enter transaction amount',
                },
                {
                  pattern: /^(\d+)((?:\.\d+)?)$/,
                  message: 'please enter valid amount',
                },
              ]}
              placeholder="please enter anount"
              fieldProps={{
                prefix: '￥',
              }}
            />
          </StepsForm.StepForm>

          <StepsForm.StepForm title="confirm transaction">
            <div className={styles.result}>
              <Alert
                closable
                showIcon
                message="Once confirmed, amount will be transfer to reviever account and not refundable"
                style={{
                  marginBottom: 24,
                }}
              />
              <StepDescriptions stepData={stepData} bordered />
              <Divider
                style={{
                  margin: '24px 0',
                }}
              />
              <ProFormText.Password
                label="payment password"
                width="md"
                name="password"
                required={false}
                rules={[
                  {
                    required: true,
                    message: 'payment password is needed for completeing the payment',
                  },
                ]}
              />
            </div>
          </StepsForm.StepForm>
          <StepsForm.StepForm title="complete">
            <StepResult
              onFinish={async () => {
                setCurrent(0);
                formRef.current?.resetFields();
              }}
            >
              <StepDescriptions stepData={stepData} />
            </StepResult>
          </StepsForm.StepForm>
        </StepsForm>
        <Divider
          style={{
            margin: '40px 0 24px',
          }}
        />
        <div className={styles.desc}>
          <h3>description</h3>
          <h4>transfer to alipay</h4>
          <p>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
          <h4>转账到银行卡</h4>
          <p>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
        </div>
      </Card>
    </PageContainer>
  );
};

export default StepForm;
