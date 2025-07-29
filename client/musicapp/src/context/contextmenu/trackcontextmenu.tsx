// CustomContextMenuProvider.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type MenuItem = {
  label: string;
  onClick?: () => void;
  children?: MenuItem[];
};

type ContextState = {
  visible: boolean;
  x: number;
  y: number;
  items: MenuItem[];
};

const ContextMenuContext = createContext<{
  showMenu: (x: number, y: number, items: MenuItem[]) => void;
  hideMenu: () => void;
} | null>(null);

export const TrackContextMenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ContextState>({
    visible: false,
    x: 0,
    y: 0,
    items: [],
  });

  const showMenu = (x: number, y: number, items: MenuItem[]) => {
    setState({ visible: true, x, y, items });
  };

  const hideMenu = () => setState(prev => ({ ...prev, visible: false }));

  useEffect(() => {
    const handleClick = () => hideMenu();
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <ContextMenuContext.Provider value={{ showMenu, hideMenu }}>
      {children}
      {state.visible && (
        <div
          className="custom-context-menu artist-bg text-light"
          style={{
            position: 'absolute',
            top: state.y,
            left: state.x,
            zIndex: 9999,
            padding: '6px 0',
            borderRadius: 4,
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            minWidth: 160,
          }}
        >
          {state.items.map((item, idx) => (
            <div key={idx} className="context-item p-2 px-3 hover-bg" onClick={() => {
              item.onClick?.();
              hideMenu();
            }}>
              {item.label}
              {item.children && ' ▶'}
              {/* Optionally add nested submenu rendering */}
            </div>
          ))}
        </div>
      )}
    </ContextMenuContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTrackCustomContextMenu = () => {
  const ctx = useContext(ContextMenuContext);
  if (!ctx) throw new Error('Must be used inside CustomContextMenuProvider');
  return ctx;
};
