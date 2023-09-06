
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
    const index = this.data.findIndex((user) => user.userId === userId);
    if (index !== -1) {
      this.data[index] = { ...this.data[index], ...updatedData };
      this.setData(this.data);
      return true; 
    }
    return false; 
  }

  deleteData(userId) {
    const initialLength = this.data.length;
    this.data = this.data.filter((user) => user.userId !== userId);
    if (this.data.length < initialLength) {
      this.setData(this.data);
      return true; 
    }
    return false; 
  }

  getUserData(userId) {
    return this.data.find((user) => user.userId === userId);
  }
}
