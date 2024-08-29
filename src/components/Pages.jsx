import { useState } from 'react';
import TableComponent from './TableComponent';

function Pages() {
  const [data, setData] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [idCounter, setIdCounter] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [animateCard, setAnimateCard] = useState(false); // New state to trigger animation

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
        id: idCounter,
        ...formValues,
      };

      if (editingId !== null) {
        const updatedData = data.map((item) =>
          item.id === editingId ? { ...item, ...formValues } : item
        );
        setData(updatedData);
        localStorage.setItem('value', JSON.stringify(updatedData));
        setEditingId(null);
      } else {
        setData((prevData) => [...prevData, newTodo]);
        localStorage.setItem('value', JSON.stringify([...data, newTodo]));
        setIdCounter((prevCounter) => prevCounter + 1);
      }

      setFormValues({});
      setAnimateCard(true); // Trigger animation

      // Reset the animation state after it completes
      setTimeout(() => {
        setAnimateCard(false);
      }, 500); // Duration of the animation
    } else {
      alert('Please fill out both fields.');
    }
  };

  const deleteItem = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    localStorage.setItem('value', JSON.stringify(updatedData));
  };

  const handleEdit = (id) => {
    const itemToEdit = data.find((item) => item.id === id);
    setFormValues(itemToEdit);
    setEditingId(id);
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
        <button onClick={handleSubmit}>
          {editingId !== null ? 'Update' : 'Submit'}
        </button>
      </div>

      <div className={`card-container ${animateCard ? 'animate' : ''}`}>
        <TableComponent value={data} onDelete={deleteItem} onEdit={handleEdit} />
      </div>
    </div>
  );
}

export default Pages;
