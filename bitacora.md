##1. Obtener todas las listas
GET http://localhost:3000/listas

##2. Obtener una lista por título
GET http://localhost:3000/listas/nombre/Comprar víveres

##3. Obtener listado de tareas pendientes
GET http://localhost:3000/listas/pendientes

##4. Obtener listado de tareas completadas
GET http://localhost:3000/listas/completadas

##5. Agregar una nueva tarea
POST http://localhost:3000/listas

ejemplo 

{
  "titulo": "Sacar la basura",
  "descripcion": "Lavar el bote y poner bolsa nueva",
  "estado": "pendiente",
  "pasos": ["Revisar botes", "Llevar al contenedor"]
}

##6. Actualizar una tarea existente
PUT http://localhost:3000/listas/1


{
  "titulo": "Comprar víveres del mes",
  "descripcion": "Ir al hipermercado grande"
}

##7. Actualizar el estado de una tarea
PATCH http://localhost:3000/listas/1/estado


{
  "estado": "completada"
}

##8. Eliminar una tarea específica
DELETE http://localhost:3000/listas/1