import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import ShippingAddressForm from "../Pages/ShippingAddressForm";
import "./DashboardPage.css";

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [showForm, setShowForm] = useState(false);

  // Format date safely
  const formatCreatedAt = (dateString) => {
    if (!dateString || isNaN(new Date(dateString))) return "N/A";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, {user?.fullName}</h1>
        <p>Your personalized eCommerce dashboard</p>
        <button className="action-btn logout-btn" onClick={logout}>
          Logout
        </button>
      </header>

      <section className="dashboard-profile">
        <div className="profile-card">
          <h2>Profile Overview</h2>
          <p><strong>Name:</strong> {user?.fullName}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> {user?.isAdmin ? "Admin" : "Customer"}</p>
          <p><strong>Account Created:</strong> {formatCreatedAt(user?.createdAt)}</p>
        </div>

        <div className="profile-stats">
          <div className="stat-card">
            <h3>Orders</h3>
            <p>{user?.order?.length || 0}</p>
          </div>
          <div className="stat-card">
            <h3>Wishlists</h3>
            <p>{user?.wishLists?.length || 0}</p>
          </div>
        </div>
      </section>

      <section className="dashboard-actions">
        <h2>Quick Actions</h2>
        <button className="action-btn">View Orders</button>
        <button className="action-btn">Manage Wishlist</button>
        {user?.isAdmin && (
          <button className="action-btn">Go to Admin Panel</button>
        )}
        <button onClick={() => setShowForm(!showForm)} className="action-btn">
          {user?.hasShippingAddress ? "Update Shipping Address" : "Add Shipping Address"}
        </button>
      </section>

      {user?.hasShippingAddress && !showForm && (
        <section className="dashboard-shipping">
          <h2>Shipping Address</h2>
          <p>{user.shippingAddress.firstName} {user.shippingAddress.lastName}</p>
          <p>{user.shippingAddress.address}</p>
          <p>{user.shippingAddress.city}, {user.shippingAddress.state}, {user.shippingAddress.country}</p>
          <p>{user.shippingAddress.postalCode}</p>
          <p>{user.shippingAddress.phone}</p>
        </section>
      )}

      {showForm && (
        <ShippingAddressForm
          user={user}
          login={(updatedUser) => {
            console.log("Updated user:", updatedUser);
          }}
          setShowForm={setShowForm}
        />
      )}
    </div>
  );
};

export default DashboardPage;
