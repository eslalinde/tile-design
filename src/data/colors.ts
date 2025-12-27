export interface MosaicColor {
  hex: string;
  name: string;
}

export const HexColorsList: MosaicColor[] = [
  { hex: "#EFEFEF", name: "C1-Blanco" },
  { hex: "#C1C8CF", name: "C2-Gris Plata" },
  { hex: "#BCC2C0", name: "C3-Cenizo" },
  { hex: "#8B8683", name: "C4-Café Claro" },
  { hex: "#D4C6C4", name: "C5-Palo de Rosa" },
  { hex: "#D4A57A", name: "C6-Ladrillo" },
  { hex: "#BC8370", name: "C7-Guayaba" },
  { hex: "#C8C48C", name: "C8-Amarillo Claro" },
  { hex: "#9AC4B0", name: "C9-Verde Pastel" },
  { hex: "#469AA4", name: "C10-Verde Turquesa Claro" },
  { hex: "#96CDE7", name: "C11-Azul Pastel" },
  { hex: "#DE8ABA", name: "C12-Fucsia" },
  { hex: "#DADECF", name: "C13-Beige" },
  { hex: "#818890", name: "C14-Gris Oscuro" },
  { hex: "#44494D", name: "C15-Negro" },
  { hex: "#7B6D65", name: "C16-Café Medio" },
  { hex: "#D8BEAF", name: "C17-Rosado Pastel" },
  { hex: "#C68871", name: "C18-Salmon" },
  { hex: "#AE6245", name: "C19-Rojo Especial" },
  { hex: "#D3C177", name: "C20-Amarillo Normal" },
  { hex: "#88AD82", name: "C21-Verde Aceituna" },
  { hex: "#01A8B8", name: "C22-Verde Turquesa Fuerte" },
  { hex: "#84CCDD", name: "C23-Azul Aguamarina" },
  { hex: "#8871B3", name: "C24-Morado" },
  { hex: "#D3D2BC", name: "C25-Champañe" },
  { hex: "#686965", name: "C26-Eucalipto" },
  { hex: "#2E3236", name: "C27-Negro Humo" },
  { hex: "#554840", name: "C28-Café Oscuro" },
  { hex: "#A99790", name: "C29-Arena" },
  { hex: "#C27547", name: "C30-Naranja" },
  { hex: "#7D513B", name: "C31-Rojo Oscuro" },
  { hex: "#D7BD80", name: "C32-Amarillo Fuerte" },
  { hex: "#8A8966", name: "C33-Ocre" },
  { hex: "#416969", name: "C34-Verde Oscuro" },
  { hex: "#4B9ED7", name: "C35-Azul Normal" },
  { hex: "#5283A4", name: "C36-Azul Oscuro" },
];

export type ColorCode = `C${number}`;

export function getColorByCode(code: ColorCode): MosaicColor | undefined {
  return HexColorsList.find((c) => c.name.startsWith(code));
}

export function getColorByHex(hex: string): MosaicColor | undefined {
  return HexColorsList.find((c) => c.hex.toLowerCase() === hex.toLowerCase());
}

