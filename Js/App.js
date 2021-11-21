/* Funciones */
function PlopCards(){
    //llamamos al localStorage
    const usuarios_list= JSON.parse(localStorage.getItem('usuarios'))
    console.log(usuarios_list)
    usuarios_list.forEach ((person)=>{

    
        if(person.sexo =="Mujer"){
            imagen = `<svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-gender-female card-img-top" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5z"/>
            </svg>`
        }
        else{
            imagen = `<svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-gender-male card-img-top" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2H9.5zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
          </svg>`
        }

        let colorBtn
        let planDeSalud
        switch(person.interpretacion) {
            case 'Te encuentras en peso muy bajo':
                colorBtn='bajo'
                planDeSalud = 'plan subir de peso'
                break;
            case 'Te encuentras en peso normal':
                colorBtn='normal'
                planDeSalud = 'plan mantenimiento'
              break;
            case 'Te encuentras en obesidad leve':
                colorBtn='leve'
                planDeSalud = 'plan saludable'
              break;
            case 'Te encuentras en obesidad severa':
                colorBtn='severa'
                planDeSalud = 'plan bajo de peso'
              break;
            case 'Te encuentras en obesidad muy severa':
                colorBtn='muySevera'
                planDeSalud = 'plan de emergencia'
              break;

            default:
              // code block
          }


        contenedorCards.append(`
        <div>
        <div  id="person${person.number}" class="card"  style="width: 18rem;">
            ${imagen}
            <div  class="card-body" >
                <h5 class="card-title">${person.nombre}</h5>
                <p class="card-text">IMC: ${person.imc.toFixed(2)}</p>
                <p class="card-text">sexo: ${person.sexo}</p>
                <p class="card-text">peso: ${person.peso} kg</p>
                <p class="card-text">talla: ${person.talla} m</p>
                <p class="card-text">${person.interpretacion}</p>
                <a href="#" class="btn btn-${colorBtn}">${planDeSalud}</a>
            </div>
        </div>
        </div>`)
        
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
        this.imc=0
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
            this.interpretacion='Te encuentras en peso muy bajo'
        }
        else if(this.imc>=this.bajopeso && this.imc<this.normal){
            this.interpretacion='Te encuentras en peso normal'
        }
        else if(this.imc>=this.normal && this.imc<this.obesidadleve){
            this.interpretacion='Te encuentras en obesidad leve'
        }
        else if(this.imc>=this.obesidadleve && this.imc<this.obesidadsevera){
            this.interpretacion='Te encuentras en obesidad severa'
        }
        else if(this.imc>=this.obesidadmuysevera){
            this.interpretacion='Te encuentras en obesidad muy severa'
        }
    }
}


/* MAIN */   

/* SELECTORES */
let contado =1
let usuarios =[]

const modalContainer = $('#modal-container')
const btnComenzar= $('#btnComenzar')
const btnAddUsers=$('#btnAddUsers')
const btnCancel= $('#btnCancel')
const Integrantes =$('#Integrantes')
const formUser=$('#form-user')
const btnCancelled= $('#btnCancelled')
const form =$('#form-user')
const UsersTitle= $('#UsersTitle')
const selector= $('#floatingSelect')
const contenedorCards= $('#cards-container')
const containerMain= $('#main')
const body = $('body')




/* EVENTOS */
btnComenzar.click( ( ) => {
    modalContainer.toggleClass("item-active")
    clearInterval(respiracion)
})

btnCancel.click(( ) => {
    modalContainer.toggleClass("item-active")
    Integrantes.fadeIn("slow")
})

btnAddUsers.click( ( ) => {

    if(parseInt(selector.val())!=0) {
    Integrantes.toggleClass("item-inactive")
    formUser.removeClass("item-inactive")
    formUser.addClass("item-active")

    Toastify({
        text: `Excelente 😄`,
        duration: 3000,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
      }).showToast()
    }
    else{
        Toastify({
            text: `Selecciona un número válido ❌`,
            duration: 3000,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))",
            }
          }).showToast()
    }
})

btnCancelled.click( ( ) => {
    modalContainer.toggleClass("item-active")
    Integrantes.toggleClass("item-inactive")
    formUser.removeClass("item-active")
    formUser.addClass("item-inactive")
    
    usuarios=[]
    contado=1
    UsersTitle.text(`Creando Usuario 1`)
}) 

form.on ('submit', (event) => {
    const nombre= inputNombre.value 
    const peso = inputkg.value
    const talla= inputTalla.value
    const sexo =inputSexo.value
    event.preventDefault()

    if (nombre!= '' && peso!= '' && talla!= '' && sexo!= '0') {
        
        const User= new users(contado, sexo, nombre,peso,talla)
        usuarios.push(User)

        contado = contado + 1
        UsersTitle.text(`Creando Usuario ${contado}`)
        console.log("presionado")

        localStorage.setItem('usuarios',JSON.stringify(usuarios))

        Toastify({
            text: `Usuario registrado 😄`,
            duration: 3000,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
          }).showToast()


        if (parseInt(selector.val()) < contado){
            modalContainer.toggleClass("item-active")
            Integrantes.toggleClass("item-inactive")
            formUser.removeClass("item-active")
            formUser.addClass("item-inactive")

            PlopCards()
            containerMain.toggleClass("item-inactive")
        
            Toastify({
                text: `Resultados rápidos de salud   🤩`,
                duration: 5000,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
              }).showToast()    
        
              body.css({
                  "box-shadow":"none"
              })  
        
        }
        form.trigger("reset")
    

    }
    else {
        Toastify({
            text: `Complete los campos correctamente ❌`,
            duration: 3000,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))",
            }
          }).showToast()
    }

})



// ANIMACIONES
let respiracion =setInterval(() => {
    containerMain.animate({
        'padding': "70px",
        'opacity': "0.4"
        },3000, () => {
        containerMain.animate({
        'padding': "20px",
        'opacity': "1"
        },2000,
        console.log("gaaa"))})
        $("#respira").fadeOut(25000)
},7000)

