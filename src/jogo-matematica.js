
var num1 = 0;
var num2 = 0;
var cont = 1;

const btnContinue = document.getElementById("icontinue");
btnContinue.style.display = "none";

//Gera dois número aleatório de 0 a 10.
function geraNum() {

    num1 = parseInt(Math.random() * 10);
    num2 = parseInt(Math.random() * 10);

    document.getElementById("num1").innerHTML = num1;
    document.getElementById("num2").innerHTML = num2;

}

geraNum();

//Ação ao confirmar a resposta.
btnConfimar = document.getElementById("iconfirm");

btnConfimar.addEventListener("click", function () {

    var calculo = num1 + num2;
    var resposta = document.getElementById("resposta").value;


    if (calculo == resposta) {

        document.getElementById("pontos").innerHTML = `Acertos: ${cont}`;
        document.getElementById("resultado").innerHTML = `Parabéns! Você acertou`;

        if (cont < 5) {

            btnContinue.style.display = "block";
            btnContinue.addEventListener("click", function () {

                geraNum();
                document.getElementById("resposta").value = "";
                document.getElementById("resultado").innerHTML = "";
                btnContinue.style.display = "none";
            });


            cont++;


        }

        else
            document.getElementById("resultado").innerHTML = "Próxima fase";

    }

    else{

        document.getElementById("resultado").innerHTML = "Tente mais uma vez.";
        document.getElementById("resposta").value = "";

    }



});