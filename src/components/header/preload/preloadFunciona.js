const preloadFuncional = () => {
    let preload = document.querySelector(".loading");  
    setTimeout(function(){
        preload.classList.add("cerrar");
        preload.style.zIndex=0;
        preload.style.display = "none"
    },4000)
}

export default preloadFuncional;