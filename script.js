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
                    
                    var img = "https://cdn-0.imagensemoldes.com.br/wp-content/uploads/2020/07/Foto-Lanche-PNG.png"

                    var total = 4 + h + q + s + a + b
                    
                    fs.readFile('index.html',
                        function(err, pagina) {
                   
                            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                            res.write(pagina);
                            res.write(`<div>`);
                            res.write(`<h1 style="font-size=50px">Valor Total</h1>`);
                            res.write(`<br>`);
                            res.write(`<img src="${img}" width="290px" alt="Foto do Lanche">`)
                            res.write(`<p id="total">R$ ${total.toFixed(2)}</p>`);
                            res.write(`<br>`);
                            res.write(`<script>
                                            var div_master = document.getElementById('div_master');    
                                            div_master.style.display = "none";

                                            function msg() {
                                                window.alert('Pedido Realizado com Sucesso!')
                                            }
                                        </script>`);
                            res.write(`<input type="submit" onclick="msg()" class="submit" id="confirmar" value="Confirmar Pedido">`);
                            res.write(`<br>`);
                            res.write(`<a href="http://localhost:8080/" class="submit" id="cancelar">Cancelar</a>`);
                            res.write(`<br>`);
                            res.write(`</div>`);
                            res.end();
                        }
                    )
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