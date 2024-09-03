import { Col, Row } from 'antd';
import React from 'react';

import BillingCard from '../BillingCard';
import { CardStyled } from '../Pricing.styles';

const BillingPlan = ({ userId, component }) => {
  const emailLink = () => {
    const link = (
      <a style={{ color: '#3366CC' }} href='mailto:support@feedbacksync.co'>
        support@feedbacksync.co
      </a>
    );
    const text = 'Contact us at support@feedbacksync.co';
    const res = text.split(' ').reduce((acc, curr) => {
      if (curr === 'support@feedbacksync.co') {
        return [...acc, link];
      }
      return [...acc, ` ${curr} `];
    }, []);
    return <>{res}</>;
  };

  const SubscriptionDetails = [
    {
      Id: 'free',
      planTitle: '14 Day Trial',
      price: '$0 ',
      features: 'Extracting insights from support threads and customer interviews has never been easier.',
      desc: 'Parturient sem felis a feugiat rutrum facilisis class accumsan a posuere a viverra class torquent a a mi. Nascetur morbi magnis eu parturient per condimentum.',
      featureList: [
        'No Seat Based Pricing',
        'Unlimited users',
        'Weekly User Analysis',
        'End to end digital library for customer feedback',
        '10 free AI searches per month',
        'Keyword search',
        'Custom tags',
      ],
    },
    {
      Id: 'premium',
      planTitle: 'Professional',
      price: '$99',
      features: 'Search across a library of customer insights using keywords, AI search and custom tags.',
      desc: 'Parturient sem felis a feugiat rutrum facilisis class accumsan a posuere a viverra class torquent a a mi. Nascetur morbi magnis eu parturient per condimentum.',
      featureList: ['No Seat Based Pricing', 'Unlimited users', 'Weekly User Analysis', '100 AI Searches per month'],
    },
    {
      Id: 'enterprise',
      planTitle: 'Enterprise',
      price: 'Custom Pricing',
      features:
        'Built to deliver insights directly into your enterprise Slack instance. No more context switching across tools.',
      desc: 'Parturient sem felis a feugiat rutrum facilisis class accumsan a posuere a viverra class torquent a a mi. Nascetur morbi magnis eu parturient per condimentum.',
      featureList: [
        'Unlimited users',
        'Unlimited searches',
        'Enterprise parent/child account structure',
        '500+ employees',
        'Partnership opportunities',
        emailLink(),
      ],
    },
  ];

  return (
    <CardStyled>
      <Row gutter={[16, 16]}>
        {SubscriptionDetails &&
          Array.isArray(SubscriptionDetails) &&
          SubscriptionDetails.map(({ desc, planTitle, price, featureList, Id, features }, index) => {
            return (
              <Col sm={24} md={24} lg={8} xl={8} xxl={8} key={index}>
                <BillingCard
                  SubscriptionPlan={planTitle}
                  planDesc={desc}
                  price={price}
                  id={Id}
                  featureList={featureList}
                  userId={userId}
                  features={features}
                  component={component}
                />
              </Col>
            );
          })}
      </Row>
    </CardStyled>
  );
};

export default BillingPlan;
