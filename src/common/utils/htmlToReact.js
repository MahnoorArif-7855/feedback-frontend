import Script from 'next/script';
import React from 'react';
import ReactHtmlParser, { Transform, convertNodeToElement } from 'react-html-parser';

import Link from './link';

const convertChildren = (children, index, transform) =>
  children.map((childNode) => convertNodeToElement(childNode, index, transform));

export default function htmlToReact(html) {
  if (!html) {
    return null;
  }
  return ReactHtmlParser(html, {
    transform: (node, index, transform) => {
      if (node.type === 'script') {
        if (!node.children.isEmpty()) {
          return (
            <Script key={index} {...node.attribs}>
              {convertChildren(node.children, index, transform)}
            </Script>
          );
        } else {
          return <Script key={index} {...node.attribs} />;
        }
      } else if (node.type === 'tag' && node.name === 'a') {
        // const href = node.attribs.href;
        // const props = delete node.attribs.href;
        const { href, ...props } = node.attribs;

        // use Link only if there are no custom attributes like style, class, and what's not that might break react
        // if (props.isEmpty()) {
        if (Object.keys(props).length === 0) {
          return (
            <Link key={index} href={href} {...props}>
              {convertChildren(node.children, index, transform)}
            </Link>
          );
        }
      }
    },
  });
}
