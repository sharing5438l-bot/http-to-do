const express = require('express');
const app = express();

app.use(express.json());

let listas = [
{
id: 1,
titulo: "Comprar víveres",
descripcion: "Ir al supermercado a comprar alimentos para la semana",
estado: "pendiente",
pasos: ["Hacer lista de compras", "Ir al supermercado", "Pagar y regresar"]
},
{
id: 2,
titulo: "Estudiar Node.js",
descripcion: "Practicar la creación de APIs REST con Express",
estado: "completada",
pasos: ["Ver tutorial", "Crear proyecto", "Probar endpoints"]
},
{
id: 3,
titulo: "Hacer ejercicio",
descripcion: "Rutina de cardio y fuerza en casa",
estado: "pendiente",
pasos: ["Calentamiento", "Ejercicios de fuerza", "Estiramiento"]
}
];

app.get('/listas', (req, res) => {
res.status(200).json(listas);
});

app.get('/listas/nombre/:titulo', (req, res) => {
const listaTitulo = req.params.titulo.toLowerCase();
const lista = listas.find(l => l.titulo.toLowerCase() === listaTitulo);

if (!lista) {
return res.status(404).json({ error: "Lista no encontrada por nombre." });
}

res.status(200).json(lista);
});

app.get('/listas/pendientes', (req, res) => {
const pendientes = listas.filter(l => l.estado.toLowerCase() === 'pendiente');
res.status(200).json(pendientes);
});

app.get('/listas/completadas', (req, res) => {
const completadas = listas.filter(l => l.estado.toLowerCase() === 'completada');
res.status(200).json(completadas);
});

app.post('/listas', (req, res) => {
const { titulo, descripcion, estado, pasos } = req.body;

if (!titulo || !descripcion) {
return res.status(400).json({ error: "El título y la descripción son obligatorios." });
}

const newId = listas.length > 0 ? listas[listas.length - 1].id + 1 : 1;

const nuevaLista = {
id: newId,
titulo,
descripcion,
estado: estado || "pendiente",
pasos: pasos || []
};

listas.push(nuevaLista);
res.status(201).json({ message: "Lista agregada exitosamente.", lista: nuevaLista });
});

app.put('/listas/:id', (req, res) => {
const listaId = parseInt(req.params.id);
const { titulo, descripcion, estado, pasos } = req.body;

const lista = listas.find(l => l.id === listaId);

if (!lista) {
return res.status(404).json({ error: "Lista no encontrada para actualizar." });
}

if (!titulo && !descripcion && !estado && !pasos) {
return res.status(400).json({ error: "Debe proporcionar al menos un campo para actualizar." });
}

if (titulo) lista.titulo = titulo;
if (descripcion) lista.descripcion = descripcion;
if (estado) lista.estado = estado;
if (pasos) lista.pasos = pasos;

res.status(200).json({ message: "Lista actualizada correctamente.", lista });
});

app.patch('/listas/:id/estado', (req, res) => {
const listaId = parseInt(req.params.id);
const { estado } = req.body;

const lista = listas.find(l => l.id === listaId);

if (!lista) {
return res.status(404).json({ error: "Lista no encontrada." });
}

if (!estado) {
return res.status(400).json({ error: "El campo estado es obligatorio." });
}

lista.estado = estado;
res.status(200).json({ message: "Estado de la lista actualizado correctamente.", lista });
});

app.delete('/listas/:id', (req, res) => {
const listaId = parseInt(req.params.id);
const listaIndex = listas.findIndex(l => l.id === listaId);

if (listaIndex === -1) {
return res.status(404).json({ error: "Lista no encontrada." });
}

listas.splice(listaIndex, 1);
res.status(200).json({ message: "Lista eliminada correctamente." });
});

const PORT = 3000;
app.listen(PORT, () => {
console.log(`Servidor corriendo en http://localhost:${PORT}`);
});