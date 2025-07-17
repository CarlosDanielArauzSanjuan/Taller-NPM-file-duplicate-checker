#!/usr/bin/env node
// Línea especial para que este archivo pueda ejecutarse directamente desde la terminal en sistemas Unix (como macOS).

const { showMenu } = require('./src/menu'); 
// Importamos la función que muestra el menú interactivo desde el archivo menu.js

showMenu(); 
// Ejecutamos la función del menú cuando el programa inicia