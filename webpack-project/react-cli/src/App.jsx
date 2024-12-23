import React, {Suspense, lazy} from "react";
import { Link, Routes, Route } from "react-router-dom";
import { Button, Space } from "antd";
// import Home from "./pages/Home";
// import About from "./pages/About";
const Home = lazy(() => import(/* webpackChunkName: 'home' */"./pages/Home"));
const About = lazy(() => import(/* webpackChunkName: 'about' */"./pages/About"));
function App() {
    return <div>
            <h1>Hello World</h1>
            <Space>
                <Button type="primary">按钮</Button>
            </Space>
            <ul>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
            <Suspense fallback={<div>loading...</div>}>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </Suspense>
        </div>
}

export default App;