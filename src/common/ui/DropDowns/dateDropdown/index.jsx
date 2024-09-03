import { BACKEND_DATE_FORMAT, US_DATE_FORMAT, timeInSeconds } from '@/common/utils/constant';
import { DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';

const { RangePicker } = DatePicker;

const DateDropDown = ({ setDateFilterData, currentDateTo, currentDateFrom, oneMonth, style, disabled }) => {
  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      const fromDate = dayjs(dateStrings[0], US_DATE_FORMAT).format(BACKEND_DATE_FORMAT);
      const toDate = dayjs(dateStrings[1], US_DATE_FORMAT).format(BACKEND_DATE_FORMAT);

      setDateFilterData([fromDate, toDate]);
    } else {
      const from = dayjs(dateStrings[0], US_DATE_FORMAT).format(BACKEND_DATE_FORMAT);
      const to = dayjs(dateStrings[1], US_DATE_FORMAT).format(BACKEND_DATE_FORMAT);

      setDateFilterData([from, to]);
    }
  };
  const disabledDate = (current) => {
    return current && current > dayjs().endOf('day');
  };
  const disabledOneMonthDate = (current) => {
    const dayPastThirtyDays = dayjs().subtract(30, 'day');

    return current < dayPastThirtyDays || current > dayjs();
  };

  const defaultFrom = dayjs(currentDateFrom, BACKEND_DATE_FORMAT);
  const defaultTo = dayjs(currentDateTo, BACKEND_DATE_FORMAT);

  return (
    <RangePicker
      onChange={onRangeChange}
      disabledDate={oneMonth ? disabledOneMonthDate : disabledDate}
      value={[defaultFrom, defaultTo]}
      format={US_DATE_FORMAT}
      style={style}
      allowClear={false}
      disabled={disabled}
    />
  );
};

export default DateDropDown;
