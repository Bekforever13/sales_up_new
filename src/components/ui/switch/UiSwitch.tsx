import { ConfigProvider, Switch, SwitchProps } from 'antd';
import React from 'react';

const UiSwitch: React.FC<SwitchProps> = (_props) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#0F172A',
      },
    }}
  >
    <Switch {..._props} />
  </ConfigProvider>
);

export { UiSwitch };
