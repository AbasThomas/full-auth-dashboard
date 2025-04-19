import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { fetchUsersList, fetchProductsList } from "../../services/adminService";
import { Outlet, Link } from "react-router-dom";
// import "../../components/styles/SuperAdminDashboard.css";

const SuperAdminDashboard = () => {
  const { user } = useAuth();
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    // Fetch both users and products concurrently
    const fetchStats = async () => {
      try {
        const [users, products] = await Promise.all([
          fetchUsersList(),
          fetchProductsList(),
        ]);
        setUserCount(users.length);
        setProductCount(products.length);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/superadmin-dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/superadmin-dashboard/products">Products</Link>
            </li>
            <li>
              <Link to="/superadmin-dashboard/users">Users</Link>
            </li>
            <li>
              <Link to="/superadmin-dashboard/orders">Orders</Link>
            </li>
            <li>
              <Link to="/superadmin-dashboard/colors">Colors</Link>
            </li>
            <li>
              <Link to="/superadmin-dashboard/brands">Brands</Link>
            </li>
            <li>
              <Link to="/superadmin-dashboard/reviews">Reviews</Link>
            </li>
            <li>
              <Link to="/superadmin-dashboard/statistics">Statistics</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <h1>Welcome, {user?.fullName}!</h1>
          <p>You have admin privileges.</p>
        </header>

        {/* Statistics Cards */}
        <section className="stats-container">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p>{userCount}</p>
          </div>
          <div className="stat-card">
            <h3>Total Products</h3>
            <p>{productCount}</p>
          </div>
          <div className="stat-card">
            <h3>Total Orders</h3>
            <p>845</p>
          </div>
          <div className="stat-card">
            <h3>Total Revenue</h3>
            <p>₦76,230</p>
          </div>
        </section>

        {/* Nested Routes Outlet */}
        <section className="admin-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default SuperAdminDashboard;
