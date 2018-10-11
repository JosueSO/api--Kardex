var express = require('express');
var jwt = require('jsonwebtoken');
var puerto = process.env.PORT || 3000;
var app = express();

app.use(express.json());

app.get('/calificaciones', function (req, res) {
    //console.log("Token recibido " + req.query.token);
    jwt.verify(req.query.token, 'clavesupersecreta', function (error, decoded) {
        if (error) {
            res.status(403);
            res.json({ mensaje: 'Autorizacion no válida' });
        }
        else {
            res.json({
                mensaje: `Bienvenido ${decoded.usuario} aquí están las calificaciones...`,
                //objeto: decoded
            });
        }
    });
});

app.post('/login', function (req, res) {
    var alumno = {
        email: 'alumno@uaslp.mx',
        password: '123'
    };

    var profesor = {
        email: 'profesor@uaslp.mx',
        password: 'abc'
    };

    if (req.body.email == alumno.email &&
        req.body.password == alumno.password) {
        var token = jwt.sign(
            {
                usuario: 'alumno',
                nombre: 'Raul',
                claveUnica: '123456'
            },
            'clavesupersecreta',
            { expiresIn: '1h' }
        );
        //console.log("Token generado: " + token);
        res.json({ mensaje: "Bienvenido alumno", elToken: token });
    }
    else if (req.body.email == profesor.email &&
        req.body.password == profesor.password) {
        var token = jwt.sign(
            {
                usuario: 'profesor'
            },
            'clavesupersecreta',
            { expiresIn: '1h' }
        );
        //console.log("Token generado: " + token);
        res.json({ mensaje: "Bienvenido profesor", elToken: token });
    }
    else{
        res.status(401);
        res.json({ mensaje: "Credenciales no válidas" , elToken: null});
    }
});

app.listen(puerto, function () {
    console.log("Servidor corriendo en el puerto " + puerto);
});