// Genere les PNG d'icomes et l'image de partage a partir des SVG.
// Utilise uniquement sharp (deja installe). A relancer si les SVG sources changent.
import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const taches = [
  { entree: 'public/favicon.svg', sortie: 'public/favicon-32.png', taille: 32 },
  { entree: 'public/favicon.svg', sortie: 'public/apple-touch-icon.png', taille: 180 },
  { entree: 'public/favicon.svg', sortie: 'public/icon-192.png', taille: 192 },
  { entree: 'public/favicon.svg', sortie: 'public/icon-512.png', taille: 512 },
];

for (const t of taches) {
  const svg = readFileSync(t.entree);
  await sharp(svg, { density: 384 }).resize(t.taille, t.taille).png().toFile(t.sortie);
  console.log('genere', t.sortie);
}

const og = readFileSync('public/og.svg');
await sharp(og, { density: 192 }).resize(1200, 630).png().toFile('public/og.png');
console.log('genere public/og.png');
