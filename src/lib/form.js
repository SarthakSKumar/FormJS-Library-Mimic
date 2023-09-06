
export default class Form {
  constructor(formContainerId, formData) {
    this.container = document.getElementById(formContainerId);
    this.formData = formData;
    this.form = this.createForm();
    this.container.appendChild(this.form);
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }
  createForm() {
    const form = document.createElement('form');
    form.classList.add('needs-validation'); 
    this.formData.forEach((field) => {
      const formGroup = document.createElement('div');
      formGroup.classList.add('form-group'); 

      if (field.type === 'select') {
        const select = document.createElement('select');
        select.classList.add('form-control'); 
        select.name = field.key;
        select.id = field.key; 
        field.options.forEach((option) => {
          const optionElement = document.createElement('option');
          optionElement.innerText = option.innerText;
          optionElement.value = option.value;
          select.appendChild(optionElement);
        });
        formGroup.appendChild(select);
      } else if (field.type === 'radio' || field.type === 'checkbox') {
        field.options.forEach((option) => {
          const inputElement = document.createElement('input');
          inputElement.type = field.type;
          inputElement.name = field.key;
          inputElement.value = option.value;
          inputElement.id = option.attr.id;
          inputElement.classList.add('form-check-input', 'inputStyle'); 
          const label = document.createElement('label');
          label.htmlFor = option.attr.id;
          label.classList.add('form-check-label', 'inputStyle'); 
          label.innerText = option.innerText;
          formGroup.appendChild(inputElement);
          formGroup.appendChild(label);
        });
      } else {
        const input = document.createElement('input');
        input.type = field.type;
        input.name = field.key;
        input.placeholder = field.label;
        input.classList.add('form-control'); 
        if (field.required) {
          input.required = true;
        }
        formGroup.appendChild(input);
      }
      form.appendChild(formGroup);
    });
    return form;
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = {};
    this.formData.forEach((field) => {
      if (field.type === 'checkbox') {
        formData[field.key] = [];
        field.options.forEach((option) => {
          const checkbox = this.form.querySelector(`#${option.attr.id}`);
          if (checkbox.checked) {
            formData[field.key].push(option.value);
          }
        });
      } else {
        formData[field.key] = this.form[field.key].value;
      }
    });
    const eventPayload = {
      type: 'formSubmission',
      data: formData,
    };
    document.dispatchEvent(new CustomEvent('FormEvent', { detail: eventPayload }));
    this.form.reset(); 
  }

  prefillForm(userData) {
    
    this.formData.forEach((field) => {
      const fieldValue = userData[field.key];
      if (field.type === 'checkbox') {
        
        field.options.forEach((option) => {
          const checkbox = this.form.querySelector(`#${option.attr.id}`);
          checkbox.checked = fieldValue.includes(option.value);
        });
      } else {
        
        this.form[field.key].value = fieldValue;
      }
    });
  }
}
