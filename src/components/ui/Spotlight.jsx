// A card surface with a soft glow that follows the pointer.
// The glow itself is pure CSS (.spotlight::before) driven by --mx / --my.
export function Spotlight({ as: Tag = 'div', className = '', children, ...rest }) {
  const onPointerMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <Tag className={`spotlight ${className}`} onPointerMove={onPointerMove} {...rest}>
      {children}
    </Tag>
  );
}
