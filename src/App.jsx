import { useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { asyncPreloadProcess } from "./states/isPreload/action";
import { asyncUnsetAuthLogin } from "./states/authLogin/action";
import Loading from "./components/Loading";
import Navigation from "./components/Navigation";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import AddNewPostPage from "./pages/AddNewPostPage";
import PostListPage from "./pages/PostListPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostList from "./components/PostList";
import UpdatePostForm from "./components/UpdatePostForm";
import ProfilePage from "./pages/ProfilePage";
function App() {
  const { authLogin = null, isPreload = false } = useSelector(
    (states) => states
  );
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);
  const onAuthSignOut = () => {
    dispatch(asyncUnsetAuthLogin());
  };
  if (isPreload) {
    return null;
  }
  if (authLogin === null) {
    const activeRegister = location.pathname === "/register" ? "active" : "";
    const activeLogin = location.pathname !== "/register" ? "active" : "";
    return (
      <div>
        <header className="fixed-top">
          <Loading />
        </header>
        <div className="w-300px mx-auto mt-5">
          <div className="card shadow-sm">
            <div className="text-center py-2">
              <h2>Forum App</h2>
            </div>
            <ul className="nav nav-pills mb-3">
              <li className="nav-item w-50 textcenter">
                <Link
                  className={`nav-link
${activeLogin} btl`}
                  to="/"
                >
                  Login
                </Link>
              </li>
              <li className="nav-item w-50 textcenter">
                <Link
                  className={`nav-link
${activeRegister} btl`}
                  to="/register"
                >
                  Register
                </Link>
              </li>
            </ul>
            <Routes>
              <Route path="/*" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div>
        <header className="fixed-top">
          <Navigation authLogin={authLogin} onAuthSignOut={onAuthSignOut} />
          <Loading />
        </header>
        <main className="margin-main">
          <Routes>
            <Route path="/*" element={<NotFoundPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/users/me" element={<ProfilePage />} />
            <Route path="/" element={<PostListPage />} />
            <Route path="/" element={<PostList />} />
            {/* <Route path="/posts/:id" element={<UpdatePostForm/>} /> */}
            <Route path="/posts/:id" element={<PostDetailPage />} />
            <Route path="/posts/add" element={<AddNewPostPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}
export default App;
