// MenuBar.tsx
import React from "react";
import { Link } from "react-router-dom";

const MenuBar: React.FC = () => {
  return (
    <nav className="menu-bar">
      <Link to="/">처음으로...</Link>
    </nav>
  );
};

export default MenuBar;
