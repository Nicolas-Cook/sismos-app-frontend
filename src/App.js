import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [comment, setComment] = useState('');
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(2);
  const mag_type = ["md", "ml", "ms", "mw", "me", "mi", "mb", "mlg"];
  const [selectedMagType, setSelectedMagType] = useState([]);
  const [selectedId, setSelectedId] = useState(1)

  const handleGet = async () => {
    let url = `http://127.0.0.1:3000/api/features?page=${page}&per_page=${perPage}`;
    if (selectedMagType.length > 0 && selectedMagType) {
      url += `&mag_type=${selectedMagType.join(',')}`;
    }

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/vnd.api+json',
          'Cache-Control': 'no-cache'
        }
      });
      setData(JSON.stringify(response.data, null, 2));
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePost = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:3000/api/features/1/comments', {
        comment: {
          body: comment
        }
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setData(JSON.stringify(response.data, null, 2));
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMagTypeChange = (event) => {
    const value = event.target.value;
    setSelectedMagType(prevMagTypes => {
      if (prevMagTypes.includes(value)) {
        return prevMagTypes.filter(magType => magType !== value);
      } else {
        return [...prevMagTypes, value];
      }
    });
  }

  const handleHide = () => {
    setData("")
  }
  return (
    <div className="container">
      <div className='box-container'>
        <div className="box">
          <h1>GET</h1>
          <div>
            <span>Page: </span>
            <input type="number" value={page} onChange={e => setPage(e.target.value)} /> <br/>
          </div>
          <div>
            <span>Per Page: </span>
            <input type="number" value={perPage} onChange={e => setPerPage(e.target.value)} /> <br/>
          </div>
          <div>
            <span>Mag Type:  </span>
            <div className='magTypeContainer'>
              {mag_type.map(type => (
                <div key={type} className='checkboxContainer'>
                  <input className="checkbox" type="checkbox" id={type} value={type} checked={selectedMagType.includes(type)} onChange={handleMagTypeChange} />
                  <label htmlFor={type}>{type}</label>
                </div>
              ))}
            </div>
            
        </div>

        <button class="button-29" onClick={handleGet}>Ejecutar GET</button>
        <button class="button-29" onClick={handleHide}>Hide Data</button>
      </div>
      <div className='box'>
          <h1>POST</h1>
          <div>
            <span>Sismo id: </span><input type="number" value={selectedId} onChange={e => setSelectedId(e.target.value)}/>
          </div>
            <h5>Comentario:</h5>
            <textarea value={comment} onChange={e => setComment(e.target.value)} />
            <button class="button-29" onClick={handlePost}>Ejecutar POST</button>

        </div>
      </div>
      <pre>{data}</pre>
    </div>
  );
};

export default MyComponent;
