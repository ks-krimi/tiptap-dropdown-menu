import Mention from "@tiptap/extension-mention";
import {
  BubbleMenu,
  EditorContent,
  FloatingMenu,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

import suggestion from "./suggestion";

const extensions = [
  StarterKit,
  Mention.configure({
    HTMLAttributes: { class: "mention" },
    deleteTriggerWithBackspace: true,
    suggestion,
  }),
];

const Tiptap = () => {
  const editor = useEditor({
    extensions,
    content: `
    <p>Hi everyone! Don’t forget the daily stand up at 8 AM.</p>
    <p><span data-type="mention" data-id="Jennifer Grey"></span> Would you mind to share what you’ve been working on lately? We fear not much happened since Dirty Dancing.
    <p><span data-type="mention" data-id="Winona Ryder"></span> <span data-type="mention" data-id="Axl Rose"></span> Let’s go through your most important points quickly.</p>
    <p>I have a meeting with <span data-type="mention" data-id="Christina Applegate"></span> and don’t want to come late.</p>
    <p>– Thanks, your big boss</p>
  `,
  });

  return (
    <React.Fragment>
      <EditorContent editor={editor} />
      <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
    </React.Fragment>
  );
};

export default Tiptap;
