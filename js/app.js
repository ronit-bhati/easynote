// showing notes from localStorage
showNotes();

// adding note added by user to localStorage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTitle = document.getElementById('addTitle');
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    };
    if (addTxt.value.length == 0 || addTitle.value.length == 0) {
        alert('Please add title and description before adding');
        return false;
    } else {
        currentDate = new Date();
        let myObj = {
            title: addTitle.value,
            text: addTxt.value,
            date: currentDate.getDate(),
            month: currentDate.getMonth(),
            year: currentDate.getFullYear()
        };
        notesObj.push(myObj);
    };
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTitle.value = '';
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
                <h5 class="card-title"><span class='text-muted'>${index + 1}.</span> <b>${element.title}</b> <small>Date - ${element.date}/${element.month}/${element.year}</small></h5><hr>
                <p class="card-text">${element.text}</p>
                <button id="${index}" onclick="deleteNote(this.id)" class="btn del-btn btn-dark">Delete Note</button>
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
        let cardTitle = element.getElementsByTagName('h5')[0].innerText.toLowerCase();
        if (cardTxt.includes(inputVal) || cardTitle.includes(inputVal)) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
});

// preventing enter key to search in searchbox
$(document).on("keydown", "form", function (event) {
    return event.key != "Enter";
});