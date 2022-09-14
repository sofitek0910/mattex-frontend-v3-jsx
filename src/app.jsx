
import { PageLoading, SettingDrawer } from '@ant-design/pro-layout';
import { history } from 'umi';
import defaultSettings from '../config/defaultSettings';
const isDev = process.env.NODE_ENV === 'development';

const loginPath = '/user/login';
const registerPath = '/user/register'


import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';

import { outLogin } from '@/services/ant-design-pro/api';

/** 获取用户信息比较慢的时候会展示一个 loading */

export const initialStateConfig = {
  loading: <PageLoading />,
};
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

const existingSpecNames = ['Spec name 1', 'Spec name 2', 'Spec name 3'];
export async function getInitialState() {
  const fetchUserInfo = () => {
    const user = window.localStorage.getItem('user');
    console.log(user);
    if (user) {
      return JSON.parse(user);
    } else {
      console.log('redirect login ---');
      history.push(loginPath);
    }

    return undefined;
  }; // 如果不是登录页面，执行

  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
      editingSubmission: false,
      existingSpecNames,
    };
  }

  return {
    fetchUserInfo,
    settings: defaultSettings,
    editingSubmission: false,
    existingSpecNames,
  };
} // ProLayout support api https://procomponents.ant.design/components/layout

export const layout = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      //content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history; // redirect to login page if haven't login

      const expires_in = localStorage.getItem('expires_in')
      const timestamp = Math.floor(Date.now() / 1000)

      if (timestamp > parseInt(expires_in ?? '0') && location.pathname !== registerPath) {
        outLogin().finally(() => {
          history.push(loginPath);
        })
      }

      if ((timestamp < parseInt(expires_in ?? '0')) & (!initialState?.currentUser && location.pathname !== loginPath && location.pathname !== registerPath)) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
        // <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
        //   <LinkOutlined />
        //   <span>OpenAPI 文档</span>
        // </Link>,
        // <Link to="/~docs" key="docs">
        //   <BookOutlined />
        //   <span>业务组件文档</span>
        // </Link>,
      ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {/*!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({ ...preInitialState, settings }));
              }}
            />
          )*/}
        </>
      );
    },
    ...initialState?.settings,
  };
};
