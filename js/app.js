// console.log("Welcome to Notes App");
showNotes();
// showBookmark();
const monthArr = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addText = document.getElementById("addText");
  let addTitle = document.getElementById("addTitle");
  if(addText.value=="" && addTitle.value==""){
    alert("Title and Text both are empty. Fill them!");
    return;
  }
  else if(addText.value==""){
    alert("Text is empty. Fill the Text!");
    return;
  }
  else if(addTitle.value==""){
    alert("Title is empty. Fill the Title!");
    return;
  }
  let title = localStorage.getItem("title");
  let notes = localStorage.getItem("notes");
  let notesObj= [];
  if (notes != null) {
    notesObj = JSON.parse(notes);
  }
  
  if (title == null) {
    titleObj = [];
  } else {
    titleObj = JSON.parse(title);
  }
let dates=localStorage.getItem("date");
if(dates==null){
  dateObj= [];
}
else{
  dateObj= JSON.parse(dates);
}
let time= localStorage.getItem("time");
if(time==null){
  timeObj = [];
}
else{
  timeObj=JSON.parse(time);
}
let bookmarkNotes = localStorage.getItem("bookmark");
        
        if(bookmarkNotes==null){
            bookmarkNotesObj= [];
        }
        else{
            bookmarkNotesObj=JSON.parse(bookmarkNotes);
        }

    let today = new Date();
    // console.log(today);
    let timeString=today.toLocaleTimeString();
    let dateString=today.toDateString();


  notesObj.push(addText.value);
  titleObj.push(addTitle.value);
  dateObj.push(dateString);
  timeObj.push(timeString);

  localStorage.setItem("date",JSON.stringify(dateObj));
  localStorage.setItem("bookmark",JSON.stringify(bookmarkNotesObj));
  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("title", JSON.stringify(titleObj));
  localStorage.setItem("time",JSON.stringify(timeObj));
  addText.value = "";
  addTitle.value = "";
//   console.log(notesObj);
//   console.log(titleObj);
//   showBookmark();
  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  let title = localStorage.getItem("title");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  if (title == null) {
    titleObj = [];
  } else {
    titleObj = JSON.parse(title);
  }
  let dates=localStorage.getItem("date");
if(dates==null){
  dateObj= [];
}
else{
  dateObj= JSON.parse(dates);
}
let time= localStorage.getItem("time");
if(time==null){
  timeObj = [];
}
else{
  timeObj=JSON.parse(time);
}
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
               <div class=" noteCard m-2 card" style="width: 18rem;">
                    <div class="card-body">
                    <div class= "indexNum">
                      <img id="b${index}" src="img/bookmark.png" class="bookmark">
                     <p>${dateObj[index]}, ${timeObj[index]}</p>
                      <h6 class= "index-num">${index + 1}</h6>
                    </div>    
                    
                      <div class="editableDiv"  >
                       <h4 class="m-2 card-title" contentEditable = "true" onclick="editDivTitle(${index})">${titleObj[index]}</h4>
                      <hr>
                        <p class="m-2 card-text" contentEditable = "true" onclick="editDivP(${index})">${element}</p>
                        <button onclick="deleteNote(this.id)" class="m-2 btn btn-warning" id="${index}">Delete Note</button>
                      </div>
                        
                        
                    </div>
                </div>
                 `;
        
  });
  let notesElem = document.getElementById("notes");
  if (notesObj.length == 0) {
      notesElem.innerHTML = `
                            No Notes are there. Create a Note!!
                            `
  } else {
    notesElem.innerHTML = html;
  }

}

//function to delete a note

function deleteNote(index){
    // console.log("I am deleting the note",index);
    let title = localStorage.getItem("title");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
  
    if (title == null) {
      titleObj = [];
    } else {
      titleObj = JSON.parse(title);
    }
    let dates=localStorage.getItem("date");
if(dates==null){
  dateObj= [];
}
else{
  dateObj= JSON.parse(dates);
}
let time= localStorage.getItem("time");
if(time==null){
  timeObj = [];
}
else{
  timeObj=JSON.parse(time);
}
    timeObj.splice(index,1);
    localStorage.setItem("time",JSON.stringify(timeObj));
    dateObj.splice(index,1);
    localStorage.setItem("date",JSON.stringify(dateObj));
    titleObj.splice(index,1);
    localStorage.setItem("title",JSON.stringify(titleObj));
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}

//Function to implement search function
let search = document.getElementById('searchText');
search.addEventListener('input',function(){
    let inputVal = search.value.toLowerCase();

    // console.log("Input", inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardText1 = element.getElementsByTagName('p')[0].innerText.toLowerCase();
        let cardText2 = element.getElementsByTagName('h4')[0].innerText.toLowerCase();
        let cardText3 = element.getElementsByTagName('p')[1].innerText.toLowerCase();
        if(cardText1.includes(inputVal) || cardText2.includes(inputVal) || cardText3.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardText);
    })
})

// //Function to mark bookmark
// function bookmark(index1){
//     index1 = index1.substr(1);
//     let noteCards = document.getElementsByClassName('noteCard');
//     let bookmarkNotes = localStorage.getItem("bookmark");
        
//         if(bookmarkNotes==null){
//             bookmarkNotesObj= [];
//         }
//         else{
//             bookmarkNotesObj=JSON.parse(bookmarkNotes);
//         }
//     if(noteCards[index1].style.background=="white"){
        
        
//         bookmarkNotesObj.push(index1);
    
//         localStorage.setItem("bookmark",JSON.stringify(bookmarkNotesObj));
//         console.log(bookmarkNotesObj);
    
//        showBookmark();
//     }
//     else{

       
//             Array.from(bookmarkNotesObj).forEach(function(element, j){
//                 if(bookmarkNotesObj[j]==index1){
//                     bookmarkNotesObj.splice(j,1);
//                 }
    
//             })
            
//         localStorage.setItem("bookmark",JSON.stringify(bookmarkNotesObj)); 
//         console.log(bookmarkNotesObj);
//         showBookmark();
//     }
    
    
    
// }

// function showBookmark(){
//     let bookmarkNotes = localStorage.getItem("bookmark");
//     if(bookmarkNotes==null){
//         bookmarkNotesObj = [];
//     }
//     else{
//         bookmarkNotesObj=JSON.parse(bookmarkNotes);
//     }
//     let noteCards = document.getElementsByClassName('noteCard');
//     Array.from(noteCards).forEach(function(element,index){
//         let flag=0;
//         Array.from(bookmarkNotesObj).forEach(function(element1, j){
//             if(bookmarkNotesObj[j]==index){
//                 flag=1;
//                 element.style.background=`rgb(0, 255, 0)`;
//             }

//         })
//         if(flag==0){
//             element.style.background="white";
//         }
//     })
    
// }


// Editable Div


// Create a new element
let elem = document.createElement('button');
let text = document.createTextNode("Save");
elem.className="m-2 btn btn-warning";
elem.appendChild(text);

function editDivTitle(index){
    let divElem= document.getElementsByClassName("editableDiv");

    divElem[index].getElementsByTagName('h4')[0].contentEditable = "true";
    // console.log("this is editing");

    let btnid = document.getElementById(`${index}`);
    divElem[index].insertBefore(elem,btnid);

    elem.addEventListener("click",function(){
        let title = localStorage.getItem('title');
        let titleObj = JSON.parse(title);
        titleObj[index]=  divElem[index].getElementsByTagName('h4')[0].innerText;
        localStorage.setItem('title',JSON.stringify(titleObj));
        elem.remove();
    })

}

//creating a save buttton


function editDivP(index){
    let divElem= document.getElementsByClassName("editableDiv");

    divElem[index].getElementsByTagName('p')[0].contentEditable = "true";
    // console.log("this is editing");
    
    let btnid = document.getElementById(`${index}`);
    divElem[index].insertBefore(elem,btnid);
    

    elem.addEventListener("click",function(){
        let Notes = localStorage.getItem('notes');
        let notesObj = JSON.parse(Notes);
        notesObj[index]=  divElem[index].getElementsByTagName('p')[0].innerText;
        localStorage.setItem('notes',JSON.stringify(notesObj));
        elem.remove();
    })
}


// Add text to that created element

// let text;
// if (val==null){
//  text = document.createTextNode('This is my element. click to edit it');
// }
// else{
//     text = document.createTextNode(val);
// }
// divElem.appendChild(text);

// // Give element id, style and class
// divElem.setAttribute('id', 'elem');
// divElem.setAttribute('class', 'elem');
// divElem.setAttribute('style', 'border:2px solid black; width: 154px; margin: 34px; padding:23px;');

// // Grab the main container
// let container = document.querySelector('.container');
// let first = document.getElementById('myfirst');


// // Insert the element before element with id first
// container.insertBefore(divElem, first);

// console.log(divElem, container, first)

// // add event listener to the divElem
// divElem.addEventListener('click', function () {
//     let noTextAreas = document.getElementsByClassName('textarea').length;
//     if(noTextAreas ==0){
//     let html = elem.innerHTML;
//     divElem.innerHTML = ` <textarea class="textarea form-control" id="textarea" rows="3"> ${html}</textarea>`;
//     }
//     //listen for the blur event on textarea
//     let textarea = document.getElementById('textarea');
//     textarea.addEventListener('blur', function() {
//         elem.innerHTML = textarea.value;
//         localStorage.setItem('text', textarea.value);
//     })
// });

 
