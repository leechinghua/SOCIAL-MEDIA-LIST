const BASE_URL ='https://user-list.alphacamp.io'
const INDEX_URL = BASE_URL +'/api/v1/users/'

let dataPanal = document.querySelector('#data-panal')
let fakeuserModal = document.querySelector('#fakeuser-modal')
const fakeUsers = []

function socialMediaList(data){
  let listHTML = ''
  data.forEach(element => {
    listHTML +=`
    <div class="col-sm-3 mb-2">
    <div class="card" style="width: 18rem;">
    <img src="${element.avatar}" class="card-img-top" alt="User-Avatar">
    <div class="card-body">
      <h5 class="card-title">${element.name}&nbsp${ element.surname}</h5>
      <a href="#" class="btn btn-primary btn-show-modal" data-bs-toggle="modal" data-bs-target="#fakeuser-modal" data-id="${element.id}">More</a>
    </div>
    </div>
    </div>
    `
  });
  dataPanal.innerHTML = listHTML
}

function socialMediaModal(id){
  const modalTitle = document.querySelector('#fakeuser-modal-title')
  const modalImage = document.querySelector('#fakeuser-modal-image')
  const modalData = document.querySelector('#fakeuser-modal-data')
axios
    .get(INDEX_URL+ id)
    .then((response) => {
      const data = response.data
      modalTitle.innerText = data.name
      modalImage.innerHTML = `<img src="${data.avatar}">`
      modalData.innerHTML = `
             <li>Email : ${data.email}</li>
             <li>Gender : ${data.gender}</li>
             <li>Age : ${data.age}</li>
             <li>Region : ${data.region}</li>
             <li>Birthday : ${data.birthday}</li>`
    })
    .catch((err) => console.log(err)) 
}
dataPanal.addEventListener('click', function onMoreModal(event){
    if (event.target.matches('.btn-show-modal')){
      socialMediaModal(event.target.dataset.id)
    }
  })

axios
  .get(INDEX_URL )
  .then((response) => {
    fakeUsers.push(...response.data.results)
    socialMediaList(fakeUsers)
  })
  .catch((err) => console.log(err))