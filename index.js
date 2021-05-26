    function validar() { //Função que engloba as variaveis da pagina.

        var name=document.getElementById("name");
        var senha=document.getElementById("senha");
        var email=document.getElementById("email");
        var telefone=document.getElementById("telefone");
        var cep=document.getElementById("cep");
        var rua=document.getElementById("rua");
        var bairro=document.getElementById("bairro");
        var cidade=document.getElementById("cidade");
        var estado=document.getElementById("uf");
        var sexom=document.getElementById("sexom").checked;
        var sexof=document.getElementById("sexof").checked;
        var sexoo=document.getElementById("sexoo").checked;

        //Se nada for digitado na box do nome, o site ira alertar o usuario e focando na box correspondente.
        if (name.value == ""){ 
           alert("Favor digitar um nome!");
           name.focus(); 
           return;
        }
        //Se nada for digitado na box da senha, o site ira alertar o usuario  e focando na box correspondente.
        if (senha.value == ''){ 
            alert("Favor digitar a sua senha!");
            senha.focus();
            return;

        //Se a box conter menos que 6 caracteres, o site ira alertar o usuario e foca na box correspondente.    
        } else if (senha.value.length<6){
            alert("Favor digitar uma senha com mais de 6 caracteres!");
            senha.focus();
            return;
        }

        //Se nada for digitado na box do e-mail , o site ira alertar o usuario e foca na box correspondente.
        if (email.value == ""){
            alert("Favor digite seu email!");
            email.focus();
            return;
            //Verifica se o digitado na box realmente se corresponde a um e-mail e caso nao seja, alerta o usuario e foca na box correspondente. 
        } else if (!validaremail(email.value)){
            alert("Favor digitar um email corretamente!");
            email.focus();
            return;
        }

       //Se nada for digitado na box do telefone, o site ira alertar o usuario e foca na box correspondente.
        if (telefone.value == "") {
            alert("Favor digite seu numero de telefone!");
            telefone.focus();
            return;
        }
        //Se nada for digitado na box do CEP, o site ira alertar o usuario e foca na box correspondente.
        if (cep.value == ""){
            alert("Favor digitar o CEP!");
            cep.focus();
            return;
        }

        if (rua.value ==''){
            alert ("Favor digite sua Rua!");
            document.getElementById('rua').focus();
            return;
        }

        if (bairro.value == '' || bairro.value == "..."){
            alert ("Favor digite seu Bairro!");
            document.getElementById('bairro').focus();
            return;
        }

        if (cidade.value == '' || cidade.value == "..."){
            alert ("Favor digite sua Cidade!");
            document.getElementById('cidade').focus();
            return;
        }

        if (estado.value == '' || estado.value == "..."){
            alert ("Favor digite seu Estado!");
            document.getElementById('uf').focus();
            return;
        }

        //Verifica se uma das checkboxes foram marcadas, caso contrario alerta o usuario para selecionar seu sexo correspondente. 
        if (sexom == false && sexof == false && sexoo == false) {
            alert ("Favor escolha seu sexo!");
            document.getElementsByName('sexo').focus();
            return;
        }


    }

    //Função que verifica se o e-mail foi digitado de forma correta.
    function validaremail(mail){
        var emailregex=/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
        return emailregex.test(mail);

    }

    if (telefone.value=""){ //Função que valida se o telefone foi digitado ou não.
        alert("Favor Digitar seu numero de telefone!");
        document.getElementById('telefone').focus();
    }

    function mask(v1, v2){ //Função da mask do telefone
        setTimeout(function() {
            var g = mtelefone(v1.value); //Chama a função para preencher a mascara para cada digito(mtelefone no caso)

            if (g != v1.value){ //Verifica se a mascara(mask) inserida se esta diferente do que o usuario digitou na tela 
                v1.value=g //Se sim , o valor do input recebe o valor que foi includo com a mascara
            }


        }

        )
    }

    function mtelefone(v){ //Função que vai adequar o DDD e o numero de telefone na box, diferenciando de um numero de telefone fixo e de celular
        var r = v.replace(/\D/g, ""); 
    r = r.replace(/^0/, "");
    if (r.length > 10) {
        r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 5) {
        r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
        r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else {
        r = r.replace(/^(\d*)/, "($1");
    }
    return r;
    }
    
    function buscacep(ncep) { //Função que realiza a validação do CEP e aplica a mask 
        var cep = ncep.replace(/\D/g, '');
        if (cep != "") {
        var validarcep = /^[0-9]{8}$/;
    
            if (validarcep.test(cep)) {
    
                document.getElementById('cep').value = cep.substring(0, 5)
                    + "-"
                    + cep.substring(5);
    
                document.getElementById('rua').value = "...";
                document.getElementById('bairro').value = "...";
                document.getElementById('cidade').value = "...";
                document.getElementById('uf').value = "...";

                var script = document.createElement('script');
                script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';
                document.body.appendChild(script);
            } 
            else {             
                alert("CEP invalido.");
                }
            }
        }

        function meu_callback(conteudo) { //Função que realiza o callback do CEP
            if (!("erro" in conteudo)) {
                document.getElementById('rua').value = (conteudo.logradouro);
                document.getElementById('bairro').value = (conteudo.bairro);
                document.getElementById('cidade').value = (conteudo.localidade);
                document.getElementById('uf').value = (conteudo.uf);
    
            } else {
                alert("CEP não encontrado, favor digitar seu endereço completo");
                document.getElementById('rua').disabled = false;
                document.getElementById('bairro').disabled = false;
                document.getElementById('cidade').disabled = false;
                document.getElementById('uf').disabled = false;

                document.getElementById('rua').focus();

                
                
                

            }
        }