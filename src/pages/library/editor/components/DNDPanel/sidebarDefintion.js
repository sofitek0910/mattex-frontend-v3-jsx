// import shortid from "shortid";
import { v4 as uuidv4 } from 'uuid';
export const SIDEBAR_ITEMS = [
//   {
//       type: 'Draggable List',
//       title: 'Draggable List',
//       inUse: false,
//       mandatory: false, 
//   },
  {
      type: 'EntityLogoAndHeader',
      title: 'EntityLogoAndHeader',
      inUse: false,
      mandatory: true,
  },
  {
      type: 'Salutation',
      title: 'Salutation',
      inUse: false,
      mandatory: true,
  },
  {
      type: 'Title',
      title: 'Title',
      inUse: false,
      mandatory: true,
  },
  {
      type: 'Reference',
      title: 'Reference',
      inUse: false,
      mandatory: false,
  },
  {
      type: 'Attachment',
      title: 'Attachment',
      inUse: false,
      mandatory: true,
  },
  {
      type: 'DescriptionOfContent',
      title: 'DescriptionOfContent',
      inUse: false,
      mandatory: true,
  },
  {
      type: 'AboutThisSubmission',
      title: 'AboutThisSubmission',
      inUse: false,
      mandatory: true,
  },
  {
      type: 'FutureReply',
      title: 'FutureReply',
      inUse: false,
      mandatory: true,
  },
  {
      type: 'SignOff',
      title: 'SignOff',
      inUse: false,
      mandatory: true,
  },
//   {
//       type: 'SortableInputField',
//       title: 'SortableInputField',
//       inUse: false,
//       mandatory: true,
//   },
];
