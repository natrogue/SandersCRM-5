//server.js
//codigo de sanders
const https = require('https'); // Para crear un servidor HTTPS
const fs = require('fs'); // Maneja archivos del sistema

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const verifyRole = require('./middlewares/verifyRole');

const User = require('./models/userModel');
const { sendThankYouEmail } = require('./sendEmail'); 

const JWT_SECRET = 'mysecretkey';


const app = express();
const PORT = 5001;

// backend/server.js

require('dotenv').config();
// otras configuraciones




// Middlewares
//app.use(cors());
app.use(cors({
    origin: 'https://localhost:5173',
    exposedHeaders: ['X-Total-Count'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/crmDummy', {
}).then(() => {
    console.log('Conectado a la base de datos MongoDB');
}).catch((err) => {
    console.error('Error al conectar a MongoDB', err);
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'Email o contraseña incorrectos' });
        }

        // Compare the password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ error: 'Email o contraseña incorrectos' });
        }

        // Create a JWT token
        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        // Send token and role to the client
        res.json({ token, role: user.role });  // Aquí agregamos el rol del usuario a la respuesta
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Ruta para registrar nuevos usuarios
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

        // Crear un nuevo usuario con rol predeterminado 'user'
        const newUser = new User({
            email,
            password: hashedPassword,
            role: 'user' // Asegurarse de que el rol sea 'user'
        });

        // Guardar el nuevo usuario en la base de datos
        await newUser.save();

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
});

// Protected route with middleware
app.get('/protected-data', authenticateToken, (req, res) => {
    res.json({ message: 'This is protected data', user: req.user });
});

// JWT auth middleware
function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    console.log('Headers:', req.headers);

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    }
    catch (error) {
        console.error('Error verificando el token:', error);
        res.status(400).json({ error: 'Invalid token' });
    }
}

// Definir el esquema de Mongoose para Donaciones en Línea
const donacionLineaSchema = new mongoose.Schema({
    donorName: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    section: { type: String, required: true }
});

// Crear el modelo de Mongoose a partir del esquema de Donaciones en Línea
const DonacionLinea = mongoose.model('DonacionLinea', donacionLineaSchema);

// Definir el esquema de Mongoose para Donaciones en Especie
const donacionEspecieSchema = new mongoose.Schema({
    donorName: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    event: { type: String, required: true }
}, { collection: 'donacionesespecie' });

// Crear el modelo de Mongoose a partir del esquema de Donaciones en Especie
const DonacionEspecie = mongoose.model('DonacionEspecie', donacionEspecieSchema);


 //app.get('/', async (req, res)  => {
 //    res.send('Hello World');
 //});

// Rutas para Donaciones en Línea (solo admin)
app.get('/donaciones-linea', async (req, res) => {
    try {
        const donaciones = await DonacionLinea.find();
        res.json({
            data: donaciones.map(donacion => ({ ...donacion.toObject(), id: donacion._id })),  // Mapea _id a id
            total: donaciones.length  // Añadir total para la paginación
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/donaciones-linea/:id', async (req, res) => {
    try {
        const donacion = await DonacionLinea.findById(req.params.id);
        if (!donacion) {
            return res.status(404).json({ error: 'Donación no encontrada' });
        }
        res.json(donacion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/donaciones-linea', authenticateToken, verifyRole('admin'), async (req, res) => {
    try {
        const nuevaDonacion = new DonacionLinea(req.body);
        await nuevaDonacion.save();

        sendThankYouEmail(req.body.donorName, req.user.email);

    
        res.status(201).json(nuevaDonacion);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Rutas para Donaciones en Especie (solo admin)
app.get('/donaciones-especie', async (req, res) => {
    try {
        const donaciones = await DonacionEspecie.find();
        res.json({
            data: donaciones.map(donacion => ({ ...donacion.toObject(), id: donacion._id })),  // Mapea _id a id
            total: donaciones.length  // Añadir total para la paginación
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ruta para obtener una donación específica de especie
app.get('/donaciones-especie/:id', async (req, res) => {
    try {
        const donacion = await DonacionEspecie.findById(req.params.id);
        if (!donacion) {
            return res.status(404).json({ error: 'Donación no encontrada' });
        }
        res.json(donacion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/donaciones-especie', authenticateToken, verifyRole('admin'), async (req, res) => {
    console.log(req.body);
    try {
        const nuevaDonacion = new DonacionEspecie({
            donorName: req.body.donorName,
            amount: req.body.amount,
            date: req.body.date,
            event: req.body.event
        });

        await nuevaDonacion.save();

        sendThankYouEmail(req.body.donorName, req.user.email);

        res.status(201).json(nuevaDonacion);
    } catch (err) {
        console.error('Error al crear la donación:', err);
        res.status(400).json({ error: err.message });
    }
});

app.put('/donaciones-especie/:id', authenticateToken, verifyRole('admin'), async (req, res) => {
    try {
        const { id } = req.params;
        const { donorName, amount, date, event } = req.body;

        // Actualiza la donación con los nuevos valores
        const updatedDonacion = await DonacionEspecie.findByIdAndUpdate(id, {
            donorName,
            amount,
            date,
            event
        }, { new: true });

        if (!updatedDonacion) {
            return res.status(404).json({ error: 'Donación no encontrada' });
        }

        res.status(200).json(updatedDonacion);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Ruta para actualizar una donación en línea
app.put('/donaciones-linea/:id', authenticateToken, verifyRole('admin'), async (req, res) => {
    try {
        const { id } = req.params;
        const { donorName, amount, date, section } = req.body;

        // Actualizar la donación con los nuevos valores
        const updatedDonacion = await DonacionLinea.findByIdAndUpdate(id, {
            donorName,
            amount,
            date,
            section
        }, { new: true });  // { new: true } devuelve el documento actualizado

        if (!updatedDonacion) {
            return res.status(404).json({ error: 'Donación no encontrada' });
        }

        res.status(200).json(updatedDonacion);
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar la donación' });
    }
});

// Ruta para ver las donaciones del usuario (solo user)
app.get('/user-donations', authenticateToken, verifyRole('user'), async (req, res) => {
    try {
        const donaciones = await DonacionLinea.find({ donorName: req.user.email }); // Mostrar solo las donaciones del usuario
        res.json(donaciones);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ruta para eliminar múltiples donaciones en línea
app.delete('/donaciones-linea', authenticateToken, verifyRole('admin'), async (req, res) => {
    try {
        const { ids } = req.body; // Recibir los IDs del cuerpo de la solicitud
        await DonacionLinea.deleteMany({ _id: { $in: ids } }); // Eliminar todos los registros con esos IDs

        res.status(200).json({ message: 'Donaciones eliminadas exitosamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar las donaciones' });
    }
});

// Ruta para eliminar múltiples donaciones en especie
app.delete('/donaciones-especie', authenticateToken, verifyRole('admin'), async (req, res) => {
    try {
        const { ids } = req.body; // Recibir los IDs del cuerpo de la solicitud
        await DonacionEspecie.deleteMany({ _id: { $in: ids } }); // Eliminar todos los registros con esos IDs

        res.status(200).json({ message: 'Donaciones eliminadas exitosamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar las donaciones en especie' });
    }
});

// Ruta para eliminar una donación en línea
app.delete('/donaciones-linea/:id', authenticateToken, verifyRole('admin'), async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDonacion = await DonacionLinea.findByIdAndDelete(id);

        if (!deletedDonacion) {
            return res.status(404).json({ error: 'Donación no encontrada' });
        }

        res.status(200).json({ message: 'Donación eliminada exitosamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar la donación' });
    }
});

// Ruta para eliminar una donación en especie
app.delete('/donaciones-especie/:id', authenticateToken, verifyRole('admin'), async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDonacion = await DonacionEspecie.findByIdAndDelete(id);

        if (!deletedDonacion) {
            return res.status(404).json({ error: 'Donación no encontrada' });
        }

        res.status(200).json({ message: 'Donación eliminada exitosamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar la donación' });
    }
});

// Ruta para crear donaciones (solo user)
app.post('/user-donations', authenticateToken, verifyRole('user'), async (req, res) => {
    try {
        const nuevaDonacion = new DonacionLinea({
            donorName: req.body.donorName, // Nombre ingresado por el usuario en el frontend
            email: req.user.email, // Correo extraído del JWT
            amount: req.body.amount,
            date: new Date().toISOString(),
            section: req.body.section || 'general' // Añadir una sección si es necesario
        });
        await nuevaDonacion.save();

        sendThankYouEmail(req.body.donorName, req.user.email);

        res.status(201).json(nuevaDonacion);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Ruta para probar el backend en el navegador
app.get('/', (req, res) => {
    res.send('Hello World - TC2007B!'); // Mensaje que se verá en la ventana del navegador
});

// Leer certificados SSL
const privateKey = fs.readFileSync('../certs/server.key', 'utf8');
const certificate = fs.readFileSync('../certs/server.crt', 'utf8');
const ca = fs.readFileSync('../certs/ca/ca.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate, ca: ca };

// Iniciar el servidor
//app.listen(PORT, () => {
//    console.log(`Servidor corriendo en http://localhost:${PORT}`);
//});

//Servidor HTTPS
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(PORT, () => console.log(`Server running on port ${PORT} with HTTPS`));

