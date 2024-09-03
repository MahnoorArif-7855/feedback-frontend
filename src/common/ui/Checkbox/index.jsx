import { Card, Checkbox, Divider, Typography } from 'antd';

import { CheckBoxStyled } from './styled';

const CheckboxGroup = Checkbox.Group;

const { Text, Title } = Typography;

const CheckBox = ({ checkedList, setCheckedList, Options }) => {
  const onChange = (list) => {
    setCheckedList(list);
  };

  return (
    <>
      <Card
        style={{
          boxShadow: `0px 0px 12px -9px rgb(23 23 23 / 52%)`,
        }}
      >
        <CheckBoxStyled>
          <Title level={5} className='category-title' strong>
            Categories:
          </Title>
          <CheckboxGroup
            style={{
              width: '100%',
              gap: '3%',
            }}
            className='checkbox-group'
            options={Options}
            value={checkedList}
            onChange={onChange}
          />
        </CheckBoxStyled>
      </Card>
    </>
  );
};
export default CheckBox;
