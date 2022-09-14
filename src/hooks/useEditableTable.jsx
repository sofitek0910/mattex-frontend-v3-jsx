import { useState } from 'react';
import uuid from 'react-uuid';

export default function useEditableTable({ initialData }) {
  const [data, setData] = useState(initialData);

  const onUpdate = (id, value) => {
    const index = data.findIndex((x) => x.id === id);
    const newArray = [...data.slice(0, index), { ...data[index], value }, ...data.slice(index + 1)];
    setData(newArray);
  };
  const onDelete = (id) => {
    setData(data.filter((x) => x.id === id));
  };
  const addRow = (title) => {
    const newArray = [...data, { title, value: '', id: uuid() }];
    setData(newArray);
  };
  return { data, onUpdate, onDelete, addRow };
}
