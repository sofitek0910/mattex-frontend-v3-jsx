import { AutoComplete, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';

const titleList = [{ value: 'Name' }, { value: 'Address' }, { value: 'Usage' }];
function TitleEditPopup({ titleEditPopupShow, setTitleEditPopupShow, title, setTitle, index }) {
  const [newTitle, setNewTitle] = useState(title);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setNewTitle(title);
  }, [title]);

  /*******handler***** */
  const modalSubmitHandler = () => {
    console.log('(titleEditPopupShow) modalSubmitHandler');
    setTitle(index, newTitle);
    setTitleEditPopupShow(false);
    setOptions([]);
  };

  const modalCancelHandler = () => {
    setTitleEditPopupShow(false);
    setNewTitle(title);
    setOptions([]);
  };

  const onSelect = (value) => {
    setNewTitle(value);
  };

  const handleSearch = (value) => {
    setOptions(!value ? [] : titleList);
  };

  return (
    <Modal
      title="Specification Name Title"
      visible={titleEditPopupShow}
      onCancel={modalCancelHandler}
      okText="Confirm"
      onOk={modalSubmitHandler}
      okButtonProps={{ disabled: newTitle === '' }}
    >
      <Input.Group compact>
        <div style={{ padding: '4px 8px' }}>title: </div>
        <AutoComplete
          options={options}
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          onSelect={onSelect}
          onSearch={handleSearch}
          value={newTitle}
          onChange={(e) => {
            return setNewTitle(e);
          }}
          allowClear
        >
          <Input
            //value={newTitle}
            //onChange={(e) => {return setNewTitle(e.target.value)}}
            status={newTitle === '' ? 'error' : ''}
            //allowClear
          />
        </AutoComplete>
      </Input.Group>
    </Modal>
  );
}

export default TitleEditPopup;
