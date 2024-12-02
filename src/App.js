import React from 'react';
import './App.css';
import UserManagement from './UserManagement';
import RoleManagement from './RoleManagement';

const App = () => {
  return (
    <div className="app">
      <h1>User & Role Management System</h1>
      <div className="tabs">
        <button>Manage Users</button>
        <button>Manage Roles</button>
      </div>

      <div className="content">
        <UserManagement />
        <RoleManagement />
      </div>
      <div className="App">
      <div className="header">
        Role-Based Access Control
      </div>

      <div className="container">
        <h2>User Management</h2>

      </div>

      <div className="container">
        <h2>Role Management</h2>
        
      </div>
    </div>
    </div>
  );
};

export default App;
