//declara la constante colors
const colors = require('./colors');
//declara la constante fs
const fs = require('fs').promises;
//crea una interfaz de lectura y escritura
const readline = require('readline').createInterface({
  // representa la entrada del usuario desde la consola
  input: process.stdin,
  // indica que los mensajes y resultados generados por la función readline se mostrarán en la consola
  output: process.stdout,
});

//Define la clase DetalleCompra
class DetalleCompra {
  //atributos de la clase
  #producto;
  #cantidad;
  #costoTotal;

  //se instancia los atributos para poderlos detallar
  constructor(producto, cantidad, costoTotal) {
    // se está asignando el valor del parámetro 
    this.#producto = producto;
    this.#cantidad = cantidad;
    this.#costoTotal = costoTotal;
  }

  //Métodos getter y setter para acceder a los atributos privados
  //permite obtener el valor de un atributo privado de la clase
  get producto() {
    //Devuelve el valor del atributo privado 
    return this.#producto;
  }

  //Permite establecer el valor del atributo privado 
  set producto(producto) {
    // asigna el valor pasado como parámetro 
    this.#producto = producto;
  }

  //permite obtener el valor de un atributo privado de la clase
  get cantidad() {
    //Devuelve el valor del atributo privado  
    return this.#cantidad;
  }

  //Permite establecer el valor del atributo privado 
  set cantidad (cantidad) {
    // asigna el valor pasado como parámetro 
    this.#cantidad = cantidad;
  }

  //permite obtener el valor de un atributo privado de la clase
  get costoTotal() {
    //Devuelve el valor del atributo privado 
    return this.#costoTotal;
  }

  //Permite establecer el valor del atributo privado 
  set costoTotal(costoTotal) {
    // asigna el valor pasado como parámetro 
    this.#costoTotal = costoTotal;
  }
}

//define la clase ProductosTienda
class ProductosTienda {
  //Atributos de la clase asignada
  #listaproductos;
  #saldo;
  #detallesCompra;
  #nombreCliente;
  #celularCliente;
  #totalCompra;

  //metodo constructor para definir los atributos
  constructor() {
    //Esta líneas inicializan el atributo privado
    this.#listaproductos = [];
    this.#detallesCompra = [];
    this.#saldo = 0;
    this.#nombreCliente = '';
    this.#celularCliente = '';
    this.#totalCompra = 0;
  }

  //Métodos getter y setter para acceder a los atributos privados
  // metodo Getter para obtener el nombre del cliente
  get nombreCliente() {
    return this.#nombreCliente;
  }

  // metodo Setter para establecer el nombre del cliente
  set nombreCliente(nombre) {
    this.#nombreCliente = nombre;
  }

  // metodo Getter para obtener el número de celular del cliente
  get celularCliente() {
    return this.#celularCliente;
  }

  // metodo Setter para establecer el número de celular del cliente
  set celularCliente(celular) {
    this.#celularCliente = celular;
  }

  // metodo Getter para obtener el saldo
  get saldo() {
    return this.#saldo;
  }

  // metodo Setter para establecer el saldo
  set saldo(saldo) {
    this.#saldo = saldo;
  }

  // metodo Getter para obtener la lista de productos
  get listaproductos() {
    return this.#listaproductos;
  }

  // metodo Setter para establecer la lista de productos
  set listaproductos(lista) {
    this.#listaproductos = lista;
  }

  // metodo Getter para obtener los detalles de la compra
  get detallesCompra() {
    return this.#detallesCompra;
  }

  // metodo Setter para establecer los detalles de la compra
  set detallesCompra (detalles) {
    this.#detallesCompra = detalles;
  }

  // metodo Getter para obtener el total de la compra
  get totalCompra() {
    return this.#totalCompra;
  }

  // metodo Setter para establecer el total de la compra
  set totalCompra (total) {
    this.#totalCompra = total;
  }


//Funcion de la clase para mostrar los productos 
  async mostrarproductos() {
    //Recorre la lista de productos y muestra sus detalles
    this.#listaproductos.forEach((producto) => {
    //mensaje que llama los atributos y los muestra en pantalla
      console.log(
        // Muestra el código del producto con formato tabular
        `|     ${producto.codigoproducto}     |` +
        // Muestra el nombre del producto con formato tabular
        `      ${producto.nombreproducto}     |` +
        // Muestra el inventario del producto con formato tabular
        `      ${producto.inventarioproducto}     |` +
        // Muestra el precio del producto con formato tabular
        `      ${producto.precioproducto}     |`
      );
    });
  }

  //funcion async de la clase para comprar un producto
  async comprarProducto() {

    // Función interna para obtener respuestas del usuario de manera asíncrona
    const obtenerRespuesta = async (pregunta) => {
      // Devuelve una nueva promesa que se resuelve con la respuesta del usuario
      return new Promise((resolve) => {
        // Utiliza la función 'question' de 'readline' para realizar una pregunta al usuario
        readline.question(pregunta, (respuesta) => {
          // Resuelve la promesa con la respuesta del usuario
          resolve(respuesta.trim());
        });
      });
    };

    // Solicita al usuario el nombre del cliente y espera la respuesta de manera asíncrona
    this.nombreCliente = await obtenerRespuesta('Nombre del cliente: ');
    // Solicita al usuario el número de celular del cliente y espera la respuesta de manera asíncrona
    this.celularCliente = await obtenerRespuesta('Número de celular del cliente: ');

    // Muestra los productos disponibles en una lista
    console.log(`Listado de productos:`.bgBlue);
    //llama a la función mostrarproductos
    this.mostrarproductos();

    // Define la función asincrónica realizarCompra de la instancia de ProductosTienda
    const realizarCompra = async (productostienda) => {

      // Solicita al usuario que ingrese el código del producto que desea comprar
      const codigoCompra = await obtenerRespuesta('Ingrese el código del producto que desea comprar: ');
      // Busca el producto en la lista de productos usando el código proporcionado
      const producto = this.#listaproductos.find((p) => p.codigoproducto === codigoCompra);

      // Verifica si el producto no fue encontrado y muestra un mensaje en caso afirmativo
      if (!producto) {
        console.log(`Producto con código ${codigoCompra} no encontrado.`.bgRed);
        // Llama recursivamente a realizarCompra para que el usuario ingrese un código válido
        await realizarCompra();
        return;
      }

      // Solicita al usuario que ingrese la cantidad que desea comprar y la convierte a un entero
      const cantidadCompra = parseInt(await obtenerRespuesta('Ingrese la cantidad que desea comprar: '));

      // Verifica si hay suficientes unidades en inventario del producto
      if (producto.inventarioproducto < cantidadCompra) {
        // Mensaje que avisa si no hay suficientes unidades en el inventario
        console.log(`No hay suficientes unidades de ${producto.nombreproducto} en inventario.`.bgRed);
        // Llama recursivamente a realizarCompra para que el usuario ingrese una cantidad válida
        await realizarCompra();
        return;
      }

      // Calcula el costo total de la compra
      const costoTotal = producto.precioproducto * cantidadCompra;

      // Muestra el costo total
      console.log(`Costo total: ${costoTotal}`.bgYellow);
      // solicita confirmación de la compra
      console.log(`¿Desea realizar la compra? (Sí/No)`.bgYellow);

      // Obtiene la respuesta del usuario
      const confirmacionCompra = await obtenerRespuesta('Confirmación: ');

      // Verifica la confirmación del usuario
    if (confirmacionCompra.toLowerCase() === 'si') {
      // Actualiza el inventario, saldo y total de la compra
        producto.inventarioproducto -= cantidadCompra;
        this.#saldo -= costoTotal;
        this.#totalCompra += costoTotal;

        // Guarda la lista actualizada de productos en el archivo
        await grabararchivoproductos(productostienda.listaproductos);
         
        // Crea un nuevo DetalleCompra y lo agrega a la lista de detalles de compra
        this.#detallesCompra.push(new DetalleCompra({ ...producto }, +
          cantidadCompra, + 
          costoTotal));

          // Muestra un mensaje de compra exitosa
        console.log(`Compra exitosa: ${cantidadCompra} unidad(es) de ${producto.nombreproducto}.`.bgGreen);

        // Pregunta al usuario si desea comprar otro producto
        const comprarOtro = await obtenerRespuesta('¿Desea comprar otro producto? (Sí/No): ');

         // Verifica la respuesta del usuario
        if (comprarOtro.toLowerCase() === 'si') {
          // Llama recursivamente a realizarCompra para comprar otro producto
          await realizarCompra(productostienda);
        } else {
          // Muestra los detalles de la compra
         productostienda.mostrarDetallesCompra();
        }
      } else {
        // Muestra un mensaje indicando que la compra ha sido cancelada
        console.log(`La compra ha sido cancelada.`.bgRed);
        // Llama recursivamente a realizarCompra para que el usuario confirme la compra
        await realizarCompra(productostienda);
      }
    }

    // Llama a la función realizarCompra con la instancia actual de ProductosTienda
    await realizarCompra(this);
  }

  // Método de la clase ProductosTienda para mostrar detalles de la compra
  mostrarDetallesCompra () {
  // Muestra un encabezado indicando los datos del cliente en fondo magenta
  console.log(`Datos del cliente:`.bgMagenta);
  // Muestra el nombre del cliente
  console.log(`Nombre del cliente: ${this.#nombreCliente}`);
  // Muestra el número de celular del cliente  
  console.log(`Número de celular: ${this.#celularCliente}`);
  // Muestra un encabezado indicando los detalles de la compra
  console.log(`Detalles de la compra:`);
  // Itera sobre cada detalle de la compra e imprime información detallada
  this.#detallesCompra.forEach((detalle) => {
    console.log(
      // Muestra el nombre del producto
      `Producto: ${detalle.producto.nombreproducto},\n` +
      // Muestra la cantidad comprada
      `Cantidad: ${detalle.cantidad},\n` +
      // Muestra el costo total del producto
      `Costo Total: ${detalle.costoTotal}\n`
    );
  });
  // Muestra el total de la compra en fondo magenta
  console.log(`Total de la compra: ${this.#totalCompra}`.bgMagenta);
}
}

// Definición de la clase Producto
class Producto {
  // Atributos privados de la clase Producto
  #codigoproducto;
  #nombreproducto;
  #inventarioproducto;
  #precioproducto;

  // Constructor de la clase Producto, inicializa los atributos
  constructor() {
    // Asigna un valor inicial vacío al atributo privado 
    this.#codigoproducto = '';
    this.#nombreproducto = '';
    this.#inventarioproducto = 0;
    this.#precioproducto = 0;
  }

  // Getter para obtener el código del producto
  get codigoproducto() {
    return this.#codigoproducto;
  }

  // Setter para establecer el código del producto
  set codigoproducto(codigo) {
    this.#codigoproducto = codigo;
  }

  // Getter para obtener el nombre del producto
  get nombreproducto() {
    return this.#nombreproducto;
  }

  // Setter para establecer el nombre del producto
  set nombreproducto(nombre) {
    this.#nombreproducto = nombre;
  }

  // Getter para obtener el inventario del producto
  get inventarioproducto() {
    return this.#inventarioproducto;
  }

  // Setter para establecer el inventario del producto
  set inventarioproducto(inventario) {
    this.#inventarioproducto = inventario;
  }

  // Getter para obtener el precio del producto
  get precioproducto() {
    return this.#precioproducto;
  }

  // Setter para establecer el precio del producto
  set precioproducto(precio) {
    this.#precioproducto = precio;
  }
}

// Función asincrónica para grabar la lista de productos en un archivo JSON
    const grabararchivoproductos = async (listaproductos) => {
  try {
    // Convierte la lista de productos a una cadena JSON con formato legible
    const cadenaJson = JSON.stringify(listaproductos, null, 2);
    // Define el nombre del archivo donde se guardarán los datos
    const nombrearchivo = './datos.json';
    // Escribe la cadena JSON en el archivo
    await fs.writeFile(nombrearchivo, cadenaJson, 'utf-8');
    // Imprime un mensaje indicando que los datos se han guardado correctamente
    console.log(`DATOS GUARDADOS EN ${nombrearchivo}`.bgMagenta);
  } catch (error) {
     // En caso de error, imprime un mensaje de error indicando el motivo
    console.error(`Error al guardar el archivo: ${error.message}`.bgRed);
  }
}

// Función asincrónica para realizar una copia de respaldo del archivo de datos
 const copiaDeRespaldo = async () => {
  try {
    // Lee los datos del archivo original
    const datos = await fs.readFile('./datos.json');
    // Obtiene la fecha y hora actual en formato ISO para usar en el nombre del archivo de respaldo
    const fechaHora = new Date().toISOString().replace(/[-T:.Z]/g, '_');
    // Define el nombre del archivo de respaldo con la fecha y hora actual
    const nombreArchivo = `./copiaDeRespaldo${fechaHora}.json`;
    // Escribe los datos leídos en el nuevo archivo de respaldo
    await fs.writeFile(nombreArchivo, datos, 'utf-8');
    // Imprime un mensaje indicando que la copia de respaldo se ha realizado con éxito
    console.log(`Copia de respaldo realizada con éxito en ${nombreArchivo}`.bgGreen);
  } catch (error) {
    // En caso de error, imprime un mensaje de error indicando el motivo
    console.error(`Error al hacer la copia de respaldo: ${error.message}`.bgRed);
  }
}

// Función asincrónica para agregar un nuevo producto a la lista de productos
const agregarProducto = async (productostienda, nuevoProducto) => {
  // Agrega el nuevo producto a la lista de productos de la tienda
  productostienda.listaproductos.push(nuevoProducto);
  // Imprime un mensaje indicando que el producto se ha agregado correctamente
  console.log(`Producto agregado:`.bgGreen);
  console.log(nuevoProducto);
  // Realiza una copia de respaldo actualizando el archivo de datos
  await grabararchivoproductos(productostienda.listaproductos.map(producto => ({
    codigoproducto: producto.codigoproducto,
    nombreproducto: producto.nombreproducto,
    inventarioproducto: producto.inventarioproducto,
    precioproducto: producto.precioproducto,
  })));
}

// Función asincrónica para cargar la lista de productos desde un archivo JSON
const cargaarchivoproductos = async (productostienda) => {
  try {
    // Lee los datos del archivo JSON que contiene la lista de productos
    const data = await fs.readFile('./datos.json', 'utf-8');
    // Convierte la cadena JSON a un objeto JavaScript y asigna la lista de productos a la tienda
    productostienda.listaproductos = JSON.parse(data);
    // Imprime un mensaje indicando que los productos se han cargado correctamente desde el archivo
    console.log(`===========================================`.green);
    console.log('==  '.green + `Productos cargados desde datos.json`.bgBlue + '  =='.green);
    console.log(`===========================================`.green);
  } catch (error) {
    // En caso de error, imprime un mensaje de error indicando el motivo
    console.error(`Error al cargar el archivo: ${error.message}`.bgRed);
  }
}

// Permite realizar operaciones como manipulación y construcción de rutas, resolución de rutas relativas y absolutas, entre otras.
const path = require('path');

// Función asincrónica para restaurar desde una copia de respaldo
async function restaurarDesdeBackup() {
  // constante que mantiene el archivo original
  const archivoOriginal = 'datos.json';
  // Carpeta actual donde se busca los archivos de respaldo
  const carpetaActual = '.'; 

  try {
    // Verificar si el archivo original existe
    await fs.access(archivoOriginal);
    // mensaje que avisa si el archivo ya existe
    console.log('El archivo original ya existe.');

  } catch (error) {
    // error en caso tal que el archivo original no exista
    try {
      // Obtener la lista de archivos en la carpeta actual
      const archivosEnCarpeta = await fs.readdir(carpetaActual);

      // Filtrar los archivos de copia de respaldo
      const backups = archivosEnCarpeta.filter((archivo) => {
        return archivo.startsWith('copiaDeRespaldo') && archivo.endsWith('_.json');
      });

      // Ordenar las copias de respaldo por fecha de modificación (la más reciente primero)
      backups.sort(async (a, b) => {
        return (
          // Calcula la diferencia en tiempo entre la última modificación de dos archivos.
          (await fs.stat(path.join(carpetaActual, b))).mtime.getTime() -
          (await fs.stat(path.join(carpetaActual, a))).mtime.getTime()
        );
      });

      // Mostrar las opciones de copia de respaldo disponibles
      console.log('Copias de respaldo disponibles:');
      backups.forEach((backup, index) => {
        console.log(`${index + 1}. ${backup}`);
      });

      // Solicitar la elección del usuario
      const selectedIndex = await obtenerRespuesta('Seleccione el número de la copia de respaldo que desea restaurar: ');

      // Verificar la validez de la entrada del usuario
      if (selectedIndex >= 1 && selectedIndex <= backups.length) {
        // Selecciona la copia de respaldo elegida por el usuario y crea la ruta completa al archivo de respaldo.
        const selectedBackup = backups[selectedIndex - 1];
        const rutaCopia = path.join(carpetaActual, selectedBackup);

        // Copiar el archivo de respaldo seleccionado como datos.json
        await fs.copyFile(rutaCopia, archivoOriginal);

        //Si la restauración fue exitosa, muestra un mensaje indicando desde qué copia de respaldo se restauró.

        console.log(`Archivo restaurado desde ${selectedBackup}`);
      } else {
        //Si la selección del usuario no fue válida, muestra un mensaje indicando que la selección no fue válida
        console.log('Selección no válida.');
      }

    } catch (error) {
      //Si se produce un error al leer la carpeta de respaldo, muestra un mensaje de error
      console.error('Error al leer la carpeta de respaldo:', error);
    }
  }
}

// Función auxiliar para obtener respuesta del usuario
const obtenerRespuesta = async (pregunta) => {
  // Establece una conexión con la interfaz de línea de comandos para obtener respuestas del usuario.
  return new Promise((resolve) => {
    readline.question(pregunta, (respuesta) => {
      resolve(respuesta.trim());
    });
  });
}

// Muestra un menú de opciones y devuelve la opción seleccionada por el usuario.
const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.log(`==============================`.green);
    console.log(`     Seleccione una opción    `.green);
    console.log(`==============================\n`.green);
    console.log(`${'1'.green} Cargar Datos`);
    console.log(`${'2'.green} Copia de Respaldo`);
    console.log(`${'3'.green} Reparacion Datos`);
    console.log(`${'4'.green} Grabar Nuevos Productos`);
    console.log(`${'5'.green} Borrar Productos`);
    console.log(`${'6'.green} Comprar Productos`);
    console.log(`${'7'.green} Imprimir Factura`);
    console.log(`${'0'.green} Cerrar APP\n`);

    // Solicita al usuario que seleccione una opción.
    readline.question('Seleccione una opción: ', (opt) => {
      resolve(opt);
    });
  });
};

// Pausa la ejecución y espera a que el usuario presione ENTER.
const pausa = async () => {
  return new Promise((resolve) => {
    readline.question(`\nPresione ${'ENTER'.yellow} para continuar\n`, () => {
      resolve();
    });
  });
};

// Obtiene los detalles de un nuevo producto a través de preguntas al usuario.
const obtenerDetallesProducto = async () => {
  return new Promise((resolve) => {
    const nuevoProducto = new Producto();

    // Realiza preguntas secuenciales para obtener detalles del nuevo producto.
    // Pregunta al usuario por el código del producto y asigna la respuesta al atributo codigoproducto del nuevoProducto.
    readline.question('Código del producto: ', (codigo) => {
      nuevoProducto.codigoproducto = codigo;
      // Pregunta al usuario por el nombre del producto y asigna la respuesta al atributo nombreproducto del nuevoProducto.
      readline.question('Nombre del producto: ', (nombre) => {
        nuevoProducto.nombreproducto = nombre;
        // Pregunta al usuario por el inventario del producto y asigna la respuesta al atributo inventarioproducto del nuevoProducto.
        readline.question('Inventario del producto: ', (inventario) => {
          nuevoProducto.inventarioproducto = parseInt(inventario);
          // Pregunta al usuario por el precio del producto y asigna la respuesta al atributo precioproducto del nuevoProducto.
          readline.question('Precio del producto: ', (precio) => {
            nuevoProducto.precioproducto = parseFloat(precio);
             // Resuelve la promesa con el nuevoProducto, completando así el proceso de obtener detalles del producto.
            resolve(nuevoProducto);
            return nuevoProducto;
          });
        });
      });
    });
  });
};

// Borra un producto según su código y actualiza la lista de productos en el archivo.
const borrarProducto = async (productostienda, codigo) => {
  // Encuentra el índice del producto en la lista de productos con el código proporcionado.
  const index = productostienda.listaproductos.findIndex((producto) => producto.codigoproducto === codigo);

  // Verifica si se encontró el producto en la lista.
  if (index !== -1) {
    // Elimina el producto de la lista y almacena el producto borrado en la variable productoBorrado.
    const productoBorrado = productostienda.listaproductos.splice(index, 1)[0];
    // Muestra un mensaje indicando que el producto ha sido borrado y muestra los detalles del producto borrado.
    console.log(`Producto borrado:`.bgRed);
    console.log(productoBorrado);
    // Guarda la lista actualizada de productos en el archivo después de borrar un producto.
    await grabararchivoproductos(productostienda.listaproductos);
  } else {
    // Muestra un mensaje indicando que el producto con el código dado no se encontró en la lista.
    console.log(`Producto con código ${codigo} no encontrado. No se ha realizado ninguna acción.`.bgRed);
  }
};

// Función principal del programa.
const main = async () => {
  // Crea una instancia de la clase ProductosTienda.
  let productostienda = new ProductosTienda();

  // Variable para indicar si los datos han sido cargados correctamente.
  let datosCargados = false;

  // Carga los productos desde el archivo al iniciar el programa.
  await cargaarchivoproductos(productostienda);

  // Variable para controlar la ejecución del bucle principal.
  let salir = false;

  // Bucle principal del programa que se ejecuta mientras la variable 'salir' sea falsa.
  while (!salir) {
    // Obtiene la opción seleccionada por el usuario del menú principal.
    const opcion = await mostrarMenu();

    // Verifica si los datos no han sido cargados y la opción seleccionada no es '1'.
    if (!datosCargados && opcion !== '1') {
      // Muestra un mensaje de error indicando que los datos deben cargarse primero.
      console.log(`========================================================`.green);
      console.log('==   '.green + 'ERROR: cargar los datos primero (opción 1).   '.bgRed + '   =='.green);
      console.log(`========================================================`.green);
      await pausa();
      continue; // Vuelve al inicio del bucle para solicitar otra opción al usuario.
    }

    // Maneja diferentes casos según la opción seleccionada por el usuario.
    switch (opcion) {
      case '1':
        // Carga los datos del archivo y muestra el número de productos cargados.
        await cargaarchivoproductos(productostienda);
        const numberOfProducts = productostienda.listaproductos.length;
        console.log(`=============================================`.green);
        console.log('==   '.green + `Número de productos cargados ==>`.bgBlue + ` ${numberOfProducts} `.bgRed + '   =='.green);
        console.log(`=============================================`.green);
        datosCargados = true; // Actualiza la variable para indicar que los datos han sido cargados.
        await pausa();
        break;

      case '2':
        //Realiza una copia de respaldo de los datos.
        await copiaDeRespaldo();
        await pausa();
        break;

      case '3':
        //Restaura los datos desde una copia de respaldo.
        await restaurarDesdeBackup();
        await pausa();
        break;

      case '4':
        //Agrega un nuevo producto.
        console.log(`Ingrese los detalles del nuevo producto:`.bgBlue);
        const nuevoProducto = await obtenerDetallesProducto();
        console.log(`Producto agregado:`.bgGreen);
        console.log(nuevoProducto);
        await agregarProducto(productostienda, nuevoProducto);
        await cargaarchivoproductos(productostienda);
        await pausa();
        break;

      case '5':
        //Borra un producto seleccionado por el código.
        console.log(`Listado de productos:`.bgBlue);
        productostienda.mostrarproductos();
        const codigo = await new Promise((resolve) => {
          readline.question('Ingrese el código del producto que desea borrar: ', (codigo) => {
            resolve(codigo);
          });
        });
        borrarProducto(productostienda, codigo);
        await pausa();
        break;

      case '6':
      // Permite al usuario realizar una compra de productos.
        await productostienda.comprarProducto(grabararchivoproductos);
        await pausa();
        break;

      case '7':
      // Muestra los detalles de la compra.
        productostienda.mostrarDetallesCompra();
       await pausa();
        break;

      case '0':
      // Sale del bucle y finaliza la aplicación. 
        salir = true;
        break;

      default:
        // Caso por defecto si la opción no coincide con ningún caso.
        console.log(`Opción no válida. Por favor, seleccione una opción válida.`.bgRed);
        await pausa();
        break;
    }
  }

  // Cierra la interfaz de lectura desde la consola.
  readline.close();
  // Mensaje de cierre de la aplicación.
  console.log('¡La Tienda Esta Cerrada!'.bgCyan);
};

// Función principal que inicia la ejecución de la aplicación.
main(); 