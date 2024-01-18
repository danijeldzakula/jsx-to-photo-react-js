import { useLocation } from "react-router-dom";

/**
 * Get links function
 * Using example
 * getLinks({ path: "/" })
 * @param {*} param0
 * @returns
 */
export const GetLinksLocation = ({ path }) => {
  const { pathname } = useLocation();

  if (pathname.includes(path) && pathname === path) {
    return false;
  }

  return true;
};
