export function removeNonDigits(value: string): string {
  return value.replace(/\D/g, '');
}

export function removeSpecialCharacters(value: string): string {
  return value.replace(/[^\w\s]/gi, '');
}

export function formatCnpj( value: any ): string {
  value = value.toString();
  return `${value.substr(0, 2)}.${value.substr(2, 3)}.${value.substr(5, 3)}/${value.substr(8, 4)}-${value.substr(12, 2)}`;
}

export function formatCpf(value: any): string {
  value = value.toString();
  return `${value.substr(0, 3)}.${value.substr(3, 3)}.${value.substr(6, 3)}-${value.substr(9, 2)}`;
}

export function toTitleCase(str: string): string {
  const text = str.toLowerCase().split(' ');
  const newText = text.map( part => {
    return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
  });

  return newText.join(' ');
}

