import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateEmptyPosition = () => {
  return {
    title: "",
    company: "",
    startDate: new Date().toLocaleDateString("en-CA"),
    endDate: new Date().toLocaleDateString("en-CA"),
    notes: [""],
    id: uuidv4(),
  };
};

export const generateEmptyEducation = () => {
  return {
    institution: "",
    degree: "",
    field: "",
    startDate: new Date().toLocaleDateString("en-CA"),
    endDate: new Date().toLocaleDateString("en-CA"),
    notes: [""],
    id: uuidv4(),
  };
};

export function capitalizeWords(str: string) {
  // Split the string into an array of words
  const words = str.split('-');

  // Capitalize the first letter of each word
  const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

  // Join the words back into a single string
  const result = capitalizedWords.join(' ');

  return result;
}