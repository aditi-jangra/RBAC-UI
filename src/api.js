const simulateApiCall = (data, delay = 500) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, delay);
    });
  };
  
  export const fetchUsers = () => {
    return simulateApiCall([
      { id: 1, name: 'Alice', role: 'Admin' },
      { id: 2, name: 'Bob', role: 'Editor' },
      { id: 3, name: 'Charlie', role: 'Viewer' },
    ]);
  };
  
  export const createUser = (user) => {
    return simulateApiCall({ ...user, id: Date.now() }, 1000);
  };
  
  export const updateUser = (user) => {
    return simulateApiCall(user, 1000);
  };
  
  export const deleteUser = (userId) => {
    return simulateApiCall(userId, 1000);
  };
  
  export const fetchRoles = () => {
    return simulateApiCall([
      { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
      { id: 2, name: 'Editor', permissions: ['Read', 'Write'] },
    ]);
  };
  
  export const createRole = (role) => {
    return simulateApiCall({ ...role, id: Date.now() }, 1000);
  };
  
  export const updateRole = (role) => {
    return simulateApiCall(role, 1000);
  };
  
  export const deleteRole = (roleId) => {
    return simulateApiCall(roleId, 1000);
  };
  