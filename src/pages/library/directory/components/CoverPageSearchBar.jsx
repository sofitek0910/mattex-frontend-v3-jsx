import React, { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';

import { Button, Form, Input, Select } from 'antd';

import { getSubmissionTypeList } from '@/services/swagger/submission';
import { getUserListByProjectId } from '@/services/swagger/library';
import { TEMPLATE_STATUS } from '@/const';
import useException from '@/utils/useException';

const CoverPageSearchBar = (props) => {
  const { handleChange, onReset } = props;

  const [form] = Form.useForm();

  const [submissionTypes, setSubmissionTypes] = useState([]);
  const [creators, setCreators] = useState();

  const onFinish = () => {
    form.resetFields();
    onReset();
  };

  const { run } = useRequest(() => getSubmissionTypeList(), {
    manual: true,
    onSuccess: (res) => {
      if (Array.isArray(res)) {
        setSubmissionTypes(res);
      }
    },
    throwOnError: true,
    onError: useException,
  });

  const { run: getUserList } = useRequest(() => getUserListByProjectId({ projectId: 1 }), {
    manual: true,
    onSuccess: (res) => {
      setCreators(res.data);
    },
    throwOnError: true,
    onError: useException,
  });

  useEffect(() => {
    run();
    getUserList();
  }, []);

  return (
    <>
      <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
        <Form.Item name="contains">
          <Input.Search
            placeholder="input search text"
            onSearch={(val) => handleChange({ name: 'contains', value: val })}
            style={{ width: 200 }}
          />
        </Form.Item>

        <Form.Item
          name="status"
          rules={[
            {
              required: true,
              message: 'Field cannot be empty',
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Status"
            optionFilterProp="children"
            onChange={(value) => handleChange({ name: 'status', value: value })}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
            style={{ width: '150px' }}
          >
            {TEMPLATE_STATUS.map((cell) => (
              <Select.Option value={cell.data} key={cell.data}>
                {cell.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="submission_type"
          rules={[
            {
              required: true,
              message: 'Field cannot be empty',
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Submission Type"
            optionFilterProp="children"
            onChange={(value) => handleChange({ name: 'submission_type', value: value })}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
            style={{ width: '200px' }}
          >
            {submissionTypes?.map((submissionType) => (
              <Select.Option
                value={submissionType.submission_type_id}
                key={submissionType.submission_type_id}
              >
                {submissionType.display_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="user_id"
          rules={[
            {
              required: true,
              message: 'Field cannot be empty',
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Create By"
            optionFilterProp="children"
            onChange={(value) => handleChange({ name: 'user_id', value: value })}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
            style={{ width: '150px' }}
          >
            {creators?.map((creator) => (
              <Select.Option value={creator.id} key={creator.id}>
                {creator.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="text"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              Reset
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default CoverPageSearchBar;
