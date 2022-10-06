//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;


//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6; 

//variáveis da raquete 
let xRaquete1 = 5;
let yRaquete1 = 150;
let larguraRaquete = 7;
let alturaRaquete = 95;

// variaáveis oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeXOponente;
let velocidadeYOponente;
let chanceDeErrar = 0;

let colidiu = false;

// placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

// sons do jogo
let raquetada;
let ponto;
let trilha; 
let todosOsSons = [raquetada,trilha,ponto]

function preload() {
  
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
  
}

function setup() {
  createCanvas(600,400);
   
  noLoop();
  //loop é utilizado para deixar a música tocando sempre.
  trilha.loop();
}
function mousePressed(){
  loop();
}

function mostraBolinha(){
  circle(xBolinha,yBolinha,diametro);
}

function mostraRaquete(x,y){
  rect(x,y,larguraRaquete,alturaRaquete);
}

function draw() {
  background(10);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete1,yRaquete1);
  movimentaRaquete();
  verificaColisaoRaquete();
  colisaoRaquete(xRaquete1,yRaquete1);
  colisaoRaquete(xRaqueteOponente,yRaqueteOponente);
  mostraRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentaRaqueteOponente();
  pontuacaoJogo();
  marcaPonto();
  bolinhaNaoFicaPresa();
  barraDoMeio();
  stopTrilha();
  
}


function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha; // esse += significa que a a variavel yBolinha vai ser igual a velocidade do YBolinha + 1! 
  
}


function verificaColisaoBorda(){
    //supondo que fosse em português, teoricamente seria assim: se (bolinha tocar na borda, volte(por isso o -1) ou se o xBolinha for menor que 0 que é o menor do meu eixo X.)
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;    
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1
  }
}

function movimentaRaquete(){
  
  if (keyIsDown(UP_ARROW)){
   yRaquete1 -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
   yRaquete1 += 10;
  }
}

function verificaColisaoRaquete(){
  
  if (xBolinha - raio < xRaquete1 + larguraRaquete && yBolinha - raio < yRaquete1 + alturaRaquete && yBolinha + raio > yRaquete1) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
  
}

function colisaoRaquete(x,y) {
  
  colidiu = collideRectCircle(x, y, larguraRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente() {
  
  if (keyIsDown("87")){
   yRaqueteOponente -= 10;
  }
  if (keyIsDown("83")){
   yRaqueteOponente += 10;
  }
  
}

function pontuacaoJogo() {
  stroke(255);
  textAlign(CENTER);// para centralizar o texto.
  textSize(17); //utilizado para editar tamanho do texto
  fill(color(255,140,0))
  rect(230,10,40,20)
  fill(255)
  text(meusPontos,250,26);
  fill(color(255,140,0))
  rect(330,10,40,20)
  fill(255)
  text(pontosOponente, 350,26);
}

function marcaPonto() {
  
  if (xBolinha > 590){
    meusPontos++
    ponto.play();

  } else if (xBolinha < 10) {
    pontosOponente++
    ponto.play();

  }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha + raio < 0){
    console.log('bolinha ficou presa');
    xBolinha = 300;
    }
}
function barraDoMeio (){
  
  rect(300,0,5,400);
}


function stopTrilha(){
  if (keyIsDown(77)){
    trilha.stop();
    
   }
   
}


