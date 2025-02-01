import { MentionNodeAttrs } from "@tiptap/extension-mention";
import { ReactRenderer } from "@tiptap/react";
import { SuggestionOptions } from "@tiptap/suggestion";
import tippy, { Instance } from "tippy.js";

import MentionList, { MenuListProps, MenuListRef } from "./MentionList.jsx";
import { menu, Menu } from "./menu.js";

type Component = ReactRenderer<MenuListRef, MenuListProps>;

const suggestion: Omit<SuggestionOptions<Menu, MentionNodeAttrs>, "editor"> = {
  items: ({ query }) => {
    return menu;

    /**
     * Filtrer les éléments du menu en fonction de la requête (query)
     **/
    const filterMenu = (items: Menu[], query: string): Menu[] => {
      return items
        .filter((item) =>
          item.label.toLowerCase().includes(query.toLowerCase())
        )
        .map((item) => ({
          ...item,
          child: item.child ? filterMenu(item.child, query) : [],
        }));
    };

    /**
     * Limiter le nombre d'éléments retournés à 5
     **/
    return filterMenu(menu, query).slice(0, 5);
  },

  render: () => {
    let component: Component;
    let popup: Instance[];

    return {
      onStart: (props) => {
        component = new ReactRenderer(MentionList, {
          props,
          editor: props.editor,
        });

        if (!props.clientRect) {
          return;
        }

        popup = tippy("body", {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start",
        });
      },

      onUpdate(props) {
        component.updateProps(props);

        if (!props.clientRect) {
          return;
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
      },

      onKeyDown(props) {
        if (props.event.key === "Escape") {
          popup[0].hide();

          return true;
        }

        if (component.ref) {
          return component.ref.onKeyDown(props);
        }

        return true;
      },

      onExit() {
        popup[0].destroy();
        component.destroy();
      },
    };
  },
};

export default suggestion;
