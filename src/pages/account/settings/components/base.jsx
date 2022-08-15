import { UploadOutlined } from '@ant-design/icons';
import ProForm, {
  ProFormDependency,
  ProFormFieldSet,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { Button, Input, message, Upload } from 'antd';
import { useRequest } from 'umi';
import { queryCity, queryCurrent, queryProvince } from '../service';
import styles from './BaseView.less';

const validatorPhone = (rule, value, callback) => {
  if (!value[0]) {
    callback('Please input your area code!');
  }

  if (!value[1]) {
    callback('Please input your phone number!');
  }

  callback();
}; // icon module

const AvatarView = ({ avatar }) => (
  <>
    <div className={styles.avatar_title}>头像</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          change icon
        </Button>
      </div>
    </Upload>
  </>
);

const BaseView = () => {
  const { data: currentUser, loading } = useRequest(() => {
    return queryCurrent();
  });

  const getAvatarURL = () => {
    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar;
      }

      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }

    return '';
  };

  const handleFinish = async () => {
    message.success('update successfully');
  };

  return (
    <div className={styles.baseView}>
      {loading ? null : (
        <>
          <div className={styles.left}>
            <ProForm
              layout="vertical"
              onFinish={handleFinish}
              submitter={{
                searchConfig: {
                  submitText: 'update basic info',
                },
                render: (_, dom) => dom[1],
              }}
              initialValues={{ ...currentUser, phone: currentUser?.phone.split('-') }}
              hideRequiredMark
            >
              <ProFormText
                width="md"
                name="email"
                label="email"
                rules={[
                  {
                    required: true,
                    message: 'please enter email!',
                  },
                ]}
              />
              <ProFormText
                width="md"
                name="name"
                label="nickname"
                rules={[
                  {
                    required: true,
                    message: 'please enter youtr nickname!',
                  },
                ]}
              />
              <ProFormTextArea
                name="profile"
                label="bio"
                rules={[
                  {
                    required: true,
                    message: 'please enter content for your bio!',
                  },
                ]}
                placeholder="bio"
              />
              <ProFormSelect
                width="sm"
                name="country"
                label="country/region"
                rules={[
                  {
                    required: true,
                    message: 'please enter your cuntry or region!',
                  },
                ]}
                options={[
                  {
                    label: 'China',
                    value: 'China',
                  },
                ]}
              />

              <ProForm.Group title="city" size={8}>
                <ProFormSelect
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your city!',
                    },
                  ]}
                  width="sm"
                  fieldProps={{
                    labelInValue: true,
                  }}
                  name="province"
                  className={styles.item}
                  request={async () => {
                    return queryProvince().then(({ data }) => {
                      return data.map((item) => {
                        return {
                          label: item.name,
                          value: item.id,
                        };
                      });
                    });
                  }}
                />
                <ProFormDependency name={['province']}>
                  {({ province }) => {
                    return (
                      <ProFormSelect
                        params={{
                          key: province?.value,
                        }}
                        name="city"
                        width="sm"
                        rules={[
                          {
                            required: true,
                            message: 'please enter your city!',
                          },
                        ]}
                        disabled={!province}
                        className={styles.item}
                        request={async () => {
                          if (!province?.key) {
                            return [];
                          }

                          return queryCity(province.key || '').then(({ data }) => {
                            return data.map((item) => {
                              return {
                                label: item.name,
                                value: item.id,
                              };
                            });
                          });
                        }}
                      />
                    );
                  }}
                </ProFormDependency>
              </ProForm.Group>
              <ProFormText
                width="md"
                name="address"
                label="address"
                rules={[
                  {
                    required: true,
                    message: 'please enter your address!',
                  },
                ]}
              />
              <ProFormFieldSet
                name="phone"
                label="phone number"
                rules={[
                  {
                    required: true,
                    message: 'please enter your phone nunmber!',
                  },
                  {
                    validator: validatorPhone,
                  },
                ]}
              >
                <Input className={styles.area_code} />
                <Input className={styles.phone_number} />
              </ProFormFieldSet>
            </ProForm>
          </div>
          <div className={styles.right}>
            <AvatarView avatar={getAvatarURL()} />
          </div>
        </>
      )}
    </div>
  );
};

export default BaseView;
