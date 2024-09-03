import { Button } from 'antd';

import Container from '../Container';
import Navigation from '../Navigation';
import { ONBOARDING_PAGE_2 } from '../constants';

const Summary = () => (
  <Container
    title="Let's get started"
    footer={<Navigation prevPage={ONBOARDING_PAGE_2} nextPage={'/dashboard'} isFinalStep />}
  >
    Summary
  </Container>
);

export default Summary;
