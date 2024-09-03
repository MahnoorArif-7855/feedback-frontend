import { checkEmptyFilter } from '@/common/utils/func';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd';
import * as React from 'react';

import { FeedbackItemBadge, FeedbackItemCount, FeedbackItemText, FeedbackItemWrapper } from './styled';

const BADGE_COLORS = [
  '#DA4894',
  '#E44236',
  '#f6d205',
  '#ED9334',
  '#55BFC1',
  '#70C139',
  '#3476F9',
  '#6A36CB',
  '#3555E5',
  '#DA4894',
  '#EA632F',
  '#F0B13A',
  '#ABD73E',
];

export const DateRangeDropdown = ({ value, onChange }) => {
  const menu = React.useMemo(() => {
    return {
      onClick: ({ key }) => {
        onChange(key);
      },
      items: [
        {
          label: 'Past 7 days',
          key: 'week',
        },
        {
          label: 'Past 30 days',
          key: 'month',
        },
      ],
    };
  }, []);

  return (
    <Dropdown menu={menu}>
      <Button>
        <Space>
          {value === 'week' ? 'Past 7 days' : 'Past 30 days'}
          <DownOutlined style={{ color: '#777', width: 10 }} />
        </Space>
      </Button>
    </Dropdown>
  );
};

export const CardFeedbackItem = React.memo(function CardFeedbackitem({ index, keyword, onClickReference }) {
  const getBadgeColor = React.useCallback((refIndex) => {
    return BADGE_COLORS[refIndex % BADGE_COLORS.length];
  }, []);

  const content = keyword.replace('- ', '').split('[')[0];
  const references =
    (keyword.split('[')[1] &&
      keyword
        .split('[')[1]
        ?.replaceAll(/\s/g, '')
        .split(',')
        ?.filter(checkEmptyFilter)
        ?.map((char) => {
          return !isNaN(Number(char))
            ? char
            : Array.from(char)
                .filter((char) => !isNaN(Number(char)))
                .join('');
        })) ||
    [];

  return (
    <FeedbackItemWrapper>
      <FeedbackItemCount>{index + 1}</FeedbackItemCount>
      <FeedbackItemText>
        {content}
        <div style={{ display: 'inline-block' }}>
          {references.length
            ? references.map((refIndex) => (
                <FeedbackItemBadge
                  onClick={() => onClickReference(refIndex)}
                  key={refIndex}
                  style={{
                    borderColor: getBadgeColor(refIndex),
                    color: getBadgeColor(refIndex),
                    backgroundColor: getBadgeColor(refIndex) + '06',
                  }}
                >
                  {refIndex}
                </FeedbackItemBadge>
              ))
            : null}
        </div>
      </FeedbackItemText>
    </FeedbackItemWrapper>
  );
});
