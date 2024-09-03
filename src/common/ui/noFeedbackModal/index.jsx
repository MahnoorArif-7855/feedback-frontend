/* eslint-disable no-useless-escape */
import { Typography } from 'antd';

import ModalStyled, { ModalHeaderStyled } from './styles';

const { Text, Title } = Typography;

const NoFeedbackModal = ({ isModalOpen, setIsModalOpen }) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ModalHeaderStyled
        title={
          <Title className='feedback-detail-title' level={3}>
            Feedback details
          </Title>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={700}
      >
        <ModalStyled>
          <Text className='feedback-text'>{'No Data Found'}</Text>
        </ModalStyled>
      </ModalHeaderStyled>
    </>
  );
};
export default NoFeedbackModal;
