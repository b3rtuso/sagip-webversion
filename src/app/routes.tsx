import { createBrowserRouter } from "react-router";
import { MobileRoot } from "./components/mobile/MobileRoot";
import { MobileLogin } from "./components/mobile/MobileLogin";
import { MobileDashboard } from "./components/mobile/MobileDashboard";
import { MobileReportIncident } from "./components/mobile/MobileReportIncident";
import { MobileIncidentTracking } from "./components/mobile/MobileIncidentTracking";
import { MobileIncidentDetail } from "./components/mobile/MobileIncidentDetail";
import { MobileAlerts } from "./components/mobile/MobileAlerts";
import { MobileEmergencyHotline } from "./components/mobile/MobileEmergencyHotline";
import { MobileProfile } from "./components/mobile/MobileProfile";
import { MobileSplash } from "./components/mobile/MobileSplash";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MobileSplash,
  },
  {
    path: "/login",
    Component: MobileLogin,
  },
  {
    path: "/dashboard",
    Component: MobileRoot,
    children: [
      { index: true, Component: MobileDashboard },
      { path: "report", Component: MobileReportIncident },
      { path: "tracking", Component: MobileIncidentTracking },
      { path: "tracking/:id", Component: MobileIncidentDetail },
      { path: "alerts", Component: MobileAlerts },
      { path: "hotline", Component: MobileEmergencyHotline },
      { path: "profile", Component: MobileProfile },
    ],
  },
]);