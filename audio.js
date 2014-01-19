function iniciar(){
	//cual es el tamaño maximo de la barra de progreso (600px)
	maximo=600;
	//obteniendo el reproductor
	medio=document.getElementById('medio');
	//obteniedo el boton de reproducir
	reproducir=document.getElementById('reproducir');
	//obteniendo la barra de progreso
	barra=document.getElementById('barra');
	//obteniendo el div con el progreso
	progreso=document.getElementById('progreso');
	//obteniendo la mascara que se muestra cuando el medio esta pausado
	mascara=document.getElementById('mascara');
	//obteniendo el elemento que muestra el porcentaje
	porcentaje=document.getElementById('porcentaje');

	//añadiendo evento para cuanso se realize click sobre los elementos ejecuten x funcion
	reproducir.addEventListener('click', presionar, false);
	barra.addEventListener('click', mover, false)
	medio.addEventListener('click', presionar, false);
	mascara.addEventListener('click', presionar, false);
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
		aprox=total*100/600;
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

function mover(e){
	if(!medio.paused && !medio.ended){
		var ratonX=e.pageX-barra.offsetLeft;
		var nuevoTiempo=ratonX*medio.duration/maximo;

		medio.currentTime=nuevoTiempo;

		progreso.style.width=ratonX+'px';

		aprox=ratonX*100/600;
		real=parseInt(aprox)+1;
		porcentaje.innerHTML=real+'%';
	}
}

//añadiendo evento para que se ejecute la funcion iniciar al cargar la pagina
window.addEventListener('load',iniciar, false)
