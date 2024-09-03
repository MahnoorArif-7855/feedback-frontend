import { SOURCES } from '@/common/utils/constant';
import categoryOptions from '@/common/utils/content/categoryOption';
import { intercomTeamNameInTag } from '@/common/utils/func';
import { markdownify, slackMarkdownify } from '@/common/utils/markdownify';
import { MoreOutlined } from '@ant-design/icons';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Typography } from 'antd';
import { format } from 'date-fns';
import * as React from 'react';
import styled from 'styled-components';

const { Text } = Typography;

const Wrapper = styled.div`
  background-color: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 12px 24px;
  .alg-highlight {
    color: ${({ theme }) => theme.token.colorPrimary};
    font-weight: bold;
  }
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
`;

const DropdownButton = styled(Button)`
  margin-left: auto;
`;

const menuItems = [
  {
    label: 'Delete',
    key: 'delete',
  },
];

export const FeedbackCard = ({
  content,
  discourseFeedback,
  highlightedContent,
  date,
  source,
  processed,
  category: categoryKey,
  onDelete: handleDelete,
  tags,
  channelId,
  onAutoIngest,
  autoIngestChannelNames,
  onClickFeedback,
  discourseCategoryName,
  intercomTeams,
}) => {
  const menuProps = {
    items: menuItems,
    onClick: ({ key }) => {
      switch (key) {
        case 'delete':
          handleDelete();
          break;
      }
    },
  };
  const category = categoryOptions.find(({ value }) => value === categoryKey)?.label;

  // God forgive me for this
  const _date = typeof date === 'string' && date.includes('T') ? new Date(date).getTime() : new Date(Number(date));

  const tagFormats = () => {
    const text = tags.join(',');

    return <Text style={{ color: '#f59b77' }}>{text}</Text>;
  };

  // const intercomTeamNameInTag = () => {
  //   const tag = tags;
  //   const filteredTeamNames =
  //     intercomTeams.length > 0 && intercomTeams.filter((team) => tag.includes(team.id)).map((team) => team.name);

  //   return <Text style={{ color: '#f59b77' }}>{filteredTeamNames ? filteredTeamNames.join(',') : null}</Text>;
  // };

  const slackFormatting = source === SOURCES.SLACK_AUTO_INGEST || source === SOURCES.SLACK;
  const discourseFomatting = source === SOURCES.DISCOURSE;

  React.useEffect(() => {
    if (source === SOURCES.SLACK_AUTO_INGEST && channelId) {
      const existingChannel = autoIngestChannelNames.find((channel) => channel.channelId === channelId);
      if (!existingChannel) {
        onAutoIngest(channelId);
      }
    }
  }, [channelId, source]);

  return (
    <Wrapper>
      <Top>
        <Typography.Paragraph type='secondary'>{format(_date, 'MMM d, y hh:mm a')}</Typography.Paragraph>
        <Divider type='vertical' />
        <Typography.Paragraph style={{ textTransform: 'capitalize' }}>
          {category || 'Uncategorized'}
        </Typography.Paragraph>
        <Divider type='vertical' />
        <Typography.Paragraph type='secondary' style={{ textTransform: 'capitalize' }}>
          Via {source}
        </Typography.Paragraph>
        <Divider type='vertical' />
        {source === SOURCES.SLACK_AUTO_INGEST && (
          <>
            <Typography.Paragraph type='secondary' style={{ textTransform: 'capitalize' }}>
              Channel :{' '}
              {autoIngestChannelNames &&
                autoIngestChannelNames?.find((channel) => channel.channelId === channelId)?.channelName}
            </Typography.Paragraph>
            <Divider type='vertical' />
          </>
        )}
        {source === SOURCES.DISCOURSE && discourseCategoryName && (
          <>
            <Typography.Paragraph type='secondary' style={{ textTransform: 'capitalize' }}>
              Discourse Category : {discourseCategoryName}
            </Typography.Paragraph>
            <Divider type='vertical' />
          </>
        )}
        {tags?.length > 0 && (
          <>
            <Typography.Paragraph type='secondary'>
              Tags:{' '}
              {source === SOURCES.INTERCOM ? (
                <Text style={{ color: '#f59b77' }}>{intercomTeamNameInTag({ tags, intercomTeams })}</Text>
              ) : (
                tagFormats()
              )}
            </Typography.Paragraph>
            <Divider type='vertical' />
          </>
        )}
        {processed ? (
          <span title='Processed'>
            <CheckCircleOutlined style={{ color: 'green' }} />
          </span>
        ) : (
          <span title='Processing'>
            <ClockCircleOutlined style={{ color: 'gray' }} />
          </span>
        )}
        <Dropdown menu={menuProps} placement='bottomRight'>
          <DropdownButton>
            <MoreOutlined />
          </DropdownButton>
        </Dropdown>
      </Top>

      {highlightedContent && highlightedContent?.feedback ? (
        // can use html-react-parser package also.
        <div dangerouslySetInnerHTML={{ __html: highlightedContent?.feedback?.value }} />
      ) : (
        <Typography.Paragraph
          ellipsis={{
            rows: 1,
            expandable: false,
          }}
          onClick={onClickFeedback}
          style={{ cursor: 'pointer', height: '1.25rem' }}
        >
          {slackFormatting ? slackMarkdownify(content) : discourseFomatting ? markdownify(discourseFeedback) : content}
        </Typography.Paragraph>
      )}
    </Wrapper>
  );
};
