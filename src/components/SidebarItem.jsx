import { LuExternalLink } from "react-icons/lu";
import { useNavigate, NavLink } from "react-router-dom";

const SidebarItem = ({ link, label, icon, onClick, external = false }) => {
  return (
    <NavLink to={link} onClick={onClick} target={external ? "_blank" : ""}>
      <button
        className={`${
          location.pathname == link ? "bg-soft_primary" : ""
        } flex items-center  p-2 w-full text-white rounded-lg dark:text-white hover:bg-soft_primary group `}
      >
        <div className="flex items-center">
          {icon}
          <span className="flex-1 ms-3 whitespace-nowrap">{label}</span>
        </div>
      </button>
    </NavLink>
  );
};

export default SidebarItem;
