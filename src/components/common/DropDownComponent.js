import { Fragment, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DropDownComponent({ menuItems }) {
  const [focusedIndex, setFocusedIndex] = useState(null);

  const handleMenuItemFocus = (index) => {
    setFocusedIndex(index);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton>
          <img
            className="h-8 w-8 rounded-full bg-gray-800"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          />
        </MenuButton>
      </div>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {menuItems.map((item, index) => (
              <MyMenuItem
                key={index}
                name={item.name}
                to={item.to}
                onClick={item.onClick}
                isFocused={focusedIndex === index}
                onFocus={() => handleMenuItemFocus(index)}
              />
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}

function MyMenuItem({ name, to, onClick, isFocused, onFocus }) {
  const menuItemClasses = isFocused
    ? "bg-gray-100 text-gray-900 block px-4 py-2 text-sm"
    : "text-gray-700 block px-4 py-2 text-sm";

  return (
    <MenuItem onFocus={onFocus} className={menuItemClasses}>
      {to ? (
        <Link to={to} className={menuItemClasses}>
          {name}
        </Link>
      ) : onClick ? (
        <button type="button" onClick={onClick} className={menuItemClasses}>
          {name}
        </button>
      ) : (
        <div className={menuItemClasses}>{name}</div>
      )}
    </MenuItem>
  );
}