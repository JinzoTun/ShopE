import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { useAuth } from "../../context/useAuth";

const AdminPage = () => {
  const { isLoading } = useAuth();

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
      <h1 className="text-4xl mb-8 mt-36">Admin Dashboard</h1>
      {isLoading ? (
        // Skeleton loading effect while data is loading
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <Skeleton variant="rectangular" width={200} height={200} />
          <Skeleton variant="rectangular" width={200} height={200} />
          <Skeleton variant="rectangular" width={200} height={200} />
        </div>
      ) : (
        // Actual content
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link to="/admin/orders" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-6 px-8 sm:px-12 rounded-lg shadow-lg transition duration-300 flex flex-col items-center">
            <img src="/orders.svg" alt="Orders" className="h-16 w-16 mb-4" />
            Orders
          </Link>
          <Link to="/admin/products" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-6 px-8 sm:px-12 rounded-lg shadow-lg transition duration-300 flex flex-col items-center">
            <img src="/products.svg" alt="Products" className="h-16 w-16 mb-4" />
            Products
          </Link>
          <Link to="/admin/users" className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-6 px-8 sm:px-12 rounded-lg shadow-lg transition duration-300 flex flex-col items-center">
            <img src="/users.svg" alt="Users" className="h-16 w-16 mb-4" />
            Users
          </Link>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
