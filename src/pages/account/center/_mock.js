// eslint-disable-next-line import/no-extraneous-dependencies
const titles = [
  'Alipay',
  'Angular',
  'Ant Design',
  'Ant Design Pro',
  'Bootstrap',
  'React',
  'Vue',
  'Webpack',
];
const avatars = [
  'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', // Alipay
  'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', // Angular
  'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', // Ant Design
  'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', // Ant Design Pro
  'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', // Bootstrap
  'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', // React
  'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png', // Vue
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Webpack
];
const covers = [
  'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
];


const currentUseDetail = {
  //dummy data
  name: 'user name',
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  userid: '00000001',
  email: 'user@example.com',
  signature: 'signature',
  title: 'job title',
  group: 'team',
  tags: [
    {
      key: '0',
      label: 'personal tag 1',
    },
    {
      key: '1',
      label: 'personal tag 2',
    },
  ],
  notice: [
    //dummy data
    {
      id: 'xxx1',
      title: titles[0],
      logo: avatars[0],
      description: 'group description',
      updatedAt: new Date(),
      member: 'group name 1',
      href: '',
      memberLink: '',
    },
    {
      id: 'xxx2',
      title: titles[1],
      logo: avatars[1],
      description: 'group description',
      updatedAt: new Date('2017-07-24'),
      member: 'group  name 2',
      href: '',
      memberLink: '',
    },
  ],
  notifyCount: 12,
  unreadCount: 11,
  country: 'China',
  geographic: {
    province: {
      label: '浙江省',
      key: '330000',
    },
    city: {
      label: '杭州市',
      key: '330100',
    },
  },
  address: '西湖区工专路 77 号',
  phone: '0752-268888888',
};

function fakeList(count) {
  const list = [];

  for (let i = 0; i < count; i += 1) {
    list.push({
      //dummy data
      id: `fake-list-${i}`,
      owner: 'username',
      title: titles[i % 8],
      avatar: avatars[i % 8],
      cover: parseInt(`${i / 4}`, 10) % 2 === 0 ? covers[i % 4] : covers[3 - (i % 4)],
      status: ['active', 'exception', 'normal'][i % 3],
      percent: Math.ceil(Math.random() * 50) + 50,
      logo: avatars[i % 8],
      href: 'https://ant.design',
      updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).getTime(),
      createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).getTime(),
      subDescription: 'subDescription',
      description:
        'description',
      activeUser: Math.ceil(Math.random() * 100000) + 100000,
      newUser: Math.ceil(Math.random() * 1000) + 1000,
      star: Math.ceil(Math.random() * 100) + 100,
      like: Math.ceil(Math.random() * 100) + 100,
      message: Math.ceil(Math.random() * 10) + 10,
      content:
        'content',
      members: [
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
          name: 'user',
          id: 'member1',
        }
      ],
    });
  }

  return list;
}

function getFakeList(req, res) {
  const params = req.query;
  const count = Number(params.count) * 1 || 5;
  const result = fakeList(count);
  return res.json({
    data: {
      list: result,
    },
  });
} // get user data

function getCurrentUser(req, res) {
  return res.json({
    data: currentUseDetail,
  });
}

export default {
  'GET  /api/fake_list_Detail': getFakeList,
  // support Object and Array type
  'GET  /api/currentUserDetail': getCurrentUser,
};
