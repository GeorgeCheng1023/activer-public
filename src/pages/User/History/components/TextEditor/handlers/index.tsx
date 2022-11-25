import { ReactEditor } from 'slate-react';
import isHotkey from 'is-hotkey';
import { Editor, Node as SlateNode } from 'slate';
import { HOTKEYS, SHORTCUTS } from '../utils/shortcut';
import { toggleMark } from '../utils/index';

export const handleKeyDown = (event: any, editor: Editor) => {
  Object.keys(HOTKEYS).forEach((hotkey) => {
    if (isHotkey(hotkey, event as any)) {
      event.preventDefault();
      const mark = HOTKEYS[hotkey as keyof typeof HOTKEYS];
      toggleMark(editor, mark);
    }
  });
};

export const handleDOMBeforeInput = (editor: Editor) => {
  queueMicrotask(() => {
    const pendingDiffs = ReactEditor.androidPendingDiffs(editor);

    const scheduleFlush = pendingDiffs?.some(({ diff, path }) => {
      if (!diff.text.endsWith(' ')) {
        return false;
      }

      const { text } = SlateNode.leaf(editor, path);
      const beforeText = text.slice(0, diff.start) + diff.text.slice(0, -1);
      if (!(beforeText in SHORTCUTS)) {
        return;
      }

      const blockEntry = Editor.above(editor, {
        at: path,
        match: (n) => Editor.isBlock(editor, n),
      });
      if (!blockEntry) {
        return false;
      }

      const [, blockPath] = blockEntry;
      return Editor.isStart(editor, Editor.start(editor, path), blockPath);
    });

    if (scheduleFlush) {
      ReactEditor.androidScheduleFlush(editor);
    }
  });
};
