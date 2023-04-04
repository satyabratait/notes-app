const addBtn = document.getElementById("addBtn");
const clearAll = document.getElementById("clearAll");
const addTitle = document.getElementById("addTitle");
const addContent = document.getElementById("addContext");
const notesCard = document.getElementById("notesCard");

addBtn.addEventListener("click", () => {
    console.log(addTitle.value);
    console.log(addContent.value);
  if (
    addTitle.value.trim().length > 0 &&
    addContent.value.trim().length > 0
  ) {
    fetch("http://127.0.0.1:8090/notes/create", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: `title=${addTitle.textContent}&content=${addContent.textContent}`,
    }).then((res) => {
      console.log("Request complete! response:", res);
      addTitle.textContent = "";
      addContent.textContent = "";
    });
  } else {
    alert("fields are empty");
  }
});
