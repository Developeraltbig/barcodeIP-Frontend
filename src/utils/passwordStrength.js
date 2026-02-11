// has number
const hasNumber = (value) => /[0-9]/.test(value);

// has letter (upper OR lower)
const hasLetter = (value) => /[a-zA-Z]/.test(value);

// has special chars
const hasSpecial = (value) => /[!#@$%^&*)(+=._-]/.test(value);

// set color based on password strength
export const strengthColor = (count) => {
  if (count <= 2) return { label: 'Weak', color: 'error.main' };
  if (count === 3) return { label: 'Normal', color: 'warning.main' };
  if (count === 4) return { label: 'Good', color: 'success.main' };
  if (count >= 5) return { label: 'Strong', color: 'success.dark' };
  return { label: 'Weak', color: 'error.main' };
};

// password strength indicator
export const strengthIndicator = (value = '') => {
  let strength = 0;

  if (value.length >= 6) strength += 1;      // ✔ test@12 passes
  if (value.length >= 8) strength += 1;
  if (hasLetter(value)) strength += 1;        // ✔ lowercase allowed
  if (hasNumber(value)) strength += 1;        // ✔ has number
  if (hasSpecial(value)) strength += 1;       // ✔ has @

  return strength;
};
