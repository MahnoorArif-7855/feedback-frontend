import ReactGA from 'react-ga4';

const customEvent = (category, customDimensions) => {
  ReactGA.gtag('event', category, {
    ...customDimensions,
  });
};

export default customEvent;
