// Simple Storage Management
const Storage = {
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Storage error:', error);
      return false;
    }
  },
  
  get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Storage error:', error);
      return null;
    }
  },
  
  remove(key) {
    localStorage.removeItem(key);
  },
  
  clear() {
    localStorage.clear();
  }
};

// Simple Authentication (No Supabase, No Email Verification)
const Auth = {
  login(email, password, role) {
    // For demo: Accept any email/password
    const user = {
      id: Date.now(),
      email,
      role,
      name: email.split('@')[0],
      createdAt: new Date().toISOString()
    };
    
    Storage.set('currentUser', user);
    Storage.set('isAuthenticated', true);
    return user;
  },
  
  signup(email, password, role, additionalData) {
    const user = {
      id: Date.now(),
      email,
      role,
      ...additionalData,
      createdAt: new Date().toISOString()
    };
    
    Storage.set('currentUser', user);
    Storage.set('isAuthenticated', true);
    return user;
  },
  
  logout() {
    Storage.remove('currentUser');
    Storage.set('isAuthenticated', false);
    window.location.href = '/index.html';
  },
  
  getCurrentUser() {
    return Storage.get('currentUser');
  },
  
  isAuthenticated() {
    return Storage.get('isAuthenticated') === true;
  },
  
  requireAuth() {
    if (!this.isAuthenticated()) {
      window.location.href = '/auth/login.html';
      return false;
    }
    return true;
  },
  
  // Demo mode - instant access
  demoLogin() {
    const demoUser = {
      id: 999999,
      email: 'demo@proteomorphic.com',
      name: 'Demo User',
      role: 'researcher',
      createdAt: new Date().toISOString()
    };
    
    Storage.set('currentUser', demoUser);
    Storage.set('isAuthenticated', true);
    return demoUser;
  }
};

window.Storage = Storage;
window.Auth = Auth;
