/* eslint-disable no-useless-escape */
import { SOURCES } from '@/common/utils/constant';
import { capitalizeFirstLetter, intercomTeamNameInTag } from '@/common/utils/func';
import { markdownify, slackMarkdownify } from '@/common/utils/markdownify';
import { feedbackSummary } from '@/state/redux/searchAI/searchSlice';
import { Col, Divider, List, Row, Skeleton, Tag, Typography } from 'antd';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

import categoryOptions from '../../utils/content/categoryOption.json';
import ModalStyled, { ModalHeaderStyled } from './styles';

const { Text, Title } = Typography;

const FeedbackModal = ({ isModalOpen, setIsModalOpen, contentInfo, showSummary, summaryResponse, intercomTeams }) => {
  const { feedback, category, source, organization, _id, sourceData, tags, zendeskComment, date, _highlightResult } =
    contentInfo || {
      feedback: null,
      category: null,
      source: null,
      organization: null,
      _id: null,
      sourceData: null,
      tags: null,
      zendeskComment: null,
      date: null,
      _highlightResult: null,
    };
  const dispatch = useDispatch();
  const categories = categoryOptions.find(({ value }) => value === category)?.label;

  const comments = zendeskComment?.split('\n\n');
  const dateFormate = new Date(Number(date)).toDateString();

  const RefURL = source === 'g2' ? sourceData?.g2 : source === SOURCES.ZENDESK ? sourceData?.zendesk : null;
  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(feedbackSummary(null));
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    dispatch(feedbackSummary(null));
  };

  const bulletPoints = summaryResponse && summaryResponse.split('\n').filter((point) => point.trim() !== '');

  const slackFormattingForModal = source === SOURCES.SLACK_AUTO_INGEST || source === SOURCES.SLACK;

  const zendeskTags = sourceData.zendesk.tags || [];

  return (
    <>
      <ModalHeaderStyled
        title={
          <Title className='feedback-detail-title' level={3}>
            Feedback details
          </Title>
        }
        destroyOnClose={true}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <ModalStyled>
          <div className='feedback-container'>
            <Row>
              <Col xs={8} lg={6}>
                <Text className='feedback-text'>{'Category:'}</Text>
              </Col>
              <Col xs={16} lg={18}>
                <Text className='feedback-desc'>{categories}</Text>
              </Col>
            </Row>
            {source && (
              <Row>
                <Col xs={8} lg={6}>
                  <Text className='feedback-text'>{'Source:'}</Text>
                </Col>
                <Col xs={16} lg={18}>
                  <Text className='feedback-desc'>{capitalizeFirstLetter(source)}</Text>
                </Col>
              </Row>
            )}
            <Row>
              <Col xs={8} lg={6}>
                <Text className='feedback-text'>{'Customer Id:'}</Text>
              </Col>
              <Col xs={16} lg={18}>
                <Text className='feedback-desc'>{organization}</Text>
              </Col>
            </Row>
            {RefURL && (
              <>
                <Row>
                  <Col xs={8} lg={6}>
                    <Text className='feedback-text'>{'Document Id:'}</Text>
                  </Col>
                  <Col xs={16} lg={18}>
                    <Text className='feedback-desc'>{_id}</Text>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col xs={8} lg={6}>
                    <Text className='feedback-text'>{'Reference'}</Text>
                  </Col>
                  <Col xs={16} lg={18}>
                    <Link className='feedback-desc' href={RefURL ? RefURL?.url : '#'} target='_blank'>
                      {RefURL?.url}
                    </Link>
                  </Col>
                </Row>
              </>
            )}
            {source === SOURCES.ZENDESK && zendeskTags?.length ? (
              <Row>
                <Col xs={8} lg={6}>
                  <Text className='feedback-text'>{'Tags:'}</Text>
                </Col>
                <Col xs={16} lg={18}>
                  {zendeskTags?.map((tag) => (
                    <Tag key={tag} closable={false}>
                      {tag}
                    </Tag>
                  ))}
                </Col>
              </Row>
            ) : (
              <Row>
                <Col xs={8} lg={6}>
                  <Text className='feedback-text'>{'Tags:'}</Text>
                </Col>
                <Col xs={16} lg={18}>
                  {tags?.length > 0 && source === SOURCES.INTERCOM ? (
                    <Tag key={SOURCES.INTERCOM} closable={false}>
                      {intercomTeamNameInTag({ tags, intercomTeams })}
                    </Tag>
                  ) : (
                    tags?.map((tag) => (
                      <Tag key={tag} closable={false}>
                        {tag}
                      </Tag>
                    ))
                  )}
                </Col>
              </Row>
            )}
            <Row>
              <Col xs={8} lg={6}>
                <Text className='feedback-text'>{'Date:'}</Text>
              </Col>
              <Col xs={16} lg={18}>
                <Text className='feedback-desc'>
                  {dateFormate === 'Invalid Date' ? new Date(date).toDateString() : dateFormate}
                </Text>
              </Col>
            </Row>
          </div>

          <Divider />
          {showSummary && (
            <>
              <Skeleton loading={summaryResponse ? false : true} active>
                {summaryResponse && (
                  <>
                    <Text className='feedback-text'>{'Summary'}</Text>
                    {bulletPoints &&
                      bulletPoints.map((point, index) => (
                        <List key={index} className='content_text'>
                          {point}
                        </List>
                      ))}
                  </>
                )}
              </Skeleton>
              <Divider />
            </>
          )}
          {source === SOURCES.ZENDESK ? (
            <div className='content'>
              <Text className='feedback-text'>{'Comments:'}</Text>
              {comments?.map((com, index) => (
                <Text key={index} className='content__comment_text'>
                  {com.replace(/\&nbsp;/g, '')}
                </Text>
              ))}
            </div>
          ) : (
            <div className='content'>
              <Text className='feedback-text'>{'Feedback Text:'}</Text>
              {slackFormattingForModal ? (
                _highlightResult && _highlightResult?.feedback ? (
                  <div dangerouslySetInnerHTML={{ __html: _highlightResult?.feedback?.value }} />
                ) : (
                  <Text className='content_text'>{slackMarkdownify(feedback)}</Text>
                )
              ) : (
                <span>
                  {_highlightResult && _highlightResult?.feedback ? (
                    <div dangerouslySetInnerHTML={{ __html: _highlightResult?.feedback?.value }} />
                  ) : (
                    <Text className='content_text'>{markdownify(feedback)}</Text>
                  )}
                </span>
              )}
            </div>
          )}
        </ModalStyled>
      </ModalHeaderStyled>
    </>
  );
};
export default FeedbackModal;
