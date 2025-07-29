import  { createContext, useState, useContext, useEffect, ReactNode } from "react";

export type MenuItem = {
  label: string;
  onClick?: () => void;
  children?: MenuItem[];
};

const CustomContextMenuContext = createContext<{
  showMenu: (x: number, y: number, items: MenuItem[]) => void;
  hideMenu: () => void;
} | null>(null);

export const LeftSideBarContextMenuProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [items, setItems] = useState<MenuItem[]>([]);

  const showMenu = (x: number, y: number, items: MenuItem[]) => {
    setPosition({ x, y });
    setItems(items);
    setVisible(true);
  };

  const hideMenu = () => setVisible(false);

  useEffect(() => {
    const handleClick = () => hideMenu();
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <CustomContextMenuContext.Provider value={{ showMenu, hideMenu }}>
      {children}
      {visible && (
        <div
          className="context-menu bg-dark text-light shadow"
          style={{
            position: "absolute",
            top: position.y,
            left: position.x,
            zIndex: 9999,
            minWidth: 200,
            borderRadius: 4,
            padding: 4,
          }}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className="context-menu-item px-3 py-2"
              onClick={() => {
                item.onClick?.();
                hideMenu();
              }}
              style={{ cursor: "pointer", whiteSpace: "nowrap" }}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </CustomContextMenuContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLeftSideContextMenu = () => {
  const ctx = useContext(CustomContextMenuContext);
  if (!ctx) throw new Error("Must be used inside CustomContextMenuProvider");
  return ctx;
};
