import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { history } from 'umi';

import { PageContainer, RouteContext } from '@ant-design/pro-layout';
import { Card, Descriptions, Popconfirm, message, Button, Switch } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import { SIDEBAR_ITEMS } from './components/DNDPanel/sidebarDefintion';

import { BLOCKS_NAME } from '@/const'
import { createTemplate } from '@/services/swagger/library'

import styles from './style.less';
import './styles.css';

import DNDPanel from './components/DNDPanel/DNDPanel'

//hook for handling template data?

const description = (title, descript) => {
  return (
    <RouteContext.Consumer>
      {({ isMobile }) => (
        <Descriptions className={styles.headerList} size="small" column={1}>
          {/**need to add button for submission */}
          <Descriptions.Item>0041 - The Mattex Office Rennovation (Material)</Descriptions.Item>
          <Descriptions.Item>{title}</Descriptions.Item>
          <Descriptions.Item>{descript ? descript : 'No description'}</Descriptions.Item>
        </Descriptions>
      )}
    </RouteContext.Consumer>
  );

}

const Basic = () => {
  const search = useLocation().search;
  const title = new URLSearchParams(search).get('title');
  const descript = new URLSearchParams(search).get('description');
  const project = new URLSearchParams(search).get('project');
  const submission_type = new URLSearchParams(search).get('submission_type');

  const [sideBarList, setSideBarList] = useState(SIDEBAR_ITEMS);
  const [rootDataSource, setRootDataSource] = useState([]);
  const [changed, setChanged] = useState(false);
  const [saved, setSaved] = useState(false);
  const [validCover, setValidCover] = useState(false);
  const [status, setStatus] = useState(1)
  const [unsavedPopconfirmVisible, setUnsavedPopconfirmVisible] = useState(false)

  useEffect(() => {
    //check if current template valid
    let valid = true;
    console.log('sectionList: ', sideBarList)
    var BreakException = {};
    try {
      sideBarList.forEach((section) => {
        console.log('section: ', section)
        if (section.mandatory && !section.inUse) throw BreakException;
      });
    } catch (e) {
      if (e !== BreakException) {
        throw e;
      }
      else {
        valid = false;
      }
    }
    setValidCover(valid)
  }, [sideBarList])

  useEffect(() => {
    console.log('(check valid)changed:', changed)
    console.log('(check valid)saved:', saved)
    console.log('validCover:', validCover)
  }, [changed, saved, validCover])

  //handler
  const backClickHandler = () => {
    setUnsavedPopconfirmVisible(false)
    history.push(`/library/directory`);
  }

  const saveHandler = () => {
    console.log(rootDataSource)

    if (rootDataSource.length < 9) {
      message.info('Please add all blocks')
      return;
    }

    const headerSectionVal = rootDataSource.find((cell) => cell.type === "EntityLogoAndHeader")?.data
    const salutationSectionVal = rootDataSource.find((cell) => cell.type === 'Salutation')?.data

    const titleSectionVal = rootDataSource.find((cell) => cell.type === 'Title')?.data
    let titleObj = {}
    titleSectionVal?.payload.remark.forEach((cell, i) => {
      let cellVal = {}
      cellVal[cell.key] = cell.value
      titleObj[`${i}`] = cellVal
    })

    const referenceSectionVal = rootDataSource.find((cell) => cell.type === 'Reference')?.data
    let refenceObject = {}
    referenceSectionVal?.payload.reference.forEach((cell, i) => {
      let cellVal = {}
      cellVal[cell.key] = cell.value
      refenceObject[`${i}`] = cellVal
    });

    const descSectionVal = rootDataSource.find((cell) => cell.type === 'DescriptionOfContent')?.data
    let descContents = {
      "1": { "Description": descript }
    }
    descSectionVal?.payload.pairingList.forEach((cell, i) => {
      let cellVal = {}
      cellVal[`${cell.key}`] = cell.value
      descContents[`${i + 2}`] = cellVal
    });

    const aboutSubmissionSectionVal = rootDataSource.find((cell) => cell.type === 'aboutthissubmission_template')?.data

    let postBody = {
      header_template: {
        client_logo_1: null,
        client_logo_2: null,
        client_logo_3: null,
        form_control_no: '',
        ctrl_num_visible: headerSectionVal?.payload.ctrlNumVisible ?? false
      },
      salutation_template: {
        to: salutationSectionVal?.payload.to ?? '',
        attn: salutationSectionVal?.payload.attn ?? '',
        attn_visible: salutationSectionVal?.payload.attnVisible ?? false
      },
      title_template: {
        free_text_fields: titleObj
      },
      reference_template: {
        reference: refenceObject
      },
      attachment_template: {},
      descriptionofcontent_template: {
        description_of_content: descContents,
        top_free_text: descSectionVal?.payload.topFreeText,
        show_top_free_text: descSectionVal?.payload.showTopFreeText ?? false,
        bottom_free_text: descSectionVal?.payload.bottomFreeText,
        show_bottom_free_text: descSectionVal?.payload.showBottomFreeText ?? false
      },
      aboutthissubmission_template: {
        record_reply: false,
        remarks: aboutSubmissionSectionVal?.payload.remarks
      },
      futurereply_template: {},
      name: title,
      order_of_blocks: rootDataSource.map((cell, i) => {
        let objVal = {}
        objVal[`${i + 1}`] = BLOCKS_NAME.find((item) => item.label === cell.type)?.data ?? cell.type
        return objVal
      }),
      submission_type: [submission_type],
      project: project,
      community: true
    }

    createTemplate(postBody).then(() => {
      message.success('Cover template saved');
      setRootDataSource([])
      setSideBarList(SIDEBAR_ITEMS)
      history.push(`/library/directory`);
    }).catch((err) => {
      console.log(err)
      if (status === 2 && !validCover) {
        setStatus(3)
        message.warning('Cover template is deactivated due to lack of mandatory section');
      }
    })
  };

  const activateHandler = () => {
    //status: 1 = in progress, 2 = activate, 3 = inactivate

    //post to change activate status api

    //if success
    if (status === 1) {
      //selectedTemp.status = 2
      setStatus(2)
      message.success('Cover template is published');
    }
    else if (status === 2) {
      //selectedTemp.status = 3
      setStatus(3)
      message.success('Cover template is deactivated');
    }
    else if (status === 3) {
      //selectedTemp.status = 2
      setStatus(2)
      message.success('Cover template is activated');
    }

    //setStatus(selectedTemp.status)
  }


  const unsavedVisibleChangeHandler = (newVisible) => {
    if (!newVisible) {
      setUnsavedPopconfirmVisible(newVisible);
      return;
    }

    if (changed) {
      setUnsavedPopconfirmVisible(newVisible);
    } else {
      backClickHandler(); // next step
    }
  }

  //useCallBack
  const savedCallback = useCallback((status) => {
    setSaved(status)

  })

  const changedCallback = useCallback((status) => {
    setChanged(status)
  })

  return (
    <PageContainer
      onBack={() => { }}
      backIcon={
        <Popconfirm
          title="Changes unsaved. Continue?"
          placement="rightTop"
          visible={unsavedPopconfirmVisible}
          onVisibleChange={unsavedVisibleChangeHandler}
          onConfirm={backClickHandler}
          onCancel={() => setUnsavedPopconfirmVisible(false)}
          okText="Yes"
          cancelText="No"
        >
          <ArrowLeftOutlined />
        </Popconfirm>

      }
      content={description(title, descript)}
      extra={
        <span>
          <Button
            key="0"
            //disabled={!saved||!validCover}
            //className={(saved&&validCover)? "primaryButton" : "disabledButton"}
            className="defaultButton"
            onClick={() => { }}>
            Preview
          </Button>
          <Button
            key="1"
            type="primary"
            // disabled={!changed}
            className="primaryButton"
            onClick={saveHandler}
          >
            Save Progress
          </Button>

          {//selectedTemp.status === 1?
            status === 1 ?
              (
                <Button
                  key="2"
                  type="primary"
                  disabled={!saved || !validCover}
                  //className={(saved&&validCover)? "primaryButton" : "disabledButton"}
                  className="primaryButton"
                  onClick={activateHandler}>
                  Publish &#38; Activate
                </Button>
              ) : (
                <Switch
                  className="activateSwitch"
                  style={{ width: '95px' }}
                  checkedChildren="activated"
                  unCheckedChildren="deactivated"
                  //checked={selectedTemp.status === 2} 
                  checked={status === 2}
                  onChange={activateHandler}
                  disabled={!saved || !validCover}
                />
              )}
        </span>
      }
    >
      <Card bordered={false}>
        <DNDPanel
          savedCallback={savedCallback}
          changedCallback={changedCallback}
          sideBarList={sideBarList}
          setSideBarList={setSideBarList}
          rootDataSource={rootDataSource}
          setRootDataSource={setRootDataSource}
        />
      </Card>

    </PageContainer>
  );
};

export default Basic;
