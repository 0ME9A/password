type PasswordAttributesType = {
  upper: boolean; // Include uppercase characters (A-Z)
  lower: boolean; // Include lowercase characters (a-z)
  symbol: boolean; // Include symbol characters (!@#$%^&*()_+-=[]{}|;:,.<>?)
  number: boolean; // Include numbers (0-9)
  salt: string; // Custom string to be added to the password
  length: number | number[]; // Length of the password
  saltAt: "b" | "e" | "s" | string; // Position to add the salt string. 'b' for beginning, 'e' for end, 's' for somewhere in between.
};

type PasswordReturnType = {
  result: string;
  status: string;
  message: string;
};

interface PasswordStrengthType {
  message: string;
  color: string;
  level: number;
}

interface ProPasswordReturnType {
  password: string;
  strength: PasswordStrengthType;
}

export type {
  PasswordAttributesType,
  PasswordReturnType,
  PasswordStrengthType,
  ProPasswordReturnType,
};
