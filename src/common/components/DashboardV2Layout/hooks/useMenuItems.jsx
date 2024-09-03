import { useUser } from '@/common/hooks/useUser';
import {
  ApiOutlined,
  CloudUploadOutlined,
  CrownOutlined,
  DesktopOutlined,
  DollarOutlined,
  FullscreenExitOutlined,
  PieChartOutlined,
  PlusCircleOutlined,
  ReadOutlined,
  SearchOutlined,
  SlackOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import * as React from 'react';

export const useMenuItems = () => {
  const { isAdmin } = useUser();

  const menuItems = React.useMemo(() => {
    return [
      {
        key: 'library',
        label: <Link href='/dashboard/library'>Library</Link>,
        icon: <DesktopOutlined />,
      },
      {
        key: 'home',
        label: <Link href='/dashboard/home'>Discover</Link>,
        icon: <PieChartOutlined />,
      },
      {
        key: 'slack',
        label: <Link href='/dashboard/slack'>Slack Notifications</Link>,
        icon: <SlackOutlined />,
      },
      {
        key: 'integrations',
        label: <Link href='/dashboard/integrations'>Integrations</Link>,
        icon: <ApiOutlined />,
      },
      {
        key: 'Upload CSV',
        label: <Link href='/dashboard/upload-csv'>Upload CSV</Link>,
        icon: <CloudUploadOutlined />,
      },
      ...(isAdmin
        ? [
            { type: 'divider' },
            {
              key: 'admin',
              label: 'Admin',
              icon: <CrownOutlined />,
              children: [
                {
                  key: 'user',
                  label: <Link href='/dashboard/admin'>Users</Link>,
                  icon: <UsergroupAddOutlined />,
                },
                {
                  key: 'searchCount',
                  label: <Link href='/dashboard/admin/plan'>Plan</Link>,
                  icon: <DollarOutlined />,
                },
                {
                  key: 'monitor-ai-search',
                  label: <Link href='/dashboard/admin/monitoraisearch'>Monitor AI-Search</Link>,
                  icon: <SearchOutlined />,
                },
                {
                  key: 'upload',
                  label: <Link href='/dashboard/admin/csv'>Upload CSV</Link>,
                  icon: <CloudUploadOutlined />,
                },
                {
                  key: 'premium',
                  label: <Link href='/dashboard/admin/premiumaccess'>Premium Access</Link>,
                  icon: <FullscreenExitOutlined />,
                },
              ],
            },
            {
              key: 'blog',
              label: 'Blog',
              icon: <ReadOutlined />,
              children: [
                {
                  key: 'blog-list',
                  label: <Link href='/dashboard/admin/blog/list'>Blog Posts</Link>,
                  icon: <ReadOutlined />,
                },
                {
                  key: 'add-blog',
                  label: <Link href='/dashboard/admin/blog/add'>Add Blog Post</Link>,
                  icon: <PlusCircleOutlined />,
                },
              ],
            },
          ]
        : []),
    ];
  }, [isAdmin]);

  return { menuItems };
};
