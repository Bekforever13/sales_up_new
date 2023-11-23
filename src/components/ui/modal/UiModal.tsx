import { ConfigProvider, Modal, ModalProps } from 'antd';
import React from 'react';
import { useSelectors } from 'src/hooks';

import { useModalMode } from './useModalMode';

const UiModal: React.FC<ModalProps> = (_props) => {
  const { mode } = useSelectors();
  const theme = useModalMode(mode);
  return (
    <ConfigProvider theme={{ token: theme }}>
      <Modal {..._props} />
    </ConfigProvider>
  );
};

export { UiModal };
