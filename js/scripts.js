// select elements
const exportNotesButton = document.querySelector("#export-notes-btn");
const notesContainer = document.querySelector("#notes-container");

const noteInput = document.querySelector("#note-content");
const searchInput = document.querySelector("#search-input");
const addNoteBtn = document.querySelector("#add-note-btn");

// functions
const addNote = () => {
    const notes = getNotes();

    const noteObj = {
        id: generateId(),
        color: "#ffffcc",
        content: noteInput.value,
        fixed: false,
    };

    //save to local storage
    notes.push(noteObj);
    saveNotes(notes);
    showNotes();

    const noteElemet = noteElementCreate(noteObj.id, noteObj.color, noteObj.content, false);  
    noteInput.value = ""; 
};

const generateId = () => {
    return Math.floor(Math.random() * 5000);
};

const noteElementCreate = (id, color, content, fixed = false) => {
   
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
    pinIcon.classList.add(...["bi","bi-pin"]);
    elem.appendChild(pinIcon);

    const paletteIcon = document.createElement("i");
    paletteIcon.classList.add(...["bi","bi-palette"]);
    elem.appendChild(paletteIcon);

    const fileEarmarkPlusIcon = document.createElement("i");
    fileEarmarkPlusIcon.classList.add(...["bi","bi-file-earmark-plus"]);
    elem.appendChild(fileEarmarkPlusIcon);
    
    const trashIcon = document.createElement("i");
    trashIcon.classList.add(...["bi","bi-trash"]);
    elem.appendChild(trashIcon);

    const saveIcon = document.createElement("i");
    saveIcon.classList.add(...["hide","bi","bi-save"]);
    elem.appendChild(saveIcon);


    // Local Storage data
    if(fixed) {
        elem.classList.add("fixed")
    }

    if(fixed){
        elem.classList.add("fixed");
    }

    // Element Events

    //Fixed note
    elem.querySelector(".bi-pin").addEventListener("click", () => {
        toggleFixNote(id);
    });

    //Change color
    elem.querySelector(".bi-palette").addEventListener("click", () => {
        changeNoteColor(id);
    });

    //Delete note
    elem.querySelector(".bi-trash").addEventListener("click", () => {
        deleteNote(id, elem);
    });

    //Duplicate note
    elem.querySelector(".bi-file-earmark-plus").addEventListener("click", () => {
        duplicateNote(id);
    });


    //Edit note content
    elem.querySelector("textarea").addEventListener("focus", (e) => {
        saveIcon.classList.remove("hide");
    });

    elem.querySelector("textarea").addEventListener("blur", (e) => {
        saveIcon.classList.add("hide");
        const noteContent = e.target.value;
        updateNote(id, noteContent);
    });
    
    elem.querySelector(".bi-save").addEventListener("click", () => {
        saveIcon.classList.add("hide");
        const noteContent = elem.querySelector("textarea").value;
        updateNote(id, noteContent);
    });

    return elem;
    
};

const toggleFixNote = (id) => {
    const allNotes = getNotes();
    const targetNote = allNotes.filter((note) => note.id === id)[0];
    targetNote.fixed = !targetNote.fixed;
    
    saveNotes(allNotes);
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

const changeNoteColor = (id) => {
    const allNotes = getNotes();
    const targetNote = allNotes.filter((note) => note.id === id)[0];

    const availableColors = ["#f8eb75", "#c5f4fa", "#c6ff91", "#ffffcc", "#ffb3ff"];
    let colorIndex = availableColors.indexOf(targetNote.color);
   
    if(colorIndex >= 0 && colorIndex < availableColors.length){
        colorIndex ++;

        if(colorIndex >= availableColors.length){
            colorIndex = 0;
        }
        
        targetNote.color = availableColors[colorIndex];
        saveNotes(allNotes);
    }
};  

const deleteNote = (id, elem) => {
    const notesToKeep = getNotes().filter((note) => note.id != id);
    
    //remove from DOM
    notesContainer.removeChild(elem);

    saveNotes(notesToKeep);
};  

const duplicateNote = (id) => {
    const allNotes = getNotes();
    const originalNote = allNotes.filter((note) => note.id === id)[0];
   
    const noteObj = {
        id: generateId(),
        color: originalNote.color,
        content: originalNote.content,
        fixed: false,
    };

    allNotes.push(noteObj);
    saveNotes(allNotes);

    const noteElemet = noteElementCreate(generateId(), originalNote.color, originalNote.content, false);  
};  

const updateNote = (id, newContent) => {
    const allNotes = getNotes();
    const targetNote = allNotes.filter((note) => note.id === id)[0];
    targetNote.content = newContent;

    saveNotes(allNotes);   
};

const cleanNotesContainer = () => {
    notesContainer.replaceChildren([]);
}

// Local Storage

const showNotes  = ()=> {

    cleanNotesContainer();
    const allNotes = getNotes();

    allNotes.forEach((note) => {
       // let fixed = note.fixed === "true" ? true : false; 
        const noteElemet = noteElementCreate(note.id, note.color, note.content, note.fixed, false);

        notesContainer.appendChild(noteElemet);
    });
};

const getNotes = () => {
   const allNotes = JSON.parse(localStorage.getItem("allNotes") ) || [];

   const sortedNotes = allNotes.sort((n1, n2) => (n1.fixed > n2.fixed ? -1 : 1));

   return sortedNotes;
}

const addNoteToContainerAndLocalStorage = (note) => {
    const allNotes = getNotes();
    allNotes.push(note);
    localStorage.setItem("allNotes", JSON.stringify(allNotes));
};

const saveNotes  = (notes) => {

    //replace local storage key allNotes with the allNotes changed
    localStorage.setItem("allNotes", JSON.stringify(notes));
    showNotes();
   
 };

 const searchNotes = (textToSeach) => {
    const filteredNotes = getNotes().filter((note) => {
        const text = note.content.toLowerCase();
        return text.includes(textToSeach.toLowerCase());
    }); 
    
    if(textToSeach !== "") {
        cleanNotesContainer();
        filteredNotes.forEach((note) => {
            const noteElemet = noteElementCreate(note.id, note.color, note.content, note.fixed);  
            notesContainer.appendChild(noteElemet);
        });
        
        return;
    }

    cleanNotesContainer();
    showNotes();
};


// Events
exportNotesButton.addEventListener("click", (e) => {
    e.preventDefault();
});

addNoteBtn.addEventListener("click", () => addNote());

searchInput.addEventListener("keyup", (e) => {
    const textToSeach = e.target.value;
    searchNotes(textToSeach);    
});


// Inicialization
showNotes();


