import {
  PasswordAttributesType,
  PasswordReturnType,
} from "../components/types/PasswordAttributesType";

function generatePassword(pp: PasswordAttributesType): PasswordReturnType {
  const charset = {
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lower: "abcdefghijklmnopqrstuvwxyz",
    symbol: "!@#$%^&*()_+-=[]{}|;:,.<>?",
    number: "0123456789",
  };

  let password = "";
  let characters = "";

  if (
    !pp.upper &&
    !pp.lower &&
    !pp.symbol &&
    !pp.number &&
    pp.salt.length > 0
  ) {
    return {
      result: pp.salt,
      status: "warning",
      message:
        "You've only provided a salt string, but no character types (uppercase, lowercase, symbol, number) are selected. The generated 'password' will only contain the salt string.",
    };
  }
  if (
    !pp.upper &&
    !pp.lower &&
    !pp.symbol &&
    !pp.number &&
    pp.salt.length === 0
  ) {
    return {
      result: "",
      status: "error",
      message:
        "No character types (uppercase, lowercase, symbol, number) are selected and no salt string is provided. Please select at least one character type or provide a salt string to generate a password.",
    };
  }

  if (pp.upper) characters += charset.upper;
  if (pp.lower) characters += charset.lower;
  if (pp.symbol) characters += charset.symbol;
  if (pp.number) characters += charset.number;

  let length = Array.isArray(pp.length) ? pp.length[0] : pp.length;

  for (let i = 0; i < length; i++) {
    password += characters[Math.floor(Math.random() * characters.length)];
  }

  switch (pp.saltAt) {
    case "s":
      password = pp.salt + password;
      break;
    case "e":
      password += pp.salt;
      break;
    case "b":
      const midIndex = Math.floor(password.length / 2);
      password =
        password.substring(0, midIndex) +
        pp.salt +
        password.substring(midIndex);
      break;
    default:
      break;
  }

  if (password.length < 8) {
    return {
      result: password,
      status: "warning",
      message:
        "Your password has been generated, but it's less than 8 characters long. For better security, it's recommended to use a password that's at least 8 characters long.",
    };
  }

  return {
    result: password,
    status: "success",
    message: "Your password has been successfully generated!",
  };
}

export default generatePassword;
