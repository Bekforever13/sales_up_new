import { ConfigProvider, Select, SelectProps } from 'antd';
import React from 'react';
import { useSelectors } from 'src/hooks';

import { useSelectMode } from './useSelectMode';

const UiSelect: React.FC<SelectProps> = (_props) => {
  const { mode } = useSelectors();
  const theme = useSelectMode(mode);
  return (
    <ConfigProvider theme={{ token: theme }}>
      <Select {..._props} />
    </ConfigProvider>
  );
};

export { UiSelect };
