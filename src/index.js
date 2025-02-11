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
   let selectedId;

   let tags = []
   let tagFormData = {}
   let selectedTag = {}

   //init fetch
   fetchThings()

   //render header
   function renderHeader() {
      const headerHtml =
         `<div>
            <button type="button" id="edit">Edit</button>
            <button type="button" id="del">Delete</button>
      </div>`

      header.innerHTML = headerHtml


      document.getElementById('edit')
         .addEventListener('click', handleMenuClick)

      document.getElementById('del')
         .addEventListener('click', handleMenuClick)



   }

   function handleMenuClick(e) {
      const { id } = e.target

   }

   //render list
   function renderList(data) {

      const bodyData = data.map(item => (
         `<tr id=${item.id}>
             <td>
            <input type="checkbox" id="${item.id}" name="checkbox" class="checkbox" />
            </td>
            <td>${item.id}</td>
            <td>${item.thing}</td>
            <td>${item.bin}</td>
            <td>${item.tags.join('')}</td>
         </tr>`
      ))

      const headerData =
         `<tr>
         <th>Select</th>
         <th>ID</th>
         <th>Name</th>
         <th>Bin</th>
         <th>Tags</th>
         </tr>`

      const tableHtml =
         `<table>
            <thead>
                  ${headerData}
            </thead>
            <tbody>
               ${bodyData.join('')}
            </tbody>
         </table > `

      list.innerHTML = tableHtml

      const checkboxes = document.querySelectorAll('.checkbox')
      checkboxes.forEach(cb => (
         cb.addEventListener('input', function (e) {
            const { id, checked } = e.target
         })
      ))

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
         renderHeader()
      } catch (error) { console.error(error) }
   }

}

window.addEventListener("DOMContentLoaded", init)