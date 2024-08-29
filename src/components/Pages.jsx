import { useState } from 'react';
import TableComponent from './TableComponent';

function Pages() {
  const [data, setData] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [idCounter, setIdCounter] = useState(1); // Initialize an ID counter

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (formValues.subject && formValues.task) {
      const newTodo = {
        id: idCounter, // Assign the current counter value as the ID
        ...formValues,
      };

      setData((prevData) => [...prevData, newTodo]);
      localStorage.setItem('value', JSON.stringify([...data, newTodo]));
      console.log([...data, newTodo]);

      setFormValues({});
      setIdCounter((prevCounter) => prevCounter + 1);
    } else {
      alert('Please fill out both fields.');
    }
  };

  // Function to delete an item by ID
  const deleteItem = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    localStorage.setItem('value', JSON.stringify(updatedData));
  };

  return (
    <div>
      <div className="form-container">
        <input
          className="name"
          type="text"
          placeholder="Add subject here"
          name="subject"
          value={formValues.subject || ''}
          onChange={handleChange}
        />
        <input
          className="name"
          type="text"
          placeholder="Add your daily task"
          name="task"
          value={formValues.task || ''}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      <TableComponent value={data} onDelete={deleteItem} />
    </div>
  );
}

export default Pages;
