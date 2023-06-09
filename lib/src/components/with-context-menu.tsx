import { useOutsideClick } from '@elements/_utils';
import { isEmpty } from 'lodash';
import React, { useCallback, useRef, useState } from 'react';

interface Item {
  id: string;
  label: string;
  onClick: () => void;
}

interface WithContextMenuProps {
  items: Item[];
  disable?: boolean;
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

const ContextMenuItem = ({ item }: any) => {
  const { id, label, onClick } = item;
  return (
    <div key={id} className={'my-1 cursor-pointer'} onClick={onClick}>
      <p className={'py-2 px-3 text-xs font-medium text-gray-700 hover:bg-gray-100'}>{label}</p>
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

export const _WithContextMenu = ({ items, children }: Omit<WithContextMenuProps, 'disable'>) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useOutsideClick(menuRef, () => {
    setShowMenu(false);
  });

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      const selection = window.getSelection();
      if (selection && selection.type === 'Range') {
        return;
      }
      setShowMenu(!showMenu);
      setPos(getPosition(e));
    },
    [showMenu]
  );

  const menuUI = (
    <div className={'fixed z-10'} style={{ top: pos.y, left: pos.x }}>
      <ContextMenu items={items} />
    </div>
  );

  return (
    <div ref={menuRef} className={'relative cursor-pointer'} onClick={onClick}>
      {showMenu && menuUI}
      {children}
    </div>
  );
};

export const WithContextMenu = ({ items, disable, children }: WithContextMenuProps) => {
  return disable || isEmpty(items) ? (
    <>{children}</>
  ) : (
    <_WithContextMenu items={items}>{children}</_WithContextMenu>
  );
};

// TODO complete types
