function users(page) {
    document.getElementById('cardHeader').innerHTML ='<h5>Listado de usuarios</h5>'
    const REQRES_ENDPOINT = 'https://api.escuelajs.co/api/v1/users'
    fetch(REQRES_ENDPOINT,  {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'x-api-key':'reqres-free-v1'
        }
    })
    .then((response)=>{
        return response.json().then(
            data =>{
                return{
                    status: response.status,
                    info:data
                }
            }
        )
    })
    .then((result)=>{
        if (result.status===200) {
            let list_user = `<button type="button" class="btn btn-success" onclick="createUser()">Crear</button>
            <table class="table">
            <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Nombres</th>
            <th scope="col">correo electronico</th>
            <th scope="col">Avatar</th>
            </tr>
            </thead>
            <tbody>
            `
            result.info.forEach(element => {
                list_user=list_user+`
                <tr>
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td>${element.email}</td>
                <td><img src="${element.avatar}" class="img-thumbnail" alt="avatar del usuario"></td>
                <td><button type="button" class="btn btn-info" onclick="getUser('${element.id}')">Ver</button></td>
                `
            });
            list_user=list_user+`
            </tbody>
            </table>
             <nav aria-label="Page navigation example">
                <ul class="pagination justify-contend-center">
                    <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#" onclick="users('1')">1</a></li>
                    <li class="page-item"><a class="page-link" href="#" onclick="users('2')">2</a></li>
                    <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                    </li>
                </ul>
                </nav>
            `
            document.getElementById('info').innerHTML=list_user
        }else{
            document.getElementById('info').innerHTML = 'no existen ususarios en la BD'
        }
    })
}
function getUser(idUser) {
    const REQRES_ENDPOINT = 'https://api.escuelajs.co/api/v1/users/'+idUser
    fetch(REQRES_ENDPOINT,  {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'x-api-key':'reqres-free-v1'
        }
    })
    .then((result) =>{
        return result.json().then(
            data =>{
                return {
                    status: result.status,
                    body: data
                }
            }
        )
    })
    .then((response) =>{
        if(response.status === 200){
            const user = response.body
            const modalUser = `
            <!-- Modal -->
            <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title fs-5" id="exampleModalLabel">Ver Usuario</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <div class="card">
                <img src="${user.avatar}" class="card-img-top" alt="Avatar del usuario">
                <div class="card-body">
                    <h5 class="card-title">Informacion del usuario</h5>
                    <p class="card-text">Nombre: ${user.name}</p>
                    <p class="card-text">Correo Electronico: ${user.email}</p>
                    <p class="card-text">Contrasena: ${user.password}</p>
                    <p class="card-text">Rol: ${user.role}</p>
                </div>
                </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>
            `
            document.getElementById('viewModal').innerHTML = modalUser
            const modal = new bootstrap.Modal(
                document.getElementById('modalUser')
            )
            modal.show()
        }
        else[
            document.getElementById('info').innerHTML = '<h3>No se encontro el usuario en la Api</h3>'
        ]
    })
}
function createUser(){
 const modalUser = `
<!-- Modal -->
<div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-primary text-white">
                <h5 class="modal-title fs-5" id="exampleModalLabel">Crear Usuario</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <form id="formCreateUser">
                            <div class="row g-3">
                                <div class="col">
                                    <input type="text" class="form-control" id="name" placeholder="Nombre" required>
                                </div>
                                <div class="col">
                                    <input type="text" class="form-control" id="avatar" placeholder="avatar" required>
                                </div>
                            </div>
                            <div class="row g-3 mt-3">
                                <div class="col">
                                    <input type="email" class="form-control" id="email" placeholder="Correo electrónico" required>
                                </div>
                                <div class="col">
                                    <input type="password" class="form-control" id="password" placeholder="Contraseña" required>
                                </div>
                            </div>
                            <div class="text-end mt-4">
                                <button type="button" class="btn btn-success" onclick="saveUser()">Guardar</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
            `
            document.getElementById('viewModal').innerHTML = modalUser
            const modal = new bootstrap.Modal(
                document.getElementById('modalUser')
            )
            modal.show()
}

function saveUser() {
 const form = document.getElementById('formCreateUser')
 if(form.checkValidity()){
    const name = document.getElementById('name').value
    const avatar = document.getElementById('avatar').value
    const email = document.getElementById('email').value  
    const password = document.getElementById('password').value
    const user= {name, avatar, email, password}

 const REQRES_ENDPOINT = 'https://api.escuelajs.co/api/v1/users'
    fetch(REQRES_ENDPOINT,  {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'x-api-key':'reqres-free-v1'
        },
        body: JSON.stringify(user)
    })
    .then((result) =>{
        return result.json().then(
            data =>{
                return {
                    status: result.status,
                    body: data
                     }
                }
            )
        })
        .then((response)=>{
            if(response.status === 201){
                 document.getElementById('info').innerHTML =
                '<h3>Guardado exitosamente</h3>'
            }
            else{
                document.getElementById('info').innerHTML =
                '<h3>Error al guardar el usuario</h3>'
            }
            const modalId = document.getElementById('modalUser')
            const modal = bootstrap.Modal.getInstance(modalId)
            modal.hide()
        })
    }
    else{
    form.reportValidity()
    }
}