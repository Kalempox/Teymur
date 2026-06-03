import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { HomePage } from "./pages/HomePage";
import { FeedbackPage } from "./pages/FeedbackPage";
import { RoomsPage } from "./pages/RoomsPage";
import { DiningPage } from "./pages/DiningPage";
import { ConventionPage } from "./pages/ConventionPage";
import { WeddingPage } from "./pages/WeddingPage";
import { GalleryPage } from "./pages/GalleryPage";
import { AboutPage } from "./pages/AboutPage";
import { GaziantepPage } from "./pages/GaziantepPage";
import { ContactPage } from "./pages/ContactPage";
import { OffersPage } from "./pages/OffersPage";
import { ReservationPage } from "./pages/ReservationPage";
import { CareerPage } from "./pages/CareerPage";
import { WellnessPage } from "./pages/WellnessPage";
import { SpaHamamPage } from "./pages/SpaHamamPage";
import { FitnessPage } from "./pages/FitnessPage";
import { RoomDetailPage } from "./pages/RoomDetailPage";
import { HallDetailPage } from "./pages/HallDetailPage";
import { DiningDetailPage } from "./pages/DiningDetailPage";
import { KvkkPage } from "./pages/KvkkPage";
import { AdminApp } from "./admin/AdminApp";

export const router = createBrowserRouter([
  {
    path: "admin/*",
    Component: AdminApp,
  },
  {
    path: "feedback",
    Component: FeedbackPage,
  },
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "odalar",          Component: RoomsPage },
      { path: "odalar/:slug",    Component: RoomDetailPage },
      { path: "restoran",        Component: DiningPage },
      { path: "restoran/:slug",  Component: DiningDetailPage },
      { path: "etkinlikler",     Component: ConventionPage },
      { path: "etkinlikler/:slug", Component: HallDetailPage },
      { path: "dugun",           Component: WeddingPage },
      { path: "galeri",          Component: GalleryPage },
      { path: "hakkimizda",      Component: AboutPage },
      { path: "kariyer",         Component: CareerPage },
      { path: "gaziantep",       Component: GaziantepPage },
      { path: "iletisim",        Component: ContactPage },
      { path: "rezervasyon",     Component: ReservationPage },
      { path: "rezervasyon/tr",  Component: ReservationPage },
      { path: "rezervasyon/en",  Component: ReservationPage },
      { path: "rezervasyon/ar",  Component: ReservationPage },
      { path: "teklifler",       Component: OffersPage },
      { path: "saglik",          Component: WellnessPage },
      { path: "saglik/spa-hamam", Component: SpaHamamPage },
      { path: "saglik/fitness",   Component: FitnessPage },
      { path: "kvkk",            Component: KvkkPage },
    ],
  },
]);
