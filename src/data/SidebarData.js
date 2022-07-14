import React from 'react';
import * as RiIcons from 'react-icons/ri';

import { ReactComponent as LNBDashboard } from '../image/LNB_Dashboard.svg';
import { ReactComponent as LNBUser } from '../image/LNB_User.svg';
import { ReactComponent as LNBIam } from '../image/LNB_MSAzure.svg';
import { ReactComponent as LNBDBaas } from '../image/LNB_DBaaS.svg';

export const SidebarData = [  
  {
    title: 'Dashboard',
    path: '/test',
    icon: <LNBDashboard />,
  },
  {
    title: 'User',
    icon: <LNBUser />,
    iconClosed: <RiIcons.RiArrowRightSLine />,
    iconOpened: <RiIcons.RiArrowDownSLine />,

    subNav: [
      {
        title: '내 계정',
        path: 'https://cloud.kt.com/console/g/myaccount',
        cName: 'sub-nav'
      },
      {
        title: '이용 금액',
        path: '/admin/components/item2',
        cName: 'sub-nav'
      },
      {
        title: '결제 정보',
        path: '/admin/components/item3',
        cName: 'sub-nav'
      },
      {
        title: '할인',
        path: '/admin/components/item3',
        cName: 'sub-nav'
      },
      {
        title: '내 문의',
        path: '/admin/components/item3',
        cName: 'sub-nav'
      },
      {
        title: '내 접속 이력',
        path: '/admin/components/item3',
        cName: 'sub-nav'
      },
      {
        title: '그룹 계정',
        path: '/admin/components/item3',
        cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'IAM',
    icon: <LNBIam />,
    iconClosed: <RiIcons.RiArrowRightSLine />,
    iconOpened: <RiIcons.RiArrowDownSLine />,

    subNav: [
      {
        title: 'User',
        path: '/admin/components/item1',
        cName: 'sub-nav'
      },
      {
        title: 'Policy',
        path: '/admin/components/item2',
        cName: 'sub-nav'
      },
      {
        title: 'Policy Group',
        path: '/admin/components/item3',
        cName: 'sub-nav'
      },
      {
        title: 'Audit(user)',
        path: '/admin/components/item3',
        cName: 'sub-nav'
      },
      {
        title: 'Audit(action)',
        path: '/admin/components/item3',
        cName: 'sub-nav'
      },
      {
        title: '내 접속 이력',
        path: '/admin/components/item3',
        cName: 'sub-nav'
      },
      {
        title: '그룹 계정',
        path: '/admin/components/item3',
        cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'API Gateway',
    icon: <LNBDBaas />,
    iconClosed: <RiIcons.RiArrowRightSLine />,
    iconOpened: <RiIcons.RiArrowDownSLine />,

    subNav: [
      {
        title: 'My APIs',
        path: '/myapis',
        cName: 'sub-nav'
      },
      {
        title: 'Usage Plans',
        path: '/usageplans',
        cName: 'sub-nav'
      },
      {
        title: 'API Keys',
        path: '/backup',
        cName: 'sub-nav'
      },
      {
        title: 'Dashboard',
        path: '/parametergroup',
        cName: 'sub-nav'
      },
      {
        title: 'Monitoring',
        path: '/monitoring',
        cName: 'sub-nav'
      }
    ]
  }
];