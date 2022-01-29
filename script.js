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

                    var img = "http://www.hamburguerdeorigem.com.br/images/uploaded/homeburger/90269284cd465b4f79e7d7fbb5891eb3.png"

                    var total = 4 + h + q + s + a + b
                    
                    fs.readFile('total.html',
                        function(err, pagina) {
                            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                            res.write(pagina);
                            res.write(`<div>`);
                            res.write(`<h1 style="font-size=50px">Valor Total</h1>`);
                            res.write(`<br>`);
                            res.write(`<img src=${img} alt="Foto de Hambúrguer">`);
                            res.write(`<p id="total">R$ ${total.toFixed(2)}</p>`);
                            res.write(`<br>`);
                            res.write(`<br>`);
                            res.write(`<script>
                                            function msg() {
                                                window.alert('Pedido Realizado com Sucesso!')
                                            }
                                        </script>`)
                            res.write(`<input type="submit" onclick="msg()" class="submit" id="confirmar" value="Confirmar Pedido">`);
                            res.write(`<br>`);
                            res.write(`<a href="http://localhost:8080/" class="submit" id="cancelar">Cancelar</a>`);
                            res.write(`<br>`);
                            res.write(`</div>`);
                            res.end();
                        } 
                    );
                    
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