// seleccionar elementos
const exportNotesButton = document.querySelector("#export-notes-btn");
const notesContainer = document.querySelector("#notes-container");

const noteInput = document.querySelector("#note-content");
const addNoteBtn = document.querySelector("#add-note-btn");

// Funções
const addNote = () => {
    const noteObj = {
        id: generateId(),
        color: "#ffffcc",
        content: noteInput.value,
        fixed: false,
    };

    noteElementCreate(noteObj.id, noteObj.color, noteObj.content, false, true);    
};

const generateId = () => {
    return Math.floor(Math.random() * 5000);
};

const noteElementCreate = (id, color, content, fixed = false, save = false) => {
    //it possible to create empty content notes

    const elem = document.createElement("div");
    elem.setAttribute("id", id);

    elem.style.backgroundColor = color;
    elem.classList.add("note");
    const textArea = document.createElement("textarea");
    textArea.setAttribute("id", "ta"+id);

    textArea.value = content;
    textArea.placeholder = "Adicione texto...";
    elem.appendChild(textArea);

    //icons
    const pinIcon = document.createElement("i");
    pinIcon.classList.add("bi","bi-pin");
    elem.appendChild(pinIcon);

    const paletteIcon = document.createElement("i");
    paletteIcon.classList.add("bi","bi-palette");
    elem.appendChild(paletteIcon);

    const fileEarmarkPlusIcon = document.createElement("i");
    fileEarmarkPlusIcon.classList.add("bi","bi-file-earmark-plus");
    elem.appendChild(fileEarmarkPlusIcon);
    
    const trashIcon = document.createElement("i");
    trashIcon.classList.add("bi","bi-trash");
    elem.appendChild(trashIcon);

    // Local Storage data
    if(fixed) {
        elem.classList.add("fixed")
    }
    
    //note.id, note.color, note.content, note.fixed, false);
    if(save) {
        addNoteToContainerAndLocalStorage({id: id, color: color, content: content, fixed: fixed})
    }
    
    notesContainer.appendChild(elem);
    
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

const loadFromLocalStorage  = ()=> {
    const allNotes = getAllNotesFromLocalStorage();

    allNotes.forEach((note) => {
        noteElementCreate(note.id, note.color, note.content, note.fixed, false);
    });
};

// Local Storage
const getAllNotesFromLocalStorage = () => {
    const allNotes = JSON.parse(localStorage.getItem("allNotes") ) || [];
    return allNotes;
}

const addNoteToContainerAndLocalStorage = (note) => {
    const allNotes = getAllNotesFromLocalStorage();
    allNotes.push(note);
    localStorage.setItem("allNotes", JSON.stringify(allNotes));
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


// Inicialization
loadFromLocalStorage();
