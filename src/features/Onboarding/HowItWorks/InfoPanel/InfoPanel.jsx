import { Modal, Typography } from 'antd';
import React, { useState } from 'react';
import Youtube from 'react-youtube';

import { InfoPanelImagePlaceholder, VideoModal } from './InfoPanel.styles';

const { Title, Paragraph, Link } = Typography;

const InfoPanel = ({ title, description, linkLabel, video }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <InfoPanelImagePlaceholder />
      <Title level={5}>{title}</Title>
      <Paragraph>{description}</Paragraph>
      <Link onClick={handleModalOpen}>{linkLabel}</Link>
      <VideoModal
        open={isModalOpen}
        title=''
        footer={null}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        width={920}
        height={550}
      >
        <Youtube
          videoId={video}
          opts={{
            width: '920',
            height: '565',
          }}
        />
      </VideoModal>
    </div>
  );
};

export default InfoPanel;
