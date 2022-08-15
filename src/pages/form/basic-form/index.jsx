import ProForm, {
  ProFormDateRangePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, message } from 'antd';
import { useRequest } from 'umi';
import { fakeSubmitForm } from './service';
import styles from './style.less';

const BasicForm = () => {
  const { run } = useRequest(fakeSubmitForm, {
    manual: true,
    onSuccess: () => {
      message.success('提交成功');
    },
  });

  const onFinish = async (values) => {
    run(values);
  };

  return (
    <PageContainer content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。">
      <Card bordered={false}>
        <ProForm
          hideRequiredMark
          style={{
            margin: 'auto',
            marginTop: 8,
            maxWidth: 600,
          }}
          name="basic"
          layout="vertical"
          initialValues={{
            public: '1',
          }}
          onFinish={onFinish}
        >
          <ProFormText
            width="md"
            label="title"
            name="title"
            rules={[
              {
                required: true,
                message: 'pleasde enter title',
              },
            ]}
            placeholder="give a title"
          />
          <ProFormDateRangePicker
            label="starting and ending date"
            width="md"
            name="date"
            rules={[
              {
                required: true,
                message: 'please select atarting and ending date',
              },
            ]}
            placeholder={['starting date', 'ending date']}
          />
          <ProFormTextArea
            label="target description"
            width="xl"
            name="goal"
            rules={[
              {
                required: true,
                message: 'please enter target description',
              },
            ]}
            placeholder="please enter your working taret"
          />

          <ProFormTextArea
            label="standard"
            name="standard"
            width="xl"
            rules={[
              {
                required: true,
                message: 'please enter standard',
              },
            ]}
            placeholder="please enter standard"
          />

          <ProFormText
            width="md"
            label={
              <span>
                客户
                <em className={styles.optional}>（选填）</em>
              </span>
            }
            tooltip="client"
            name="client"
            placeholder="please descript your client, for internal client please use @name / worker id"
          />

          <ProFormText
            width="md"
            label={
              <span>
                invite reviewer
                <em className={styles.optional}>（optional）</em>
              </span>
            }
            name="invites"
            placeholder="请直接 @姓名／工号，最多可邀请 5 人"
          />

          <ProFormDigit
            label={
              <span>
                weight
                <em className={styles.optional}>（optional）</em>
              </span>
            }
            name="weight"
            placeholder="please enter"
            min={0}
            max={100}
            width="xs"
            fieldProps={{
              formatter: (value) => `${value || 0}%`,
              parser: (value) => (value ? value.replace('%', '') : '0'),
            }}
          />

          <ProFormRadio.Group
            options={[
              {
                value: '1',
                label: 'public',
              },
              {
                value: '2',
                label: 'partially public',
              },
              {
                value: '3',
                label: 'private',
              },
            ]}
            label="publishing target"
            help="client and reviewer are shared by default"
            name="publicType"
          />
          <ProFormDependency name={['publicType']}>
            {({ publicType }) => {
              return (
                <ProFormSelect
                  width="md"
                  name="publicUsers"
                  fieldProps={{
                    style: {
                      margin: '8px 0',
                      display: publicType && publicType === '2' ? 'block' : 'none',
                    },
                  }}
                  options={[
                    {
                      value: '1',
                      label: 'worker A',
                    },
                    {
                      value: '2',
                      label: 'worker B',
                    },
                    {
                      value: '3',
                      label: 'worker C',
                    },
                  ]}
                />
              );
            }}
          </ProFormDependency>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default BasicForm;
