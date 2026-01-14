//const --> Cria uma variável de valor fixo que não pode ser alterado após ser definido, garantindo segurança ao seu código.

function getChartTypes() { 
    const uppercase = document.querySelector("#include_uppercase").checked
    const lowercase = document.querySelector("#include_lowercase").checked
    const number = document.querySelector("#include_number").checked
    const specialCharacter = document.querySelector("#include_special_character").checked

    const charTypes = []; //Lista vazia

    if (uppercase) { //Verificação --> 0
        charTypes.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    }

    if (lowercase) { //Verificação --> 1
        charTypes.push("abcdefghijklmnopqrstuvwxyz");
    }

    if (number) { //Verificação --> 2
        charTypes.push("0123456789");
    }

    if (specialCharacter) { //Verificação --> 3
        charTypes.push("!@#$%^&*()_+-=[]{}|;:,.<>?");
    }

    return charTypes;

    }

    function getPasswordSize() { //Pegar o tamanho do input quando digitar
        const size = document.querySelector("#size").value;
        if (isNaN(size) || size < 4 || size > 128 ) {
            message("Tamanho inválido, digite um número entre 4 e 128", "danger");
        }

        return size;
    }

   function generatePassword(size, charTypes) {
    let passwordGenerate = ""; // Nome que você definiu no início
    
    const selectedChars = charTypes.join(''); 

    // 1. Primeiro: Garante um de cada tipo selecionado
    charTypes.forEach(type => { 
        passwordGenerate += type[Math.floor(Math.random() * type.length)];
    });

    // 2. Segundo: Preenche o resto até atingir o tamanho (FORA do forEach)
    while (passwordGenerate.length < size) { 
        passwordGenerate += selectedChars[Math.floor(Math.random() * selectedChars.length)];
    }

    // 3. Terceiro: Embaralha tudo e retorna o valor final
    passwordGenerate = passwordGenerate.split('').sort(() => Math.random() - 0.5).join('');

    return passwordGenerate; 
}

    function message(text, status = "success") { //Função mensagem para atribuir um texto e uma cor para alguma mensagem desejada
        Toastify({
                text: text, 
                duration: 3000, 
                style: {
                    background: status === "success" ? "#84cc16" : "#dc2626", //Operador ternário - if/else compacto para passar a cor
                    boxShadow: "none"
                }
            }).showToast();
    }

    const signature = document.querySelector("#signature"); //Exibir a mensagem "Deus é bom o tempo todo" - // Seleciona a sua assinatura

    signature.addEventListener("click", function () { // Adiciona o evento de clique
        signature.textContent = "Jesus é o único caminho" // Troca o texto atual pela sua frase

      setTimeout(() => { //nome irá voltar ao original depois de 3 segundos
        signature.textContent = "Anunciatto";
    }, 3000);

    });

    document.querySelector("#generate").addEventListener("click", function () { //Organização do console.log
        const size = getPasswordSize();
        const charTypes = getChartTypes();

        if (!size) { //Se o size for falso irá passar a mensagem
            return;
        }
    
        if (!charTypes.length) { //Se for falso irá exibir a mensagem desejada (aplicando a função message())
            message("Selecione pelo menos um tipo de caractere", "danger");
            return;
        }

        const passwordGenerate = generatePassword(size, charTypes);

        document.querySelector("#password_container").classList.add("show"); //Quando a senha for gerada já é adicionada a classe show
        document.querySelector("#password").textContent= passwordGenerate; //Enviando a senha para interface HTML do usuário, não aparece mais no console e sim na interface HTML do site.
    }); 

        document.querySelector("#copy").addEventListener("click", function () { //Adicionando o botão de copy
        navigator.clipboard.writeText(document.querySelector("#password").textContent);
        message("Senha copiada com sucesso", "success");
    }) 