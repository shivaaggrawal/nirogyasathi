// Mock Firebase Authentication System (for development)
// This simulates Firebase behavior without requiring valid credentials

// Mock user storage
const mockUsers = JSON.parse(localStorage.getItem('mockUsers')) || {};

// Mock Auth object with comprehensive method stubs
export const auth = {
  currentUser: null,
  
  // Methods that Firebase internals expect
  _getRecaptchaConfig: () => null,
  _getAppCheckToken: () => Promise.resolve(null),
  _getFramework: () => null,
  _logFramework: () => {},
  
  // Empty implementation for any internal methods
  _persist: () => {},
  _getPersistence: () => null,
  _setPersistence: () => Promise.resolve(),
  
  // Config methods
  useDeviceLanguage: () => {},
  
  // Ensure the auth object can handle dynamic property access
  [Symbol.for('nodejs.util.inspect.custom')]: function() {
    return 'MockAuth {}';
  }
};

// Mock updateProfile function
export const updateProfile = async (user, updates) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (user) {
        user.displayName = updates.displayName || user.displayName;
        resolve();
      }
    }, 300);
  });
};

// Mock createUserWithEmailAndPassword function
export const createUserWithEmailAndPassword = async (authObj, email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if user already exists
      if (mockUsers[email]) {
        reject(new Error('Firebase: Error (auth/email-already-in-use).'));
        return;
      }

      // Validate input
      if (!email || !password) {
        reject(new Error('Firebase: Error (auth/invalid-email).'));
        return;
      }

      if (password.length < 6) {
        reject(new Error('Firebase: Error (auth/weak-password).'));
        return;
      }

      // Create mock user
      const userId = `user_${Date.now()}`;
      const newUser = {
        uid: userId,
        email,
        password, // In real Firebase, this would be hashed
        displayName: '',
        photoURL: null,
        emailVerified: false
      };

      mockUsers[email] = newUser;
      localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
      auth.currentUser = newUser;

      resolve({
        user: newUser
      });
    }, 500);
  });
};

// Mock signInWithPopup function for Google Sign-in
export const signInWithPopup = async (authObj, provider) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate Google sign-in
      const googleUser = {
        uid: `google_${Date.now()}`,
        email: `user${Date.now()}@gmail.com`,
        displayName: 'Google User',
        photoURL: 'https://via.placeholder.com/50',
        emailVerified: true
      };

      auth.currentUser = googleUser;
      resolve({
        user: googleUser
      });
    }, 800);
  });
};

// Mock provider object
export const provider = {
  setCustomParameters: () => {}
};
