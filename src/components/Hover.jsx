import { useState } from 'react';

// Splits a `border` shorthand into its longhand parts so it never collides
// with a longhand override (e.g. hoverStyle.borderColor) on rerender — React
// warns when a shorthand and its longhand are both set across renders.
function splitBorderShorthand({ border, ...rest }) {
  if (!border) return rest;
  const match = border.match(/^(\S+)\s+(\S+)\s+(.+)$/);
  if (!match) return { ...rest, border };
  const [, borderWidth, borderStyle, borderColor] = match;
  return { ...rest, borderWidth, borderStyle, borderColor };
}

// Renders any element with a base style plus a hover style that merges in on
// mouse enter — a React stand-in for the design's `style-hover` attribute.
export function Hover({ as = 'div', style, hoverStyle, children, ...props }) {
  const [hovered, setHovered] = useState(false);
  const Tag = as;
  const baseStyle = style?.border ? splitBorderShorthand(style) : style;
  return (
    <Tag
      style={hovered ? { ...baseStyle, ...hoverStyle } : baseStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      {children}
    </Tag>
  );
}
