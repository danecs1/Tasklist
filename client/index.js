let addButton = document.getElementById('add');
let todo = document.getElementById('todo');

let baseURL = 'http://localhost:8000/tasks';



async function addTask(e) {
    e.preventDefault();
    let title = document.getElementById('input').value;
    title = title.trim();
    if (!title) return;

    try {
        const result = await fetch(`${baseURL}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                title
            })
        });

        const jsonRes = await result.json();
        todo.innerHTML = '';
        fetchAllTasks();
    } catch (error) {
        console.log(error);
    }
}

addButton.addEventListener('click', addTask);

async function fetchAllTasks() {
    const result = await fetch(`${baseURL}`);
    const jsonRes = await result.json();

    for (let i = 0; jsonRes.tasks; i++) {
        const item = document.createElement('li');
        const textnode = window.document.createTextNode(jsonRes.tasks[i].title);
        let span = document.createElement('span');
        let h5 = document.createElement('h5');
        h5.innerHTML = jsonRes.tasks[i].id;
        h5.id = jsonRes.tasks[i].id;
        span.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
        h5.style.display = 'none';
        item.appendChild(textnode);
        item.appendChild(span);
        item.appendChild(h5);
        todo.appendChild(item);
    }
}



async function deleteTask(e) {
    const id = Number(e.target.parentNode.nextSibling.innerText);
    const result = await fetch(`${baseURL}/${id}`, { method: 'DELETE' });
    //console.log('ID', id);
    if (result.status === 204) {
        todo.innerHTML = '';
        fetchAllTasks();
        return;
    }
    return;
}



document.addEventListener('click', (e) => {
    if (e.target.tagName === 'I') {
        deleteTask(e);
    }
})

window.onload = fetchAllTasks();


