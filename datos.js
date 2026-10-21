export const producto = [
  {
    id: 1,
    nombre: 'Carpa de camping',
    descripcion: 'Carpa para 4 personas, resistente al agua y fácil de montar.',
    categoria: 'camping', 
    precioPorDia: 1500,
    requiereDeposito: true,
    deposito: 5000,
    estado: 'disponible',
  },
  {
    id: 2,
    nombre: 'Tienda de campaña',
    descripcion: 'Tienda de campaña para 2 personas, ligera y fácil de transportar.',
    categoria: 'camping',
    precioPorDia: 1000,
    requiereDeposito: true,
    deposito: 3000,
    estado: 'disponible',
  },
];

export let proximoId = 3;

export function agregarProducto(nuevoProducto) {
  nuevoProducto.id = proximoId++;
  productos.push(nuevoProducto);
  return nuevoProducto;
}