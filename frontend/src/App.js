import NavBar from "./components/navbars/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/Signup";
import Categories from "./pages/category/Categories";
import ProtectedRoute from "./utils/ProtectedRoute";
import UserFooter from "./components/footer/UserFooter";
import Footer from "./components/footer/Footer";
import TopHeadlines from "./pages/topheadlines/TopHeadlines";
import EveryNews from "./pages/everynews/EveryNews";
import { Navigate, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";
const App = ({ user}) => {
 
  return (
    <>
      <NavBar />
      <Routes>
        <Route index path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <SignUp />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/news"
          element={
            <ProtectedRoute>
              <EveryNews />
            </ProtectedRoute>
          }
        />
        <Route
          path="/topNews"
          element={
            <ProtectedRoute>
              <TopHeadlines />
            </ProtectedRoute>
          }
        />
      </Routes>
      {user && <UserFooter /> }
    </>
  );
};
const msp = ({ auth }) => ({
  user: auth.user,
});
const mdp = (dispatch) => ({
});

export default connect(msp, mdp)(App);

// function withRouter(Component) {
// 	function ComponentWithRouterProp(props) {
// 		let location = useLocation();
// 		let navigate = useNavigate();
// 		let params = useParams();
// 		return <Component {...props} router={{ location, navigate, params }} />;
// 	}

// 	return ComponentWithRouterProp;
// }
