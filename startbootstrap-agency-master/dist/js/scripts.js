window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }
    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Função para codificar a mensagem usando a Cifra de César
    function cifraDeCesar(texto, deslocamento) {
        const resultado = [];
        for (let i = 0; i < texto.length; i++) {
            let char = texto[i];
            if (char.match(/[a-z]/i)) {  // Verifica se o caractere é uma letra
                const codigo = texto.charCodeAt(i);
                let novoCodigo;

                // Maiúsculas
                if (char >= 'A' && char <= 'Z') {
                    novoCodigo = ((codigo - 65 + deslocamento) % 26) + 65;
                }
                // Minúsculas
                else if (char >= 'a' && char <= 'z') {
                    novoCodigo = ((codigo - 97 + deslocamento) % 26) + 97;
                }

                resultado.push(String.fromCharCode(novoCodigo));
            } else {
                resultado.push(char);  // Se não for letra, mantém o caractere
            }
        }
        return resultado.join('');
    }

    // Função para decodificar a mensagem usando a Cifra de César
    function decodificaCesar(texto, deslocamento) {
        return cifraDeCesar(texto, -deslocamento);  // Decodifica fazendo o deslocamento negativo
    }

    // Adicionando os event listeners aos botões para codificar e decodificar
    const campoSenha = document.getElementById('campoSenha');
    const campoMensagem = document.getElementById('campoMensagem');
    const botaoCodificar = document.querySelector('.btn-outline-success');
    const botaoDecodificar = document.querySelector('.btn-outline-danger');
    const campoResult = document.getElementById('campoResult')
    const campoDeslocamento = document.getElementById('campoDeslocamento');

    botaoCodificar.addEventListener('click', () => {
        const mensagem = campoSenha.value;
        const deslocamento = parseInt(campoDeslocamento.value) || 0;
        const mensagemCodificada = cifraDeCesar(mensagem, deslocamento);
        campoResult.value = mensagemCodificada;
    });
    
    botaoDecodificar.addEventListener('click', () => {
        const mensagemCodificada = campoMensagem.value;
        const deslocamento = parseInt(campoDeslocamento.value) || 0;
        const mensagemDecodificada = decodificaCesar(mensagemCodificada, deslocamento);
        campoResult.value = mensagemDecodificada;
    });
    

});
