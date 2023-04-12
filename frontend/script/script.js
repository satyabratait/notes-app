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
const popupHeading = document.querySelector(".popupHeading");
const topheading = document.querySelector(".heading h1");
const baseUrl = "http://127.0.0.1:8090/api";

function toggleHeading() {
  inputNote.classList.toggle("hide");
  notesCard.classList.toggle("hide");
  showInputs.classList.toggle("checkIcon");
}

async function fetchApi(url, method, data, successCallBack, errorCallBack) {
  await fetch(url, {
    method,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: data,
  })
    .then((res) => {
      successCallBack(res);
    })
    .catch((err) => {
      errorCallBack(err);
    });
}

topheading.addEventListener("click", () => {
  toggleHeading();
});

showInputs.addEventListener("click", () => {
  toggleHeading();
});

addBtn.addEventListener("click", () => {
  if (addTitle.value.trim().length > 0 && addContent.value.trim().length > 0) {
    fetchApi(
      `${baseUrl}/create`,
      "POST",
      JSON.stringify({ title: addTitle.value, content: addContent.value }),
      (res) =>
        res.json().then((data) => {
          addTitle.value = "";
          addContent.value = "";
          eventMsg.classList.toggle("hide");
          eventMsg.textContent = data.message;
          popupHeading.classList.toggle("hide").textContent = data.message;
          setTimeout(() => {
            location.reload();
          }, 4000);
        }),
      (err) => {
        alert(err.message);
      }
    );
  } else {
    alert("fields are empty");
  }
});

crossBtn.addEventListener("click", () => {
  popup.classList.toggle("hide");
  notesCard.classList.toggle("hide");
  heading.classList.toggle("hide");
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
  await fetch(`${baseUrl}/oneData/${id}`)
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      notesDetails(data);
    });
}

function deleteNote(noteId) {
  fetchApi(
    `${baseUrl}/delete`,
    "DELETE",
    JSON.stringify({
      id: noteId,
    }),
    (res) => {
      res.json().then((data) => {
        eventMsg.classList.toggle("hide");
        eventMsg.textContent = data.message;
        setTimeout(() => {
          location.reload();
        }, 4000);
      });
    },
    (err) => {
      alert(err.message);
    }
  );
}

function modifyNote(noteId, noteTitle, noteContent) {
  console.log(noteId);
  if (noteId && noteTitle.trim().length > 0 && noteContent.trim().length > 0) {
    fetchApi(
      `${baseUrl}/update`,
      "PUT",
      JSON.stringify({
        id: noteId,
        title: noteTitle,
        content: noteContent,
      }),
      (res) => {
        res.json().then((data) => {
          eventMsg.classList.toggle("hide");
          eventMsg.textContent = data.message;
          setTimeout(() => {
            location.reload();
          }, 4000);
        });
      },
      (err) => {
        console.log(err.message);
      }
    );
  } else {
    location.reload();
    alert("fields are empty");
  }
}

function notesData(datas) {
  datas.data.forEach((element) => {
    notesCard.innerHTML += `<div class="noteCard my-2 mx-2 card" onclick="getData('${element._id}')">
            <h5 class="cardTitle">${element.title}</h5>
            <p class="cardContent">${element.content}</p>
            </div>`;
  });
}

async function getNotesData() {
  await fetch(`${baseUrl}/read`)
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
