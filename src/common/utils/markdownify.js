import { marked } from 'marked';

import htmlToReact from './htmlToReact';

// import { escapeForSlack, escapeForSlackWithMarkdown } from 'slack-to-html'

const markdownify = (markdown) => {
  if (!markdown) {
    return null;
  }
  return htmlToReact(marked(markdown));
};

function slackMarkdownify(markdown) {
  // Convert Slack-formatted links
  const slackLinkRegex = /<([^>]+)>/g;
  let html = markdown.replace(slackLinkRegex, (match, content) => {
    const parts = content.split('|');
    const link = parts[0];
    const text = parts[1] || link;
    return `<a href="${link}" target="_blank"><b>${text}</b></a>`;
  });

  // Apply bold formatting
  html = html.replace(/\*(.+?)\*/g, '<b>$1</b>');

  // Replace newlines with line breaks
  html = html.replace(/\n/g, '<br>');

  // Apply italic formatting
  html = html.replace(/\_(.+?)\_/g, '<i>$1</i>');

  // Apply strikethrough formatting
  html = html.replace(/\~(.+?)\~/g, '<s>$1</s>');

  // Convert Slack-style bullet points at the beginning of sentences to HTML bullet points
  html = html.replace(/(?:^|<br>)([-*]\s+)(.*?)(?=<br>[-*]\s+|$)/g, '<ul><li>$2</li></ul>');

  // Convert Markdown-style links
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');

  // Convert the final HTML to React if needed (assuming htmlToReact function exists)
  // html = htmlToReact(html);

  return htmlToReact(html);
}

export { markdownify, slackMarkdownify };
