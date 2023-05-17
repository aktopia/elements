import React, { useCallback, useState } from 'react';

interface Item {
  id: string;
  label: string;
}

interface WithContextMenuProps {
  onItemClick: (id: string) => void;
  items: Item[];
  children: React.ReactNode;
}

export function getPosition(e: any) {
  const pos = {
    x: (e as MouseEvent).clientX,
    y: (e as MouseEvent).clientY,
  };

  pos.y = pos.y + 20;
  pos.x = pos.x - 10;

  return pos;
}

const ContextMenuItem = ({ item, onItemClick }: any) => {
  const { id, label } = item;
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
        <ContextMenuItem key={item.id} item={item} onItemClick={onItemClick} />
      ))}
    </div>
  );
};
export const WithContextMenu = ({ onItemClick, items, children }: WithContextMenuProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      setShowMenu(!showMenu);
      setPos(getPosition(e));
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

// TODO complete types
