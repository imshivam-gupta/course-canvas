"use client";
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
    math: ({ value }) => <BlockMath>{value}</BlockMath>,
    inlineMath: ({ value }) => <InlineMath>{value}</InlineMath>,
  }
});

const Markdown = (props) => <ReactMarkdown {..._mapProps(props)} />;

export default Markdown;