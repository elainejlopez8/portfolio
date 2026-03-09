/* eslint-disable react/prop-types */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

type Props = {
  source: string | null | undefined;
};

export default function Markdown({ source }: Props) {
  if (!source) return null;

  const sanitizeSchema = {
    attributes: {
      '*': ['class', 'className'],
    },
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkBreaks]}
      rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
      components={{
        a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
          <a {...props} target={props.target ?? '_blank'} rel='noopener noreferrer' />
        ),
        h2: (props) => <h2 {...props} />,
        div: (props) => <div {...props} />,
        p: (props) => <p {...props} />,
      }}>
      {source}
    </ReactMarkdown>
  );
}
