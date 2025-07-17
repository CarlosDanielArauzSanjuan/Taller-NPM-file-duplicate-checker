const readline = require('readline'); 
// Módulo de Node.js que nos permite leer datos ingresados por el usuario en la consola

const { scanDirectory } = require('./fileScanner'); 
// Importamos la función que lista archivos del directorio

const { findDuplicates } = require('./duplicateChecker'); 
// Importamos la función que busca archivos duplicados

function showMenu() {
  // Creamos una interfaz para leer la entrada y escribir en la consola
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Mostramos el menú al usuario
  console.log('\n🧪 Verificador de Archivos Duplicados (Node.js + Lodash)');
  console.log('1. Escanear directorio');
  console.log('2. Buscar archivos duplicados');
  console.log('3. Salir');

  // Preguntamos al usuario qué opción desea ejecutar
  rl.question('\nSelecciona una opción: ', async (option) => {
    switch (option.trim()) {
      case '1':
        // Si elige 1, mostramos los archivos del directorio actual
        await scanDirectory();
        break;
      case '2':
        // Si elige 2, buscamos archivos duplicados
        await findDuplicates();
        break;
      case '3':
        // Si elige 3, terminamos el programa
        console.log('👋 Saliendo...');
        process.exit(0);
      default:
        // Si elige otra cosa, mostramos mensaje de error
        console.log('❌ Opción inválida');
    }

    rl.close(); // Cerramos la lectura de entrada
    setTimeout(showMenu, 500); // Volvemos a mostrar el menú después de un pequeño retraso
  });
}

module.exports = { showMenu }; 
// Exportamos la función para que pueda usarse desde otros archivos