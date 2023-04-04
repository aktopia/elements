import React, { useCallback, useState } from 'react';

interface WithContextMenuProps {
  onItemClick: (id: string) => void;
  items: any[];
  children: React.ReactNode;
}

export function getMousePosition(e: any) {
  const pos = {
    x: (e as MouseEvent).clientX,
    y: (e as MouseEvent).clientY,
  };

  pos.y = pos.y + 20;
  pos.x = pos.x - 10;

  return pos;
}

const ContextMenuItem = ({ id, label, onItemClick }: any) => {
  const onClick = useCallback((_: any) => onItemClick(id), [onItemClick, id]);
  return (
    <div key={id} className={'cursor-pointer p-2 hover:bg-gray-100'} onClick={onClick}>
      {label}
    </div>
  );
};

const ContextMenu = ({ onItemClick, items }: any) => {
  return (
    <div className={'rounded-md border bg-white shadow-md'}>
      {items.map((item: any) => (
        <ContextMenuItem key={item.id} {...item} onItemClick={onItemClick} />
      ))}
    </div>
  );
};
export const WithContextMenu = ({ onItemClick, items, children }: WithContextMenuProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      console.dir(e);
      setShowMenu(!showMenu);
      setPos(getMousePosition(e));
    },
    [showMenu]
  );

  const menuUI = (
    <div className={'fixed'} style={{ top: pos.y, left: pos.x }}>
      <ContextMenu items={items} onItemClick={onItemClick} />
    </div>
  );

  return (
    <div className={'relative cursor-pointer'} onClick={onClick}>
      {showMenu && menuUI}
      {children}
    </div>
  );
};
