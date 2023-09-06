// storage.js
export default class Storage {
  constructor(storageId) {
    this.storageId = storageId;
    this.data = this.getData() || [];
  }

  getData() {
    const dataString = localStorage.getItem(this.storageId);
    return JSON.parse(dataString);
  }

  setData(data) {
    localStorage.setItem(this.storageId, JSON.stringify(data));
  }

  addData(newData) {
    this.data.push(newData);
    this.setData(this.data);
  }

  editData(userId, updatedData) {
    const index = this.data.findIndex((user) => user.UUID === userId);
    if (index !== -1) {
      this.data[index] = { ...this.data[index], ...updatedData };
      this.setData(this.data);
      return true; // Return true to indicate success
    }
    return false; // Return false if user with userId was not found
  }

  deleteData(userId) {
    const initialLength = this.data.length;
    this.data = this.data.filter((user) => user.UUID !== userId);
    if (this.data.length < initialLength) {
      this.setData(this.data);
      return true; // Return true to indicate success
    }
    return false; // Return false if user with userId was not found
  }

  getUserData(userId) {
    return this.data.find((user) => user.UUID === userId);
  }
}
