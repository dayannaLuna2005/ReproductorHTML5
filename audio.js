function iniciar(){
	maximo=600;
	medio=document.getElementById('medio');
	reproducir=document.getElementById('reproducir');
	barra=document.getElementById('barra');
	progreso=document.getElementById('progreso');
	mascara=document.getElementById('mascara');
	porcentaje=document.getElementById('porcentaje');

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

window.addEventListener('load',iniciar, false)
