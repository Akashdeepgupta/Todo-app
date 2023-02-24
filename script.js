const todobutton = document.getElementById("addtodo");
const todotext = document.getElementById("todo");
const buttonName = todobutton.innerText;
let table =document.getElementById('todos');

let todoArray = [];
let edit_id = null;

let obj = localStorage.getItem("todo");
if (obj != null) {
  todoArray = JSON.parse(obj);
}
displayInfo();

function Addtodo() {
  const add_text = todotext.value;
  if(add_text == ''){
    alert('Please enter a task')
    return
}
  if(edit_id != null){
    //edit
    todoArray[edit_id].text = add_text;
  }
  else{
    //insert
    todoArray.push({ text: add_text });
  }
  saveInfo(todoArray);
  todotext.value = "";
  edit_id = null;
  todobutton.innerText = buttonName;

}

function saveInfo() {
  localStorage.setItem("todo", JSON.stringify(todoArray));
  displayInfo();
}

function displayInfo() {
  let records = '';
  if(todoArray.length == 0){
    table.innerHTML = `<tr><td colspan="3" style="text-align:center">No tasks to show</td></tr>`;
    return;
    }
 todoArray.forEach((todo,index)=>{
    records += `<tr>
    <th scope="row">${index+1}</th>
    <td>${todo.text}</td>
    <td>
        <button type="button" class="btn btn-outline-success" onclick='done(${index})' >Done</button>
        <button type="button" class="btn btn-outline-danger" onclick='deleteInfo(${index})' >Delete</button>
        <button type="button" class="btn btn-outline-info" onclick='editInfo(${index})'> Edit </button>
    </td>
  </tr>`;
  table.innerHTML = records;
 })
}

function deleteInfo(index) {
    todoArray.splice(index,1);
    saveInfo();
}

function editInfo(index) {
    todotext.value = todoArray[index].text;
    todobutton.innerText = 'Save Changes'
    edit_id = index;
}

function done(index){
    todoArray[index].text = `<strike>${todoArray[index].text}</strike>`;
    let completes_task = todoArray[index].text;
    todoArray.splice(index,1);
    todoArray.push({text:completes_task});
    saveInfo();
}