class Track {
  constructor(id, name) {
    this.id = id
    this.name = name
  }
}

class Course {
  constructor(id, name, trackId) {
    this.id = id
    this.name = name
    this.track = getTrack(trackId)
  }
}

class User {
  constructor(name) {
    this.name = name
  }
}

class Instructor extends User {
  constructor(id, name, coursesIds) {
    super(name);
    this.id = id
    this.courses = courses.filter(function(course) {
      return coursesIds.indexOf(course.id) !== -1
    })

  }
}

class Student extends User {
  constructor(id, name, trackId, gender, age) {
    super(name)
    this.id = id

    this.track = tracks.filter(function(track) {
      return trackId === track.id
    })[0]

    this.gender = gender
    this.age = age
  }
}

const tracks = [
  new Track(1, "Frontend"),
  new Track(2, "Backend"),
  new Track(3, "Cloud"),
]

function getTrack(id) {
  let filteredArray = tracks.filter(function(track) {
    return track.id === id
  })

  return filteredArray[0]
}

const courses = [
  new Course(1, "HTML", 1),
  new Course(2, "CSS", 1),
  new Course(3, "Javascript", 1),
  new Course(4, "Nodejs", 2),
  new Course(5, "Python", 2),
  new Course(6, "AWS", 3),
]

const instructors = [
  new Instructor(1, "Rachael Onoja", [6]),
  new Instructor(2, "John Ajeigbe", [1]),
  new Instructor(3, "Setemi Ojo", [2]),
  new Instructor(4, "Tabitha Kavyu", [5]),
  new Instructor(5, "Rising Odegua", [3, 4]),
]

const students = [
  new Student(1, "Gift Emete", 2, "Female", 18),
  new Student(2, "Aliu Yusuf", 2, "Male", 20),
  new Student(3, "Sunday Ani", 1, "Male", 25),
  new Student(4, "Ufuoma Akporido", 1, "Female", 19),
  new Student(5, "Oshikhai Agbavokhai", 3, "Male", 21),
]

function sortObjs(objs, sortBy = "id", mode = "desc") {
  let keys = objs.map(function(obj) {
    return obj[sortBy]
  })

  keys.sort()
  if ((mode === "desc")) {
    keys.reverse()
  }

  let sortedObj = []
  for (const key in keys) {
    for (const obj of objs) {
      if (obj[sortBy] === keys[key]) {
        sortedObj.push(obj)
      }
    }
  }

  return sortedObj

}

function getStudentsTableRows(data) {
  let rows = ""

  for (const key in data) {
    rows += `\n <tr>
        <td>${data[key].id}</td>
        <td>${data[key].name}</td>
        <td class="${data[key].track.name.toLowerCase()}">${data[key].track.name}</td>
        <td>${data[key].gender}</td>
        <td>${data[key].age}</td>
        </tr> \n`
  }

  return rows
}

function getCoursesTableRows(data) {
  let rows = ""

  for (const key in data) {
    rows += `\n <tr>
        <td>${data[key].id}</td>
        <td>${data[key].name}</td>
        <td class="${data[key].track.name.toLowerCase()}">${data[key].track.name}</td>
        </tr> \n`
  }

  return rows
}

function getInstructorsTableRows(data) {
  let rows = ""

  for (const key in data) {
    rows += `\n <tr>
        <td>${data[key].id}</td>
        <td>${data[key].name}</td>
        <td>${data[key].courses.length} (${data[key].courses.map(course => course.name)})</td>
        </tr> \n`
  }

  return rows
}



const studentsCount = Object.entries(courses).length
const coursesCount = Object.entries(students).length

const studentAges = students.map(function(student) {
  return student.age
})


document.onreadystatechange = function() {
  if (document.readyState === "complete") {
    const coursesTableBody = document.getElementById("coursesTableBody")
    const studentsTableBody = document.getElementById("studentsTableBody")
    const instructorsTableBody = document.getElementById("instructorsTableBody")
    const coursesCountElement = document.getElementById("coursesCountElement")
    const studentsCountElement = document.getElementById("studentsCountElement")
    const minimumAgeCountElement = document.getElementById("minimumAgeCountElement")
    const maximumAgeCountElement = document.getElementById("maximumAgeCountElement")
    const averageAgeCountElement = document.getElementById("averageAgeCountElement")
    const sortCoursesSelect = document.getElementById("sortCoursesSelect")
    const sortStudentsSelect = document.getElementById("sortStudentsSelect")
    const sortInstructorsSelect = document.getElementById("sortInstructorsSelect")

    studentsTableBody.innerHTML = getStudentsTableRows(sortObjs(students, "id", "asc"))
    coursesTableBody.innerHTML = getCoursesTableRows(sortObjs(courses, "id", "asc"))
    instructorsTableBody.innerHTML = getInstructorsTableRows(sortObjs(instructors, "id", "asc"))

    coursesCountElement.innerText = studentsCount
    studentsCountElement.innerText = coursesCount

    minimumAgeCountElement.innerText = Math.min(...studentAges)
    maximumAgeCountElement.innerText = Math.max(...studentAges)
    averageAgeCountElement.innerText = (studentAges.reduce((a, b) => a + b, 0) / studentAges.length).toFixed(0)

    sortCoursesSelect.addEventListener('change', function(event) {
      let rows = ""
      switch (event.target.value) {
        case "sn-asc":
          rows = getCoursesTableRows(sortObjs(courses, "id", 'asc'))
          break;
        case "sn-desc":
          rows = getCoursesTableRows(sortObjs(courses, "id", 'desc'))
          break;
        case "name-asc":
          rows = getCoursesTableRows(sortObjs(courses, "name", 'asc'))
          break;
        case "name-desc":
          rows = getCoursesTableRows(sortObjs(courses, "name", 'desc'))
          break;
      }

      coursesTableBody.innerHTML = rows
    })
    sortStudentsSelect.addEventListener('change', function(event) {
      let rows = ""
      switch (event.target.value) {
        case "sn-asc":
          rows = getStudentsTableRows(sortObjs(students, "id", 'asc'))
          break;
        case "sn-desc":
          rows = getStudentsTableRows(sortObjs(students, "id", 'desc'))
          break;
        case "name-asc":
          rows = getStudentsTableRows(sortObjs(students, "name", 'asc'))
          break;
        case "name-desc":
          rows = getStudentsTableRows(sortObjs(students, "name", 'desc'))
          break;
        case "age-asc":
          rows = getStudentsTableRows(sortObjs(students, "age", 'asc'))
          break;
        case "age-desc":
          rows = getStudentsTableRows(sortObjs(students, "age", 'desc'))
          break;
      }

      studentsTableBody.innerHTML = rows
    })
    sortInstructorsSelect.addEventListener('change', function(event) {
      let rows = ""
      switch (event.target.value) {
        case "sn-asc":
          rows = getInstructorsTableRows(sortObjs(instructors, "id", 'asc'))
          break;
        case "sn-desc":
          rows = getInstructorsTableRows(sortObjs(instructors, "id", 'desc'))
          break;
        case "name-asc":
          rows = getInstructorsTableRows(sortObjs(instructors, "name", 'asc'))
          break;
        case "name-desc":
          rows = getInstructorsTableRows(sortObjs(instructors, "name", 'desc'))
          break;
      }

      instructorsTableBody.innerHTML = rows
    })
  }
}

function startApp() {
  // Your entire app should not necessarily be coded inside this 
  // single function (though there's no penalty for that), 
  // so create and use/call additional functions from here

  const sidebar = document.querySelector("aside.sidebar");

  const sidebarToggler = document.getElementById("sidebarToggler");


  const closeSidebar = document.getElementById("closeSidebar");

  sidebarToggler.addEventListener('click', function() {
    sidebar.classList.add('slide-in')
  })

  closeSidebar.addEventListener('click', function() {
    sidebar.classList.remove('slide-in')
  })



};

startApp()

// ======= DO NOT EDIT ============== //
export default startApp;
  // ======= EEND DO NOT EDIT ========= //