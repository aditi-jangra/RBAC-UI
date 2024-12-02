import React, { useState, useEffect } from 'react';
import { fetchRoles, createRole, updateRole, deleteRole } from './api';

const availablePermissions = ['Read', 'Write', 'Delete', 'Execute', 'Modify'];

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState({ name: '', permissions: [] });
  const [editRole, setEditRole] = useState(null);

  useEffect(() => {
    fetchRoles().then((data) => setRoles(data));
  }, []);

  const handleAddRole = () => {
    createRole(newRole).then((role) => {
      setRoles([...roles, role]);
      setNewRole({ name: '', permissions: [] });
    });
  };

  const handleEditRole = (role) => {
    setEditRole({ ...role });
  };

  const handleSaveRole = () => {
    updateRole(editRole).then((updatedRole) => {
      setRoles(roles.map((role) => (role.id === updatedRole.id ? updatedRole : role)));
      setEditRole(null);
    });
  };

  const handleDeleteRole = (id) => {
    deleteRole(id).then(() => {
      setRoles(roles.filter((role) => role.id !== id));
    });
  };

  const handleTogglePermission = (permission) => {
    if (editRole) {
      const permissions = editRole.permissions.includes(permission)
        ? editRole.permissions.filter((p) => p !== permission)
        : [...editRole.permissions, permission];
      setEditRole({ ...editRole, permissions });
    } else {
      const permissions = newRole.permissions.includes(permission)
        ? newRole.permissions.filter((p) => p !== permission)
        : [...newRole.permissions, permission];
      setNewRole({ ...newRole, permissions });
    }
  };

  return (
    <div className="role-management">
      <h2>Role Management</h2>
      <div className="add-role-form">
        <h3>{editRole ? 'Edit Role' : 'Add New Role'}</h3>
        <input
          type="text"
          placeholder="Role Name"
          value={editRole ? editRole.name : newRole.name}
          onChange={(e) =>
            editRole
              ? setEditRole({ ...editRole, name: e.target.value })
              : setNewRole({ ...newRole, name: e.target.value })
          }
        />
        <div className="permissions">
          <h4>Permissions</h4>
          {availablePermissions.map((permission) => (
            <label key={permission}>
              <input
                type="checkbox"
                checked={
                  editRole
                    ? editRole.permissions.includes(permission)
                    : newRole.permissions.includes(permission)
                }
                onChange={() => handleTogglePermission(permission)}
              />
              {permission}
            </label>
          ))}
        </div>
        <button onClick={editRole ? handleSaveRole : handleAddRole}>
          {editRole ? 'Save Role' : 'Add Role'}
        </button>
      </div>

      <h3>Existing Roles</h3>
      <table className="role-table">
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>{role.permissions.join(', ')}</td>
              <td>
                <button onClick={() => handleEditRole(role)}>Edit</button>
                <button onClick={() => handleDeleteRole(role.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleManagement;
