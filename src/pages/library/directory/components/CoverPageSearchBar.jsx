import { Button, Form, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
const { TextArea } = Input;
const { Search } = Input;
const { Option } = Select;

const onChange = (value) => {
  console.log(`selected ${value}`);
};

const CoverPageSearchBar = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});
  const data = {
    attributeKey: 'title',
    attributeLabel: 'Title',
    attributeValue: 'Document 1',
  };
  const [dataSource, setDataSource] = useState(data);
  console.log(`dataSource.title: ${dataSource.title}`);
  console.log(`data.text: ${data.title}`);
  const [value, setValue] = useState('');

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    console.log('Finish:', values);
  };

  const onSearch = (value) => console.log(value);

  return (
    <>
      <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
        <Form.Item
          name="search"
          rules={[
            {
              required: true,
              message: 'Field cannot be empty',
            },
          ]}
        >
          <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
        </Form.Item>
        <Form.Item
          name="Status"
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
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            <Option value="Status1">Status1</Option>
            <Option value="Status2">Status2</Option>
            <Option value="Status3">Status3</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="SubmissionType"
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
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            <Option value="Submission Type 1">Submission Type 1</Option>
            <Option value="Submission Type 2">Submission Type 2</Option>
            <Option value="Submission Type 3">Submission Type 3</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="createBy"
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
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            <Option value="All">All</Option>
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
