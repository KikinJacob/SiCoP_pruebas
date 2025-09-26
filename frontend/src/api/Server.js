const express = require('express');
const { google } = require('googleapis');
const fs = require('fs');
const multer = require('multer');

const app = express();
const port = 3001;

// Configura multer para manejar la subida de archivos
const upload = multer({ dest: 'uploads/' });

// Cargar credenciales de la cuenta de servicio
const KEYFILEPATH = 'Frontend/SiCoP_/src/api/sicop-427020-7f5734bb4dc4.json';
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const drive = google.drive({ version: 'v3', auth });

// Ruta para subir archivos
app.post('/upload', upload.single('file'), async (req, res) => {
  const fileMetadata = {
    'name': req.file.originalname,
    parents: ['Documents'], // ID de la carpeta compartida en Google Drive
  };

  const media = {
    mimeType: req.file.mimetype,
    body: fs.createReadStream(req.file.path),
  };

  try {
    const file = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id',
    });

    // Elimina el archivo temporal
    fs.unlinkSync(req.file.path);

    res.status(200).send(`File uploaded successfully. File ID: ${file.data.id}`);
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Error uploading file');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
