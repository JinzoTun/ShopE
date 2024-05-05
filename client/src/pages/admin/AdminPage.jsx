import { Link } from "react-router-dom";

const AdminPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="flex gap-8">
        <Link to="/admin/orders" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-6 px-12 rounded-lg shadow-lg transition duration-300">
          <img src="/orders.svg" alt="Orders" className="h-16 w-16 mb-4" />
          Orders
        </Link>
        <Link to="/admin/products" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-6 px-12 rounded-lg shadow-lg transition duration-300">
          <img src="/products.svg" alt="Products" className="h-16 w-16 mb-4" />
          Products
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;
