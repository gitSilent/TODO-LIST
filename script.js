'use strict'
let divTodo = document.querySelector('.todo');
let nowDay, nowMonth, nowYear, nowDayOfWeek;
let p_values = [];

let timeNow = new Date();

let divHours = document.createElement("div");
let divDots = document.createElement("div");
let divMinutes = document.createElement("div");
let divDay = document.createElement("div");

let divEnter = document.createElement("form");
let input = document.createElement("input");
let divBtnAdd = document.createElement("div");
let btnAdd = document.createElement("button");
let divList = document.createElement("div");
let ul = document.createElement("ul");

let btnDelAll = document.createElement('button');


function addClockDiv(){ //добавление блока часов (часы,точки,минуты,дата)

    let divClock = document.querySelector('.divClock');

    divHours.classList.add(`divHours`);
    divClock.append(divHours);
    
    divDots.setAttribute('id',"divDots")
    divClock.append(divDots);
    divDots.textContent = ":"
   
    divMinutes.classList.add(`divMinutes`);
    divClock.append(divMinutes);
    
    divDay.classList.add(`divDay`);
    divClock.append(divDay);

    

    startClock();
}

function startClock(){ //ежесекундное обновление значений часов и мигание точек
    updateTime();
    setInterval(()=>{
        timeNow = new Date
        updateTime();
        divDots.classList.toggle('divDots')
    },1000);
}

function updateTime(){ //функция коррекции отображения значений часов
    if (timeNow.getHours()<10){divHours.textContent = ` 0${timeNow.getHours()}`;}
    else {divHours.textContent = timeNow.getHours()}
    if (timeNow.getMinutes()<10){divMinutes.textContent = ` 0${timeNow.getMinutes()}`;}
    else{divMinutes.textContent = timeNow.getMinutes()}
}



function detectDay(){ // функция определения даты и дня недели
    let now = new Date();
    let month = ["января","февраля", "марта","апреля","мая","июня","июля","августа","сентября","октября","декабря"];
    let weekDays = ["Воскресенье","Понедельник","Вторник","Cреда","Четверг","Пятница","Суббота"];
    nowDayOfWeek = weekDays[now.getDay()];    
    nowMonth = month[now.getMonth()];
    nowYear = now.getFullYear();
    nowDay = now.getDate();
    
}

function fillDate(){ // функция заполнения и обновления значений даты
    detectDay();
    divDay.textContent = `${nowDay} ${nowMonth} ${nowYear} г `
    setInterval(()=>{
        detectDay();
        divDay.textContent = `${nowDay} ${nowMonth} ${nowYear} г `;
        console.log("date updated")
    },60000)
    
}


function createAppTitle() { //создаем и возвращаем заголовок приложения
    let h1 = document.createElement('h1');
    h1.classList.add('h1');
    h1.textContent = "TODO-LIST";
    divTodo.append(h1);
    
}


function createTodoItemForm() { //создаем и возвращаем форму для создания дела 
    // form = document.createElement("form");
    // form.classList.add("input-group");
    // divTodo.append(form);

    divEnter.classList.add("divEnter");
    divTodo.append(divEnter);
    
    input.classList.add("form-control");
    input.setAttribute('placeholder', 'Enter a new note')
    divEnter.append(input);
    
    divBtnAdd.classList.add("input-group-append");
    divEnter.append(divBtnAdd);
    
    btnAdd.classList.add("btnAdd");
    btnAdd.classList.add("btn-primary");
    divBtnAdd.append(btnAdd);
    btnAdd.textContent = 'ADD NOTE';

}


function createTodoList() { //создаем и возвращаем список элементов
   
    
    divList.classList.add("divList");
    divTodo.append(divList);

    
    ul.classList.add("ul");
    divList.appendChild(ul);
}



function createTodoItems() { //создаем и возвращаем элемент списка
    countNotes = countNotes + 1;

    event.preventDefault();

    let li = document.createElement("li");
    li.setAttribute('id',`li`)
    li.classList.add(`divEnter${countNotes}`);
    // ul = document.querySelector('.ul');
    ul.appendChild(li);

    let divNote = document.createElement("div");
    divNote.setAttribute('id',`divNote`)
    // divNote.classList.add(`divNote`);
    li.append(divNote);

    let p_note = document.createElement("p");
    p_note.setAttribute('id',`p_note`) 
    p_note.classList.add(`${countNotes}_li`);
    p_note.classList.add(`p_note${countNotes}`);
    divNote.append(p_note);
    p_note.textContent = input.value;
    
    let divButtons = document.createElement("div");
    divButtons.setAttribute('id',`divButtons`)
    divButtons.classList.add(`divButtons${countNotes}`);
    divNote.append(divButtons);
    
    let buttonDone = document.createElement("button");
    buttonDone.setAttribute('id',`buttonDone`)
    buttonDone.classList.add(`buttonDone${countNotes}`);
    buttonDone.classList.add("btn-success");
    divButtons.append(buttonDone);
    buttonDone.textContent = "Done"
    
    let buttonDelete = document.createElement("button");
    buttonDelete.setAttribute('id',`buttonDelete`)
    buttonDelete.classList.add(`buttonDelete${countNotes}`);
    buttonDelete.classList.add("btn-danger");
    divButtons.append(buttonDelete);
    buttonDelete.textContent = "Delete";

    input.value = "";

    p_values.push(p_note.textContent)
    localStorage.setItem('status',JSON.stringify(p_values));

    console.log(p_values);

}

function storageCreateTodoItems(content) { //создаем и возвращаем элемент списка (из localStorage)
    countNotes = countNotes + 1;

    // event.preventDefault();
    let li = document.createElement("li");
    li.setAttribute('id',`li`)
    li.classList.add(`divEnter${countNotes}`);
    // ul = document.querySelector('.ul');
    ul.appendChild(li);

    let divNote = document.createElement("div");
    divNote.setAttribute('id',`divNote`)
    // divNote.classList.add(`divNote`);
    li.append(divNote);
    
    let p_note = document.createElement("p");
    p_note.setAttribute('id',`p_note`) 
    p_note.classList.add(`${countNotes}_li`);
    p_note.classList.add(`p_note${countNotes}`);
    divNote.append(p_note);
    p_note.textContent = content;

    let divButtons = document.createElement("div");
    divButtons.setAttribute('id',`divButtons`)
    divButtons.classList.add(`divButtons${countNotes}`);
    divNote.append(divButtons);

    let buttonDone = document.createElement("button");
    buttonDone.setAttribute('id',`buttonDone`)
    buttonDone.classList.add(`buttonDone${countNotes}`);
    buttonDone.classList.add("btn-success");
    divButtons.append(buttonDone);
    buttonDone.textContent = "Done"

    let buttonDelete = document.createElement("button");
    buttonDelete.setAttribute('id',`buttonDelete`)
    buttonDelete.classList.add(`buttonDelete${countNotes}`);
    buttonDelete.classList.add("btn-danger");
    divButtons.append(buttonDelete);
    buttonDelete.textContent = "Delete";

    input.value = "";

    // p_values.push(p_note.textContent)
    // localStorage.setItem('status', p_values);

    console.log("storageCreate p_values ",p_values);

}

function confirmDel(){ // функция подтверждения удаления записи
    
    if(confirm("Вы действительно хотите удалить запись?")){
        return true;
    }
    else {return false}
    
}

function confirmDelAll(){ // функция подтверждения удаления всех записей
    
    if(confirm("Вы действительно хотите удалить ВСЕ записи?")){
        return true;
    }
    else {return false}
    
}

function createDeleteAll(){ //функция создания кнопки удаления всех записей
    if (divTodo.querySelector('#btnDelAll') == null){
        // divDelAll = document.createElement('button');
        // divDelAll.setAttribute('id','divDelAll');
        // divDelAll.textContent = ""
        // divEnter.append(divDelAll);

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

p_values.splice(0, p_values.length) //первоначальное обнуление массива записей

if (localStorage.getItem('status') != "" && localStorage.getItem('status') != null ){ //проверка на наличие ключа/значения в localStorage
    p_values = (JSON.parse(localStorage.getItem('status'))); //заполнение локального массива записей текстовыми значениями из localStorage
    for(let i = 0; i < p_values.length;i++){ //создание и размещение записей на странице divList
        let content = p_values[i];
        storageCreateTodoItems(content);
    }
    if (JSON.parse(localStorage.getItem('status')) != ""){ 
        createDeleteAll();   
    }
}
localStorage.setItem('status', JSON.stringify(p_values));// при пустом localStorage создаем пустой ключ/значение 

// console.log(p_values);
// console.log(localStorage.getItem('status'));


divEnter.addEventListener('submit', function(e){ //событие, добавляющее запись при нажатии на кнопку/enter
    if (localStorage.getItem('status') != "" && localStorage.getItem('status') != null){
        e.preventDefault();
        if (input.value != ""){
        createDeleteAll();
        createTodoItems();
        console.log(countNotes);
        }
    }
    else {
        localStorage.setItem('status', JSON.stringify(p_values));

        e.preventDefault();
        if (input.value != ""){
        createDeleteAll();
        createTodoItems();
        console.log("countNotes", countNotes);
        }
    }    
});

divTodo.addEventListener('click', (event)=>{
    if (event.target.getAttribute('id') == 'buttonDelete'){
        // console.log(event.target);
        // console.log(event.target.getAttribute('id'))
        if (confirmDel()) {
            countNotes-=1;
            event.target.closest('#li').remove();

            let AllLi = ul.querySelectorAll('#p_note');
            let i = 0;
            p_values.splice(0, p_values.length); 
            for (let el of AllLi){ //обновление массива массива значений после нажатия кнопки Delete
                p_values.push(el.textContent);
                console.log(el)
            }
            // console.log(p_values);
            localStorage.setItem('status', JSON.stringify(p_values)); //обновление локального хранилища данными из массива

            if (countNotes==0){
                btnDelAll.remove();

            }
        }
    }
    if(event.target.className.indexOf('buttonDone') != -1){ //пометка "выполнено" на записи 
        (event.target.closest('#divNote')).classList.toggle('backColor');
    }
})

divList.addEventListener('click', (e)=>{ // удаление всех записей из списка на странице, массива и localStorage
    if (e.target.getAttribute('id') == "btnDelAll"){
        if(confirmDelAll()){
            for (let i=0;i<countNotes;i++){
                let liElem = document.getElementById('li');
                liElem.remove();
        }
        countNotes = 0;
        btnDelAll.remove();

        p_values = [];
        localStorage.clear();
    }
    }
})

