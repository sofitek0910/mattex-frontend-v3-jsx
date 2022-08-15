import {
  ModalForm,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  Result,
  Button,
} from '@ant-design/pro-form';
import styles from '../style.less';

const OperationModal = (props) => {
  const { done, visible, current, onDone, onSubmit, children } = props;

  if (!visible) {
    return null;
  }

  return (
    <ModalForm
      visible={visible}
      title={done ? null : `task ${current ? 'edit' : 'new'}`}
      className={styles.standardListForm}
      width={640}
      onFinish={async (values) => {
        onSubmit(values);
      }}
      initialValues={current}
      submitter={{
        render: (_, dom) => (done ? null : dom),
      }}
      trigger={<>{children}</>}
      modalProps={{
        onCancel: () => onDone(),
        destroyOnClose: true,
        bodyStyle: done
          ? {
              padding: '72px 0',
            }
          : {},
      }}
    >
      {!done ? (
        <>
          <ProFormText
            name="title"
            label="task title"
            rules={[
              {
                required: true,
                message: 'please enter task title',
              },
            ]}
            placeholder="please enter"
          />
          <ProFormDateTimePicker
            name="createdAt"
            label="starting time"
            rules={[
              {
                required: true,
                message: 'please select starting time',
              },
            ]}
            fieldProps={{
              style: {
                width: '100%',
              },
            }}
            placeholder="please select"
          />
          <ProFormSelect
            name="owner"
            label="person in charge"
            rules={[
              {
                required: true,
                message: 'please select person in charge',
              },
            ]}
            options={[
              {
                label: '付晓晓',
                value: 'xiao',
              },
              {
                label: '周毛毛',
                value: 'mao',
              },
            ]}
            placeholder="please select person in charge"
          />
          <ProFormTextArea
            name="subDescription"
            label="product description"
            rules={[
              {
                message: 'description should be more than 5 characters',
                min: 5,
              },
            ]}
            placeholder="please enter at least 5 characters"
          />
        </>
      ) : (
        <Result
          status="success"
          title="success"
          subTitle=""
          extra={
            <Button type="primary" onClick={onDone}>
              ok
            </Button>
          }
          className={styles.formResult}
        />
      )}
    </ModalForm>
  );
};

export default OperationModal;
