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

   //render header
   function renderHeader() {
      const headerHtml =
         `<div>
            <button type="button" id="view">View</button>
            <button type="button" id="edit">Edit</button>
            <button type="button" id="del">Delete</button>
      </div>`

      header.innerHTML = headerHtml

      document.getElementById('view')
         .addEventListener('click', handleMenuClick)

      document.getElementById('edit')
         .addEventListener('click', handleMenuClick)

      document.getElementById('del')
         .addEventListener('click', handleMenuClick)



   }

   function handleMenuClick(e) {
      const { id } = e.target

   }

   //utility render list
   function renderList(data) {
      const headerData = Object.keys(data[0])
         .map(header => (
            `<th>${header}</th>`
         ))

      const bodyData = data.map(item => (
         `<tr>
         <td><input type='checkbox' class="checkbox" id=${item.id} /></td>
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

      document.querySelectorAll('.checkbox')
         .forEach(checkbox => {
            checkbox.addEventListener('input', handleItemCheckbox)
         })
   }

   function handleItemCheckbox(e) {
      const { id, checked } = e.target
      console.log(id, checked)
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