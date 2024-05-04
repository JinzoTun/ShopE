import ForbiddenPage from './pages/Auth/ForbiddenPage';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import useAuth from './hooks/useAuth'; 

const PrivateRoute = ({ element: Element, ...rest }) => {
    const { isAuth, isAdmin } = useAuth();

    return (
        <Route
            {...rest}
            element={
                isAuth ? (
                    <Element isAdmin={isAdmin} />
                ) : (
                    <ForbiddenPage />
                )
            }
        />
    );
};

PrivateRoute.propTypes = {
    element: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
