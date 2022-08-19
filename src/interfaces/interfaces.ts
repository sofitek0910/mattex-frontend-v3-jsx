export interface Project {
    //not finalized yet
    project_id: number;
    project_code: string;
    project_name: string;
    project_display_name: string;
    client: string;
    division: string;
    status: number;
    project_in_charge: string;
  }
  
  export interface Temp {
    //not finalized yet
    id: string | null;
    title: string | null;
    description: string | null;
    project: string | null;   //project id
    subType: string | null;
    //creator: 
    status: number;   //(1=in progress, 2=active, 3=inactive
  }
  
  export interface TempJson {
    header_template: JSON | null; 
    salutation_template: JSON | null; 
    title_template: JSON | null;  
    reference_template: JSON | null;  
    attachment_template: JSON | null; 
    descriptionofcontent_template: JSON | null; 
    aboutthissubmission_template: JSON | null;  
    futurereply_template: JSON | null;  
    signoff_template: JSON | null;  
  
    name: string;
    project: string | null;
    order_of_blocks: JSON | null;   //{1: '', 2: ''}
    submission_type: string | null;  //{1: '', 2: ''}
    
    //community: 
    description: string | null;
  }
  
  export interface DragItem {
    index: number;
    id: string;
    type: string;
    derp: string;
  }
  
  export interface NameInputPairing {
    key: string;
    value: string;
  }
  
  
  
  /*********builder section interface********** */
  export interface SectionMeta {
    key: string;
    name: string;
    mandatory: boolean;
    data:
      | null
      | HeaderData
      | SalutationData
      | TitleData
      | ReferenceData
      | AttachmentData
      | DescriptionOfContentsData
      | AboutThisSubmissionData
      | FutureReplyData
      | SignOffData;
    setData:
      | null
      | React.Dispatch<React.SetStateAction<HeaderData>>
      | React.Dispatch<React.SetStateAction<SalutationData>>
      | React.Dispatch<React.SetStateAction<TitleData>>
      | React.Dispatch<React.SetStateAction<ReferenceData>>
      | React.Dispatch<React.SetStateAction<AttachmentData>>
      | React.Dispatch<React.SetStateAction<DescriptionOfContentsData>>
      | React.Dispatch<React.SetStateAction<AboutThisSubmissionData>>
      | React.Dispatch<React.SetStateAction<FutureReplyData>>
      | React.Dispatch<React.SetStateAction<SignOffData>>;
  }
  
  export interface HeaderData {
    order_of_fields: string[];  //["client_logo", "proj_info", "constructor_logo", "cntr_num"]
    ctrl_num_visible: boolean;
  }
  
  export interface SalutationData {
    to: string;
    attn: string;
    attn_visible: boolean;
  }
  
  export interface TitleData {
    title: string,    //no prefill
    project_level_id: string;   //Project Level Identification
    free_text_fields: NameInputPairing[];   //[{ key: "Free Text Title", value: "" }]
  }
  
  export interface ReferenceData {
    reference: NameInputPairing[];    //[{ key: "", value: "" }]
    order_of_fields: string[];
  }
  
  export interface AttachmentData {
    //not really using this becaus acually no data in this section for cover builder
    attachment: string;
  }
  
  export interface DescriptionOfContentsData {
    description_of_content: NameInputPairing[];  //[{ key: "Free Text Title", value: "" },{ key: "Free Text Title", value: "" }]
    listingStyle: string; //'alphabet' or 'number' or 'none'
    show_top_free_text: boolean;
    top_free_text: string;
    show_bottom_free_text: boolean;
    bottom_free_text: string;
  }
  
  export interface AboutThisSubmissionData {
    remarks: string
    purposeOption: string[] //['For Review', 'For Acceptance', 'For Information', 'For Record']
    purpose_of_submission: string  //no prefill
    anticipated_date_of_reply: Date | null //no prefill
    record_reply: string  //no frefill
  }
  
  export interface FutureReplyData {
    replyOptions: string[];
    reply: string;    //the chosen reply option, will keep empty when submittion
    free_text: NameInputPairing;  //{ key: "", value: "" }
    signature: string;  //not prefillable, may become an image but just assume it is string for now, will keep empty when submittion
    name: string; //not prefillable, will keep empty when submittion
    date: string; //not prefillable, will keep empty when submittion
  }
  
  export interface SignOffData {
    has_submitter: boolean;
    idVisible: boolean;
    //idName: string;
    //circulationID: string;  //no prefill
  }
  
  // not sure is this needed yet
  export interface FormRowData {
    key: string;
    value: string;
  }
  
  //not using
  export interface SectionAddedState {
    header_template: boolean;
    salutation_template: boolean;
    title_template: boolean;
    reference_template: boolean;
    attachment_template: boolean;
    descriptionofcontent_template: boolean;
    aboutthissubmission_template: boolean;
    futurereply_template: boolean;
    signoff_template: boolean;
  }
  