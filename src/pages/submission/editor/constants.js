// import shortid from "shortid";
import { v4 as uuidv4 } from 'uuid';
export const SIDEBAR_ITEM = 'sidebarItem';
export const ROW = 'row';
export const COLUMN = 'column';
export const COMPONENT = 'component';

export const SIDEBAR_ITEMS = [
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
    type: SIDEBAR_ITEM,
    component: {
      type: 'Draggable List',
      content: 'Draggable List',
    },
  },
  // {
  //   //id: shortid.generate(),
  //   id: uuidv4(),
  //   type: SIDEBAR_ITEM,
  //   component: {
  //     type: 'Header',
  //     content: 'Header Component',
  //   },
  // },
  // {
  //   //id: shortid.generate(),
  //   id: uuidv4(),
  //   type: SIDEBAR_ITEM,
  //   component: {
  //     type: 'Image',
  //     content: 'Image Component',
  //   },
  // },
  // {
  //   //id: shortid.generate(),
  //   id: uuidv4(),
  //   type: SIDEBAR_ITEM,
  //   component: {
  //     type: 'Radio Component',
  //     content: 'Radio Component',
  //   },
  // },
  // {
  //   //id: shortid.generate(),
  //   id: uuidv4(),
  //   type: SIDEBAR_ITEM,
  //   component: {
  //     type: 'Label Component',
  //     content: 'Label Component',
  //   },
  // },
  // {
  //   //id: shortid.generate(),
  //   id: uuidv4(),
  //   type: SIDEBAR_ITEM,
  //   component: {
  //     type: 'TextArea Component',
  //     content: 'TextArea Component',
  //   },
  // },
  {
    //id: shortid.generate(),
    id: uuidv4(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'EntityLogoAndHeader',
      content: 'EntityLogoAndHeader',
    },
  },
  {
    //id: shortid.generate(),
    id: uuidv4(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'Salutation',
      content: 'Salutation',
    },
  },
  {
    //id: shortid.generate(),
    id: uuidv4(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'Title',
      content: 'Title',
    },
  },
  {
    //id: shortid.generate(),
    id: uuidv4(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'Reference',
      content: 'Reference',
    },
  },
  {
    //id: shortid.generate(),
    id: uuidv4(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'Attachment',
      content: 'Attachment',
    },
  },
  {
    //id: shortid.generate(),
    id: uuidv4(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'DescriptionOfContent',
      content: 'DescriptionOfContent',
    },
  },
  {
    //id: shortid.generate(),
    id: uuidv4(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'AboutThisSubmission',
      content: 'AboutThisSubmission',
    },
  },
  {
    //id: shortid.generate(),
    id: uuidv4(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'FutureReply',
      content: 'FutureReply',
    },
  },
  {
    //id: shortid.generate(),
    id: uuidv4(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'SignOff',
      content: 'SignOff',
    },
  },
  {
    //id: shortid.generate(),
    id: uuidv4(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'SortableInputField',
      content: 'SortableInputField',
    },
  },
];
