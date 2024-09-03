import { Button } from 'antd';

import Container from '../Container';
import Navigation from '../Navigation';
import { ONBOARDING_PAGE_1, ONBOARDING_PAGE_3 } from '../constants';

const AddFeedbacks = () => (
  <Container
    title="Let's get started"
    footer={<Navigation prevPage={ONBOARDING_PAGE_1} nextPage={ONBOARDING_PAGE_3} />}
  >
    Integrations & manual add
  </Container>
);

export default AddFeedbacks;
