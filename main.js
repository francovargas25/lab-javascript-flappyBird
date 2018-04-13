//se tiene que crear una cariable para jalar el canvas del html
var canvas = document.getElementById('mainGame')
var ctx = canvas.getContext('2d')


/*classes
    tengo que crear una clase de tipo fondo, Board funciona bien para poner scores etc
    para identificar que es una clase, hay que ponerlo en MAYUSCULA

    this son variables que pueden ser accesadas desde afuera
    hay variables privadas, "var _bliss=..." que no son accesibles desde afuera*/

function Board(){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height= canvas.height;
    //PONER ATENCION A TODO EL PROCESO DE LA IMAGEN, ABAJO:
    this.img = new Image();//image es instancia de la clase img
    this.img.src = "http://ellisonleao.github.io/clumsy-bird/data/img/bg.png";
    this.score = 0;
    this.img.onload = function(){
        this.draw();
    }.bind(this);//esta funcion se le esta dando a .onload, por eso es necesario el .bind
    
    this.move= function(){
        this.x--;
        if(this.x < -canvas.width) this.x = 0; //se tiene que que poner un - a canvas para aclarar que hablar de su parte negativa
}


    //metodo principal de cualquier clase, que se dibuje asi misma=
    this.draw = function (){
        this.move();
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);//esto se asi asi porque si cambia algo, no hace falta que se cambie en el dibujo
        ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height); //se tiene que agregar una segunda imagen para darle efecto de movimiento infinito i si posicion en x tiene que ser la misma + lo ancho del canvas, asi es como se mueve hasta el final del canvas
        ctx.font = "50px Avenir"
        ctx.fillStyle = "orange";
        ctx.fillText(this.score, canvas.width/2,this.y+50);

    }
}           //END OF BOARD CLASS
    

     //Flappy
function Flappy(){
    this.x = 150;
    this.y=150;
    this.width = 50;
    this.height= 50;
    this.img = new Image();
    this.img.src= "https://lh3.googleusercontent.com/k6c5BYhnp-C9e3tROiI9twKZp6bYKLPtR06V4jZ8KnsrkpDTMAF4duTtTTh0eq4uIPSiYfzw-_68ELOn_71c7g=s400"
    
    this.img.onload = function(){
        this.draw();
    }.bind(this);
    this.draw = function(){
        this.y += 1; //cada que flappy se redibuje con updare, va a estar mas abajo para dar efecto de gravedad
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    this.move= function(){
        this.y -= 50;
    }
}           //END OF FLAPPY CLASS



//DECLARACIONES.... minuscula = objeto, mayuscula = clase (board vs Board)
var board = new Board();
var flappy = new Flappy();

var intervalo; //queda como undefined
var frames = 0; //esta variable exioste para contar cuantas veces se ha ejecutado



//MAIN FUNCTIONS  , 
    //update es lo que pide que se ejecute
function update(){
    frames++;
    console.log(frames);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    board.draw(); //update borra y pide al tablero que se vuelva a dinbujar, sin eso al oprimir el boton start todo se borra, tiene que ir encima de fkappy para que se cargue primero, queda como la base
    flappy.draw();
}
function start() {
    //si ya esta corriendo, return
    if(intervalo > 0)return;//para que el fondo no se acelere, ver en function stop
    //extras que necesitemos inicializar
    intervalo = setInterval(function(){
        update();
    },1000/60) //se recomienda velociddad 1000sobre60fps, este intervalo llama al uodate       
}

function stop(){
    clearInterval(intervalo);
    intervalo = 0; //para que el fondo no se acelere, ver en function start
}


//listeners (observadores), todo a lo que le puedes dar click y ejecuta algo

        //comienza el juego
document.getElementById('startButton').addEventListener("click", start);//esto nos ahorra codigo, se puede agregar funcion anonima
document.getElementById('pauseButton').addEventListener("click",function(){
    stop()
});
addEventListener('keydown',function(e){
    if(e.keyCode === 32){
        flappy.move();
    }
})
