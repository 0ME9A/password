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

  // Add existing passwords to the characters pool
  existingPasswords.forEach((existingPassword) => {
    characters += existingPassword;
  });

  if (attributes.upper) characters += charset.upper;
  if (attributes.lower) characters += charset.lower;
  if (attributes.symbol) characters += charset.symbol;
  if (attributes.number) characters += charset.number;

  const addCharacterOfType = (type: boolean, characters: string, maxLength: any) =>
    type && password.length < maxLength
      ? characters[Math.floor(getSecureRandom() * characters.length)]
      : '';

  const getSecureRandom = () => {
    const randomValues = new Uint32Array(1);
    window.crypto.getRandomValues(randomValues);
    return randomValues[0] / (0xffffffff + 1);
  };

  const types = [
    { type: attributes.upper, characters: charset.upper },
    { type: attributes.lower, characters: charset.lower },
    { type: attributes.symbol, characters: charset.symbol },
    { type: attributes.number, characters: charset.number },
  ];

  // Shuffle the order of types randomly
  for (let i = types.length - 1; i > 0; i--) {
    const j = Math.floor(getSecureRandom() * (i + 1));
    [types[i], types[j]] = [types[j], types[i]];
  }

  // Add characters of each type in the shuffled order
  for (const { type, characters } of types) {
    password += addCharacterOfType(type, characters, attributes.length);
  }

  // Generate the rest of the password based on the remaining length
  let remainingLength = Array.isArray(attributes.length)
    ? attributes.length[0] - password.length
    : attributes.length - password.length;

  if(characters ){
    for (let i = 0; i < remainingLength; i++) {
      password += characters[Math.floor(getSecureRandom() * characters.length)];
    }
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
