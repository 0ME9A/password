import {
  PasswordAttributesType,
  ProPasswordReturnType,
} from "../components/types/PasswordAttributesType";
import passwordStrength from "./passwordStrength";

const generatePassword = (
  attributes: PasswordAttributesType,
  existingPasswords: string[] = []
): ProPasswordReturnType => {
  const charset = {
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lower: "abcdefghijklmnopqrstuvwxyz",
    symbol: "!@#$%^&*()_+-=[]{}|;:,.<>?",
    number: "0123456789",
  };

  let password = "";
  let characters = "";

  // Add existing passwords to the characters pool
  existingPasswords.forEach((existingPassword) => {
    characters += existingPassword;
  });

  if (attributes.upper) characters += charset.upper;
  if (attributes.lower) characters += charset.lower;
  if (attributes.symbol) characters += charset.symbol;
  if (attributes.number) characters += charset.number;



  // Ensure at least one character from each type is included, only if the length does not go over
  const addCharacterOfType = (type:boolean, characters:string, maxLength:any) => {
    return type && password.length < maxLength
      ? characters[Math.floor(Math.random() * characters.length)]
      : '';
  };
  
  password += addCharacterOfType(attributes.upper, charset.upper, attributes.length) 
  password += addCharacterOfType(attributes.lower, charset.lower, attributes.length)
  password += addCharacterOfType(attributes.symbol, charset.symbol, attributes.length)
  password += addCharacterOfType(attributes.number, charset.number, attributes.length)
  // Generate the rest of the password based on the remaining length
  let remainingLength = Array.isArray(attributes.length)
    ? attributes.length[0] - password.length
    : attributes.length - password.length;

  for (let i = 0; i < remainingLength; i++) {
    password += characters[Math.floor(Math.random() * characters.length)];
  }

  // Add salt if provided and position specified
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

  // Calculate password strength
  const strength = passwordStrength(password);

  return {
    password: password,
    strength: strength,
  };
};

export default generatePassword;
