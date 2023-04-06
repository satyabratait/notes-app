const addBtn = document.getElementById("addBtn");
const addTitle = document.getElementById("addTitle");
const addContent = document.getElementById("addContext");
const notesCard = document.getElementById("notesCard");
const showInputs = document.getElementById("showBtn");
const inputNote = document.querySelector(".inputNote");
const popup = document.querySelector(".popup");
const title = document.querySelector(".title");
const content = document.querySelector(".content");
const deleteBtn = document.querySelector(".deleteBtn");
const modifyBtn = document.querySelector(".modifyBtn");
const heading = document.querySelector(".heading");
const crossBtn = document.getElementById("crossBtn");
const eventMsg = document.querySelector(".eventMsg");

showInputs.addEventListener("click", () => {
  inputNote.classList.toggle("hide");
  notesCard.classList.toggle("hide");
  showInputs.classList.toggle("checkIcon");
});

addBtn.addEventListener("click", () => {
  if (addTitle.value.trim().length > 0 && addContent.value.trim().length > 0) {
    fetch("http://127.0.0.1:8090/notes/create", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        title: addTitle.value,
        content: addContent.value,
      }),
    })
      .then((res) => {
        console.log(res);
        addTitle.value = "";
        addContent.value = "";
        return res.json();
      })
      .then((data) => {
        eventMsg.classList.toggle("hide");
        eventMsg.textContent = data.message;
        setTimeout(() => {
          location.reload();
        }, 2000);
      });
  } else {
    alert("fields are empty");
  }
});

crossBtn.addEventListener("click", () => {
  popup.classList.toggle("hide");
  notesCard.classList.toggle("hide");
  heading.classList.toggle("hide");
  location.reload();
});

function notesDetails(datas) {
  console.log(datas);
  title.textContent = datas.data.title;
  content.textContent = datas.data.content;
  deleteBtn.addEventListener("click", () => {
    deleteNote(datas.data._id);
  });
  modifyBtn.addEventListener("click", () => {
    modifyNote(datas.data._id, title.textContent, content.textContent);
  });
  popup.classList.toggle("hide");
  notesCard.classList.toggle("hide");
  inputNote.classList.add("hide");
  heading.classList.toggle("hide");
}

async function getData(id) {
  await fetch(`http://127.0.0.1:8090/notes/oneData/${id}`)
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      notesDetails(data);
    });
}

function deleteNote(noteId) {
  fetch("http://127.0.0.1:8090/notes/delete", {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      id: noteId,
    }),
  })
    .then((res) => {
      console.log("delete request complete:", res);
      return res.json();
    })
    .then((data) => {
      eventMsg.classList.toggle("hide");
      eventMsg.textContent = data.message;
      setTimeout(() => {
        location.reload();
      }, 2000);
    });
}

function modifyNote(noteId, noteTitle, noteContent) {
  console.log(noteId);
  if (noteId && noteTitle.trim().length > 0 && noteContent.trim().length > 0) {
    fetch("http://127.0.0.1:8090/notes/update", {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        id: noteId,
        title: noteTitle,
        content: noteContent,
      }),
    }).then((res) => {
      console.log("Request complete! response:", res);
      return res.json();
    }).then((data) => {
      eventMsg.classList.toggle("hide");
      eventMsg.textContent = data.message;
      setTimeout(() => {
        location.reload();
      }, 2000);
    });
  } else {
    location.reload();
    alert("fields are empty");
  }
}

function notesData(datas) {
  datas.data.forEach((element, index) => {
    notesCard.innerHTML += `<div class="noteCard my-2 mx-2 card" onclick="getData('${element._id}')">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-content">${element.content}</p>
            </div>`;
  });
}

async function getNotesData() {
  await fetch("http://127.0.0.1:8090/notes/read")
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      notesData(data);
    });
}

(() => {
  getNotesData();
})();
