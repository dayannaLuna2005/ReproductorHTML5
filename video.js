function iniciar(){
	maximo = 400;

	medio = getElement('medio')
	reproducir = getElement('reproducir')//document.getElementById('reproducir');
	barra = getElement('barra');
	progreso = getElement('progreso');
	mascara = getElement('mascara');
	porcentaje = getElement('porcentaje');
	volumen = getElement('volumen');

	logo = getElement('logo');

	//reproducir.addEventListener('click', presionar, false);

	addEvento(reproducir,'click', presionar);
	addEvento(barra,'click', mover);
	addEvento(medio, 'click', presionar);
	addEvento(mascara, 'click', presionar);
	addEvento(document, 'keydown', teclaPre);
	addEvento(volumen,'click', changeVolumen);
}

function addEvento(e,t,f){
	e.addEventListener(t,f,false);
}

function changeVolumen(){
	medio.volume=volumen.value;
}


function getElement(e){
	return document.getElementById(e);
}

function teclaPre(e){
	tecla=e.keyCode;
	if(tecla==80){
		presionar();
	}

	if(tecla==37){
		moverdos(-10);
	}
	
	if(tecla==39){
		moverdos(10);
	}
}

function presionar(){
	if(!medio.paused && !medio.ended){
		medio.pause();
		reproducir.innerHTML='Reproducir';
		mascara.style.display='block';
		window.clearInterval(bucle);
	}
	else{
		medio.play();
		mascara.style.display='none';
		reproducir.innerHTML='Pausa';
		bucle=setInterval(estado, 1000);
	}
}


function estado(){
	if(!medio.ended){
		var total=parseInt(medio.currentTime*maximo/medio.duration);
		progreso.style.width=total+'px';
		aprox=total*100/maximo;
		real=parseInt(aprox)+1;
		porcentaje.innerHTML=real+'%';
	}
	else
	{
		progreso.style.width='0px';
		reproducir.innerHTML='Reproducir';
		porcentaje.innerHTML='0%';
		mascara.style.display='block';
		window.clearInterval(bucle);
	}
}

function moverdos(n){
	if(!medio.paused && !medio.ended){
		
		var total=parseInt(medio.currentTime*maximo/medio.duration)+n;
		var nuevoTiempo = total*medio.duration/maximo;

		medio.currentTime=nuevoTiempo;
		aprox=total*100/maximo;
		real=parseInt(aprox)+1;
		progreso.style.width=total+'px';
		porcentaje.innerHTML=real+'%';
	}
}

function mover(e){
	if(!medio.paused && !medio.ended){
		var ratonX=e.pageX-barra.offsetLeft;
		var nuevoTiempo=ratonX*medio.duration/maximo;

		medio.currentTime=nuevoTiempo;

		progreso.style.width=ratonX+'px';

		aprox=ratonX*100/maximo;
		real=parseInt(aprox)+1;
		porcentaje.innerHTML=real+'%';
	}
}


addEvento(window, 'load', iniciar);
