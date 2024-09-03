import FeedbackModal from '@/common/ui/Modal';
import NoFeedbackModal from '@/common/ui/noFeedbackModal';
import { AI_CHAT_INPUT } from '@/common/utils/constant';
import { getInitials } from '@/common/utils/func';
import { searchModalSlice } from '@/state/redux/searchAI/searchSlice';
import { Avatar, Collapse, Typography } from 'antd';
import Image from 'next/image';
import React from 'react';
import { useState } from 'react';
import { Bars } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';

import robotIcon from '../../../../public/images/icons/chip.png';
import { SearchBoxStyled } from '../AISearch.styles';

const { Link, Text } = Typography;

const SearchBox = ({ loading, text, refMongoDocumentId, displayType }) => {
  const { authDetails } = useSelector((state) => state.auth);
  const { userName, email } = authDetails || { userName: null, email: null };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const { searchFeedback } = useSelector((state) => state.search);

  let displayContentDataOutput = '';
  if (text) {
    displayContentDataOutput = text;
  }

  const dispatch = useDispatch();
  const showModal = () => {
    setIsModalOpen(true);
    setIsFeedbackModalOpen(true);
  };
  const showReferenceDocData = async (mongoId) => {
    await dispatch(searchModalSlice({ mongoId }));
    showModal();
  };

  const renderListItem = (dataContent, document_ids) => {
    const dataList = dataContent.split('\n');

    return dataList.map((dataContent, index) => {
      const keywordSplit = dataContent.split('[');
      const arrayString = keywordSplit[1]?.slice(0, -1);
      const array = arrayString ? arrayString.split(',').map(Number) : [];

      const linkElements = array.map((num, index) => {
        const docId = document_ids[num - 1];
        if (!Number.isNaN(num)) {
          return (
            <React.Fragment key={index}>
              <Link onClick={() => showReferenceDocData(docId)}>{num}</Link>
              {index !== array.length - 1 && ' ,'}
            </React.Fragment>
          );
        } else {
          return;
        }
      });

      const hasLinkElements = linkElements.filter(Boolean);

      return (
        <>
          <Text key={`${index}-ai`}>
            {`${keywordSplit[0]}`}
            {hasLinkElements.length > 0 && '['}
            {linkElements}
            {hasLinkElements.length > 0 && ']'}
          </Text>
          <br />
        </>
      );
    });
  };

  return (
    <SearchBoxStyled displayType={displayType}>
      {displayType === AI_CHAT_INPUT ? (
        <Avatar size={40} style={{ backgroundColor: '#f28c6f', color: '#fff' }} shape='circle'>
          {getInitials(userName || email)}
        </Avatar>
      ) : (
        <Image
          height={40}
          width={50}
          className='robot-avatar'
          style={{ height: '3rem' }}
          src={robotIcon}
          alt={name.charAt(0).toUpperCase()}
        />
      )}
      {loading && (
        <div className='loading-box'>
          <Bars
            height='30'
            width='30'
            color='#f28c6f'
            ariaLabel='bars-loading'
            wrapperStyle={{}}
            wrapperClass=''
            visible={loading}
          />
        </div>
      )}

      {!loading && text && (
        <div className='text-box'>
          <div className={`text-ai-search`}>
            {displayType === AI_CHAT_INPUT
              ? displayContentDataOutput
              : renderListItem(displayContentDataOutput, refMongoDocumentId)}
          </div>
        </div>
      )}
      {searchFeedback && (
        <FeedbackModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          contentInfo={searchFeedback}
          intercomTeams={[]}
        />
      )}
      {!searchFeedback && <NoFeedbackModal isModalOpen={isFeedbackModalOpen} setIsModalOpen={setIsFeedbackModalOpen} />}
    </SearchBoxStyled>
  );
};

export default SearchBox;
