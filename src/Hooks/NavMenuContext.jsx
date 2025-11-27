import { Badge, Person, WorkHistory, Workspaces } from "@mui/icons-material";
import { createContext, useContext, useState } from "react";

const navigationMenus = [
  { label: "Profile", path: "/", icon: <Person /> },
  { label: "Experience", path: "/experience", icon: <WorkHistory /> },
  { label: "Projects", path: "/projects", icon: <Workspaces /> },
  { label: "Resume", path: "/resume", icon: <Badge /> },
];

// // // Use below structure for child navigation(routes need to be defined manually)

// const navigationMenus = [
//   {
//     label: "Profile",
//     path: "/",
//     icon: <Person />,
//   },
//   {
//     label: "Experience",
//     path: "/experience",
//     icon: <WorkHistory />,
//     children: [
//       { label: "Work", path: "/experience/work", icon: <WorkHistory /> },
//       {
//         label: "Education",
//         path: "/experience/education",
//         icon: <WorkHistory />,
//       },
//     ],
//   },
//   {
//     label: "Projects",
//     path: "/projects",
//     icon: <Workspaces />,
//     children: [
//       { label: "Web Apps", path: "/projects/web", icon: <Workspaces /> },
//       { label: "Mobile Apps", path: "/projects/mobile", icon: <Workspaces /> },
//     ],
//   },
//   { label: "Resume", path: "/resume", icon: <Badge /> },
// ];

const NavContext = createContext();

export const NavContextProvider = ({ children }) => {
  const [navItems, setNavItems] = useState(navigationMenus);

  // Optional: you can modify nav items based on auth, roles, or fetch from API
  // useEffect(() => {
  // Example: fetch or filter nav items based on user role
  // fetchNavItems().then(setNavItems);
  // }, []);

  const updateNavItems = (newItems) => {
    setNavItems(newItems);
  };

  return (
    <NavContext.Provider
      value={{ navigationMenus: navItems, setNavigationMenus: updateNavItems }}
    >
      {children}
    </NavContext.Provider>
  );
};

export const useNavigationMenusContext = () => {
  const ctx = useContext(NavContext);
  if (!ctx) {
    console.error(
      "useNavigationMenusContext must be used within a NavContextProvider"
    );
  }
  return ctx;
};

export const withNavContext = (Component) => {
  return function WrappedComponent(props) {
    const navCtx = useNavigationMenusContext();
    return <Component {...props} navContext={navCtx} />;
  };
};
