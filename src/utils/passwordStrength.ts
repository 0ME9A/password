import { PasswordStrengthType } from "../components/types/PasswordAttributesType";

const passwordStrength = (password: string): PasswordStrengthType => {
  const RED = "#FF0000";
  const ORANGE = "#F94C10";
  const YELLOW = "#FED049";
  const GREEN = "#82CD47";
  const DARK_GREEN = "#379237";

  let score = 0;
  const regexChecks: RegExp[] = [
    /[A-Z]/, // Uppercase letters
    /[a-z]/, // Lowercase letters
    /[0-9]/, // Numbers
    /[^A-Za-z0-9]/, // Symbols
  ];

  regexChecks.forEach((regex) => {
    if (regex.test(password)) {
      score++;
    }
  });

  const strength: PasswordStrengthType = {
    message: "",
    color: "",
    level: score,
  };

  const len = password.length;
  if (len < 3) {
    strength.message = "Very Weak";
    strength.color = RED;
  }
  if (score === 1 && len <= 4) {
    strength.message = "Very Weak";
    strength.color = RED;
  } else if ((score === 1 && len <= 8) || (score === 2 && len <= 4)) {
    strength.message = "Weak";
    strength.color = ORANGE;
  } else if (
    (score === 1 && len <= 12) ||
    (score === 2 && len <= 6) ||
    (score === 3 && len <= 4)
  ) {
    strength.message = "Moderate";
    strength.color = YELLOW;
  } else if (
    (score === 1 && len <= 16) ||
    (score === 2 && len <= 10) ||
    (score === 3 && len <= 8) ||
    (score === 4 && len <= 6)
  ) {
    strength.message = "Strong";
    strength.color = GREEN;
  } else if (
    (score === 1 && len > 16) ||
    (score === 2 && len > 10) ||
    (score === 3 && len > 8) ||
    (score === 4 && len > 6)
  ) {
    strength.message = "Very Strong";
    strength.color = DARK_GREEN;
  }

  return strength;
};

// Test the password strength checker function
// const password = "MyP@ssw0rd";
// const passwordStrength = getPasswordStrength(password);
// console.log(passwordStrength);

export default passwordStrength;
