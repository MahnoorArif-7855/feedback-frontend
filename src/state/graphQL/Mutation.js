import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($name: String!, $email: String!, $uid: String!, $providerId: String!) {
    createUser(name: $name, email: $email, uid: $uid, providerId: $providerId) {
      id
      name
      email
      uid
      providerId
    }
  }
`;

export const FIND_USER = gql`
  mutation FindUserInfo($uid: String) {
    findUserInfo(uid: $uid) {
      userId
      organizationId
      userName
      email
      type
      search_limit_user_only
      userSearchCount
      organizationDetails {
        searchCount
        organizationId
        organizationName
        status
        plan
        customerId
        appInstallation
        appStatus
        userId
        allowPaidPlan
        discourseSecretKey
        zendeskSubDomain
        zendeskSecretKey
        intercomAppId
        intercomAccessToken
        zendeskEmail
        zendeskAPIToken
        newOrgBilling
      }
    }
  }
`;

export const FIND_ORGANIZATION = gql`
  mutation FindOrganizationInfo($organizationId: String) {
    findOrganizationInfo(organizationId: $organizationId) {
      organizationName
      organizationId
      customerId
      searchCount
      plan
      status
      appInstallation
      allowPaidPlan
      automatic_update_channel_Id
      automatic_update_channel_name
      discourseSecretKey
      zendeskSubDomain
      zendeskSecretKey
      intercomAppId
      intercomAccessToken
      zendeskEmail
      zendeskAPIToken
      newOrgBilling
    }
  }
`;

export const FIND_FEEDBACKS_BY_ORGANIZATION_ID = gql`
  mutation FIND_FEEDBACKS_BY_ORGANIZATION_ID($organizationId: String) {
    feedbacksByOrganizationId(organizationId: $organizationId) {
      _id
      organization
      userId
      gptOutput
      weaviate
      weaviateId
    }
  }
`;
export const FIND_FILTER_FEEDBACKS_BY_ORGANIZATION_ID = gql`
  mutation FIND_FILTER_FEEDBACKS_BY_ORGANIZATION_ID(
    $tags: [String]
    $categories: [String]
    $from: String
    $to: String
    $organizationId: String
    $sources: [String]
  ) {
    filterFeedbacksByOrganizationId(
      tags: $tags
      organizationId: $organizationId
      categories: $categories
      from: $from
      to: $to
      sources: $sources
    ) {
      _id
      organization
      userId
      gptOutput
      weaviate
      weaviateId
    }
  }
`;

export const FIND_FILTER_FEEDBACKS = gql`
  mutation FindfilterFeedback(
    $tags: [String]
    $categories: [String]
    $from: String
    $to: String
    $organizationId: String
    $sources: [String]
    $page: Int
    $perPage: Int
  ) {
    findFilterFeedbacks(
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

export const FIND_FEEDBACK_COMMENTS = gql`
  mutation FIND_FEEDBACK_COMMENTS($feedbackId: String) {
    findZendeskComments(feedbackId: $feedbackId) {
      comment
      ticketId
      feedbackId
    }
  }
`;

export const UPDATE_TAGS = gql`
  mutation UPDATE_TAGS($organizationId: String!, $tags: [String]) {
    findTagsAndUpdate(tags: $tags, organizationId: $organizationId) {
      tags
    }
  }
`;

export const ADD_BLOG = gql`
  mutation ADD_BLOG(
    $userId: String
    $date: String
    $slug: String
    $description: String
    $title: String
    $subtitle: String
    $image_url: String
  ) {
    addBlog(
      userId: $userId
      date: $date
      slug: $slug
      description: $description
      title: $title
      subtitle: $subtitle
      image_url: $image_url
    ) {
      slug
    }
  }
`;
export const UPDATE_BLOG = gql`
  mutation UPDATE_BLOG($slug: String, $description: String, $title: String, $subtitle: String, $image_url: String) {
    updateBlog(slug: $slug, description: $description, title: $title, subtitle: $subtitle, image_url: $image_url) {
      slug
    }
  }
`;

export const UPDATE_ORGANIZATION = gql`
  mutation UPDATE_ORGANIZATION($organizationId: String!, $allowPaidPlan: Boolean!) {
    updateOrganization(allowPaidPlan: $allowPaidPlan, organizationId: $organizationId) {
      allowPaidPlan
      organizationId
      organizationName
      plan
    }
  }
`;

export const UPDATE_ORGANIZATION_CHANNEL_ID = gql`
  mutation UPDATE_ORGANIZATION_CHANNEL_ID($organizationId: String!, $channelId: String!, $channelName: String!) {
    updateOrganizationChannelId(
      automatic_update_channel_Id: $channelId
      automatic_update_channel_name: $channelName
      organizationId: $organizationId
    ) {
      organizationName
      organizationId
      customerId
      searchCount
      plan
      status
      appInstallation
      allowPaidPlan
      automatic_update_channel_Id
      automatic_update_channel_name
    }
  }
`;
