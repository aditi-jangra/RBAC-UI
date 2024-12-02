import React, { useState, useEffect } from 'react';
import { fetchUsers, createUser, updateUser, deleteUser } from './api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', role: '' });
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchUsers().then((data) => setUsers(data));
  }, []);

  const handleAddUser = () => {
    createUser(newUser).then((user) => {
      setUsers([...users, user]);
      setNewUser({ name: '', role: '' });
    });
  };

  const handleEditUser = (user) => {
    setEditUser({ ...user });
  };

  const handleSaveUser = () => {
    updateUser(editUser).then((updatedUser) => {
      setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
      setEditUser(null);
    });
  };

  const handleDeleteUser = (id) => {
    deleteUser(id).then(() => {
      setUsers(users.filter((user) => user.id !== id));
    });
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <div className="add-user-form">
        <h3>{editUser ? 'Edit User' : 'Add New User'}</h3>
        <input
          type="text"
          placeholder="User Name"
          value={editUser ? editUser.name : newUser.name}
          onChange={(e) =>
            editUser
              ? setEditUser({ ...editUser, name: e.target.value })
              : setNewUser({ ...newUser, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Role"
          value={editUser ? editUser.role : newUser.role}
          onChange={(e) =>
            editUser
              ? setEditUser({ ...editUser, role: e.target.value })
              : setNewUser({ ...newUser, role: e.target.value })
          }
        />
        <button onClick={editUser ? handleSaveUser : handleAddUser}>
          {editUser ? 'Save User' : 'Add User'}
        </button>
      </div>

      <h3>Existing Users</h3>
      <table className="user-table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleEditUser(user)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
