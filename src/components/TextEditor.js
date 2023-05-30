import React, { Component, useEffect, useState } from "react";
import { EditorState, ContentState, convertToRaw, Modifier } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../theme/";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import { useDispatch } from 'react-redux';
import Card from './Card';
import { CardContent } from '@material-ui/core';
 
 
 export function myHtmlToDraft(html){
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      return editorState
    }
      return null;
  }

export function myDraftToHtml(editorState) {
  return draftToHtml(convertToRaw(editorState.getCurrentContent()));
}
//     const contentState = ContentState.createFromBlockArray(
//       contentBlock.contentBlocks
//     );
//     const editorState = EditorState.createWithContent(contentState);
//     return editorState;
//   }
//   return null;
// }

export const ClassicTextEditor=({text,title, onChange,enableReload, onReloaded})=> {
  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(),
  );
  const [isTextSet, setIsTextSet] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (typeof text !== "undefined" && (isTextSet === false || enableReload)) {
      setIsTextSet(true);
      setEditorState(myHtmlToDraft(text));
      onReloaded();
    }
  }, [text]);

  const handlePastedText = (text, html=null) => {
    // if they try to paste something they shouldn't let's handle it
    if (text.indexOf('text that should not be pasted') != -1) {

      // we'll add a message for the offending user to the editor state
      const newContent = Modifier.insertText(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        'nice try, chump!'
      );

      // update our state with the new editor content
      setEditorState(EditorState.push(
        editorState,
        newContent,
        'insert-characters'
      ));
      return true;
    } else {
      return false;
    }
  }

  return (
    <Card>
      <CardContent>
    <Editor
      editorState={editorState}
      onEditorStateChange={(content) => {
        setEditorState(content);
        onChange(myDraftToHtml(editorState));
      }}
        // wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        handlePastedText={handlePastedText}
    />
      </CardContent>
    </Card> 
    )
}
