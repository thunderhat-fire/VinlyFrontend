// utils.js

// Example of an API base URL (adjust to your actual base URL or environment)
export const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

// A utility function to handle errors
export function handleError(error) {
  console.error("An error occurred:", error);
  // You can show a user-friendly error message or log to an external service
}

// A utility function for date formatting (you can replace it with any other useful functions)
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // Formats to the user's locale (you can customize this)
}

// Example of a function to check if a user is authenticated (could be used globally)
export function isAuthenticated(user) {
  return user && user.authenticated === true;
}

// Example function to generate a unique ID (for example purposes)
export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Any other commonly used utility functions can go here

// utils.js

// Utility to join class names conditionally
export function cn(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  