import { ConfigProvider, Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import React from 'react';
import { useSelectors } from 'src/hooks';

import { useInputMode } from './useInputMode';

const UiInputTextArea: React.FC<TextAreaProps> = (_props) => {
  const { mode } = useSelectors();
  const theme = useInputMode(mode);
  return (
    <ConfigProvider theme={{ token: theme }}>
      <Input.TextArea {..._props} />
    </ConfigProvider>
  );
};

export { UiInputTextArea };
