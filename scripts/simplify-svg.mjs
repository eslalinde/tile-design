/**
 * Script para simplificar SVGs grandes de mosaicos
 * Uso: node scripts/simplify-svg.mjs <input.svg> <output.svg>
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { optimize } from 'svgo';
import { resolve, dirname, basename } from 'path';

// Obtener argumentos
const args = process.argv.slice(2);
if (args.length < 1) {
  console.log('Uso: node scripts/simplify-svg.mjs <input.svg> [output.svg]');
  console.log('Ejemplo: node scripts/simplify-svg.mjs Gaudi21.svg Gaudi21-simplified.svg');
  process.exit(1);
}

const inputPath = resolve(args[0]);
const outputPath = args[1] 
  ? resolve(args[1]) 
  : resolve(dirname(inputPath), basename(inputPath, '.svg') + '-simplified.svg');

if (!existsSync(inputPath)) {
  console.error(`Error: No se encontró el archivo: ${inputPath}`);
  process.exit(1);
}

console.log('📁 Archivo de entrada:', inputPath);
console.log('📁 Archivo de salida:', outputPath);

// Leer SVG original
const originalSvg = readFileSync(inputPath, 'utf-8');
const originalSize = Buffer.byteLength(originalSvg, 'utf-8');

console.log(`\n📊 Tamaño original: ${(originalSize / 1024).toFixed(2)} KB`);

// Configuración de SVGO para optimización agresiva
const svgoConfig = {
  multipass: true,
  plugins: [
    // Eliminar metadatos de editores (Inkscape, etc.)
    {
      name: 'removeEditorsNSData',
    },
    // Eliminar comentarios
    {
      name: 'removeComments',
    },
    // Eliminar metadatos
    {
      name: 'removeMetadata',
    },
    // Eliminar elementos vacíos
    {
      name: 'removeEmptyContainers',
    },
    // Eliminar atributos inútiles
    {
      name: 'removeUselessDefs',
    },
    // Eliminar grupos innecesarios
    {
      name: 'collapseGroups',
    },
    // Eliminar atributos vacíos
    {
      name: 'removeEmptyAttrs',
    },
    // Convertir colores a formato más corto
    {
      name: 'convertColors',
      params: {
        currentColor: false,
        names2hex: true,
        rgb2hex: true,
        shorthex: true,
        shortname: true,
      },
    },
    // Simplificar paths (AGRESIVO)
    {
      name: 'convertPathData',
      params: {
        applyTransforms: true,
        applyTransformsStroked: true,
        makeArcs: {
          threshold: 2.5,
          tolerance: 0.5,
        },
        straightCurves: true,
        lineShorthands: true,
        curveSmoothShorthands: true,
        floatPrecision: 1, // Reducir precisión de decimales
        transformPrecision: 2,
        removeUseless: true,
        collapseRepeated: true,
        utilizeAbsolute: true,
        negativeExtraSpace: true,
        forceAbsolutePath: false,
      },
    },
    // Convertir transformaciones
    {
      name: 'convertTransform',
      params: {
        floatPrecision: 2,
      },
    },
    // Redondear valores numéricos
    {
      name: 'cleanupNumericValues',
      params: {
        floatPrecision: 1, // Reducir precisión
        leadingZero: true,
        defaultPx: true,
        convertToPx: true,
      },
    },
    // Limpiar IDs no utilizados
    {
      name: 'cleanupIds',
      params: {
        remove: true,
        minify: true,
      },
    },
    // Eliminar atributos de estilo por defecto
    {
      name: 'removeUnknownsAndDefaults',
      params: {
        unknownContent: true,
        unknownAttrs: true,
        defaultAttrs: true,
      },
    },
    // Eliminar viewBox duplicado si coincide con width/height
    {
      name: 'removeViewBox',
      active: false, // Mantener viewBox para escalado
    },
    // Eliminar xmlns:xlink si no se usa
    {
      name: 'removeXlink',
    },
    // Ordenar atributos para mejor compresión gzip
    {
      name: 'sortAttrs',
    },
    // Eliminar elementos ocultos
    {
      name: 'removeHiddenElems',
    },
    // Eliminar dimensiones (usar viewBox)
    {
      name: 'removeDimensions',
    },
    // Fusionar paths cuando sea posible
    {
      name: 'mergePaths',
      params: {
        force: true,
      },
    },
    // Fusionar estilos
    {
      name: 'mergeStyles',
    },
    // Eliminar estilos no utilizados
    {
      name: 'inlineStyles',
      params: {
        onlyMatchedOnce: false,
        removeMatchedSelectors: true,
      },
    },
  ],
};

// Plugin personalizado para eliminar círculos pequeños (opcional)
const removeSmallCircles = {
  name: 'removeSmallCircles',
  fn: () => ({
    element: {
      enter: (node, parentNode) => {
        if (node.name === 'circle') {
          const r = parseFloat(node.attributes.r || '0');
          // Eliminar círculos con radio menor a 2.5
          if (r < 2.5) {
            parentNode.children = parentNode.children.filter(child => child !== node);
          }
        }
      },
    },
  }),
};

// Plugin para simplificar blend-mode (reemplazar por opacity simple)
const simplifyBlendMode = {
  name: 'simplifyBlendMode',
  fn: () => ({
    element: {
      enter: (node) => {
        if (node.attributes.style) {
          // Reemplazar mix-blend-mode por solo opacity
          node.attributes.style = node.attributes.style
            .replace(/mix-blend-mode:\s*multiply;?/gi, '')
            .replace(/isolation:\s*isolate;?/gi, '')
            .trim();
          
          if (!node.attributes.style) {
            delete node.attributes.style;
          }
        }
        if (node.attributes.class) {
          // Simplificar clases
          node.attributes.class = node.attributes.class
            .replace(/cls-2/g, '')
            .replace(/cls-4/g, '')
            .trim();
          
          if (!node.attributes.class) {
            delete node.attributes.class;
          }
        }
      },
    },
  }),
};

// Optimizar con SVGO
console.log('\n🔧 Optimizando con SVGO...');
let result = optimize(originalSvg, svgoConfig);

// Segunda pasada con plugins personalizados
console.log('🔧 Aplicando simplificaciones adicionales...');
const customConfig = {
  multipass: true,
  plugins: [
    removeSmallCircles,
    simplifyBlendMode,
  ],
};

result = optimize(result.data, customConfig);

// Limpiar estilos CSS no utilizados del resultado
let finalSvg = result.data;

// Simplificar el style tag
finalSvg = finalSvg.replace(
  /<style[^>]*>.*?<\/style>/gs,
  '<style>.s{fill:#d5d3d3;opacity:.3}</style>'
);

// Reemplazar clases por la simplificada
finalSvg = finalSvg.replace(/class="cls-1"/g, 'class="s"');
finalSvg = finalSvg.replace(/class="cls-3"/g, 'class="s"');

// Estadísticas finales
const finalSize = Buffer.byteLength(finalSvg, 'utf-8');
const reduction = ((originalSize - finalSize) / originalSize * 100).toFixed(1);

console.log(`\n✅ Optimización completada!`);
console.log(`📊 Tamaño original: ${(originalSize / 1024).toFixed(2)} KB`);
console.log(`📊 Tamaño final: ${(finalSize / 1024).toFixed(2)} KB`);
console.log(`📊 Reducción: ${reduction}%`);

// Contar elementos
const circleCount = (finalSvg.match(/<circle/g) || []).length;
const pathCount = (finalSvg.match(/<path/g) || []).length;
console.log(`\n📈 Elementos restantes:`);
console.log(`   - Círculos: ${circleCount}`);
console.log(`   - Paths: ${pathCount}`);

// Guardar resultado
writeFileSync(outputPath, finalSvg, 'utf-8');
console.log(`\n💾 Archivo guardado: ${outputPath}`);
