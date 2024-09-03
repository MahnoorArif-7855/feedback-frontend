import { Button, Modal } from 'antd';
import { useState } from 'react';

import UpgradeModalStyled from './UpgradeModal.styles';

const UpgradeModal = ({ isModalOpen, setIsModalOpen }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOk = () => {
    setLoading(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <UpgradeModalStyled
        open={isModalOpen}
        title=''
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Cancel
          </Button>,

          <Button key='link' href='../pricing' type='primary' loading={loading} onClick={handleOk}>
            Upgrade Plan
          </Button>,
        ]}
      >
        <div className='upgrade-plan'>
          <div className='plan-title'>Upgrade Plan</div>
          <div className='plan-updates'>You have to reached the limit of your current plan</div>
        </div>
      </UpgradeModalStyled>
    </>
  );
};
export default UpgradeModal;
