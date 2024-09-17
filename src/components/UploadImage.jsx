// import axios from 'axios';
// import React, { useState } from 'react';

// function UploadImage() {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!file) {
//       alert('Please select a file to upload.');
//       return; // Prevent submission if no file is selected
//     }

//     const formData = new FormData();
//     formData.append('image', file);

//     try {
//       const response = await axios.post('http://localhost:5000/api/upload', formData);
//       alert(response.data.message);
//     } catch (error) {
//       alert('Error uploading image: ' + error.message);
//     }
//   };

//   return (
//     <div className="mb-4">
//       <h2>Silahkan Upload Gambar Karyawan</h2>
//       <form onSubmit={handleSubmit} className="d-flex align-items-center"> {/* Apply Bootstrap classes */}
//         <input
//           type="file"
//           onChange={handleFileChange}
//           className="form-control me-2"
//         />
//         <button type="submit" className="btn btn-primary">Upload</button>
//       </form>
//     </div>
//   );
// }

// export default UploadImage;
import axios from 'axios';
import React, { useState } from 'react';

function UploadImage() {
  const [file, setFile] = useState(null);
  const [newFileName, setNewFileName] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileNameChange = (event) => {
    setNewFileName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Silahkan Upload Gambar Karyawan.');
      return; 
    }

    if (!newFileName) {
      alert('Masukkan Nama Karyawan.');
      return;
    }

    const fileExtension = file.name.split('.').pop();
    const finalFileName = `${newFileName}.${fileExtension}`;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('newFileName', finalFileName); 

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData);
      alert(response.data.message);
    } catch (error) {
      alert('Error uploading image: ' + error.message);
    }
  };

  return (
    <div className="mb-4">
      <h2>Silahkan Upload Gambar Karyawan</h2>
      <form onSubmit={handleSubmit} className="d-flex align-items-center"> 
        <input
          type="file"
          onChange={handleFileChange}
          className="form-control me-2"
        />
        <input
          type="text"
          placeholder="Silahkan Masukan Nama Karyawan"
          value={newFileName}
          onChange={handleFileNameChange}
          className="form-control me-2"
        />
        <button type="submit" className="btn btn-primary">Upload</button>
      </form>
    </div>
  );
}

export default UploadImage;
