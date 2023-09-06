
export default class Table {
  constructor(tableContainerId) {
    this.container = document.getElementById(tableContainerId);
    this.table = document.createElement('table');
    this.table.classList.add('table', 'table-bordered', 'table-striped');
    this.container.appendChild(this.table);
    this.data = [];

    this.onButtonClick = null; 

    this.renderTable([]);
  }

  renderTable(data) {
    this.data = data;
    while (this.table.firstChild) {
      this.table.removeChild(this.table.firstChild);
    }

    const headerRow = document.createElement('tr');
    for (const key in data[0]) {
      const headerCell = document.createElement('th');
      headerCell.textContent = key;
      headerRow.appendChild(headerCell);
    }
    headerRow.innerHTML += '<th>Edit</th><th>Delete</th>';
    this.table.appendChild(headerRow);

    data.forEach((item) => {
      const dataRow = document.createElement('tr');
      for (const key in item) {
        if (item[key] !== undefined) {
          const dataCell = document.createElement('td');
          dataCell.textContent = item[key];
          dataRow.appendChild(dataCell);
        }
      }

      const editCell = document.createElement('td');
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.classList.add('btn', 'btn-warning');
      editButton.dataset.userId = item.userId;
      editButton.addEventListener('click', () => {
        if (typeof this.onButtonClick === 'function') {
          this.onButtonClick(item.userId, 'Edit');
        }
      });
      editCell.appendChild(editButton);
      dataRow.appendChild(editCell);

      const deleteCell = document.createElement('td');
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('btn', 'btn-danger');
      deleteButton.dataset.userId = item.userId;
      deleteButton.addEventListener('click', () => {
        if (typeof this.onButtonClick === 'function') {
          this.onButtonClick(item.userId, 'Delete');
        }
      });
      deleteCell.appendChild(deleteButton);
      dataRow.appendChild(deleteCell);

      this.table.appendChild(dataRow);
    });
  }
}
