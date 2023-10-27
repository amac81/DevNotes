// seleccionar elementos
const exportNotesButton = document.querySelector("#export-notes-btn");
const notesContainer = document.querySelector("#notes-container");

const noteInput = document.querySelector("#note-content");
const addNoteBtn = document.querySelector("#add-note-btn");

// Funções
const addNote = () => {
    const noteObj = {
        id: generateId(),
        content: noteInput.value,
        fixed: false,
    };

    const noteElement = noteElementCreate(noteObj.id, noteObj.content);
    notesContainer.appendChild(noteElement);
}

const generateId = () => {
    return Math.floor(Math.random() * 5000);
}

const noteElementCreate = (id, content, fixed) => {
    const elem = document.createElement("div");
    elem.classList.add("note");
    const textArea = document.createElement("textarea");
    textArea.value = content;
    textArea.placeholder = "Adicione texto...";
    elem.appendChild(textArea);
    
    return elem;
};

// Eventos

exportNotesButton.addEventListener("click", (e) => {
    e.preventDefault();
});


//Note item buttons click event
document.addEventListener("click", (elem) => {
    const targetElement = elem.target;
    const parentElement = targetElement.closest("div");
    
    if(parentElement){
        if(parentElement.classList.contains("note") &&targetElement.classList.contains("bi-pin") ) {
            console.log(parentElement)
            parentElement.classList.toggle("fixed");
        }
    }

    //if(parentElement.classList.contains("fixed")) {
        //toggleNote();
        
    //}

});


addNoteBtn.addEventListener("click", () => addNote());