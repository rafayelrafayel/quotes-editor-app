import React, { useState, useEffect } from 'react';
import './App.css';

const apiUrl = process.env.REACT_APP_API_URL;



function App() {
  const [quotes, setQuotes] = useState([]);
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');

  const [editingQuotes, setEditingQuotes] = useState({});
  const [editingQuoteId, setEditingQuoteId] = useState(null);


  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await fetch(`${apiUrl}/quotes/all`);
      const data = await response.json();
      setQuotes(data.payload);
    } catch (error) {
      console.log('Failed to fetch quotes:', error);
    }
  };


  const handleEdit = (quoteId) => {
    setEditingQuoteId(quoteId);
    const quoteToEdit = quotes.find((quote) => quote._id === quoteId);
    setEditingQuotes((prevEditingQuotes) => ({
      ...prevEditingQuotes,
      [quoteId]: { ...quoteToEdit },
    }));
  };

  const handleEditInputChange = (quoteId, field, value) => {
    setEditingQuotes((prevEditingQuotes) => ({
      ...prevEditingQuotes,
      [quoteId]: {
        ...prevEditingQuotes[quoteId],
        [field]: value,
      },
    }));
  };


  const addQuote = async () => {
    try {
      const response = await fetch(`${apiUrl}/quotes/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, author }),
      });
      const newQuote = await response.json();
      setQuotes([...quotes, newQuote.payload]);
      setText('');
      setAuthor('');
    } catch (error) {
      console.log('Failed to add quote:', error);
    }
  };

  const handleSave = async (quoteId) => {
    try {
      const editingQuote = editingQuotes[quoteId];
      const response = await fetch(`${apiUrl}/quotes/save/${quoteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingQuote),
      });
      const data = await response.json();
      const updated = data.payload;
      const updatedQuotes = quotes.map((quote) =>
        quote._id === updated._id ? updated : quote
      );
      setQuotes(updatedQuotes);


    } catch (error) {
      console.log('Failed to save quote:', error);
    }
  };

  const handleCancel = (quoteId) => {
    setEditingQuoteId(null);
    setEditingQuotes((prevEditingQuotes) => {
      const updatedEditingQuotes = { ...prevEditingQuotes };
      delete updatedEditingQuotes[quoteId];
      return updatedEditingQuotes;
    });
  };

  const deleteQuote = async (id) => {
    try {
      await fetch(`${apiUrl}/quotes/remove/${id}`, {
        method: 'DELETE',
      });
      setQuotes(quotes.filter((quote) => quote._id !== id));
    } catch (error) {
      console.log('Failed to delete quote:', error);
    }
  };

  return (
    <div>
      <form>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Quote Text"
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author Name"
        />
        <button type="button" onClick={addQuote}>
          Add Quote
        </button>
      </form>
      <ul>
        {quotes.map((quote) => (
          <div key={quote._id}>
            <p>{quote.text} - {quote.author}</p>
            {editingQuoteId === quote._id ? (
              <div>
                <input
                  type="text"
                  value={editingQuotes[quote._id].text}
                  onChange={(e) =>
                    handleEditInputChange(quote._id, 'text', e.target.value)
                  }
                />
                <input
                  type="text"
                  value={editingQuotes[quote._id].author}
                  onChange={(e) =>
                    handleEditInputChange(quote._id, 'author', e.target.value)
                  }
                />
                <button onClick={() => handleSave(quote._id)}>Save</button>
                <button onClick={() => handleCancel(quote._id)}>Cancel</button>
              </div>
            ) : (
              <div>
                <button onClick={() => handleEdit(quote._id)}>Edit</button>
                <button type="button" onClick={() => deleteQuote(quote._id)}>  Delete </button>
              </div>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;

