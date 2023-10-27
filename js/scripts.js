// seleccionar elementos
const exportNotesButton = document.querySelector("#export-notes-btn");
const allNotes = document.querySelector("#notes-container");


// Funções


// Eventos

exportNotesButton.addEventListener("click", (e) => {
    e.preventDefault();


});


//Note item buttons click event
document.addEventListener("click", (elem) => {
    const targetElement = elem.target;
    const parentElement = targetElement.closest("div");
    
    
    if(parentElement.classList.contains("note") &&targetElement.classList.contains("bi-pin") ) {
        console.log(parentElement)
        parentElement.classList.toggle("fixed");
    }

    //if(parentElement.classList.contains("fixed")) {
        //toggleNote();
        
    //}

});
