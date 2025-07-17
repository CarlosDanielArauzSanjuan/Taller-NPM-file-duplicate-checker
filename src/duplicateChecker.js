
const fs = require('fs');
const path = require('path');
const crypto = require('crypto'); // Módulo nativo de Node.js para funciones criptográficas
const _ = require('lodash');

/**
 * ✅ ¿Por qué usamos hash SHA256?
 * 
 * Cuando se quiere verificar si dos archivos son idénticos, compararlos por nombre o tamaño no es suficiente:
 *   - Dos archivos pueden tener el mismo nombre pero contenido diferente.
 *   - Dos archivos pueden tener el mismo tamaño (en bytes), pero datos diferentes.
 * 
 * 🔐 SHA256 es una función hash criptográfica que convierte el contenido completo de un archivo en una "huella digital" única (hash).
 *   - Si el contenido cambia aunque sea un solo byte, el hash SHA256 cambiará completamente.
 *   - Si dos archivos tienen el mismo hash SHA256, podemos estar prácticamente seguros de que su contenido es idéntico.
 * 
 * Ventajas:
 *   - Precisión absoluta en la detección de duplicados.
 *   - Se pueden detectar duplicados incluso si los nombres de archivo son distintos.
 * 
 * Desventaja:
 *   - Es más costoso computacionalmente que comparar por nombre o tamaño, ya que lee todo el contenido de cada archivo.
 */

// Función que genera un hash SHA256 del contenido de un archivo
function getFileHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath); // Leemos el archivo completo como buffer de bytes
  const hashSum = crypto.createHash('sha256');  // Creamos una instancia de algoritmo SHA256
  hashSum.update(fileBuffer);                   // Cargamos los datos del archivo en el algoritmo
  return hashSum.digest('hex');                 // Obtenemos el resultado final del hash en formato hexadecimal
}

// Recolectamos información de cada archivo: nombre, tamaño y su hash SHA256
function getFilesInfo(directoryPath = './') {
  const files = fs.readdirSync(directoryPath).filter(file => fs.lstatSync(file).isFile());

  return files.map(file => {
    const fullPath = path.join(directoryPath, file);
    return {
      name: file,
      size: fs.statSync(fullPath).size,   // Tamaño en bytes
      hash: getFileHash(fullPath)         // Hash único del contenido
    };
  });
}

// Detección de archivos duplicados por contenido (mismo hash)
async function findDuplicates() {
  const filesInfo = getFilesInfo();

  // Agrupamos archivos por hash: archivos con el mismo hash tienen contenido duplicado
  const groupedByHash = _.groupBy(filesInfo, 'hash');

  // Filtramos los grupos que tienen más de un archivo => Son duplicados reales
  const duplicates = Object.values(groupedByHash).filter(group => group.length > 1);

  if (duplicates.length === 0) {
    console.log('\n✅ No se encontraron archivos duplicados por contenido.');
  } else {
    console.log('\n⚠️ Archivos duplicados encontrados por contenido:');
    duplicates.forEach((group, i) => {
      console.log(`\nGrupo ${i + 1} (hash: ${group[0].hash}):`);
      group.forEach(file => {
        console.log(`- ${file.name} (${file.size} bytes)`);
      });
    });
  }
}

module.exports = { findDuplicates };