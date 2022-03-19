// showing notes from localStorage
showNotes();

// adding note added by user to localStorage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    if (addTxt.value.length == 0) {
        alert('Please write something before adding');
    } else {
        notesObj.push(addTxt.value);
    };
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = '';
    showNotes();
});

// function to show notes in the 'your notes' section
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    };
    let html = '';
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard card m-4" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title"><b>Note ${index + 1}</b></h5>
                <p class="card-text">${element}</p>
                <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-dark">Delete Note</button>
            </div>
        </div>`;
    })
    let notesElm = document.getElementById('notes');
    if (notesObj.length == 0) {
        notesElm.innerHTML = `You don't have any at this moment!`;
    } else {
        notesElm.innerHTML = html;
    };
};

// function to delete a note
function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    notesObj = JSON.parse(notes);
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
};

// making search functionality
let searchBox = document.getElementById('searchBox');
searchBox.addEventListener('input', function () {
    let inputVal = searchBox.value.toLowerCase();
    let noteCard = document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText.toLowerCase();
        if (cardTxt.includes(inputVal)) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
});

// preventing enter key to search in searchbox
$(document).on("keydown", "form", function(event) { 
    return event.key != "Enter";
});