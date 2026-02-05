// Helper function to smooth scroll to element
export const smoothScrollToElement = (elementId, offset = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
};

// Calculate scroll percentage
export const calcScrollPercentage = () => {
  const pos = document.documentElement.scrollTop;
  const calcHeight = document.documentElement.scrollHeight - window.innerHeight;
  return Math.min(Math.round((pos * 100) / calcHeight), 100);
};

// Get current year
export const getCurrentYear = () => new Date().getFullYear();

// Debounce function
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
