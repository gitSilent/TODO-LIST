
divTodo = document.querySelector('.todo');
let nowDay, nowMonth, nowYear, nowDayOfWeek;

function addClockDiv(){

    divClock = document.querySelector('.divClock');

    divHours = document.createElement("div");
    divHours.classList.add(`divHours`);
    divClock.append(divHours);

    divDots = document.createElement("div");
    divDots.setAttribute('id',"divDots")
    divClock.append(divDots);
    divDots.textContent = ":"

    divMinutes = document.createElement("div");
    divMinutes.classList.add(`divMinutes`);
    divClock.append(divMinutes);

    divDay = document.createElement("div");
    divDay.classList.add(`divDay`);
    divClock.append(divDay);

    

    startClock();
}


function updateTime(){
    if (timeNow.getHours()<10){divHours.textContent = ` 0${timeNow.getHours()}`;}
    else {divHours.textContent = timeNow.getHours()}
    if (timeNow.getMinutes()<10){divMinutes.textContent = ` 0${timeNow.getMinutes()}`;}
    else{divMinutes.textContent = timeNow.getMinutes()}
}

function startClock(){
    timeNow = new Date();
    updateTime();
    setInterval(()=>{
        timeNow = new Date
        updateTime();
        divDots.classList.toggle('divDots')
    },1000);
}

function detectDay(){
    now = new Date();
    month = ["января","февраля", "марта","апреля","мая","июня","июля","августа","сентября","октября","декабря"];
    weekDays = ["Воскресенье","Понедельник","Вторник","Cреда","Четверг","Пятница","Суббота"];
    nowDayOfWeek = weekDays[now.getDay()];    
    nowMonth = month[now.getMonth()];
    nowYear = now.getFullYear();
    nowDay = now.getDate();
    
}

function fillDate(){
    detectDay();
    divDay.textContent = `${nowDay} ${nowMonth} ${nowYear} г `
    setInterval(()=>{
        detectDay();
        divDay.textContent = `${nowDay} ${nowMonth} ${nowYear} г `;
        console.log("date updated")
    },60000)
    
}


function createAppTitle() {
    h1 = document.createElement('h1');
    h1.classList.add('h1');
    h1.textContent = "TODO-LIST";
    divTodo.append(h1);
    
}


// function preventDefault(event){
//     event.
// }

function createTodoItemForm() {
    // form = document.createElement("form");
    // form.classList.add("input-group");
    // divTodo.append(form);

    divEnter = document.createElement("form");
    divEnter.classList.add("divEnter");
    divTodo.append(divEnter);

    input = document.createElement("input");
    input.classList.add("form-control");
    input.setAttribute('placeholder', 'Enter a new note')
    divEnter.append(input);

    divBtnAdd = document.createElement("div");
    divBtnAdd.classList.add("input-group-append");
    divEnter.append(divBtnAdd);
    
    btnAdd = document.createElement("button");
    btnAdd.classList.add("btnAdd");
    btnAdd.classList.add("btn-primary");
    divBtnAdd.append(btnAdd);
    btnAdd.textContent = 'ADD NOTE';

}


function createTodoList() {
   

    divList = document.createElement("div");
    divList.classList.add("divList");
    divTodo.append(divList);


    ul = document.createElement("ul");
    ul.classList.add("ul");
    divList.appendChild(ul);
}



function createTodoItems() {
    countNotes = countNotes + 1;

    event.preventDefault();

    li = document.createElement("li");
    li.setAttribute('id',`li`)
    li.classList.add(`divEnter${countNotes}`);
    // ul = document.querySelector('.ul');
    ul.appendChild(li);

    divNote = document.createElement("div");
    divNote.setAttribute('id',`divNote`)
    // divNote.classList.add(`divNote`);
    li.append(divNote);

    p_note = document.createElement("p");
    p_note.setAttribute('id',`p_note`) 
    p_note.classList.add(`p_note${countNotes}`);
    divNote.append(p_note);
    p_note.textContent = input.value;

    divButtons = document.createElement("div");
    divButtons.setAttribute('id',`divButtons`)
    divButtons.classList.add(`divButtons${countNotes}`);
    divNote.append(divButtons);

    buttonDone = document.createElement("button");
    buttonDone.setAttribute('id',`buttonDone`)
    buttonDone.classList.add(`buttonDone${countNotes}`);
    buttonDone.classList.add("btn-success");
    divButtons.append(buttonDone);
    buttonDone.textContent = "Done"

    buttonDelete = document.createElement("button");
    buttonDelete.setAttribute('id',`buttonDelete`)
    buttonDelete.classList.add(`buttonDelete${countNotes}`);
    buttonDelete.classList.add("btn-danger");
    divButtons.append(buttonDelete);
    buttonDelete.textContent = "Delete";

    input.value = "";

}
function confirmDel(){
    
    if(confirm("Вы действительно хотите удалить запись?")){
        return true;
    }
    else {return false}
    
}

function confirmDelAll(){
    
    if(confirm("Вы действительно хотите удалить ВСЕ записи?")){
        return true;
    }
    else {return false}
    
}

function createDeleteAll(){
    if (divTodo.querySelector('#btnDelAll') == null){
        // divDelAll = document.createElement('button');
        // divDelAll.setAttribute('id','divDelAll');
        // divDelAll.textContent = ""
        // divEnter.append(divDelAll);

        btnDelAll = document.createElement('button');
        btnDelAll.setAttribute('id','btnDelAll');
        btnDelAll.textContent = "DELETE ALL"
        btnDelAll.classList.add('btnDelAll');
        btnDelAll.classList.add('btn-danger');
        
        divList.append(btnDelAll);
        
    }
}

addClockDiv();
fillDate();
createAppTitle()
createTodoItemForm();
createTodoList();
let countNotes = 0;

divEnter.addEventListener('submit', function(e){
    e.preventDefault();
    if (input.value != ""){
    createDeleteAll();
    // console.log(event.target.className);
    createTodoItems();
    console.log(countNotes);
    }
    
    
});

divTodo.addEventListener('click', (event)=>{
    // console.log(event.target.className.indexOf('Delete'))
    if (event.target.getAttribute('id') == 'buttonDelete'){
        console.log(event.target);
        console.log(event.target.getAttribute('id'))
        if (confirmDel()) {
            event.target.closest('#li').remove();
            countNotes-=1;
            if (countNotes==0){
                btnDelAll.remove();

            }
        }
        
    }
    if(event.target.className.indexOf('buttonDone') != -1){
        (event.target.closest('#divNote')).classList.toggle('backColor');
        
    }
})

// divTodo.addEventListener('click', (event)=>{
//     console.log(event.target.className);
//     if(event.target.className.indexOf('buttonDone') != -1){
//         (event.target.closest('#divNote')).classList.toggle('backColor');
        
//     }

// })
divList.addEventListener('click', (e)=>{
    if (e.target.getAttribute('id') == "btnDelAll"){
        if(confirmDelAll()){
            for (i=0;i<countNotes;i++){
                liElem = document.getElementById('li');
                liElem.remove();
        }
        countNotes = 0;
        btnDelAll.remove();
    }
    }
})




// divTodo.addEventListener('click', (event)=>{
//     // console.log(event.target.className.indexOf('Delete'))
//     if (event.target.className == document.getElementById('#buttonDelete')){
//         console.log(event.target.getAttribute('id'));
//         event.target.closest('#li').remove();
//     }
// })

// divTodo.addEventListener('click', (event)=>{
//     // console.log(event.target.className.indexOf('Delete'))
//     if (event.target.className.indexOf('buttonDelete') != -1){
//         console.log(event.target);
//         console.log(event.target.getAttribute('id'))
//         event.target.closest('#li').remove();
//     }
// })
