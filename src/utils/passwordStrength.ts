interface PasswordStrength {
  message: string;
  color: string;
  level: number;
}

const getPasswordStrength = (password: string): PasswordStrength => {
  let score = 0;
  const regexChecks: RegExp[] = [
    /[A-Z]/, // Uppercase letters
    /[a-z]/, // Lowercase letters
    /[0-9]/, // Numbers
    /[^A-Za-z0-9]/, // Symbols
    /^.{8,}$/, // Minimum 8 characters
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/, // Complex requirements
  ];

  regexChecks.forEach((regex) => {
    if (regex.test(password)) {
      score++;
    }
  });

  const strength: PasswordStrength = {
    message: "",
    color: "",
    level: score,
  };

  if (score === 0) {
    strength.message = "Very Weak";
    strength.color = "#FF0000"; // Red
  } else if (score === 1) {
    strength.message = "Weak";
    strength.color = "#FFA500"; // Orange
  } else if (score === 2) {
    strength.message = "Moderate";
    strength.color = "#FFFF00"; // Yellow
  } else if (score === 3) {
    strength.message = "Strong";
    strength.color = "#008000"; // Green
  } else if (score >= 4) {
    strength.message = "Very Strong";
    strength.color = "#006400"; // Dark Green
  }

  return strength;
};

// Test the password strength checker function
// const password = "MyP@ssw0rd";
// const passwordStrength = getPasswordStrength(password);
// console.log(passwordStrength);

export default getPasswordStrength;
