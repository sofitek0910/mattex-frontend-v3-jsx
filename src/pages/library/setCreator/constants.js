// import shortid from "shortid";
import { v4 as uuidv4 } from 'uuid';
export const SPECIFICATION_ITEM = 'specificationItem';
export const ROW = 'row';
export const COLUMN = 'column';
export const COMPONENT = 'component';

export const SPECIFICATION_ITEMS = [
  // {
  //   //id: shortid.generate(),
  //   id: uuidv4(),
  //   type: SIDEBAR_ITEM,
  //   component: {
  //     type: 'Input',
  //     content: 'Input',
  //   },
  // },
  // {
  //   //id: shortid.generate(),
  //   id: uuidv4(),
  //   type: SIDEBAR_ITEM,
  //   component: {
  //     type: 'Draggable Table',
  //     content: 'Draggable Table',
  //   },
  // },
  {
    //id: shortid.generate(),
    id: uuidv4(),
    type: SPECIFICATION_ITEM,
    component: {
      key: 'New Title',
      content: '',
    },
  },
];

export const SIDEBAR_ITEM = [
  {
    id: uuidv4(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'Input',
      content: 'Input',
    },
  }]