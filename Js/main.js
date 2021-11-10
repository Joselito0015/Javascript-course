/* Variables Globales */
var alertaUsuario=''
var miembrosFamilia
var list =[]
var  aux

/* Clases */
class user{
    constructor (number)
    {   this.number=number
        this.sexo=prompt('Usuario ' + this.number + ':\nCuál es su sexo?\nhombre: H \nmujer: M')
        this.nombre= prompt('Usuario ' + this.number + ':\nCual es tu nombre? :)')
        this.peso=prompt('Usuario ' + this.number + ':\nPeso en kilogramos: \nejmp: 58')
        this.talla=prompt('Usuario ' + this.number + ':\nCual es tu talla en metros?\nejemp:1.80')
        this.determinarPuntosCriticos()
    }
    
    /* Métodos */
    calcularImc(){
        this.imc= this.peso/Math.pow(this.talla,2)
    }

    determinarPuntosCriticos(){ 
        if (this.sexo=="M"){
            this.bajopeso = 20
            this.normal = 23.9
            this.obesidadleve = 28.9
            this.obesidadsevera = 37
            this.obesidadmuysevera = 37
        }
        else if (this.sexo=="H"){
            this.bajopeso = 20
            this.normal = 24.9
            this.obesidadleve = 29.9
            this.obesidadsevera = 40
            this.obesidadmuysevera = 40
        }
    }

    interpretacionIMC(){

        if(this.imc<this.bajopeso){
            alert('Usuario ' + this.number + ':\nLa interpretación de tu imc: Te encuentras en peso muy bajo para tu sexo ' + this.sexo)
        }
        else if(this.imc>=this.bajopeso && this.imc<this.normal){
            alert('Usuario ' + this.number + ':\nLa interpretación de tu imc: Te encuentras en peso normal para tu sexo ' + this.sexo)
        }
        else if(this.imc>=this.normal && this.imc<this.obesidadleve){
            alert('Usuario ' + this.number + ':\nLa interpretación de tu imc: Te encuentras en obesidad leve para tu sexo ' + this.sexo)
        }
        else if(this.imc>=this.obesidadleve && this.imc<this.obesidadsevera){
            alert('Usuario ' + this.number + ':\nLa interpretación de tu imc: Te encuentras en obesidad severa para tu sexo '+ this.sexo)
        }
        else if(this.imc>=this.obesidadmuysevera){
            alert('Usuario ' + this.number + ':\nLa interpretación de tu imc: Te encuentras en obesidad muy severa para tu sexo '+ this.sexo)
        }
    }

    saludo(){
        alert('Usuario ' + this.number + ':\nHola! Vamos a pedirte unos datos para calcular tu indice de masa corporal')
    }


    GenerarAlerta(){
        aux='Usuario ' + this.number + ':\n'+ this.nombre+ ", tu índice de masa corporal es: " + this.imc.toFixed(2)
        alertaUsuario=alertaUsuario + '\n' + aux + '\n'
        alert(alertaUsuario)
        console.log(this.nombre + " : " + this.imc.toFixed(2))
    }    

}

/* Funciones */
function datosDeFamilia(){
    miembrosFamilia = prompt("Cuidamos a tu familia ¿Cuantos miembros son en tu familia?")
}

/* Desafio funciones relacionales */
function ConsultarPlanNutriconal(){
    respuesta=prompt("Desea comprar uno de nuestros planes nutricionales\nSí =1\nNo =0")
    return respuesta
}

function ConsultarOpcion(){
    opcion=prompt("Paquete Premium = 1\nPaquete Platinum = 2\nPaquete Lite =3")
    return opcion
}

function calcularPlanNutricional(respuesta,opcion){

    if (respuesta== "1"){
        alert("No te fallaremos, haremos todo lo posible por ayudar a tu salud :D")
        
        if (opcion=="1"){
            subtotal= miembrosFamilia*450
            total= subtotal * 0.92 //taxes
            total
        }
        else if (opcion=="2"){
            subtotal= miembrosFamilia*150
            total= subtotal * 0.92 //taxes
            total
        }
        else if (opcion=="3"){
            subtotal= miembrosFamilia*100
            total= subtotal * 0.92 //taxes
            total
        }

        alert("El paquete tiene un costo total de " + total +" USD para proteger a toda tu familia")
    }
    else {
        alert("Esperamos verte pronto!")
    }
}


/* ---- MAIN ----*/
datosDeFamilia()
for (var i=1; i<=miembrosFamilia;i++){
    //Se cabió el diccionario por una lista de objetos --> Desafío
    list[i] =  new user(i);
    list[i].calcularImc()
    list[i].GenerarAlerta()
    list[i].interpretacionIMC()    
    console.log(list[i])
}

//Ordenamos el array personas por medio de su IMC calculado

console.log(list.length)
list.sort((a,b) => a.imc-b.imc);


//Mostramos  todos los usuarios ordenados  en la consola desde la persona más saludable a la menos saludable ---> Desafío complementario
for (var i=0; i<=miembrosFamilia-1;i++){ 
    console.log(list[i])
    
}

if (ConsultarPlanNutriconal!= "0"){
    calcularPlanNutricional(ConsultarPlanNutriconal(),ConsultarOpcion())
} 

//Creamos las tarjetas automáticamente 

let contenedorPersonas = document.getElementById("contenedorPersonas")
let imagen
list.forEach ((person)=>{
    const div =document.createElement("div")
    div.id = `person${person.number}`

    if(person.sexo =="H"){
        imagen = `<svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-gender-female" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5z"/>
        </svg>`
    }
    else{
        imagen = `<svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-gender-male card-img-top" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2H9.5zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
      </svg>`
    }

    div.innerHTML = `
        <div class="card" >
            ${imagen}
            <div class="card-body">
                <h5 class="card-title">${person.nombre}</h5>
                <p class="card-text">IMC: ${person.imc.toFixed(2)}</p>
                <p class="card-text">sexo: ${person.sexo}</p>
                <p class="card-text">peso: ${person.peso} kg</p>
                <p class="card-text">talla: ${person.talla} m</p>
                <a href="#" class="btn btn-primary">Agregar plan de salud</a>
            </div>
        </div>
    `
    contenedorPersonas.append(div)
})




    
