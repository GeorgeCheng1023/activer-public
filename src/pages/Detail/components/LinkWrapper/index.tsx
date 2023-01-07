import React from 'react';

interface LinkWrapperProps {
  text: string;
}
function LinkWrapper({ text }: LinkWrapperProps) {
  // Find links in the text using a regular expression
  const regex = /\b(https?:\/\/[^\s。]+)/g;
  const links = text.match(regex);

  // If there are no links, return the text as a string
  if (!links) {
    return <p>{text}</p>;
  }

  // Split the text into an array of words and link segments
  const segments = text.split(regex);

  // Map the elements array to React elements
  const children = segments.map((element, index) => {
    // If the element is a link, wrap it in an <a> tag
    if (regex.test(element)) {
      return (
        <a className="detail__a" key={index} href={element} target="_blank" rel="noopener noreferrer">
          {element}
        </a>
      );
    }
    // Otherwise, just return the element as a string
    return element;
  });

  // Return the wrapped text as a <p> element
  return <p>{children}</p>;
}

export default LinkWrapper;
