import {
  PasswordAttributesType,
  ProPasswordReturnType,
} from "../components/types/PasswordAttributesType";
import passwordStrength from "./passwordStrength";

const generatePassword = (
  attributes: PasswordAttributesType
): ProPasswordReturnType => {
  const charset = {
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lower: "abcdefghijklmnopqrstuvwxyz",
    symbol: "!@#$%^&*()_+-=[]{}|;:,.<>?",
    number: "0123456789",
  };

  let password = "";
  let characters = "";

  if (
    !attributes.upper &&
    !attributes.lower &&
    !attributes.symbol &&
    !attributes.number &&
    attributes.salt.length > 0
  ) {
    return {
      password: attributes.salt,
      strength: passwordStrength(attributes.salt),
    };
  }

  if (
    !attributes.upper &&
    !attributes.lower &&
    !attributes.symbol &&
    !attributes.number &&
    attributes.salt.length === 0
  ) {
    return {
      password: "",
      strength: {
        message: "No character types selected and no salt provided.",
        color: "",
        level: 0,
      },
    };
  }

  if (attributes.upper) characters += charset.upper;
  if (attributes.lower) characters += charset.lower;
  if (attributes.symbol) characters += charset.symbol;
  if (attributes.number) characters += charset.number;

  let length = Array.isArray(attributes.length)
    ? attributes.length[0]
    : attributes.length;

  for (let i = 0; i < length; i++) {
    password += characters[Math.floor(Math.random() * characters.length)];
  }

  switch (attributes.saltAt) {
    case "s":
      password = attributes.salt + password;
      break;
    case "e":
      password += attributes.salt;
      break;
    case "b":
      const midIndex = Math.floor(password.length / 2);
      password =
        password.substring(0, midIndex) +
        attributes.salt +
        password.substring(midIndex);
      break;
    default:
      break;
  }

  const strength = passwordStrength(password);

  return {
    password: password,
    strength: strength,
  };
};

export default generatePassword;
