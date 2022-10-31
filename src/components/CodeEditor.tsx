import Prism from 'prismjs';
import { useCallback, useMemo } from 'react';
import { Slate, Editable, withReact, RenderLeafProps } from 'slate-react';
import { Text, createEditor, NodeEntry, Node } from 'slate';
import { withHistory } from 'slate-history';
import { css } from '@emotion/css';

const serialize = (nodes: Node[]) => {
  return nodes.map((n) => Node.string(n)).join('\n');
};

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const CodeEditor = (props: Props) => {
  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const decorate = ([node, path]: NodeEntry<Node>) => {
    const ranges = [] as any[];
    if (!Text.isText(node)) {
      return ranges;
    }
    const tokens = Prism.tokenize(node.text, Prism.languages['javascript']);
    let start = 0;

    for (const token of tokens) {
      const length = getLength(token);
      const end = start + length;

      if (typeof token !== 'string') {
        ranges.push({
          [token.type]: true,
          anchor: { path, offset: start },
          focus: { path, offset: end },
        });
      }

      start = end;
    }

    return ranges;
  };

  return (
    <Slate
      editor={editor}
      value={
        [
          {
            type: 'paragraph',
            children: [
              {
                text: props.value,
              },
            ],
          },
        ] as any
      }
      onChange={(nodes) => {
        const text = serialize(nodes);
        props.onChange(text);
      }}
    >
      <Editable decorate={decorate} renderLeaf={renderLeaf} placeholder='Write some code...' />
    </Slate>
  );
};

const getLength = (token: any) => {
  if (typeof token === 'string') {
    return token.length;
  } else if (typeof token.content === 'string') {
    return token.content.length;
  } else {
    return token.content.reduce((l: any, t: any) => l + getLength(t), 0);
  }
};

// different token types, styles found on Prismjs website
const Leaf = ({ attributes, children, leaf }: any) => {
  return (
    <span
      {...attributes}
      className={css`
        font-family: monospace;
        background: hsla(0, 0%, 100%, 0.5);
        ${leaf.comment &&
        css`
          color: slategray;
        `}
        ${(leaf.operator || leaf.url) &&
        css`
          color: #9a6e3a;
        `}
        ${leaf.keyword &&
        css`
          color: #07a;
        `}
        ${(leaf.variable || leaf.regex) &&
        css`
          color: #e90;
        `}
        ${(leaf.number ||
          leaf.boolean ||
          leaf.tag ||
          leaf.constant ||
          leaf.symbol ||
          leaf['attr-name'] ||
          leaf.selector) &&
        css`
          color: #905;
        `}
        ${leaf.punctuation &&
        css`
          color: #999;
        `}
        ${(leaf.string || leaf.char) &&
        css`
          color: #690;
        `}
        ${(leaf.function || leaf['class-name']) &&
        css`
          color: #dd4a68;
        `}
      `}
    >
      {children}
    </span>
  );
};
