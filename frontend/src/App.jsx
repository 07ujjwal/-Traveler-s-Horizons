import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product/Product";
import Pricing from "./pages/Product/Pricing";
import Homepage from "./pages/HomePage/Homepage";
import AppLayout from "./pages/AppLayout/AppLayout";
import CityList from "./components/CityList/CityList";
import CountryList from "./components/Country/CountryList";
//import { useEffect, useState } from "react";
import City from "./components/City/City";
import Form from "./components/Folder/Form";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ProtectedRout from "./components/ProtectedRout";
import CreatePost from "./pages/CreatePostPage/CreatePost";
import PostLayout from "./pages/PostLayout/PostLayout";
//import PostList from "./components/PostList/PostList";
import Post from "./components/Post/Post";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route
          path="app"
          element={
            <ProtectedRout>
              <AppLayout />
            </ProtectedRout>
          }
        >
          <Route />
          <Route index element={<CityList />} />
          <Route path="cities" element={<CityList />} />
          <Route path=":id" element={<City />} />
          <Route path="cities/:id" element={<City />} />
          <Route path="countries" element={<CountryList />} />
          <Route path="form" element={<Form />} />
          <Route path="createPost" element={<CreatePost />} />
        </Route>
        <Route path="posts" element={<PostLayout />} />
        <Route path="post/:slug" element={<Post />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
