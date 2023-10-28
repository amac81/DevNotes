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
};

const generateId = () => {
    return Math.floor(Math.random() * 5000);
};

const noteElementCreate = (id, content, fixed) => {
    const elem = document.createElement("div");
    elem.classList.add("note");
    const textArea = document.createElement("textarea");
    textArea.value = content;
    textArea.placeholder = "Adicione texto...";
    elem.appendChild(textArea);
    
    return elem;
};

//https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('');

const getElementHexBgColor = (elem) => {
    let elemStyle = window.getComputedStyle(elem,"");
    let bgColor = elemStyle.getPropertyValue("background-color").trim();
    bgColor =  bgColor.replace('rgb(', '').replace(')','').split(',');

    let hexBgColor = rgbToHex(parseInt(bgColor[0]), parseInt(bgColor[1]), parseInt(bgColor[2]));
    return hexBgColor;
}

const changeNoteColor = (note) => {
    const availableColors = ["#f8eb75", "#c5f4fa", "#c6ff91", "#ffffcc", "#ffb3ff"];
   
    const bgColor = getElementHexBgColor(note).toString();
    let colorIndex = availableColors.indexOf(bgColor);
   
    if(colorIndex >= 0 && colorIndex < availableColors.length){
        colorIndex ++;

        if(colorIndex >= availableColors.length){
            colorIndex = 0;
        }
        note.style.backgroundColor = availableColors[colorIndex];
    }
};

// Eventos
exportNotesButton.addEventListener("click", (e) => {
    e.preventDefault();
});


//Note item buttons click event
document.addEventListener("click", (elem) => {
    const targetElement = elem.target;
    const parentElement = targetElement.closest("div");
    
    //bi-pin button
    if(parentElement){
        if(parentElement.classList.contains("note") &&targetElement.classList.contains("bi-pin") ) {
            parentElement.classList.toggle("fixed");
        }
    }

  //bi-palette button
  if(parentElement){
    if(parentElement.classList.contains("note") &&targetElement.classList.contains("bi-palette") ) {
        changeNoteColor(parentElement);
    }
}

});


addNoteBtn.addEventListener("click", () => addNote());