import { ConfigProvider, Popover, PopoverProps } from 'antd';
import React from 'react';
import { useSelectors } from 'src/hooks';

import { usePopoverMode } from './usePopoverMode';

const UiPopover: React.FC<PopoverProps> = (_props) => {
  const { mode } = useSelectors();
  const theme = usePopoverMode(mode);
  return (
    <ConfigProvider theme={{ token: theme }}>
      <Popover {..._props} />
    </ConfigProvider>
  );
};

export { UiPopover };
