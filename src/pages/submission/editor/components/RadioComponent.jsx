import { MenuOutlined } from '@ant-design/icons';
import { Form, Input, Radio, Table } from 'antd';
import { arrayMoveImmutable } from 'array-move';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
const DragHandle = SortableHandle(() => (
  <MenuOutlined
    style={{
      cursor: 'grab',
      color: '#999',
    }}
  />
));
const SortableItem = SortableElement((props) => <tr {...props} />);
const SortableBody = SortableContainer((props) => <tbody {...props} />);
const EditableContext = React.createContext(null);

const RadioComponent = (props) => {
  let data = props.data;
  if (typeof data == 'undefined' && data == null) {
    data = [
      {
        key: '1',
        attributeKey: 'title',
        attributeLabel: 'Title',
        attributeValue: 'Val1',
        attributeOptions: ['Val1', 'Val2', 'Val3'],
        index: 0,
      },
    ];
  }

  const [dataSource, setDataSource] = useState(data);
  const [count, setCount] = useState(data.length);

  const defaultColumns = [
    // {
    //   title: 'AttributeKey',
    //   dataIndex: 'attributeKey',
    //   className: 'editable-input-attributeKey',
    //   width: '20%',
    //   editable: true,
    // },
    {
      title: 'AttributeLabel',
      dataIndex: 'attributeLabel',
      className: 'editable-input-attributeLabel',
      width: '20%',
      editable: true,
    },
    {
      title: 'AttributeValue',
      dataIndex: 'attributeValue',
      className: 'editable-input-attributeValue',
      render: (_, record) => (
        <Radio.Group name="radiogroup" defaultValue={record.attributeValue}>
          {record.attributeOptions.map((item) => (
            <Radio value={item}>{item}</Radio>
          ))}
        </Radio.Group>
      ),
    },
  ];

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(dataSource.slice(), oldIndex, newIndex).filter(
        (el) => !!el,
      );
      console.log('Sorted items: ', newData);
      setDataSource(newData);
    }
  };

  const DraggableContainer = (props) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );
  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    const [form] = Form.useForm();
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex((x) => x.index === restProps['data-row-key']);
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <SortableItem index={index} {...restProps} />
        </EditableContext.Provider>
      </Form>
    );
  };

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };

    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };

  return (
    <div>
      <Table
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        rowKey="index"
        rowClassName="editable-table-row"
        components={{
          body: {
            wrapper: DraggableContainer,
            row: DraggableBodyRow,
            cell: EditableCell,
          },
        }}
      />
    </div>
  );
};

export default RadioComponent;
