export const PROXY_URL = 'https://smmfrt.com'
// export const PROXY_URL = 'http://ec2-18-163-55-32.ap-east-1.compute.amazonaws.com:80';

export const TEMPLATE_STATUS = [
  {
    data: 1,
    label: 'In progress',
  },
  {
    data: 2,
    label: 'Active',
  },
  {
    data: 3,
    label: 'Inactive',
  },
];

export const SUBMISSION_STATUS = [
  {
    data: 1,
    label: 'In progress',
  },
  {
    data: 2,
    label: 'Awaiting approval',
  },
  {
    data: 3,
    label: 'Internally approved',
  },
  {
    data: 4,
    label: 'Rejected',
  },
  {
    data: 5,
    label: 'Submitted to SRM',
  },
  {
    data: 6,
    label: 'Approved from SRM',
  },
  {
    data: 7,
    label: 'Rejected from SRM',
  },
];

export const RESPONSIBLE_PARTIES = [
  {
    data: 'Main Contractor',
    label: 'Main Contractor'
  },
  {
    data: 'Sub Contractor',
    label: 'Sub Contractor'
  },
  {
    data: 'Property Owner',
    label: 'Property Owner'
  }
]

export const DISCIPLINE_CODE = [
  {
    data: 'AR',
    label: 'Architectural'
  },
  {
    data: 'BD',
    label: 'Building Services'
  },
  {
    data: 'CV',
    label: 'Civil'
  },
  {
    data: 'LU',
    label: 'Landscape'
  },
  {
    data: 'ST',
    label: 'Structural'
  },
  {
    data: 'MA',
    label: 'Marine or Water Tributary'
  },
  {
    data: 'RD',
    label: 'Roadworks'
  },
  {
    data: 'DR',
    label: 'Drainage works'
  },
  {
    data: 'MD',
    label: 'Multi Discipline'
  },
  {
    data: 'GE',
    label: 'Geotechnical works'
  },
  {
    data: 'SL',
    label: 'Slopworks'
  },
  {
    data: 'ME',
    label: 'Mechanical-Electrical'
  },
  {
    data: 'UU',
    label: 'Underground Utility'
  },
  {
    data: 'NA',
    label: 'Not Applicable'
  }
]

export const BLOCKS_NAME = [
  {
    label: 'EntityLogoAndHeader',
    data: 'header'
  },
  {
    label: 'Salutation',
    data: 'salutation'
  },
  {
    label: 'Title',
    data: 'title'
  },
  {
    label: 'DescriptionOfContent',
    data: 'descriptionofcontent'
  },
  {
    label: 'Reference',
    data: 'reference'
  },
  {
    label: 'AboutThisSubmission',
    data: 'aboutthissubmission'
  }
]

export const PURPOSE_SUBMISSIONS = [
  {
    label: 'For Review',
    data: 'For Review'
  },
  {
    label: 'For Acceptance',
    data: 'For Acceptance'
  },
  {
    label: 'For Reference and Record',
    data: 'For Reference and Record'
  },
  {
    label: 'For Comment (if any) and/or for Acceptance',
    data: 'For Comment (if any) and/or for Acceptance'
  }
]
