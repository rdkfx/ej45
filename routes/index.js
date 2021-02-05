var express = require('express');
var router = express.Router();

//  Requerimos "multer" pasando como dato el directorio donde se suben los archivos:
var multer = require('multer');
var upload = multer({dest: './uploads/'});
// Requerimos el módulo 'fs' para la copia de archivos:
var fs = require('fs');

// RUTAS
/* GET home page. */
router.get('/', function(req, res, next) {
res.render('index', { title: 'Express' });
});

router.get('/subirfoto', function(req, res, next) {
res.render('subirfoto');
});
//new
router.get('/about', function(req, res, next) {
res.render('about');
});
router.get('/historia', function(req, res, next) {
res.render('historia');
});
router.get('/servicios', function(req, res, next) {
res.render('servicios');
});


/* Indicamos el objeto upload que creamos en las primeras líneas llamando
   al método array y pasando como parámetro la propiedad name del formulario html y un 2 indicando la
   cantidad de archivos que llegarán.*/
router.post('/subirfoto', upload.array('foto', 2), function(req, res, next) {
// Mediante un for recorremos el vector y generamos todas los elementos HTML img con la propiedad src respectiva
// Disponemos un for para recorrer el vector que contiene todos los datos de los archivos subidos:
for(var x=0;x<req.files.length;x++) {
    // En cada vuelta del for copiamos el archivo que se encuentra en la carpeta upload a la carpeta fotos
     //  a un archivo que es igual al nombre original:
    // osa, copiamos el archivo a la carpeta definitiva de fotos
   fs.createReadStream('./uploads/'+req.files[x].filename).pipe(fs.createWriteStream('./public/fotos/'+req.files[x].originalname, function(error){}));
   //borramos el archivo temporal creado
   fs.unlink('./uploads/'+req.files[x].filename, function(error){});
}
var pagina='<!doctype html><html><head><link rel="stylesheet", href="/stylesheets/style.css" /><link rel="stylesheet", href="/stylesheets/bootstrap.min.css" /></head><body>'+
           '<p>Se subieron las fotos</p>'+
           '<br><a href="/">Retornar</a></body></html>';
  res.send(pagina);
});


// Mediante el objeto 'fs' llamamos al método readdir que obtiene una lista con todos los archivos
// contenidos en la carpeta que le pasamos en el primer parámetro:
router.get('/verfotos', function(req, res, next) {
fs.readdir('./public/fotos/', function(err, files) {
  var pagina='<!doctype html><html><head><link rel="stylesheet", href="/stylesheets/style.css" /><link rel="stylesheet", href="/stylesheets/bootstrap.min.css" /></head><body>';
  for(var x=0;x<files.length;x++) {
      pagina+='<img src="fotos/'+files[x]+'"><br>';
  }
  pagina+='<br><a href="/">Retornar</a></body></html>';
  res.send(pagina);
});
});

module.exports = router;
