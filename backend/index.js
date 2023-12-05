import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bosch_&_bosch"
});

app.use(express.json());
app.use(cors());


app.post("/login", (req, res) => {
    const sql = "SELECT * FROM agentes WHERE email =? AND password =?";

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
      console.log("err:", err)
       if(err) return res.json("error");
        if(data.length > 0) {
            return res.status(200).json(data);
        } else {
            return res.status(401).json("datos incorrectos!");
        }
    })
})

// CREATE - Agregar un nuevo usuario
app.post("/usuarios", (req, res) => {
    const { nombre, email, password } = req.body;
    
    const query = "INSERT INTO agentes (nombre, email, password) VALUES (?,?,?)"; 
    
  
    db.query(query, [nombre, email, password] ,(error, results) => {
      if (error) {
        return res.status(500).send(error);
      }
      
      return res.status(201).send("Usuario registrado correctamente!");
    });
  });
  
  // READ - Obtener todos los usuarios
  app.get("/usuarios", (req, res) => {
    const query = "SELECT * FROM agentes";
    
    db.query(query, (error, results) => {
      if (error) {
        return res.status(500).json({ error: "Error al obtener los usuarios" });
      }
      
      return res.status(200).json(results);
    });
  });
  
  // UPDATE - Actualizar un usuario
  app.put("/usuarios/:id", (req, res) => {
    const userId = req.params.id;
    const { nombre, email, password } = req.body;
  
    const query = "UPDATE agentes SET nombre = ?, email = ?, password = ? WHERE id = ?";
  
    const values = [nombre, email, password, userId];
  
    db.query(query, values, (error, results) => {
      if (error) {
        return res.status(500).json({ error: "Error al actualizar el usuario."});
      }
      
      return res.status(200).json({ mensaje: "Usuario actualizado satisfactoriamente." });
    });
  });
  
  // DELETE - Eliminar un usuario
  app.delete("/usuarios/:id", (req, res) => {
    const userId = req.params.id;
  
    const query = "DELETE FROM agentes WHERE id = ?";
  
    db.query(query, [userId], (error, results) => {
      if (error) {
        return res.status(500).json({ error: "Error al eliminar el usuario" });
      }
      
      return res.status(200).json({ mensaje: "Usuario eliminado satisfactoriamente" });
    });
  });

  // Verificar correo electrónico antes de agregar un nuevo usuario
app.post("/usuarios/verificar-email", (req, res) => {
  const { email } = req.body;

  const query = "SELECT COUNT(*) AS count FROM agentes WHERE email = ?";

  db.query(query, [email], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Error al verificar el correo electrónico" });
    }

    const count = results[0].count;

    return res.status(200).json({ existe: count > 0 });
  });
});


// Operación READ (Leer)
app.get("/comunas", (req, res) => {
  const query = "SELECT id, nombre FROM comunas";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error al ejecutar la consulta:", err);
      res.status(500).send("Error al obtener los registros");
    } else {
      console.log("Registros obtenidos exitosamente");
      res.status(200).json(result);
    }
  });
});


// Operación READ (Leer)
app.get("/edificios", (req, res) => {
  const query = "SELECT comunas.nombre AS comuna, edificios.id, nombre_proyecto, direccion, id_comuna, cantidad_deptos FROM edificios JOIN comunas ON edificios.id_comuna = comunas.id";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Edificios Error al ejecutar la consulta:", err);
      res.status(500).send("Error al obtener los registros");
    } else {
      console.log("Edificios Registros obtenidos exitosamente", result);
      res.status(200).json(result);
    }
  });
});

app.get("/edificios/:id", (req, res) => {
  const edificioId = req.params.id;
  const query = "SELECT comunas.nombre AS comuna, edificios.id, nombre_proyecto, direccion, id_comuna, cantidad_deptos FROM edificios JOIN comunas ON edificios.id_comuna = comunas.id WHERE edificios.id = ?";

  db.query(query, [edificioId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Error al obtener el edificio." });
    } else {
      return res.status(200).json(results[0]);
    }
  });
});


app.get("/edificios/:id/imagen", (req, res) => {
  const edificioId = req.params.id;
  const query = "SELECT imagen FROM edificios WHERE id = ?";

  db.query(query, [edificioId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Error al obtener la imagen del edificio." });
    } else {
      const imagen = results[0].imagen;
      // Configura los encabezados para indicar que estás enviando una imagen
      res.writeHead(200, {
        'Content-Type': 'image/png', // o 'image/png' según el formato de tu imagen
        'Content-Length': imagen.length
      });
      // Envía los datos de la imagen
      res.end(imagen, 'binary');
    }
  });
});

// UPDATE - Actualizar un edificio
app.put("/edificio/:id", (req, res) => {
  const edificioId = req.params.id;
  const { nombre_proyecto, direccion, id_comuna, imagen, cantidad_deptos } = req.body;

  const query = "UPDATE Edificios SET nombre_proyecto = ?, direccion = ?, id_comuna = ?, imagen = ?, cantidad_deptos = ?  WHERE id = ?";

  const values = [nombre_proyecto, direccion, id_comuna, imagen, cantidad_deptos, edificioId];

  db.query(query, values, (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Error al actualizar el edificio."});
    }
    
    return res.status(200).json({ mensaje: "Edificio actualizado satisfactoriamente." });
  });
});

// DELETE - Eliminar un edificio
app.delete("/edificio/:id", (req, res) => {
  const edificioId = req.params.id;

  const query = "DELETE FROM Edificios WHERE id = ?";

  db.query(query, [edificioId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Error al eliminar el edificio" });
    }
    
    return res.status(200).json({ mensaje: "Edificio eliminado satisfactoriamente" });
  });
});

// CREATE - Agregar un nuevo edificio
app.post("/edificios", (req, res) => {
  const { nombre_proyecto, direccion, id_comuna, imagen,cantidad_deptos } = req.body;
  
  const queryEdificio = "INSERT INTO edificios (nombre_proyecto, direccion, id_comuna, imagen, cantidad_deptos) VALUES (?,?,?,?,?)"; 

  db.query(queryEdificio, [nombre_proyecto, direccion, id_comuna, imagen, cantidad_deptos], (error, results) => {
    if (error) {
      return res.status(500).send(error);
    } else {
      const edificioId = results.insertId; // Obtener el ID del edificio recién insertado
      // Aquí deberías manejar las imágenes del edificio si es necesario

      // Ahora, manejar la información del departamento
      const { piso, cantidad_deptos, metraje, habitaciones, banos, precio, precio_uf, descripcion, imagen } = req.body;

      const queryDepartamento = `
        INSERT INTO departamentos (
          edificio_id, pisos, cantidad_deptos, metraje, habitaciones, banos, precio, precio_uf, descripcion
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(queryDepartamento, [edificioId, pisos, cantidad_deptos, metraje, habitaciones, banos, precio, precio_uf, descripcion], (error, results) => {
        if (error) {
          return res.status(500).send(error);
        } else {
          // Aquí deberías manejar las imágenes del departamento si es necesario
          return res.status(201).send("Edificio y departamento registrados correctamente!");
        }
      });
    }
  });
});

app.get("/departamentos", (req, res) => {
  const query = "SELECT id, edificio_id, agentes_id, piso, metraje, habitaciones, banos, precio, precio_uf, descripcion, numero_depto FROM departamentos";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error al ejecutar la consulta:", err);
      res.status(500).send("Error al obtener los registros");
    } else {
      console.log("Registros obtenidos exitosamente");
      res.status(200).json(result);
    }
  });
});


app.post("/departamentos", (req, res) => {
  const {
    id,
    edificio_id,
    piso,
    agentes_id,
    metraje,
    habitaciones,
    banos,
    precio,
    precio_uf,
    descripcion,
    imagen,
    numero_depto,
  } = req.body;

  const query =
    "INSERT INTO departamentos (id, edificio_id, piso, agentes_id, metraje, habitaciones, banos, precio, precio_uf, descripcion, imagen, numero_depto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  const values = [
    id,
    edificio_id,
    piso,
    agentes_id,
    metraje,
    habitaciones,
    banos,
    precio,
    precio_uf,
    descripcion,
    imagen,
    numero_depto
  ];

  db.query(query, values, (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Error al agregar el departamento." });
    } else {
      return res.status(201).json({ mensaje: "Departamento agregado correctamente." });
    }
  });
});



app.get("/departamentos/:id", (req, res) => {
  const departamentoId = req.params.id;
  const query = "SELECT * FROM departamentos WHERE id = ?";

  db.query(query, [departamentoId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Error al obtener el departamento." });
    } else {
      return res.status(200).json(results[0]);
    }
  });
});

app.put("/departamentos/:id", (req, res) => {
  const departamentoId = req.params.id;
  const {
    id,
    edificio_id,
    piso,
    agentes_id,
    metraje,
    habitaciones,
    banos,
    precio,
    precio_uf,
    descripcion,
    imagen,
    numero_depto
  } = req.body;

  const query =
    "UPDATE departamentos SET id=?, edificio_id=?, piso=?, agentes_id=?, metraje=?, habitaciones=?, banos=?, precio=?, precio_uf=?, descripcion=?, imagen=? WHERE id=?";

  const values = [
    id,
    edificio_id,
    piso,
    agentes_id,
    metraje,
    habitaciones,
    banos,
    precio,
    precio_uf,
    descripcion,
    imagen,
    departamentoId,
    numero_depto
  ];

  db.query(query, values, (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Error al actualizar el departamento." });
    } else {
      return res.status(200).json({ mensaje: "Departamento actualizado satisfactoriamente." });
    }
  });
});

app.delete("/departamentos/:id", (req, res) => {
  const departamentoId = req.params.id;

  const query = "DELETE FROM departamentos WHERE id = ?";

  db.query(query, [departamentoId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Error al eliminar el departamento." });
    } else {
      return res.status(200).json({ mensaje: "Departamento eliminado satisfactoriamente." });
    }
  });
});


app.get("/departamentos/:id/imagen", (req, res) => {
  const departamentoId = req.params.id;
  const query = "SELECT imagen FROM departamentos WHERE id = ?";

  db.query(query, [departamentoId], (error, results) => {
    if (error) {
      console.error("Error al obtener la imagen del departamento:", error);
      return res.status(500).json({ error: "Error al obtener la imagen del departamento." });
    } else if (results.length === 0 || !results[0].imagen) {
      console.error("Imagen no encontrada para el departamento con el ID proporcionado.");
      return res.status(404).json({ error: "Imagen no encontrada para el departamento con el ID proporcionado." });
    } else {
      const imagen = results[0].imagen;
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': imagen.length
      });
      res.end(imagen, 'binary');
    }
  });
});

// CRUD - Agentes

// CREATE - Agregar un nuevo agente
app.post("/agentes", (req, res) => {
  const {nombre, telefono, imagen } = req.body;

  const query = "INSERT INTO agentes (nombre, telefono, imagen) VALUES (?, ?, ?)";

  db.query(query, [id, nombre, telefono, imagen], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Error al agregar un agente." });
    } else {
      return res.status(201).json({ mensaje: "Agente registrado correctamente." });
    }
  });
});

// Operación READ (Leer)
app.get("/agentes", (req, res) => {
  const query = "SELECT id, nombre, telefono, imagen FROM agentes";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error al ejecutar la consulta:", err);
      res.status(500).send("Error al obtener los registros");
    } else {
      console.log("Registros obtenidos exitosamente");
      res.status(200).json(result);
    }
  });
});

app.get("/agentes/:id/imagen", (req, res) => {
  const agenteId = req.params.id;
  const query = "SELECT imagen FROM agentes WHERE id = ?";

  db.query(query, [agenteId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Error al obtener la imagen del agente." });
    } else {
      const imagen = results[0].imagen;
      // Configura los encabezados para indicar que estás enviando una imagen
      res.writeHead(200, {
        'Content-Type': 'image/png', // o 'image/png' según el formato de tu imagen
        'Content-Length': imagen.length
      });
      // Envía los datos de la imagen
      res.end(imagen, 'binary');
    }
  });
});


// READ - Obtener un agente por ID
app.get("/agentes/:id", (req, res) => {
  const agenteId = req.params.id;
  const query = "SELECT * FROM agentes WHERE id = ?";

  db.query(query, [agenteId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Error al obtener el agente." });
    } else {
      return res.status(200).json(results[0]);
    }
  });
});

// UPDATE - Actualizar un agente
app.put("/agentes/:id", (req, res) => {
  const agenteId = req.params.id;
  const { nombre, telefono, imagen } = req.body;

  const query = "UPDATE agentes SET nombre = ?, telefono = ?, imagen = ? WHERE id = ?";

  const values = [nombre, telefono, imagen, agenteId];

  db.query(query, values, (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Error al actualizar el agente." });
    } else {
      return res.status(200).json({ mensaje: "Agente actualizado satisfactoriamente." });
    }
  });
});

// DELETE - Eliminar un agente
app.delete("/agentes/:id", (req, res) => {
  const agenteId = req.params.id;

  const query = "DELETE FROM agentes WHERE id = ?";

  db.query(query, [agenteId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Error al eliminar el agente." });
    } else {
      return res.status(200).json({ mensaje: "Agente eliminado satisfactoriamente." });
    }
  });
});

app.post("/agentes", (req, res) => {
  const {nombre, telefono, imagen } = req.body;

  const query = "INSERT INTO agentes (nombre, telefono, imagen) VALUES (?, ?, ?)";

  db.query(query, [id, nombre, telefono, imagen], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Error al agregar un agente." });
    } else {
      return res.status(201).json({ mensaje: "Agente registrado correctamente." });
    }
  });
});

// Operación READ (Leer)
app.get("/reservas", (req, res) => {
  const query = "SELECT id, departamento_id, nombre_cliente, email_cliente, telefono_cliente, fecha FROM reservas";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error al ejecutar la consulta:", err);
      res.status(500).json({ error: "Error al obtener los registros", detalle: err.message });
    } else {
      console.log("Registros obtenidos exitosamente");
      res.status(200).json(result);
    }
  });
});


// READ - Obtener un agente por ID
app.get("/reservas/:id", (req, res) => {
  const reservaId = req.params.id;
  const query = "SELECT * FROM reservas WHERE id = ?";

  db.query(query, [reservaId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Error al obtener la reserva." });
    } else {
      return res.status(200).json(results[0]);
    }
  });
});

// UPDATE - Actualizar un agente
app.put("/reservas/:id", (req, res) => {
  const reservaId = req.params.id;
  const { id, departamento_id, nombre_cliente, email_cliente, telefono_cliente, fecha } = req.body;

  const query = "UPDATE reservas SET departamento_id = ?, nombre_cliente = ?, email_cliente = ?, telefono_cliente = ?, fecha = ? WHERE id = ?";

  const values = [id, departamento_id, nombre_cliente, email_cliente, telefono_cliente, reservaId, fecha];

  db.query(query, values, (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Error al actualizar la reserva." });
    } else {
      return res.status(200).json({ mensaje: "Reserva actualizada satisfactoriamente." });
    }
  });
});

// DELETE - Eliminar un agente
app.delete("/reservas/:id", (req, res) => {
  const reservaId = req.params.id;

  const query = "DELETE FROM reservas WHERE id = ?";

  db.query(query, [reservaId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Error al eliminar la reserva." });
    } else {
      return res.status(200).json({ mensaje: "Reserva eliminada satisfactoriamente." });
    }
  });
});

app.post("/reservas", (req, res) => {
  const {id, departamento_id, nombre_cliente, email_cliente, telefono_cliente, fecha_cliente } = req.body;
  console.log("req.body", req.body);

  const query = "INSERT INTO reservas (id, departamento_id, nombre_cliente, email_cliente, telefono_cliente, fecha) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(query, [id, departamento_id, nombre_cliente, email_cliente, telefono_cliente, fecha_cliente], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Error al agregar una reserva." });
    } else {
      return res.status(201).json({ mensaje: "Reserva registrada correctamente." });
    }
  });
});

app.get('/reservas/agentes/:id', (req, res) => {
  //const query = "SELECT id, departamento_id, nombre_cliente, email_cliente, telefono_cliente FROM reservas";
  const agenteId = req.params.id;
  const query = "SELECT reservas.departamento_id, reservas.nombre_cliente, reservas.email_cliente, reservas.telefono_cliente, departamentos.agentes_id, reservas.fecha FROM departamentos JOIN reservas ON departamentos.id = reservas.departamento_id WHERE departamentos.agentes_id = ?";

  db.query(query, [agenteId], (err, result) => {
    if (err) {
      console.error("Error al ejecutar la consulta:", err);
      res.status(500).json({ error: "Error al obtener los registros", detalle: err.message });
    } else {
      console.log("Registros obtenidos exitosamente");
      res.status(200).json(result);
    }
  });
});


app.listen(8800, () => {
  console.log("Conectado al backend!"); 
});

