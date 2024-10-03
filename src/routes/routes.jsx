import { lazy } from "react";

// Home
const Home = lazy(() => import("../pages/home/Home"));
const ChargingDetails = lazy(() => import("../pages/home/ChargingDetails"));

// User
const UserManagement = lazy(() => import("../pages/user/UserManagement"));

// Track
const Track = lazy(() => import("../pages/track/Track"));

// Analysis
const Analysis = lazy(() => import("../pages/analysis/Analysis"));

// Settings
const Settings = lazy(() => import("../pages/settings/Settings"));

// Bookings
const Bookings = lazy(() => import("../pages/bookings/Bookings"));

// Messages
const Messaging = lazy(() => import("../pages/message/Messaging"));

// Messages
const Payments = lazy(() => import("../pages/payments/Payments"));

const coreRoutes = [
  // Home
  {
    path: "/",
    component: Home,
  },
  {
    path: "/station-details",
    component: ChargingDetails,
  },

  // User
  {
    path: "/user-management",
    component: UserManagement,
  },

  //Track
  {
    path: "/track",
    component: Track,
  },
  // Analysis
  {
    path: "/analysis",
    component: Analysis,
  },

  // Settings
  {
    path: "/settings",
    component: Settings,
  },

  // Bookings
  {
    path: "/bookings",
    component: Bookings,
  },
  // Messages
  {
    path: "/messaging",
    component: Messaging,
  },
  // Messages
  {
    path: "/payments",
    component: Payments,
  },
];

const routes = [...coreRoutes];
export default routes;
