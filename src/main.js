// main.js
import formData from './data/formData.js';
import Form from './lib/form.js';
import Storage from './lib/storage.js';
import Table from './lib/table.js';

class Main {
  constructor(formContainerId, storageId, tableContainerId) {
    this.formInstance = new Form(formContainerId, formData);
    this.storage = new Storage(storageId);
    this.table = new Table(tableContainerId);

    this.table.onButtonClick = this.handleTableButtonClick.bind(this); // Set the callback

    document.addEventListener('FormEvent', this.handleFormSubmission.bind(this));

    this.editingUserId = null;

    this.table.renderTable(this.storage.getData());
  }

  handleFormSubmission(event) {
    // Handle the form submission event, update storage and table as needed
    const submittedData = event.detail.data;
    submittedData.UUID = this.generateUserId();
    submittedData.createdAt = this.generateCreatedAt();
    
    if (this.editingUserId !== null) {
      // Editing an existing user
      const edited = this.storage.editData(this.editingUserId, submittedData);
      if (edited) {
        this.editingUserId = null; // Reset editing mode
      } else {
        console.log(`User with userId ${this.editingUserId} not found.`);
      }
    } else {
      // Adding a new user
      this.storage.addData(submittedData);
    }

    this.table.renderTable(this.storage.getData());
  }

  generateUserId() {
    function uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
      .replace(/[xy]/g, function (c) {
          const r = Math.random() * 16 | 0, 
              v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
      });
  }
    const uuid = uuidv4()
    return uuid;
  }

  generateCreatedAt() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return now.toLocaleDateString('en-US', options);
  }

  handleTableButtonClick(userId, action) {
    if (action === 'Edit') {
      // Start editing the user
      this.editingUserId = userId;
      const userData = this.storage.getUserData(userId);
      this.formInstance.prefillForm(userData);
    } else if (action === 'Delete') {
      const deleted = this.storage.deleteData(userId);
      if (deleted) {
        this.table.renderTable(this.storage.getData());
      } else {
        console.log(`User with userId ${userId} not found.`);
      }
    }
  }
}

const main = new Main('employeeForm', 'employeeData', 'tableDiv');
