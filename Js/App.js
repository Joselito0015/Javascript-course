/* Funciones */
function PlopCards(){
    usuarios.forEach ((person)=>{
        const div =document.createElement("div")
        div.id = `person${person.number}`
    
        if(person.sexo =="Hombre"){
            imagen = `<svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-gender-female card-img-top" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5z"/>
            </svg>`
        }
        else{
            imagen = `<svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-gender-male card-img-top" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2H9.5zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
          </svg>`
        }
    
        div.innerHTML = `
            <div class="card"  style="width: 18rem;">
                ${imagen}
                <div class="card-body" >
                    <h5 class="card-title">${person.nombre}</h5>
                    <p class="card-text">IMC: ${person.imc.toFixed(2)}</p>
                    <p class="card-text">sexo: ${person.sexo}</p>
                    <p class="card-text">peso: ${person.peso} kg</p>
                    <p class="card-text">talla: ${person.talla} m</p>
                    <a href="#" class="btn btn-primary">Agregar plan de salud</a>
                </div>
            </div>`
        contenedorCards.append(div)
    })
} 


/* CLASES */
class users{
    constructor (Numero,Sexo,Nombre,Peso,Talla)
    {   this.number=Numero
        this.sexo=Sexo
        this.nombre= Nombre
        this.peso= Peso
        this.talla= Talla
        this.determinarPuntosCriticos()
        this.calcularImc()
        this.interpretacionIMC()
    }
    
    /* Métodos */
     calcularImc(){
        this.imc= this.peso/Math.pow(this.talla,2)
    }

    determinarPuntosCriticos(){ 
        if (this.sexo=="Mujer"){
            this.bajopeso = 20
            this.normal = 23.9
            this.obesidadleve = 28.9
            this.obesidadsevera = 37
            this.obesidadmuysevera = 37
        }
        else if (this.sexo=="Hombre"){
            this.bajopeso = 20
            this.normal = 24.9
            this.obesidadleve = 29.9
            this.obesidadsevera = 40
            this.obesidadmuysevera = 40
        }
    }

    interpretacionIMC(){

        if(this.imc<this.bajopeso){
            this.interpretacion='Te encuentras en peso muy bajo para tu sexo'
        }
        else if(this.imc>=this.bajopeso && this.imc<this.normal){
            this.interpretacion='Te encuentras en peso normal para tu sexo'
        }
        else if(this.imc>=this.normal && this.imc<this.obesidadleve){
            this.interpretacion='Te encuentras en obesidad leve para tu sexo'
        }
        else if(this.imc>=this.obesidadleve && this.imc<this.obesidadsevera){
            this.interpretacion='Te encuentras en obesidad severa para tu sexo'
        }
        else if(this.imc>=this.obesidadmuysevera){
            athis.interpretacion='Te encuentras en obesidad muy severa para tu sexo'
        }
    }
}




/* MAIN */

var contado =1
var usuarios =[]

const modalContainer = document.getElementById('modal-container')
const btnComenzar= document.getElementById('btnComenzar')
const btnAddUsers=document.getElementById('btnAddUsers')
const btnCancel= document.getElementById('btnCancel')
const Integrantes =document.getElementById('Integrantes')
const formUser=document.getElementById('form-user')
const btnCancelled= document.getElementById('btnCancelled')
const form =document.getElementById('form-user')
const UsersTitle= document.getElementById('UsersTitle')
const selector= document.getElementById('floatingSelect')
const contenedorCards= document.getElementById('cards-container')
const containerMain= document.getElementById('main')



/* EVENTOS */
btnComenzar.addEventListener('click', ( ) => {
    modalContainer.classList.toggle("item-active")
   
    console.log("gaa")
})

btnCancel.addEventListener('click', ( ) => {
    modalContainer.classList.toggle("item-active")
    
})

btnAddUsers.addEventListener('click', ( ) => {
    Integrantes.classList.toggle("item-inactive")
    formUser.classList.remove("item-inactive")
    formUser.classList.add("item-active")
})

btnCancelled.addEventListener('click', ( ) => {
    modalContainer.classList.toggle("item-active")
    Integrantes.classList.toggle("item-inactive")
    formUser.classList.remove("item-active")
    formUser.classList.add("item-inactive")

    usuarios=[]
    contado=1
    UsersTitle.textContent = `Creando Usuario 1`
}) 

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const nombre= inputNombre.value 
    const peso = inputkg.value
    const talla= inputTalla.value
    const sexo =inputSexo.value

    const User= new users(contado, sexo, nombre,peso,talla)
    usuarios.push(User)

    contado = contado + 1
    UsersTitle.textContent = `Creando Usuario ${contado}`
    console.log("presionado")
    
    localStorage.setItem('usuarios',JSON.stringify(usuarios))
    
    if (parseInt(selector.value) < contado){
        modalContainer.classList.toggle("item-active")
        Integrantes.classList.toggle("item-inactive")
        formUser.classList.remove("item-active")
        formUser.classList.add("item-inactive")
        PlopCards()
        containerMain.classList.toggle("item-inactive")
    }
    form.reset()
})







