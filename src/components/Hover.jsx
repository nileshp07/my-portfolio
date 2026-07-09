import { useState } from 'react';

// Renders any element with a base style plus a hover style that merges in on
// mouse enter — a React stand-in for the design's `style-hover` attribute.
export function Hover({ as = 'div', style, hoverStyle, children, ...props }) {
  const [hovered, setHovered] = useState(false);
  const Tag = as;
  return (
    <Tag
      style={hovered ? { ...style, ...hoverStyle } : style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      {children}
    </Tag>
  );
}
