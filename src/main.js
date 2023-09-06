
import formData from './data/formData.js';
import Form from './lib/form.js';
import Storage from './lib/storage.js';
import Table from './lib/table.js';

class Main {
  constructor(formContainerId, storageId, tableContainerId) {
    this.formInstance = new Form(formContainerId, formData);
    this.storage = new Storage(storageId);
    this.table = new Table(tableContainerId);

    this.table.onButtonClick = this.handleTableButtonClick.bind(this); 

    document.addEventListener('FormEvent', this.handleFormSubmission.bind(this));

    this.editingUserId = null;

    this.table.renderTable(this.storage.getData());
  }

  handleFormSubmission(event) {
    
    const submittedData = event.detail.data;
    submittedData.userId = this.generateUserId();
    submittedData.createdAt = this.generateCreatedAt();
    
    if (this.editingUserId !== null) {
      
      const edited = this.storage.editData(this.editingUserId, submittedData);
      if (edited) {
        this.editingUserId = null; 
      } else {
        console.log(`User with userId ${this.editingUserId} not found.`);
      }
    } else {
      
      this.storage.addData(submittedData);
    }

    this.table.renderTable(this.storage.getData());
  }

  generateUserId() {
    
    return Math.floor(100000 + Math.random() * 900000);
  }

  generateCreatedAt() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return now.toLocaleDateString('en-US', options);
  }

  handleTableButtonClick(userId, action) {
    if (action === 'Edit') {
      
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
