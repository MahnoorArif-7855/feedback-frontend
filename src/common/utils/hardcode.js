export const SignInResponse = {};

export const exploreList = [
  { type: 'churn', category: 'Churn', order: 1 },
  { type: 'features', category: 'Features', order: 2 },
  { type: 'bugs', category: 'Bugs', order: 3 },
  { type: 'positive', category: 'Positive', order: 4 },
  { type: 'negative', category: 'Negative', order: 5 },
];

export const exploreDummyData = [
  {
    heading: 'Most Mentioned Topics',
    keywords: [
      '- User interface (UI) and user experience (UX)',
      '- Log tracking and cost savings',
      '- Centralized data collection',
      '- Ease of use',
      '- Data visualizations',
      '- Financial benefits',
      '- Server failures and issue identification',
      '- Search functionality',
    ],
  },
  {
    heading: 'Specific suggestions',
    keywords: [
      '- Add tutorials and how-to guides to help users familiarize themselves with the platform',
      '- Improve the search function, especially when working with date ranges',
      '- Enhance the speed of log parsing',
      '- Consider adding regex functionality',
      '- Improve the top UI bar for easier comprehension and navigation',
    ],
  },
  {
    heading: 'Most Mentioned Issues',
    keywords: [
      '- Difficulty in navigating logs when they are massive',
      '- Challenges with the search function, especially when working with date ranges',
      '- Slow response time for log parsing',
      '- Limitations with regex usage',
      '- Need for better tutorials and guides',
    ],
  },

  {
    heading: 'Satisfaction Level',
    keywords: ['- Generally satisfied with the product/service/experience mentioned in the feedbacks'],
  },
];
export const sentimentsDummyData = [
  {
    positive: {
      count: 20,
      percentage: 83.33,
    },
  },
  {
    negative: {
      count: 3,
      percentage: 12.5,
    },
  },
  {
    neutral: {
      count: 1,
      percentage: 4.17,
    },
  },
];

export const blogSlugs = [
  'transform-feedback-to-product-decisions',
  'build-products-that-customers-love',
  'managing-churn-maximing-profit',
];

export const blogImage = (slug) => {
  if (blogSlugs.includes(slug)) {
    return `/images/blog/${slug}.jpg`;
  } else {
    return '/images/blog/build-products-that-customers-love.jpg';
  }
};
