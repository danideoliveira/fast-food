var http = require('http');
var fs = require('fs');
var formidable = require('formidable');


http.createServer(
    function(req, res) {
        if (req.url == '/total') {
            var form = new formidable.IncomingForm();

            form.parse(req,
                function(err, fields, files) {

                    var h = Number(fields.hamburguer)
                    var q = Number(fields.queijo)
                    var s = Number(fields.salada)
                    var a = Number(fields.acompanhamento)
                    var b = Number(fields.bebida)

                    var total = 4 + h + q + s + a + b
                      
                    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                    res.write(`<div>`);
                    res.write(`<h1>Valor Total</h1>`);
                    res.write(`<br>`);
                    res.write(`<p>R$ ${total.toFixed(2)}</p>`);                            
                    res.write(`<br>`);
                    res.write(`<br>`);
                    res.write(`<input type="submit" value="Confirmar Pedido">`);
                    res.write(`<br>`);
                    res.write(`<a href="http://localhost:8080/">Cancelar</a>`);
                    res.write(`<br>`);
                    res.write(`</div>`);
                    res.end();
                    
                }
            );
        }
        else {
            fs.readFile('index.html',
                function(err, pagina) {
                    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                    res.write(pagina);
                    res.end();
                } 
            );
        }
    }
).listen(8080);

console.log('Servidor iniciado na porta 8080. Pressione Ctrl + C para encerrar.');