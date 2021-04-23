let allUsers = [];
let filteredUsers = [];
const mainText = document.querySelector(".main-text");
const input = document.querySelector("#search");
const divStatistics = document.querySelector(".statistics-text")

async function start() {
  await fetchUsers();
  render();
}

async function fetchUsers(){
  const resource = await fetch('http://localhost:3001/users');
  const json = await resource.json();
  allUsers = json.map(user => {
    const { name, picture, dob, gender} = user;
    const fullName = `${name.first} ${name.last}`;
    const searchName = fullName.toLocaleLowerCase();
    return {
      name: fullName,
      searchName,
      profile: picture.medium,
      age: dob.age,
      gender: gender
    };
  });
}

function doFilterUsers(searchTerm) {
  const lowerCaseSearchTerm = searchTerm.toLocaleLowerCase();

  filteredUsers = allUsers
    .filter(user => user.searchName.includes(lowerCaseSearchTerm))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function renderFilteredUsers() {
    mainText.innerHTML = `
    <h1 class="main-text text-center text-2xl font-semibold text-gray-50">${filteredUsers.length} usuário(s) encontrado(s)</h1>

    <div>${filteredUsers.map(user => {
      return ` 
        <div class = "user">
          <div class = "profile-image">
          <img class="rounded-full flex-1" src="${user.profile}" alt="${user.name}">
          </div>
          <div> ${user.name}, ${user.age} anos </div>
        </div>
        `;
    }).join('')} </div>`
}

function renderStatistics(){
  if (filteredUsers.length === 0) {
    divStatistics.innerHTML = 'Nada a ser exibido.';
  }else{
    const maleUsers = 
    filteredUsers.filter(({ gender }) => gender === 'male').length;

  const femaleUsers = 
    filteredUsers.filter(({ gender }) => gender === 'female').length;

  const sumAges = filteredUsers.reduce(
    (accumulator, { age }) => accumulator + age,
    0
  );

  const averageAges = (sumAges / filteredUsers.length)
    .toFixed(2)
    .replace('.', ',');

  divStatistics.innerHTML = `
    <h2 class='margin-auto text-center text-xl font-semibold mb-2'>
      Estatísticas
    </h2>

    <ul>
      <li>Sexo masculino: <strong>${maleUsers}</strong></li>
      <li>Sexo feminino: <strong>${femaleUsers}</strong></li>
      <li>Soma das idades: <strong>${sumAges}</strong></li>
      <li>Média das idades: <strong>${averageAges}</strong></li>
    </ul>  
  `;
  }
}

function render(){
  input.addEventListener("keyup", (event) =>{
    if(event.keyCode === 13){
      doFilterUsers(input.value);
      renderFilteredUsers();
      renderStatistics();
    }
  })
}
start();