/* eslint-disable no-param-reassign */
// disable no-param-reassign for edit editor inner text

import { Editor, Transforms } from 'slate';
import isUrl from 'is-url';
import imageExtensions from 'image-extensions';
import { ImageElement } from '../types';

function arrayBufferToString(buffer: ArrayBuffer): string {
  return new TextDecoder().decode(buffer);
}

export const insertImage = (editor: Editor, url: string | ArrayBuffer | null) => {
  const text = { text: '' };
  let parseUrl = '';
  if (typeof url === 'string') { parseUrl = url; }
  if (typeof url === 'object') { arrayBufferToString(url as ArrayBuffer); }
  const image: ImageElement = {
    type: 'image',
    url: parseUrl,
    children: [text],
  };
  Transforms.insertNodes(editor, image);
};

export const isImageUrl = (url :string) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split('.').pop();
  return imageExtensions.includes(ext);
};

const withImages = (editor: Editor) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) => (element.type === 'image' ? true : isVoid(element));

  editor.insertData = (data) => {
    const text = data.getData('text/plain');
    const { files } = data;

    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        const [mime] = file.type.split('/');

        if (mime === 'image') {
          reader.addEventListener('load', () => {
            const url = reader.result;
            insertImage(editor, url);
          });

          reader.readAsDataURL(file);
        }
      });
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

export default withImages;
