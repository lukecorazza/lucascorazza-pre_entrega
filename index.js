const [,, metodo, recurso, ...parametros] = process.argv;
const API_URL = 'https://fakestoreapi.com';

/* Muestra todos los productos disponibles en la tienda. */
async function mostrarTodosLosProductos() {
  const respuesta = await fetch(`${API_URL}/products`);
  const productos = await respuesta.json();
  console.table(productos);
}

/*
Busca y muestra un producto por su ID (1 a 20).
@param {number|string} id - ID del producto.
*/
async function mostrarProductoPorId(id) {
  const idNum = parseInt(id, 10);
  if (!id || isNaN(idNum) || !Number.isInteger(idNum) || idNum < 1 || idNum > 20) { // Valido que el id esté entre 1 y 20, ya que la API solo tiene 20 productos
    console.error('Por favor, ingresa un ID válido entre 1 y 20.');
    return;
  }
  const respuesta = await fetch(`${API_URL}/products/${idNum}`);
  if (!respuesta.ok) {
    console.error(`No se encontró el producto con id ${idNum}.`);
    return;
  }
  const producto = await respuesta.json();
  console.log(producto);
}

/*
Agrega un nuevo producto a la tienda.
@param {string} titulo - Nombre del producto.
@param {number|string} precio - Precio del producto.
@param {string} categoria - Categoría del producto.
*/
async function agregarProducto(titulo, precio, categoria) {
  if (typeof titulo !== 'string' || titulo.trim().length === 0) {
    console.error('El título es obligatorio y debe ser texto.');
    return;
  }
  if (isNaN(precio) || Number(precio) <= 0) {
    console.error('El precio debe ser un número mayor a 0.');
    return;
  }
  if (typeof categoria !== 'string' || categoria.trim().length === 0) {
    console.error('La categoría es obligatoria y debe ser texto.');
    return;
  }

  const nuevoProducto = {
    title: titulo.trim(),
    price: parseFloat(precio),
    category: categoria.trim()
  };

  const respuesta = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevoProducto)
  });

  if (!respuesta.ok) {
    console.error('No se pudo crear el producto. Intenta nuevamente.');
    return;
  }

  const creado = await respuesta.json();
  console.log(`¡Producto agregado! ID asignado: ${creado.id}`);
}

/*
Elimina un producto por su ID.
@param {number|string} id - ID del producto a eliminar.
*/
async function eliminarProducto(id) {
  const idNum = parseInt(id, 10);
  if (!id || isNaN(idNum) || !Number.isInteger(idNum) || idNum < 1 || idNum > 20) { // Valido que el id esté entre 1 y 20, ya que la API solo tiene 20 productos
    console.error('Por favor, ingresa un ID válido entre 1 y 20.');
    return;
  }

  const respuesta = await fetch(`${API_URL}/products/${idNum}`, {
    method: 'DELETE'
  });

  if (!respuesta.ok) {
    console.error(`No se pudo eliminar el producto con id ${idNum}.`);
    return;
  }

  const resultado = await respuesta.json();
  console.log('Producto eliminado:', resultado);
}

/* Analiza los comandos y ejecuta la acción correspondiente. */
async function main() {
  if (!metodo || !recurso) {
    console.log('Uso:');
    console.log('  npm run start GET products');
    console.log('  npm run start GET products/5');
    console.log('  npm run start POST products "Remera Node" 3500 "remeras"');
    console.log('  npm run start DELETE products/7');
    return;
  }

  const [base, id] = recurso.split('/');

  try {
    switch (metodo.toUpperCase()) {
      case 'GET':
        if (base === 'products' && !id) {
          await mostrarTodosLosProductos();
        } else if (base === 'products' && id) {
          await mostrarProductoPorId(id);
        } else {
          console.error('No se reconoce el recurso para GET.');
        }
        break;

      case 'POST':
        if (base === 'products') {
          const [titulo, precio, categoria] = parametros;
          if (!titulo || !precio || !categoria) {
            console.error('Faltan argumentos: <titulo> <precio> <categoria>');
            return;
          }
          await agregarProducto(titulo, precio, categoria);
        } else {
          console.error('No se reconoce el recurso para POST.');
        }
        break;

      case 'DELETE':
        if (base === 'products' && id) {
          await eliminarProducto(id);
        } else {
          console.error('No se reconoce el recurso para DELETE.');
        }
        break;

      default:
        console.error('Método no soportado. Usa GET, POST o DELETE.');
    }
  } catch (error) {
    console.error('Ocurrió un error inesperado:', error.message);
  }
}

main();
