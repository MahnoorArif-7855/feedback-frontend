import { gql } from '@apollo/client';

export const LOAD_USERS = gql`
  query {
    getAllUsers {
      userId
      organizationId
      userName
      searchCount
      email
      customerId
      plan
    }
  }
`;

export const GET_FEEDBACK_TAGS = gql`
  query GetFeedbackTags($organizationId: String!) {
    getFeedbackTags(organizationId: $organizationId) {
      organizationId
      tags
    }
  }
`;

export const GET_ORGANIZATIONS = gql`
  query GET_ORGANIZATIONS {
    getOrganizations {
      allowPaidPlan
      plan
      organizationName
      organizationId
    }
  }
`;
export const FIND_FEEDBACKS_BY_ORG_ID = gql`
  query FIND_FEEDBACKS_BY_ORG_ID($organizationId: String!) {
    findFeedbacksByOrganizationId(organizationId: $organizationId) {
      organizationId
      weaviate
      weaviateId
    }
  }
`;

export const GET_BLOGS = gql`
  query GET_BLOGS {
    getBlogs {
      description
      subtitle
      title
      slug
      userId
      image_url
    }
  }
`;

export const GET_BLOGS_BY_ID = gql`
  query GET_BLOGS_BY_ID($slug: String!) {
    getBlogById(slug: $slug) {
      description
      subtitle
      title
      slug
      userId
      date
      image_url
    }
  }
`;

export const GET_FEEDBACKS_BY_USER = gql`
  query GET_FEEDBACKS_BY_USER(
    $tags: [String]
    $categories: [String]
    $from: String
    $to: String
    $organizationId: String
    $sources: [String]
    $page: Int
    $perPage: Int
  ) {
    findFeedbackByUser(
      tags: $tags
      organizationId: $organizationId
      categories: $categories
      from: $from
      to: $to
      sources: $sources
      page: $page
      perPage: $perPage
    ) {
      _id
      organization
      organizationId
      userId
      date
      feedback
      category
      tags
      source
      channelId
      zendeskComment
      zendeskTags
      weaviateId
      weaviate
      discourseCategoryName
      discourseFeedback
    }
  }
`;

export const GET_TOTAL_FEEDBACKS = gql`
  query GET_TOTAL_FEEDBACKS(
    $organizationId: String!
    $categories: [String]
    $sources: [String]
    $tags: [String]
    $from: String!
    $to: String!
  ) {
    findTotalFeedbackByUser(
      organizationId: $organizationId
      categories: $categories
      sources: $sources
      tags: $tags
      from: $from
      to: $to
    )
  }
`;
