// table.js
export default class Table {
  constructor(tableContainerId) {
    this.container = document.getElementById(tableContainerId);
    this.table = document.createElement('table');
    this.table.classList.add('table', 'table-bordered', 'table-striped');
    this.container.appendChild(this.table);
    this.data = [];

    this.onButtonClick = null; // Callback function for button clicks

    this.renderTable([]);
  }

  renderTable(data) {
    this.data = data;
    while (this.table.firstChild) {
      this.table.removeChild(this.table.firstChild);
    }
  
    const totalItems = data.length; // Calculate the total items count
  
    if (totalItems === 0) {
      // If there's no data, do not create the table
      document.querySelector('.total').innerHTML = 0; // Set total items count to zero
      return;
    }
  
    const headerRow = document.createElement('tr');
    const firstItem = data[0];
  
    for (const key in firstItem) {
      if (firstItem.hasOwnProperty(key) && key !== 'undefined') {
        const headerCell = document.createElement('th');
        headerCell.textContent = key;
        headerRow.appendChild(headerCell);
      }
    }
    const editCell = document.createElement('th');
    editCell.textContent = ''; // Empty text
    editCell.colSpan = 2; // Set colspan to 2
    headerRow.appendChild(editCell);
  
    this.table.appendChild(headerRow);
  
    document.querySelector('.total').innerHTML = totalItems; // Update total items count
  
    data.forEach((item) => {
      const dataRow = document.createElement('tr');
      for (const key in firstItem) {
        if (firstItem.hasOwnProperty(key) && key !== 'undefined') {
          const dataCell = document.createElement('td');
          dataCell.textContent = item[key];
          dataRow.appendChild(dataCell);
        }
      }

      const editCell = document.createElement('td');
      const editButton = document.createElement('button');
      editButton.textContent = 'Update';
      editButton.classList.add('btn', 'btn-warning','bg-primary','text-white');
      editButton.dataset.UUID = item.UUID;
      editButton.addEventListener('click', () => {
        if (typeof this.onButtonClick === 'function') {
          this.onButtonClick(item.UUID, 'Edit');
        }
      });
      editCell.appendChild(editButton);
      dataRow.appendChild(editCell);

      const deleteCell = document.createElement('td');
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('btn', 'btn-danger');
      deleteButton.dataset.UUID = item.UUID;
      deleteButton.addEventListener('click', () => {
        if (typeof this.onButtonClick === 'function') {
          this.onButtonClick(item.UUID, 'Delete');
        }
      });
      deleteCell.appendChild(deleteButton);
      dataRow.appendChild(deleteCell);

      this.table.appendChild(dataRow);
    });
  }
}
