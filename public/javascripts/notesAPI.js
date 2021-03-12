import { noteFieldInnerHtml, urlIdIdentifier } from "./api-utils.js";

window.addEventListener("DOMContentLoaded", async () => {

  //Listener for deleteing notes
  const notesContainer = document.querySelector(".notesTilesContainer");
  notesContainer.addEventListener("submit", async (event) => {
    if(event.target.id) {
      event.preventDefault();
      const urlId = urlIdIdentifier(window.location.href)
      const taskId = urlId[0];
      const noteId = event.target.id;

      try {
        const res = await fetch(`/api-notes/${noteId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ noteId }),
        });
        const notes = await res.json();
        notesContainer.innerHTML = "";

        if (notes.length) noteFieldInnerHtml(notes, taskId);
        else return
      } catch (err) {
        console.error("There was an error in your notes API file", err)
      }
    }
  })

  //Listener for creating a note
  const noteCreateForm = document.querySelector(".noteList__form");
  const noteTextarea = document.querySelector(".note-content");
  noteCreateForm.addEventListener("submit", async (event) => {

    event.preventDefault()

    const formData = new FormData(noteCreateForm);
    const content = formData.get("content");
    const [ userId, taskId ] = noteCreateForm.id.split(':');

    try {
      const res = await fetch("/api-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, userId, taskId })
      })
      const notes = await res.json();

      notesContainer.innerHTML = "";
      noteTextarea.value = "";

      if (notes.length) noteFieldInnerHtml(notes, taskId);
      else return;
    } catch(err) {
      console.error("messed up in notes create", err);
    }
  })

  // listener for getting note edit form
  const editForm = document.querySelector(".notList__c")
  notesContainer.addEventListener("click", async (event) => {
    console.log(event.target, '---------------')
    if (event.target.id) {
      try{
        const res = await fetch("/api-notes", {
        method: "GET",
        header: { "Content-type": "application/json" }
      })
        const notes = await res.json();
      } catch (err) {
        console.error('messed up in get edit form listener', err)
      }
    }

  })
})
