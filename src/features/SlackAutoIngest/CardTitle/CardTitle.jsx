import { CardSubtitle, CardTitle } from '../SlackAutoIngest.styles';

const Title = ({ title, subtitle }) => {
  return (
    <CardTitle>
      <CardTitle level={5}>{title}</CardTitle>
      <CardSubtitle>{subtitle}</CardSubtitle>
    </CardTitle>
  );
};

export default Title;
