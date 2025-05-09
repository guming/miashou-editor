import { InputRule, Node, mergeAttributes } from "@tiptap/core";
import { PluginKey } from "@tiptap/pm/state";
import { Suggestion } from "@tiptap/suggestion";
import { nameToEmoji } from "gemoji";
import { BlockMenuView, type BlockMenuViewItem } from "../block-menu/view";
import { InnerRenderView } from "../mermaid/innerRender";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    emoji: {
      setEmoji: (name: string) => ReturnType;
    };
  }
}

export interface EmojiOptions {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  HTMLAttributes: Record<string, any>;
  dictionary: {
    queryEmpty: string;
  };
}

export const Emoji = Node.create<EmojiOptions>({
  name: "emoji",
  inline: true,
  group: "inline",
  atom: true,
  draggable: true,
  addAttributes() {
    return {
      value: {
        default: "",
      },
    };
  },
  addOptions() {
    return {
      HTMLAttributes: {},
      dictionary: {
        name: "Emoji",
        queryEmpty: "No results found",
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: `span[data-type="${this.name}"]`,
        preserveWhitespace: "full",
        getAttrs: (node) => ({ value: (node as HTMLElement).textContent }),
      },
    ];
  },
  renderHTML({ node, HTMLAttributes }) {
    return [
      "span",
      mergeAttributes({ "data-type": this.name }, this.options.HTMLAttributes, HTMLAttributes),
      node.attrs.value,
    ];
  },
  addNodeView() {
    return InnerRenderView.create({
      tag: "span",
      HTMLAttributes: this.options.HTMLAttributes,
      onRender: ({ view }) => {
        view.$root.innerHTML = nameToEmoji[view.node.attrs.value] ?? "";
      },
    });
  },
  addCommands() {
    return {
      setEmoji: (name) => {
        return ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs: {
              value: name,
            },
          });
      },
    };
  },
  addInputRules() {
    return [
      new InputRule({
        find: /:([\w+]+):/,
        handler: ({ state, range, match }) => {
          const { from, to } = range;
          const $start = state.doc.resolve(from);
          const index = $start.index();
          const $end = state.doc.resolve(to);
          if (!$start.parent.canReplaceWith(index, $end.index(), this.type)) {
            return null;
          }
          const value = match[1];
          if (value && nameToEmoji[value]) {
            state.tr.replaceRangeWith(from, to, this.type.create({ value }, this.type.schema.text(value)));
          }
        },
      }),
    ];
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        pluginKey: new PluginKey(`${this.name}-suggestion`),
        char: ":",
        items: ({ query }) => {
          const items: Array<BlockMenuViewItem> = [];
          for (const [name, html] of Object.entries(nameToEmoji)) {
            if (query !== "") {
              const q = query.toLowerCase();
              if (!name.toLowerCase().includes(q)) {
                continue;
              }
            }
            items.push({
              id: name,
              name: `${name} - ${html}`,
              action: (editor) => {
                editor
                  .chain()
                  .deleteRange({
                    from: editor.state.selection.$from.start(),
                    to: editor.state.selection.$from.pos,
                  })
                  .setEmoji(name)
                  .focus()
                  .run();
              },
            });
          }
          return items.slice(0, 20);
        },
        render: BlockMenuView.create({
          editor: this.editor,
          dictionary: {
            empty: this.options.dictionary.queryEmpty,
          },
        }),
      }),
    ];
  },
});
