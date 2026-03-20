import type { MarkdownProps } from '@/types';
import type React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

export default function Markdown(props: MarkdownProps) {
  const { source } = props;
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
        h1: (props) => <h1 {...props} />,
        h2: (props) => <h2 {...props} />,
        div: (props) => <div {...props} />,
        p: (props) => <p {...props} />,
        span: (props) => <span {...props} />,
        ul: (props) => <ul {...props} />,
        li: (props) => <li {...props} />,
      }}>
      {source}
    </ReactMarkdown>
  );
}
