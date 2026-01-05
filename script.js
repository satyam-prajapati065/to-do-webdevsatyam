var list_container = document.getElementById("list-container");
var data = document.getElementById("data");
var error = document.getElementById("error");
var dellist = [];
var todoplaceholder = document.getElementById("todoplaceholder");

document.getElementById("addlist").addEventListener("click",function (){
  addlist();
});

data.addEventListener("keyup", function abc(e) {
  if (e.keyCode == 13) {
    addlist(data.value);
  }
});

  //-----------Add- Start--------------

function addlist(){
  if (data.value.trim() != "") {
    var list = document.createElement("li");
    list.classList.add("list");

    var input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("name", "select");
    input.setAttribute("class", "select");
    list.appendChild(input);

    var datatext = document.createElement("p");
    datatext.classList.add("data-text");
    datatext.innerHTML = data.value;
    list.appendChild(datatext);
    data.value = "";
    data.focus();

    var update = document.createElement("button");
    update.setAttribute("class", "update");
    update.innerHTML = "Edit";
    list.appendChild(update);

    list_container.appendChild(list);
    list.scrollIntoView();
    error.style.display = "none";
    todoplaceholder.style.display='none';
    allselect.disabled = false;
  } else {
    error.style.display = "block";
  }
}

  //-----------Add- End--------------


// --------------------------------------------------------------Delete TO DO Item Start------=-------------------------------------------
list_container.addEventListener("click", function (e) {
  var li = e.target.parentElement;
  var place = [];
  place = Array.from(list_container.children);
  if (e.target.classList.contains("select") && e.target.checked == true) {
    dellist.push(li);
    deletebtn.style.color = "red";
    if(li.children[2].innerHTML == 'Update'){
      li.children[2].innerHTML= 'Edit';
      li.children[2].style.color= 'green';
      li.children[1].contentEditable=false;
    }
    li.children[2].setAttribute("disabled","true");
    li.children[2].style.color ='gray';
    if(dellist.length == place.length){
      allselect.checked=true;
    }
  } else if (e.target.classList.contains("select") && e.target.checked == false) {
    var index = dellist.indexOf(li);
    dellist.splice(index,1);
    deletebtn.style.color = "black";
    allselect.checked = false;
    li.children[2].removeAttribute("disabled");
    li.children[2].style.color ='green';
  }else if(e.target.classList.contains("update")){

  //-----------Edit- Start--------------

    var updatebtn = li.children[2];
    if(updatebtn.innerHTML == "Edit"){
      var edit = li.children[1];
      edit.contentEditable = "true";
      edit.focus();
      updatebtn.innerHTML = "Update";
      updatebtn.style.color = 'red'
    }else if(updatebtn.innerHTML == "Update"){
      var edit = updatebtn.previousElementSibling;
      edit.contentEditable = "false";
      updatebtn.innerHTML = "Edit";
      updatebtn.style.color = 'green';
    }
  //-----------Edit- End--------------
  }
});

var deletebtn = document.getElementById("delete-btn");
deletebtn.addEventListener("click", function (e) {
  dellist.forEach((e) => {
    e.remove();
  });
  deletebtn.style.color = "black";
  dellist = [];
  // allselect.checked = false;
  // allselect.disabled = true;

  //Placeholder- Start--------------
  var place = [];
  place = Array.from(list_container.children);
  length1 = place.length;
  if(length1 == 0){
    todoplaceholder.style.display='inline';
  }
  //Placeholder- End--------------

  if(dellist.length ==0 && place.length !=0){
    allselect.checked = false;
    allselect.disabled = false;
  }else if(dellist.length ==0 && place.length ==0){
    allselect.checked = false;
    allselect.disabled = true;
  }


});

var allselect = document.getElementById("allselect")
allselect.addEventListener("click", function (e) {
  if (e.target.checked == true) {
    dellist = Array.from(list_container.children);
    dellist.forEach((item)=>{
      var checkbox = item.querySelector(".select");
      if(checkbox){
        checkbox.checked = true;
      }
      var updatebtn = item.querySelector(".update")
      var edit = item.querySelector(".data-text")
      if(updatebtn.innerHTML == 'Update'){
        updatebtn.innerHTML = 'Edit';
        edit.contentEditable = false;
      }
      updatebtn.disabled = true;
      updatebtn.style.color = 'gray';
    })
    deletebtn.style.color = "red";
  }else if(e.target.checked == false){
    dellist.forEach((item)=>{
      var checkbox = item.querySelector(".select");
      if(checkbox){
        checkbox.checked = false;
      }
      var updatebtn = item.querySelector(".update")
      updatebtn.disabled = false;
      updatebtn.style.color = 'green';
    })
    dellist=[];
    deletebtn.style.color = "black";
  }  
});

// --------------------------------------------------------------Delete TO DO Item End------=-------------------------------------------