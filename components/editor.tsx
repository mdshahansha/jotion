
"use client";

import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import {
  // BlockNoteView,
  useCreateBlockNote
} from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
// import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";


import "@blocknote/core/fonts/inter.css";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

  const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({ file });
    return response.url;
  };

  const editor: BlockNoteEditor = useCreateBlockNote({
    editable,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
      
    uploadFile: handleUpload,
  });

  return (
    <div>
      <BlockNoteView
        editor={editor}
        editable={editable}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        onChange={() => {
          onChange(JSON.stringify(editor.document, null, 2));
        }}
      />
    </div>
  );
};

 

export default Editor;
 



// "use client";

// import { useTheme } from "next-themes";
// import { useEdgeStore } from "@/lib/edgestore";
// import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
// import { BlockNoteView, useBlockNote, useCreateBlockNote } from "@blocknote/react";
// // import { BlockNoteView } from "@blocknote/mantine";

// import "@blocknote/mantine/style.css";
// import "@blocknote/core/fonts/inter.css";

// interface EditorProps {
//   onChange: (value: string) => void;
//   initialContent?: string;
//   editable?: boolean;
// }

// const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
//   const { resolvedTheme } = useTheme();
//   const { edgestore } = useEdgeStore();

//   const handleUpload = async (file: File) => {
//     const response = await edgestore.publicFiles.upload({ file });
//     return response.url;
//   };

//   // const editor: BlockNoteEditor = useBlockNote({
//   //   initialContent: initialContent ? JSON.parse(initialContent) : undefined,
//   //   uploadFile: handleUpload,
//   // });

//   // const editor: BlockNoteEditor = useCreateBlockNote({
//   //   editable,
//   //   initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[]: undefined,
//   //   onEditorContentChange:(editor)=>{
//   //     onChange(JSON.stringify(editor.topLevelsBlocks,null,2));
//   //   },
//   //   uploadFile: handleUpload,
//   // });
//   const editor: BlockNoteEditor = useCreateBlockNote({
//     editable,
//     initialContent: initialContent ? (JSON.parse(initialContent) as PartialBlock[]) : undefined,
//     uploadFile: handleUpload,
//     onEditorContentChange: (editor) => {
//       onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
//     },
//   });
  



//   return (
//     <div>
//       <BlockNoteView
//         editable={editable}
//         editor={editor}
//         // onChange={() => {
//         //   JSON.stringify(editor.document, null, 2);
//         // }}
//         theme={resolvedTheme === "dark" ? "dark" : "light"}
//       />
//     </div>
//   );
// };

// export default Editor;
