const init = () => {

   //dom elements
   const header = document.getElementById("header")
   const form = document.getElementById("form")
   const list = document.getElementById("list")

   //stateful vars
   let isLoading = true
   let inEditMode = false

   let things = []
   let formData = {}
   let selectedThing = {}

   let tags = []
   let tagFormData = {}
   let selectedTag = {}

   //init fetch
   fetchThings()

   //utility render list
   function renderList(data) {
      const headerData = Object.keys(data[0])
         .map(header => (
            `<th>${header}</th>`
         ))

      const bodyData = data.map(item => (
         `<tr>
            ${Object.values(item)
            .map(i => (
               `<td>${i}</td>`
            ))
            .join('')}
         </tr>`
      ))


      const tableHtml =
         `<table>
            <thead>
               <tr>
                  ${headerData.join('')}
               </tr>
            </thead>
            <tbody>
               ${bodyData.join('')}
            </tbody>
         </table > `

      list.innerHTML = tableHtml

   }

   //async fetch 
   async function fetchThings() {
      try {
         const r = await fetch(`http://localhost:3000/things`)
         if (!r.ok) {
            throw new Error('GET: bad fetch')
         }
         const data = await r.json()
         things = data
         renderList(data)
      } catch (error) { console.error(error) }
   }

}

window.addEventListener("DOMContentLoaded", init)