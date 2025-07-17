const fs = require('fs'); // Módulo para trabajar con el sistema de archivos
const path = require('path'); // Módulo para trabajar con rutas de archivos

async function scanDirectory() {
  const directoryPath = './'; 
  // Ruta del directorio a escanear. Aquí usamos el actual ('./')

  // Leemos todos los archivos del directorio y filtramos solo los archivos (ignoramos carpetas)
  const files = fs.readdirSync(directoryPath).filter(file => fs.lstatSync(file).isFile());

  console.log('\n📁 Archivos encontrados:');
  // Mostramos la lista de archivos encontrados
  files.forEach((file, index) => console.log(`${index + 1}. ${file}`));
}

module.exports = { scanDirectory }; 
// Exportamos la función para usarla desde el menú