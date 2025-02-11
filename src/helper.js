
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
}