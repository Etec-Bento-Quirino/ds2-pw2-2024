document.addEventListener('DOMContentLoaded', function() {
    const itemList = document.getElementById('item-list');
    const addItemForm = document.getElementById('add-item-form');
    const itemNameInput = document.getElementById('item-name');

    // Função para renderizar a lista de itens
    function renderItemList(items) {
        itemList.innerHTML = '';
        id=0;
        items.forEach(item => {
            const listItem = createListItem(id,item);
            itemList.appendChild(listItem);
            id++;
        });
    }

    // Função para criar um item da lista com botões de ação
    function createListItem(id,item) {
        const listItem = document.createElement('div');
        listItem.classList.add('item');
        const itemText = document.createElement('span');
        itemText.textContent = item.name;
        itemText.id = id;
        const deleteButton = createButton('Excluir', () => deleteItem(id));
        const updateButton = createButton('Atualizar', () => updateItem(id, prompt('Digite o novo nome do item:')));
        listItem.append(itemText, deleteButton, updateButton);
        return listItem;
    }

    // Função para criar um botão com texto e ação
    function createButton(text, action) {
        const button = document.createElement('button');
        button.textContent = text;
        button.addEventListener('click', action);
        return button;
    }

    // Função para carregar a lista de itens do servidor
    function loadItemList() {
        fetch('http://localhost:3000/items')
            .then(response => response.json())
            .then(renderItemList)
            .catch(error => console.error('Erro ao carregar lista de itens:', error));
    }

    // Função para adicionar um novo item ao servidor
    addItemForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const itemName = itemNameInput.value.trim();
        if (itemName !== '') {
            fetch('http://localhost:3000/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: itemName })
            })
            .then(() => {
                loadItemList();
                itemNameInput.value = '';
            })
            .catch(error => console.error('Erro ao adicionar item:', error));
        }
    });

    // Função para excluir um item
    function deleteItem(itemId) {
        fetch(`http://localhost:3000/items/${itemId}`, {
            method: 'DELETE'
        })
        .then(loadItemList)
        .catch(error => console.error('Erro ao excluir item:', error));
    }

    // Função para atualizar um item
    function updateItem(itemId, newName) {
        fetch(`http://localhost:3000/items/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newName })
        })
        .then(loadItemList)
        .catch(error => console.error('Erro ao atualizar item:', error));
    }

    // Carregar a lista de itens quando a página carregar
    loadItemList();
});
