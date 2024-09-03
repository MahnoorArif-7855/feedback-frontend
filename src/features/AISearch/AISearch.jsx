import { ACTIVE_PLAN, AI_CHAT_INPUT, AI_CHAT_OUTPUT, PREMIUM_PLAN } from '@/common/utils/constant';
import { delay } from '@/common/utils/func';
import { FIND_FEEDBACKS_BY_ORGANIZATION_ID } from '@/state/graphQL/Mutation';
import { AIChatSlice, exploreSlice } from '@/state/redux/searchAI/searchSlice';
import { feedbacksDetail } from '@/state/redux/settings/settingSlice';
import { useMutation } from '@apollo/client';
import { Alert, Button, Skeleton } from 'antd';
import { Input } from 'antd';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';

import { firebaseAuth } from '../../../firebase';
import sendButtonIcon from '../../../public/images/icons/send-button.png';
import { AICardStyled } from './AISearch.styles';
import UpgradeModal from './UpgradeModal';
import DefaultSearchView from './overview/DefaultSearchView';
import SearchBox from './overview/SearchBox';

const { TextArea } = Input;

const AISearch = () => {
  const [user] = useAuthState(firebaseAuth);
  const { authDetails, searchLimitCounts, selectedOrganizationId } = useSelector((state) => state.auth);
  const { chatResponse } = useSelector((state) => state.search);

  const messagesEndRef = useRef(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDataFetching, setIsDataFetching] = useState(false);

  const dispatch = useDispatch();

  const { search_limit_user_only, userSearchCount, organizationId, organizationDetails, userId, userName, email } =
    authDetails || {
      organizationId: null,
      organizationDetails: [],
      search_limit_user_only: false,
      userSearchCount: null,
      email: '',
    };

  const organizationInfo = organizationDetails && organizationDetails[0];
  const { plan, searchCount, status, allowPaidPlan } = organizationInfo || {
    plan: null,
    status: null,
    searchCount: null,
  };

  const { pricing } = searchLimitCounts || { pricing: null };

  const [findFeedbackByOrganizationId] = useMutation(FIND_FEEDBACKS_BY_ORGANIZATION_ID, {
    onCompleted: (data) => {
      dispatch(feedbacksDetail(data?.feedbacksByOrganizationId));
    },
    onError: (error) => {
      console.error('Error occured fetching feedbacks by org id:', error);
    },
  });

  useEffect(() => {
    findFeedbackByOrganizationId({
      variables: {
        organizationId: selectedOrganizationId ? selectedOrganizationId : organizationId,
      },
    });
  }, []);

  useEffect(() => {
    if (chatHistory && chatHistory.length > 1 && chatResponse) {
      const updateHistory = {
        displayType: AI_CHAT_OUTPUT,
        text: chatResponse.text, //api response text message
        refMongoDocumentId: chatResponse.refMongoDocumentId,
        loading: false,
      };
      const updateLoadingChat = chatHistory.filter(({ loading }) => loading !== true);
      setChatHistory([...updateLoadingChat, updateHistory]);
      scrollToBottom(400);
    }
  }, [chatResponse]);

  const scrollToBottom = async (timerDelay) => {
    await delay(timerDelay);
    const scroll = messagesEndRef.current.scrollHeight - messagesEndRef.current.clientHeight;

    messagesEndRef.current.scrollTo({
      top: scroll + 200,
      behavior: 'smooth',
      block: 'end',
    });
  };

  const onSearchInput = (e) => {
    const inputSearchValue = e.target.value;
    setSearchInput(inputSearchValue); // user input
  };

  const totalSearchLimit = plan !== PREMIUM_PLAN ? pricing?.freePlanWordsCount : pricing?.premiumPlanWordsCount;
  const searchLimit = !search_limit_user_only ? totalSearchLimit : userSearchCount;

  const onSearchEnter = React.useCallback(() => {
    // dispatch to call  api
    // searchInput -user text for api

    if ((searchCount < searchLimit || allowPaidPlan) && ACTIVE_PLAN.includes(status)) {
      dispatch(
        AIChatSlice({
          q: searchInput,
          organizationId: selectedOrganizationId ? selectedOrganizationId : organizationId,
          user,
          userId,
          userName,
        })
      );

      const updateChat = [
        {
          displayType: AI_CHAT_INPUT,
          text: searchInput,
          loading: false,
        },
        {
          displayType: AI_CHAT_OUTPUT,
          text: null,
          refMongoDocumentId: null,
          loading: true,
        },
      ];

      chatHistory && chatHistory.length > 0
        ? setChatHistory([...chatHistory, ...updateChat])
        : setChatHistory([...updateChat]);

      scrollToBottom(100);
      setSearchInput('');
      // dispatch(selectOrganizationId(null));
    } else {
      setIsModalOpen(true);
    }
  }, [
    searchCount,
    searchLimit,
    allowPaidPlan,
    status,
    dispatch,
    searchInput,
    selectedOrganizationId,
    organizationId,
    user,
    userId,
    userName,
    chatHistory,
  ]);

  const handleEnterKeyDown = React.useCallback(
    (e) => {
      if (e.key === 'Enter' && searchInput.length > 0) {
        onSearchEnter();
        e.preventDefault();
      }
    },
    [onSearchEnter, searchInput.length]
  );

  return (
    <div>
      <AICardStyled>
        <div className='output-section' ref={messagesEndRef}>
          {chatHistory && Array.isArray(chatHistory) && chatHistory.length > 0 ? (
            chatHistory.map(({ displayType, text, refMongoDocumentId, loading }, index) => {
              return (
                <SearchBox
                  key={`search-${index}`}
                  displayType={displayType}
                  text={text}
                  index={index}
                  loading={loading}
                  refMongoDocumentId={refMongoDocumentId}
                />
              );
            })
          ) : (
            <DefaultSearchView />
          )}
        </div>
        <div className='input-section'>
          <div className='input-textbox'>
            <TextArea
              bordered={false}
              rows={2}
              placeholder='Ask Anything'
              onChange={onSearchInput}
              value={searchInput}
              autoFocus
              onKeyDown={handleEnterKeyDown}
            />
          </div>
          <Button
            disabled={searchInput.length === 0 || false}
            className='send-button'
            onClick={onSearchEnter}
            icon={<Image alt='search-image' className='edit-user' height={30} width={30} src={sendButtonIcon} />}
          />
        </div>
        <div className='search-limit'>
          You used {searchCount || 0} searches of {searchLimit || 'n/a'} limit.{' '}
          {plan === 'free' && (
            <a href='#' onClick={setIsModalOpen}>
              Upgrade now
            </a>
          )}
        </div>
      </AICardStyled>
      <UpgradeModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default AISearch;
