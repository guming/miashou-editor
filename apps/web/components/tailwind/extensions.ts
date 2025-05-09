import {
  AIHighlight,
  CharacterCount,
  CodeBlock,
  CodeSnippet,
  // CodeBlockLowlight,
  DesmosNode,
  Draw,
  Emoji,
  GeometryNode,
  GlobalDragHandle,
  HorizontalRule,
  Iframe,
  InlineMath,
  JSME,
  Mathematics,
  Mermaid,
  Placeholder,
  SpeadsheetNode,
  StarterKit,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TaskItem,
  TaskList,
  TiptapImage,
  TiptapLink,
  Twitter,
  UpdatedImage,
  Youtube,
} from "novel/extensions";
import { UploadImagesPlugin } from "novel/plugins";

import { cx } from "class-variance-authority";

//TODO I am using cx here to get tailwind autocomplete working, idk if someone else can write a regex to just capture the class key in objects
const aiHighlight = AIHighlight;
//You can overwrite the placeholder with your own configuration
const placeholder = Placeholder;
const tiptapLink = TiptapLink.configure({
  HTMLAttributes: {
    class: cx(
      "text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer",
    ),
  },
});

const tiptapImage = TiptapImage.extend({
  addProseMirrorPlugins() {
    return [
      UploadImagesPlugin({
        imageClass: cx("opacity-40 rounded-lg border border-stone-200"),
      }),
    ];
  },
}).configure({
  allowBase64: true,
  HTMLAttributes: {
    class: cx("rounded-lg border border-muted"),
  },
});

const updatedImage = UpdatedImage.configure({
  HTMLAttributes: {
    class: cx("rounded-lg border border-muted"),
  },
});

const taskList = TaskList.configure({
  HTMLAttributes: {
    class: cx("not-prose pl-2 "),
  },
});
const taskItem = TaskItem.configure({
  HTMLAttributes: {
    class: cx("flex gap-2 items-start my-4"),
  },
  nested: true,
});

const horizontalRule = HorizontalRule.configure({
  HTMLAttributes: {
    class: cx("mt-4 mb-6 border-t border-muted-foreground"),
  },
});

const starterKit = StarterKit.configure({
  bulletList: {
    HTMLAttributes: {
      class: cx("list-disc list-outside leading-3 -mt-2"),
    },
  },
  orderedList: {
    HTMLAttributes: {
      class: cx("list-decimal list-outside leading-3 -mt-2"),
    },
  },
  listItem: {
    HTMLAttributes: {
      class: cx("leading-normal -mb-2"),
    },
  },
  blockquote: {
    HTMLAttributes: {
      class: cx("border-l-4 border-primary"),
    },
  },
  code: {
    HTMLAttributes: {
      class: cx("rounded-md bg-muted  px-1.5 py-1 font-mono font-medium"),
      spellcheck: "false",
    },
  },
  horizontalRule: false,
  dropcursor: {
    color: "#DBEAFE",
    width: 4,
  },
  gapcursor: false,
});

// const codeBlockLowlight = CodeBlockLowlight.configure({
//   // configure lowlight: common /  all / use highlightJS in case there is a need to specify certain language grammars only
//   // common: covers 37 language grammars which should be good enough in most cases
//   lowlight: createLowlight(common),
// });

const youtube = Youtube.configure({
  HTMLAttributes: {
    class: cx("rounded-lg border border-muted"),
  },
  inline: false,
});

const twitter = Twitter.configure({
  HTMLAttributes: {
    class: cx("not-prose"),
  },
  inline: false,
});

const draw = Draw.configure({
  HTMLAttributes: {
    class: cx("not-prose"),
  },
  inline: false,
});

const mathquill = InlineMath.configure({
  preview: false,
});

const jsme = JSME.configure({
  HTMLAttributes: {
    class: cx("not-prose"),
  },
  inline: false,
});

const desmosNode = DesmosNode.configure({
  HTMLAttributes: {
    class: cx("not-prose"),
  },
  inline: false,
});

const geometryNode = GeometryNode.configure({
  HTMLAttributes: {
    class: cx("not-prose"),
  },
  inline: false,
});

const mermaid = Mermaid.configure({
  dictionary: {
    name: "Mermaid",
    inputHelp: "Help",
    inputGraph: "Enter or paste the mermaid code",
  },
});

const emoji = Emoji.configure({
  HTMLAttributes: {
    class: cx("not-prose"),
  },
});

const codeBlock = CodeBlock.configure({
  HTMLAttributes: {
    class: cx("code"),
  },
});

const codeSnippet = CodeSnippet.configure({
  HTMLAttributes: {
    class: cx("not-prose"),
  },
});

const circuit = Iframe.configure({
  HTMLAttributes: {
    class: cx("iframe-wrapper"),
  },
});

const mathematics = Mathematics.configure({
  HTMLAttributes: {
    class: cx("text-foreground rounded p-1 hover:bg-accent cursor-pointer"),
  },
  katexOptions: {
    throwOnError: false,
  },
});

const speadsheet = SpeadsheetNode.configure({
  HTMLAttributes: {
    class: cx("not-prose"),
  },
});

const characterCount = CharacterCount.configure();

const table = Table.configure();
const tableCell = TableCell.configure();
const tableHeader = TableHeader.configure();
const tableRow = TableRow.configure();

const globalDragHandle = GlobalDragHandle.configure({
  dragHandleWidth: 20, // default
  scrollTreshold: 100, // default
  excludedTags: ["td", "tr"], // default
});

export const defaultExtensions = [
  starterKit,
  placeholder,
  tiptapLink,
  tiptapImage,
  updatedImage,
  taskList,
  taskItem,
  horizontalRule,
  aiHighlight,
  youtube,
  twitter,
  draw,
  jsme,
  mermaid,
  characterCount,
  globalDragHandle,
  mathematics,
  mathquill,
  emoji,
  codeBlock,
  codeSnippet,
  desmosNode,
  table,
  tableCell,
  tableRow,
  tableHeader,
  speadsheet,
  geometryNode,
  circuit,
];
