import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import Layout from "./layouts/Layout";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import DetailPage from "./pages/DetailPage";
import HomePage from "./pages/HomePage";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import OrderStatusPage from "./pages/OrderStatusPage";
import SearchPage from "./pages/SearchPage";
import UserProfilePage from "./pages/UserProfilePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route
        path="/search/:city"
        element={
          <Layout showHero={false}>
            <SearchPage />
          </Layout>
        }
      />
      <Route
        path="/detail/:restaurantId"
        element={
          <Layout showHero={false}>
            <DetailPage />
          </Layout>
        }
      />
      <Route element={<ProtectedRoutes />}>
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
        <Route
          path="/order-status"
          element={
            <Layout>
              <OrderStatusPage />
            </Layout>
          }
        />
        <Route
          path="/manage-restaurant"
          element={
            <Layout>
              <ManageRestaurantPage />
            </Layout>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
