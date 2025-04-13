import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface EditorProps {
  onTextChange?: (delta: any, oldDelta: any, source: string) => void;
}

const Editor = forwardRef<Quill | null, EditorProps>(
  ({ onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    }, [onTextChange, onSelectionChange]);

    useEffect(() => {
      const container = containerRef.current;
      if (container) {
        const editorContainer = container.appendChild(
          container.ownerDocument.createElement("div")
        );
        const quill = new Quill(editorContainer, {
          theme: "snow",
        });

        if (ref) {
          if (typeof ref === "function") {
            ref(quill); // callback ref
          } else {
            ref.current = quill; // object ref
          }
        }

        quill.on(Quill.events.TEXT_CHANGE, (delta, oldDelta, source) => {
          onTextChangeRef.current?.(delta, oldDelta, source);
        });

        return () => {
          if (ref) {
            if (typeof ref === "function") {
              ref(null);
            } else {
              ref.current = null;
            }
          }
          container.innerHTML = "";
        };
      }
    }, [ref]);

    return <div ref={containerRef}></div>;
  }
);

Editor.displayName = "Editor";
export default Editor;
