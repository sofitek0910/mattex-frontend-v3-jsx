import { PageContainer, RouteContext } from '@ant-design/pro-layout';
import { Card, Descriptions, Popconfirm, message, Button, Switch } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { history } from 'umi';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import styles from './style.less';
import { INITIAL_DATA } from './components/DNDPanel/initialData';
import { SIDEBAR_ITEMS } from './components/DNDPanel/sidebarDefintion';
import './styles.css';

import DNDPanel from './components/DNDPanel/DNDPanel';

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
};

const Basic = () => {
  const search = useLocation().search;
  const title = new URLSearchParams(search).get('title');
  const descript = new URLSearchParams(search).get('description');

  const [sideBarList, setSideBarList] = useState(SIDEBAR_ITEMS);
  const [rootDataSource, setRootDataSource] = useState([]);
  const [changed, setChanged] = useState(false);
  const [saved, setSaved] = useState(false);
  const [validCover, setValidCover] = useState(false);
  //const [validCover, setValidCover] = useState(true);
  //const [status, setStatus] = useState(selectedTemp.status)
  const [status, setStatus] = useState(1);
  const [deactivatePopconfirmVisible, setDeactivatePopconfirmVisible] = useState(false);
  const [unsavedPopconfirmVisible, setUnsavedPopconfirmVisible] = useState(false);

  useEffect(() => {
    //check if current template valid
    let valid = true;
    console.log('sectionList: ', sideBarList);
    var BreakException = {};
    try {
      sideBarList.forEach((section) => {
        console.log('section: ', section);
        if (section.mandatory && !section.inUse) throw BreakException;
      });
    } catch (e) {
      if (e !== BreakException) {
        throw e;
      } else {
        valid = false;
      }
    }
    setValidCover(valid);
  }, [sideBarList]);

  useEffect(() => {
    console.log('(check valid)changed:', changed);
    console.log('(check valid)saved:', saved);
    console.log('validCover:', validCover);
  }, [changed, saved, validCover]);

  // useEffect(() => {
  //   let valid = false
  //   valid = !addableSectionList.some(addable => {
  //     if (addable.mandatory){
  //       //console.log('(check valid)addable:', addable.name)
  //       let isFound = addedSections.some(added => {
  //         if(added.key === addable.key){
  //           return true
  //         }
  //         return false
  //       })
  //       //console.log('(check valid)isFound',isFound)
  //       return(!isFound)
  //     }
  //   })
  //   setValidCover(valid)
  // }, [addedSections])

  //handler
  const backClickHandler = () => {
    setUnsavedPopconfirmVisible(false);
    history.push(`/library/directory`);
  };

  const saveHandler = () => {
    //post to save temp api
    //let postData = getPostTemp()
    //console.log('postData:',JSON.stringify(postData))

    //if success
    setSaved(true);
    setChanged(false);
    message.success('Cover template saved');
    setDeactivatePopconfirmVisible(false);

    //deactivate template since not valid
    if (status === 2 && !validCover) {
      //api for deactivate template
      //selectedTemp.status = 3
      setStatus(3);
      message.warning('Cover template is deactivated due to lack of mandatory section');
    }
  };

  const activateHandler = () => {
    //status: 1 = in progress, 2 = activate, 3 = inactivate

    //post to change activate status api

    //if success
    if (status === 1) {
      //selectedTemp.status = 2
      setStatus(2);
      message.success('Cover template is published');
    } else if (status === 2) {
      //selectedTemp.status = 3
      setStatus(3);
      message.success('Cover template is deactivated');
    } else if (status === 3) {
      //selectedTemp.status = 2
      setStatus(2);
      message.success('Cover template is activated');
    }

    //setStatus(selectedTemp.status)
  };

  const deactivateVisibleChangeHandler = (newVisible) => {
    if (!newVisible) {
      setDeactivatePopconfirmVisible(newVisible);
      return;
    }

    if (status === 2 && !validCover) {
      setDeactivatePopconfirmVisible(newVisible);
    } else {
      saveHandler(); // next step
    }
  };

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
  };

  //useCallBack
  const savedCallback = useCallback((status) => {
    setSaved(status);
  });

  const changedCallback = useCallback((status) => {
    setChanged(status);
  });

  return (
    <PageContainer
      onBack={() => {}}
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
            onClick={() => {}}
          >
            Preview
          </Button>
          <Popconfirm
            title={
              <>
                <div>The current template is invalid and will be deactivated after saving.</div>
                <div>Continue to save?</div>
              </>
            }
            placement="bottomRight"
            visible={deactivatePopconfirmVisible}
            onVisibleChange={deactivateVisibleChangeHandler}
            onConfirm={saveHandler}
            onCancel={() => setDeactivatePopconfirmVisible(false)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              key="1"
              type="primary"
              disabled={!changed}
              //type={changed ? "primary" : "default"}
              //className={changed ? "primaryButton" : "defaultButton"}
              className="primaryButton"
            >
              Save Progress
            </Button>
          </Popconfirm>
          {
            //selectedTemp.status === 1?
            status === 1 ? (
              <Button
                key="2"
                type="primary"
                disabled={!saved || !validCover}
                //className={(saved&&validCover)? "primaryButton" : "disabledButton"}
                className="primaryButton"
                onClick={activateHandler}
              >
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
            )
          }
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
