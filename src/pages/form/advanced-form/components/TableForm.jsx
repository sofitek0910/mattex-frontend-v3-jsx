import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, message, Popconfirm, Table } from 'antd';
import { useState } from 'react';
import styles from '../style.less';

const TableForm = ({ value, onChange }) => {
  const [clickedCancel, setClickedCancel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [cacheOriginData, setCacheOriginData] = useState({});
  const [data, setData] = useState(value);

  const getRowByKey = (key, newData) => (newData || data)?.filter((item) => item.key === key)[0];

  const toggleEditable = (e, key) => {
    e.preventDefault();
    const newData = data?.map((item) => ({ ...item }));
    const target = getRowByKey(key, newData);

    if (target) {
      // keep original data when in edit mode
      if (!target.editable) {
        cacheOriginData[key] = { ...target };
        setCacheOriginData(cacheOriginData);
      }

      target.editable = !target.editable;
      setData(newData);
    }
  };

  const newMember = () => {
    const newData = data?.map((item) => ({ ...item })) || [];
    newData.push({
      key: `NEW_TEMP_ID_${index}`,
      workId: '',
      name: '',
      department: '',
      editable: true,
      isNew: true,
    });
    setIndex(index + 1);
    setData(newData);
  };

  const remove = (key) => {
    const newData = data?.filter((item) => item.key !== key);
    setData(newData);

    if (onChange) {
      onChange(newData);
    }
  };

  const handleFieldChange = (e, fieldName, key) => {
    const newData = [...data];
    const target = getRowByKey(key, newData);

    if (target) {
      target[fieldName] = e.target.value;
      setData(newData);
    }
  };

  const saveRow = (e, key) => {
    e.persist();
    setLoading(true);
    setTimeout(() => {
      if (clickedCancel) {
        setClickedCancel(false);
        return;
      }

      const target = getRowByKey(key) || {};

      if (!target.workId || !target.name || !target.department) {
        message.error('please enter completed member information');
        e.target.focus();
        setLoading(false);
        return;
      }

      delete target.isNew;
      toggleEditable(e, key);

      if (onChange) {
        onChange(data);
      }

      setLoading(false);
    }, 500);
  };

  const handleKeyPress = (e, key) => {
    if (e.key === 'Enter') {
      saveRow(e, key);
    }
  };

  const cancel = (e, key) => {
    setClickedCancel(true);
    e.preventDefault();
    const newData = [...data]; // data before editing

    let cacheData = [];
    cacheData = newData.map((item) => {
      if (item.key === key) {
        if (cacheOriginData[key]) {
          const originItem = { ...item, ...cacheOriginData[key], editable: false };
          delete cacheOriginData[key];
          setCacheOriginData(cacheOriginData);
          return originItem;
        }
      }

      return item;
    });
    setData(cacheData);
    setClickedCancel(false);
  };

  const columns = [
    {
      title: 'member n ame',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      render: (text, record) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={(e) => handleFieldChange(e, 'name', record.key)}
              onKeyPress={(e) => handleKeyPress(e, record.key)}
              placeholder="member name"
            />
          );
        }

        return text;
      },
    },
    {
      title: 'worker id',
      dataIndex: 'workId',
      key: 'workId',
      width: '20%',
      render: (text, record) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              onChange={(e) => handleFieldChange(e, 'workId', record.key)}
              onKeyPress={(e) => handleKeyPress(e, record.key)}
              placeholder="工号"
            />
          );
        }

        return text;
      },
    },
    {
      title: 'department',
      dataIndex: 'department',
      key: 'department',
      width: '40%',
      render: (text, record) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              onChange={(e) => handleFieldChange(e, 'department', record.key)}
              onKeyPress={(e) => handleKeyPress(e, record.key)}
              placeholder="department"
            />
          );
        }

        return text;
      },
    },
    {
      title: 'action',
      key: 'action',
      render: (text, record) => {
        if (!!record.editable && loading) {
          return null;
        }

        if (record.editable) {
          if (record.isNew) {
            return (
              <span>
                <a onClick={(e) => saveRow(e, record.key)}>添加</a>
                <Divider type="vertical" />
                <Popconfirm title="Confirm deletion?" onConfirm={() => remove(record.key)}>
                  <a>delete</a>
                </Popconfirm>
              </span>
            );
          }

          return (
            <span>
              <a onClick={(e) => saveRow(e, record.key)}>save</a>
              <Divider type="vertical" />
              <a onClick={(e) => cancel(e, record.key)}>cancel</a>
            </span>
          );
        }

        return (
          <span>
            <a onClick={(e) => toggleEditable(e, record.key)}>edit</a>
            <Divider type="vertical" />
            <Popconfirm title="Confirm deletion?" onConfirm={() => remove(record.key)}>
              <a>delete</a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];
  return (
    <>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={false}
        rowClassName={(record) => (record.editable ? styles.editable : '')}
      />
      <Button
        style={{
          width: '100%',
          marginTop: 16,
          marginBottom: 8,
        }}
        type="dashed"
        onClick={newMember}
      >
        <PlusOutlined />
        add member
      </Button>
    </>
  );
};

export default TableForm;
