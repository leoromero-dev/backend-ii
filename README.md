El proyecto cuenta con un front sencillo al cual se puede acceder yendo a http://localhost:8080/ donde se verán dos botones: Iniciar Sesión y Registrarse. Al registrarse correctamente se muestra un mensaje de éxito y se puede ir a /login para usar esas credenciales, loguearse y ver el perfil del usuario.

El proyecto cuenta también con un CRUD de usuarios:
- GET /api/users para obtener la lista de usuarios
- PUT /api/users para actualizar un usuario
- POST /api/users/register para crear un nuevo usuario
- DELETE /api/users para eliminar un usuario
