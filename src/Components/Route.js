// Router.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Homepage';
import Filter from './filter';
import Details from './resDetails';
import LoginPage from './login';
import SignupPage from './signup';
import PrivateRoute from './PrivateRoute'; // Import PrivateRoute

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PrivateRoute element={<Home />} />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/filter" element={<PrivateRoute element={<Filter />} />} />
                <Route path="/resDetails" element={<PrivateRoute element={<Details />} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
