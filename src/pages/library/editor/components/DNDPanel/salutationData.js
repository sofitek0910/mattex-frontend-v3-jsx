// import shortid from "shortid";
import { v4 as uuidv4 } from 'uuid';
export const SALUTATION_DATA = [
    {
        id: uuidv4(),
        type: 'SectionSalutation',
        editing: false,
        data: {
          payload: {
            'to': '',
            'attn': '',
            'attnVisible': true
          },
          prev: {}
        }
      }
//   {
//       type: 'EntityLogoAndHeader',
//       title: 'EntityLogoAndHeader',
//       editing: false,
//       data: {}
//   },
//   {
//       type: 'Salutation',
//       title: 'Salutation',
//       editing: false,
//       data: {
//         to: '',
//         attn: '',
//         vidible: false
//       }
//   },
//   {
//       type: 'Title',
//       title: 'Title',
//       editing: false,
//       data: {
//         title: '',
//         projectLevelId: '',
//         payload: [{ key: 'Free Text Title', value: '' }]
//       }
//   },
//   {
//       type: 'Reference',
//       title: 'Reference',
//       editing: false,
//       data: {
//         payload: [
//             { key: 'Submission Master FIlling Ref.:', value: '' },
//             { key: 'Specification Reference:', value: '' },
//             { key: 'Drawing Reference:', value: '' },
//             { key: 'BD Reference:', value: '' },
//           ]
//       }
//   },
//   {
//       type: 'Attachment',
//       title: 'Attachment',
//       editing: false,
//       payload: [{
//         label: ['Yes', 'No'],
//         selected: 'Yes'
//       }]
//   },
//   {
//       type: 'DescriptionOfContent',
//       title: 'DescriptionOfContent',
//       disabled: false,
//       mandatory: true,
//   },
//   {
//       type: 'AboutThisSubmission',
//       title: 'AboutThisSubmission',
//       disabled: false,
//       mandatory: true,
//   },
//   {
//       type: 'FutureReply',
//       title: 'FutureReply',
//       disabled: false,
//       mandatory: true,
//   },
//   {
//       type: 'SignOff',
//       title: 'SignOff',
//       disabled: false,
//       mandatory: true,
//   },
];
