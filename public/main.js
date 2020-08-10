const studentsList = []
const ulIndex = document.querySelector('ul')
const input1 = document.querySelector('input')
const btn1 = document.querySelector('button')
fetch('http://localhost:4000/api/students')
  .then((res) => res.json())
  .then((students) => {
    students.forEach((student) => {
      studentsList.push(student)
      const el = document.createElement('li')
      ulIndex.appendChild(el)
      el.textContent = student.name
    })
  })
btn1.addEventListener('click', () => {
  fetch('http://localhost:4000/api/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: input1.value })    ,
  })
    .then((res) => res.json())
    .then((student) => {
      const el = document.createElement('li')
      ulIndex.appendChild(el)
      el.textContent = student.name
    })
})