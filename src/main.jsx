import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider } from 'antd';
import React, { useLayoutEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './assets/font/font.css';
import './index.css';
import './scss/styles.scss';

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';

import HardwareReport from './pages/ArchitectureReport/HardwareReport/HardwareReport';
import NetworkReport from './pages/ArchitectureReport/NetworkReport/NetworkReport';
import CarbonReport from './pages/CarbonReport/CarbonReport';
import InsightsReport from './pages/Insights/BasicInsights/BasicInsights';
import PageInsight from './pages/Insights/PageInsights/PageInsights';
import Settings from './pages/Settings/Settings';
import Technologies from './pages/Technologies/Technologies';
import TrafficAnalysis from './pages/TrafficAnalysis/TrafficAnalysis';

import LoaderWrapper from './components/Loader';
import { Agency } from './pages/Agency/Agency';
import LoginPage from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import ContactUS from './pages/ContactUs';
import FullReport from './pages/FullReport';
import GreenWebScore from './pages/GreenWebScore';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import SustainableWebsites from './pages/SustainableWebsite';

import Server from './pages/Server/Server';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { PrivateRoutes } from './utils/PrivateRoute';
import '/node_modules/flag-icons/css/flag-icons.min.css';

import LoginRoute from './layouts/Routes/LoginRoute';
import PublicRoute from './layouts/Routes/PublicRoute';

L.Marker.prototype.options.icon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const ScrollTo = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_GOOGLE_API_KEY}
      redirectUri={import.meta.env.VITE_APP_ROOT_URL}
    >
      <BrowserRouter>
        <ConfigProvider
          theme={{
            colorPrimary: '#1b9876',
            select: {
              colorPrimary: 'red',
            },
          }}
        >
          <QueryClientProvider client={queryClient}>
            <ScrollTo>
              <LoaderWrapper>
                <Route element={<PrivateRoutes />}>
                  <Route path="/carbontest" element={<CarbonReport />} />
                  <Route path="/hardwareReport" element={<HardwareReport />} />
                  <Route path="/basic-insights" element={<InsightsReport />} />
                  <Route path="/page-insights" element={<PageInsight />} />
                  <Route path="/technologies" element={<Technologies />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route
                    path="/trafficanalysis"
                    element={<TrafficAnalysis />}
                  />
                  <Route path="/networkreport" element={<NetworkReport />} />
                  <Route path="/agency" element={<Agency />} />
                  <Route path="/fullreport" element={<FullReport />} />
                </Route>
                <Route element={<LoginRoute />}>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUp />} />
                </Route>
                <Route element={<PublicRoute />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/server" element={<Server />} />
                  <Route
                    path="/sustainable-website-hong-kong"
                    element={<SustainableWebsites />}
                  />
                  <Route path="/contact-us" element={<ContactUS />} />
                  <Route path="/green-score/:id" element={<GreenWebScore />} />
                  <Route path="/*" element={<NotFound />} />
                </Route>
              </LoaderWrapper>
            </ScrollTo>
            <ToastContainer theme="colored" />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ConfigProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
