//
//TODO: implement the axios interceptors for refreshing tokens
//
import './index.css'


//Router Import
import { Navigate, Route, Routes } from "react-router-dom";

//Pages Import
import {
  AdminPage,
  CartPage,
  CategoryPage,
  HomePage,
  LoginPage,
  PurchaseCancelPage,
  PurchaseSuccessPage,
  SignUpPage,
} from "./pages";

//Components import
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { MainAppStyleContainer, Navbar, LoadingSpinner } from "./components";
import useUserStore from "./stores/useUserStore";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  if (checkingAuth) return <LoadingSpinner />;
  return (
    <>
      {/*Gradient & Background gradient */}
      <MainAppStyleContainer>
        <Navbar />

        <Routes>
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route path="/" element={<HomePage />} />
          <Route
            path="/secret-dashboard"
            element={
              user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />
            }
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route
            path="/purchase-cancel"
            element={user ? <PurchaseCancelPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/purchase-success"
            element={user ? <PurchaseSuccessPage /> : <Navigate to="/login" />}
          />
        </Routes>
        <Toaster />
      </MainAppStyleContainer>
    </>
  );
}

export default App;
