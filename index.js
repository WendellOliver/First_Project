    function validar() {

        var name=document.getElementById("name");
        var senha=document.getElementById("senha").value;
        var email=document.getElementById("email");
        var telefone=document.getElementById("telefone");
        var cep=document.getElementById("cep").value;
        var sexom=document.getElementById("sexom").checked;
        var sexof=document.getElementById("sexof").checked;
        var sexoo=document.getElementById("sexoo").checked;

        if (name.value == ""){
           alert("Favor digitar um nome!");
           name.focus(); 
           return;
        }

        if (senha.length<6){
            alert("Favor digitar uma senha com mais de 6 caracteres!");
            return;
        } else if (senha == ''){
            alert("Favor digitar a sua senha!");
            return;
        }

        if (email.value == ""){
            alert("Favor digite seu email!");
            email.focus();
            return;
        } else if (!validaremail(email.value)){
            alert("Favor digitar um email corretamente!");
            email.focus();
            return;
        }
       
        if (telefone.value == ""){
            alert("Favor digite seu numero de telefone!");
            return;
        }

        if (cep == ""){
            alert("Favor digitar o CEP!");
            cep.focus()
            return;
        }

        if (sexom == false && sexof == false && sexoo == false) {
            alert ("Favor escolha seu sexo!");
            return;
        }

    }

    function validaremail(mail){
        var emailregex=/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
        return emailregex.test(mail);

    }

    function mask(v1, v2){
        setTimeout(function() {
            var g = mtelefone(v1.value); //Chama a função para preencher a mascara para cada digito(mtelefone no caso)

            if (g != v1.value){ //Verifica se a mascara(mask) inserida se esta diferente do que o usuario digitou na tela 
                v1.value=g //Se sim , o valor do input recebe o valor que foi includo com a mascara
            }


        }

        )
    }

    function mtelefone(v){
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

    function buscacep(ncep){
        var script = document.createElement('script');
        script.src = 'https://viacep.com.br/ws/' + ncep + '/json/?callback=meu_callback'
        document.body.appendChild(script)
    }

    function meu_callback(conteudo) {
        if (!("erro" in conteudo)) {
            //Atualiza os campos com os valores.
            document.getElementById('rua').value = (conteudo.logradouro);
            document.getElementById('bairro').value = (conteudo.bairro);
            document.getElementById('cidade').value = (conteudo.localidade);
            document.getElementById('uf').value = (conteudo.uf);
        } //end if.
        else {
            //CEP não Encontrado.
            alert("CEP não encontrado.");
        }
    }