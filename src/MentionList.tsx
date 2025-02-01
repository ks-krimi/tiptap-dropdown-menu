import "./MentionList.scss";

import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { FaCaretRight } from "react-icons/fa";

import { Menu } from "./menu";

export interface MenuListProps {
  /**
   * Liste des éléments du menu, qui peuvent être imbriqués
   **/
  items: Menu[];
  /**
   * Commande avec l'id de l'élément sélectionné
   **/
  command: (args: { id: string }) => void;
}

export interface MenuListRef {
  onKeyDown: ({ event }: { event: KeyboardEvent }) => boolean;
}

const MenuList = forwardRef<MenuListRef, MenuListProps>((props, ref) => {
  const [hoveredMenu, setHoveredMenu] = useState<Menu[]>([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState<Menu | undefined>();

  /**
   * Sélectionner un élément du menu
   **/
  const selectItem = (item?: Menu) => {
    setSelectedMenuItem(item);
    if (item) {
      props.command({ id: item.label });
    }
  };

  /**
   * Gérer les mouvements "up" dans le menu
   **/
  const upHandler = () => {};

  /**
   * Gérer les mouvements "down" dans le menu
   **/
  const downHandler = () => {};

  /**
   * Gérer l'action "Enter"
   **/
  const enterHandler = () => {
    selectItem(selectedMenuItem);
  };

  useEffect(() => {
    /**
     * Réinitialiser la sélection au début lorsque les items changent
     **/
    setSelectedMenuItem(undefined);
  }, [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === "ArrowUp") {
        upHandler();
        return true;
      }

      if (event.key === "ArrowDown") {
        downHandler();
        return true;
      }

      if (event.key === "Enter") {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  /**
   * Rendu récursif des sous-menus
   **/
  const renderMenuItems = (items: Menu[], level: number = 0) => {
    return items.map((item) => (
      <div
        key={item.id}
        className={`menu-item level-${level}`}
        onMouseEnter={() => {
          const { child } = item;
          if (child && child.length > 0) {
            setHoveredMenu((prev) => [...prev, item]);
          }
        }}
        onMouseLeave={() => {
          const removeCurrent = hoveredMenu.filter((menu) => {
            return menu.id !== item.id;
          });
          setHoveredMenu(removeCurrent);
        }}
      >
        <button
          onClick={() => {
            const { child } = item;
            console.log(item);
            if (child && child.length == 0) {
              selectItem(item);
            }
          }}
        >
          <span>{item.label}</span>
          {item.child && item.child.length > 0 && <FaCaretRight />}
        </button>

        {/**
         * Affichage du sous-menu si l'élément a des enfants et est survolé
         **/}
        {hoveredMenu.find((value) => value.id === item.id)?.id &&
          item.child &&
          item.child.length > 0 && (
            <div className="submenu">
              {/**
               * Rendu récursif des sous-menus
               **/}
              {renderMenuItems(item.child, level + 1)}
            </div>
          )}
      </div>
    ));
  };

  return (
    <div className="dropdown-menu">
      {props.items.length ? (
        renderMenuItems(props.items)
      ) : (
        <div className="item">Pas de resultat</div>
      )}
    </div>
  );
});

export default MenuList;
