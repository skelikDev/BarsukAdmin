import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

type ModuleDictionary = {
  cl: string | undefined;
  con: boolean | undefined;
};

const parseModuleDictionary = (dict: ModuleDictionary) => {
  const { cl, con } = dict;
  if (cl && con) {
    return cl;
  }
  return undefined;
};

export function cn(...inputs: (ClassValue | ModuleDictionary)[]) {
  const clsxInputs = inputs.map((input) => {
    if (input && typeof input === 'object' && 'cl' in input && 'con' in input) {
      const keys = Object.keys(input);
      if (keys.length === 2) {
        return parseModuleDictionary(input as ModuleDictionary);
      }
    }
    return input;
  });
  return twMerge(clsx(clsxInputs));
}
