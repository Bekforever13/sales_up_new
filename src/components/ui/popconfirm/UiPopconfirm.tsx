import { ConfigProvider, Popconfirm, PopconfirmProps } from 'antd';
import React from 'react';
import { useSelectors } from 'src/hooks';

import { usePopconfirmMode } from './usePopconfirmMode';

const UiPopconfirm: React.FC<PopconfirmProps> = (_props) => {
  const { mode } = useSelectors();
  const theme = usePopconfirmMode(mode);
  return (
    <ConfigProvider theme={{ token: theme }}>
      <Popconfirm {..._props} />
    </ConfigProvider>
  );
};

export { UiPopconfirm };
