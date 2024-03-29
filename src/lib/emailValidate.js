export const isValidEmail = (email) => {
  // Regular expression pattern for email validation
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // Use the test method of the regular expression to check if the email matches the pattern
  return pattern.test(email);
};
