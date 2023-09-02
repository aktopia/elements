import { useOutsideClick } from '@elements/utils';
import { isEmpty } from 'lodash';
import type { MouseEvent, ReactNode } from 'react';
import { useCallback, useRef, useState } from 'react';
import { Dropdown } from '@elements/components/dropdown';

interface Item {}

interface WithContextMenuProps {
  items: Item[];
  disable?: boolean;
  children: ReactNode;
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

export const _WithContextMenu = ({ items, children }: Omit<WithContextMenuProps, 'disable'>) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useOutsideClick(menuRef, () => {
    setShowMenu(false);
  });

  const onClick = useCallback(
    (e: MouseEvent) => {
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
      <Dropdown items={items} />
    </div>
  );

  return (
    <div ref={menuRef} className={'w-full cursor-pointer'} onClick={onClick}>
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
