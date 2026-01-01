// pages/AdminDashboard.js
import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../components/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin
    if (!user) {
      navigate('/admin-login');
      return;
    }
    
    fetchAdminData();
  }, [user, navigate]);

  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch all data
      const [ordersRes, usersRes, menuRes] = await Promise.all([
        axios.get('http://localhost:5000/api/orders', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://localhost:5000/api/menu')
      ]);
      
      setOrders(ordersRes.data);
      setUsers(usersRes.data);
      setMenuItems(menuRes.data);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/orders/${orderId}/status`, 
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Refresh orders
      fetchAdminData();
    } catch (err) {
      console.error('Error updating order:', err);
    }
  };

  const deleteMenuItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this menu item?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/menu/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Refresh menu
      fetchAdminData();
    } catch (err) {
      console.error('Error deleting menu item:', err);
    }
  };

  if (loading) return <div className="container">Loading admin dashboard...</div>;

  return (
    <div className="container">
      <div className="admin-dashboard">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <div className="admin-actions">
            <button onClick={() => navigate('/admin/add-menu-item')}>
              Add Menu Item
            </button>
            <button onClick={logout}>Logout</button>
          </div>
        </div>

        <div className="admin-stats">
          <div className="stat-card">
            <h3>Total Orders</h3>
            <p>{orders.length}</p>
          </div>
          <div className="stat-card">
            <h3>Total Users</h3>
            <p>{users.length}</p>
          </div>
          <div className="stat-card">
            <h3>Menu Items</h3>
            <p>{menuItems.length}</p>
          </div>
        </div>

        {/* Orders Section */}
        <div className="admin-section">
          <h2>Recent Orders</h2>
          <div className="orders-list">
            {orders.slice(0, 5).map(order => (
              <div key={order.id} className="order-card">
                <div className="order-info">
                  <h4>Order #{order.id}</h4>
                  <p>Customer: {order.customer_name}</p>
                  <p>Total: ${order.total_price}</p>
                  <p>Status: {order.status}</p>
                </div>
                <div className="order-actions">
                  <select 
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Users Section */}
        <div className="admin-section">
          <h2>Recent Users</h2>
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, 5).map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;