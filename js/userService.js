function users(page) {
    document.getElementById('cardHeader').innerHTML = '<h5>Listado de usuarios</h5>';
    const REQRES_ENDPOINT = 'https://api.escuelajs.co/api/v1/users';
    fetch(REQRES_ENDPOINT, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        }
    })
    .then(response => response.json().then(data => ({
        status: response.status,
        info: data
    })))
    .then(result => {
        if (result.status === 200) {
            let list_user = `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h6 class="mb-0">Usuarios registrados</h6>
                    <button type="button" class="btn btn-dark" onclick="createUser()">➕ Crear Usuario</button>
                </div>
                <table class="table table-striped table-hover align-middle">
                    <thead class="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Nombres</th>
                            <th>Correo Electrónico</th>
                            <th>Avatar</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            result.info.forEach(element => {
                list_user += `
                    <tr>
                        <td>${element.id}</td>
                        <td>${element.name}</td>
                        <td>${element.email}</td>
                        <td><img src="${element.avatar}" class="img-thumbnail rounded-circle" style="width: 50px; height: 50px;" alt="avatar del usuario"></td>
                        <td>
                            <button type="button" class="btn btn-warning btn-sm" onclick="getUser('${element.id}')">👁 Ver</button>
                        </td>
                    </tr>
                `;
            });
            list_user += `
                    </tbody>
                </table>
                <nav aria-label="Page navigation example" class="mt-4">
                    <ul class="pagination justify-content-center">
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
            `;
            document.getElementById('info').innerHTML = list_user;
        } else {
            document.getElementById('info').innerHTML = '<div class="alert alert-danger">No existen usuarios en la BD</div>';
        }
    });
}

function getUser(idUser) {
    const REQRES_ENDPOINT = 'https://api.escuelajs.co/api/v1/users/' + idUser;
    fetch(REQRES_ENDPOINT, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        }
    })
    .then(result => result.json().then(data => ({
        status: result.status,
        body: data
    })))
    .then(response => {
        if (response.status === 200) {
            const user = response.body;
            const modalUser = `
                <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header bg-dark text-white">
                                <h5 class="modal-title fs-5" id="exampleModalLabel">👤 Detalles del Usuario</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                            </div>
                            <div class="modal-body">
                                <div class="card">
                                    <img src="${user.avatar}" class="card-img-top" alt="Avatar del usuario">
                                    <div class="card-body">
                                        <h5 class="card-title">Información del usuario</h5>
                                        <p class="card-text"><strong>Nombre:</strong> ${user.name}</p>
                                        <p class="card-text"><strong>Correo Electrónico:</strong> ${user.email}</p>
                                        <p class="card-text"><strong>Contraseña:</strong> ${user.password}</p>
                                        <p class="card-text"><strong>Rol:</strong> ${user.role}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById('viewModal').innerHTML = modalUser;
            const modal = new bootstrap.Modal(document.getElementById('modalUser'));
            modal.show();
        } else {
            document.getElementById('info').innerHTML = '<div class="alert alert-warning">No se encontró el usuario en la API</div>';
        }
    });
}

function createUser() {
    const modalUser = `
        <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title fs-5" id="exampleModalLabel">➕ Crear Usuario</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div class="modal-body">
                        <form id="formCreateUser">
                            <div class="mb-3">
                                <input type="text" class="form-control" id="name" placeholder="Nombre" required>
                            </div>
                            <div class="mb-3">
                                <input type="text" class="form-control" id="avatar" placeholder="URL del avatar" required>
                            </div>
                            <div class="mb-3">
                                <input type="email" class="form-control" id="email" placeholder="Correo electrónico" required>
                            </div>
                            <div class="mb-3">
                                <input type="password" class="form-control" id="password" placeholder="Contraseña" required>
                            </div>
                            <div class="text-end">
                                <button type="button" class="btn btn-dark" onclick="saveUser()">Guardar</button>
                                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('viewModal').innerHTML = modalUser;
    const modal = new bootstrap.Modal(document.getElementById('modalUser'));
    modal.show();
}

function saveUser() {
    const form = document.getElementById('formCreateUser');
    if (form.checkValidity()) {
        const user = {
            name: document.getElementById('name').value,
            avatar: document.getElementById('avatar').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };
        const REQRES_ENDPOINT = 'https://api.escuelajs.co/api/v1/users';
        fetch(REQRES_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'x-api-key': 'reqres-free-v1'
            },
            body: JSON.stringify(user)
        })
        .then(result => result.json().then(data => ({
            status: result.status,
            body: data
        })))
        .then(response => {
            const modal = bootstrap.Modal.getInstance(document.getElementById('modalUser'));
            modal.hide();
            if (response.status === 201) {
                document.getElementById('info').innerHTML =
                    '<div class="alert alert-success">✅ Usuario guardado exitosamente</div>';
            } else {
                document.getElementById('info').innerHTML =
                    '<div class="alert alert-danger">❌ Error al guardar el usuario</div>';
            }
        });
    } else {
        form.reportValidity();
    }
}
