import React from 'react';
import ReactMarkdown from 'react-markdown';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'


const _mapProps = (props) => ({
  ...props,
  remarkPlugins: [
    remarkMath
  ],
  rehypePlugins: [
    rehypeHighlight,rehypeKatex
  ],
  components: {
    ...props.components,
    math: ({ value }) => <InlineMath>\int_0^\infty x^2 dx</InlineMath>,
    inlineMath: ({ value }) => <InlineMath>\int_0^\infty x^2 dx</InlineMath>,
  }
});

const Markdown = (props) => <ReactMarkdown {..._mapProps(props)} />;

export default Markdown;