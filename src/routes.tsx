import { Icon } from "@chakra-ui/react";
import {
  MdAdminPanelSettings,
  MdBarChart,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdPerson,
} from "react-icons/md";
import { CgExport } from "react-icons/cg";

// Admin Imports
import DataTables from "pages/admin/data-tables";
import MainDashboard from "pages/admin/default";
import NFTMarketplace from "pages/admin/nft-marketplace";
import Profile from "pages/admin/profile";
import RTL from "pages/rtl/rtl-default";

// Auth Imports
import UserManagement from "pages/admin/admin-user";
import SignInCentered from "pages/auth/sign-in";
import { IRoute } from "types/navigation";
import AdminUser from "pages/admin/admin-user";
import PortalUser from "pages/admin/portal-user";
import BlackList from "pages/admin/black-list";
import AdminWallet from "pages/admin/admin-wallet";
import { FaUserSlash, FaWallet } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import DepositRequest from "pages/admin/deposit-request";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import SetDailyProfit from "pages/admin/daily-profit";

const routes: IRoute[] = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
  },
  // {
  //   name: "NFT Marketplace",
  //   layout: "/admin",
  //   path: "/nft-marketplace",
  //   icon: (
  //     <Icon
  //       as={MdOutlineShoppingCart}
  //       width="20px"
  //       height="20px"
  //       color="inherit"
  //     />
  //   ),
  //   component: NFTMarketplace,
  //   secondary: true,
  // },
  // {
  //   name: "Data Tables",
  //   layout: "/admin",
  //   icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
  //   path: "/data-tables",
  //   component: DataTables,
  // },
  {
    name: "Admin user",
    layout: "/admin",
    icon: (
      <Icon
        as={MdAdminPanelSettings}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    path: "/admin-user",
    component: AdminUser,
  },
  {
    name: "Portal user",
    layout: "/admin",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    path: "/portal-user",
    component: PortalUser,
  },
  {
    name: "Black list",
    layout: "/admin",
    icon: <Icon as={FaUserSlash} width="20px" height="20px" color="inherit" />,
    path: "/black-list",
    component: BlackList,
  },
  {
    name: "Admin wallet",
    layout: "/admin",
    icon: <Icon as={FaWallet} width="20px" height="20px" color="inherit" />,
    path: "/admin-wallet",
    component: AdminWallet,
  },
  {
    name: "Deposit request",
    layout: "/admin",
    icon: <Icon as={IoMdDownload} width="20px" height="20px" color="inherit" />,
    path: "/deposit-request",
    component: DepositRequest,
  },
  {
    name: "Withdraw request",
    layout: "/admin",
    icon: <Icon as={CgExport} width="20px" height="20px" color="inherit" />,
    path: "/withdraw-request",
    component: DepositRequest,
  },
  {
    name: "Daily profit ",
    layout: "/admin",
    icon: (
      <Icon
        as={RiMoneyDollarBoxFill}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    path: "/daily-profit",
    component: SetDailyProfit,
  },
  // {
  //   name: "Profile",
  //   layout: "/admin",
  //   path: "/profile",
  //   icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  //   component: Profile,
  // },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: SignInCentered,
  },
  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "/rtl-default",
  //   icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  //   component: RTL,
  // },
];

export default routes;
