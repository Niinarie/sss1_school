'use strict';
import * as db from './db';
import * as map from './map';
const moment = require('moment');

const container = document.getElementById('cards');
const mapContainer = document.getElementById('mapContainer');
const authContainer = document.getElementById('auth');
const searchContainer = document.getElementById('searchCards');
let pictureData = [];

// create select menu for categories
const createSelect = (array) => {
  const select = document.getElementById('categorySelect');
  const breeds = [];
  array.map((item) => {
    if (!breeds.includes(item.breed)) {
      breeds.push(item.breed);
    }
  });

  breeds.map((br) => {
    const option = document.createElement('option');
    option.text = br;
    option.value = br;
    select.add(option);
  });

  select.addEventListener('change', (evt) => {
    const category = select.options[select.selectedIndex].value;
    filterByCategory(category, array);
  });
};

// filter cats by breed
const filterByCategory = (breed, array) => {
  container.innerHTML = '';
  if (breed !== 'All') {
    array = array.filter((item) => item.breed == breed);
  }
  fillCards(array);
};

// Create the cards
const fillCards = (array, div) => {
  array.forEach((el) => {
    const element = document.createElement('div');
    element.setAttribute('id', 'card-' + el._id);
    element.classList.add('card');

    const picture = document.createElement('img');
    picture.src = el.thumbnail;
    picture.classList.add('card-img-top');

    const body = document.createElement('div');
    body.classList.add('card-body');

    const header = document.createElement('div');
    header.classList.add('card-title');
    {
      el.sex == 'female' ?
        header.innerHTML = `<h2>${el.title} <b>&#9792;</b></h2>` :
        header.innerHTML = `<h2>${el.title} <b>&#9794;</b></h2>`;
    }
    const description = document.createElement('p');
    description.classList.add('card-text');
    description.appendChild(document.createTextNode(el.details));
    body.appendChild(header);
    body.appendChild(description);

    const footer = document.createElement('div');
    footer.classList.add('card-footer');
    const viewButton = document.createElement('button');
    viewButton.classList.add('btn', 'center');
    viewButton.appendChild(document.createTextNode('View'));
    footer.appendChild(viewButton);

    element.appendChild(picture);
    element.appendChild(body);
    element.appendChild(footer);

    div.appendChild(element);

    // Add event listener for details view -button
    viewButton.addEventListener('click', (evt) => {
      displayModal(el._id);
    });
  });
};

// modal stuff
const modal = document.getElementById('catModal');
const modalTitle = document.getElementById('modalTitle');
const modalPic = document.getElementById('modalPic');
const modalDate = document.getElementById('modalDate');
const modalDetails = document.getElementById('modalDetails');
const deleteButton = document.getElementById('deleteButton');
const updateButton = document.getElementById('updateButton');

// Update modal data with current cat
const displayModal = (id) => {
  mapContainer.style.display = 'none';
  const cat = catData(id);
  modalTitle.innerHTML = cat.title;
  modalPic.src = cat.image;
  modalDate.innerHTML = moment(cat.time).format('MMM Do YYYY');
  modalDetails.innerHTML = `<h4>Details:</h4><p>${cat.details}</p>`;
  if (cat.coordinates) {
    mapContainer.style.display = 'block';
    map.initMap(cat.coordinates);
  }
  deleteButton.addEventListener('click', (evt) => {
    db.deleteCat(id)
      .then((res) => {
        removeById(id);
        modal.style.display = 'none';
      })
      .catch((err) => console.log(err));
  });

  updateButton.addEventListener('click', (evt) => {
<<<<<<< HEAD
    window.location.href = 'update.html?id=' + id;
=======
    window.location.href = 'http://localhost:3000/update.html?id=' + id;
>>>>>>> 00b7eb51eb3145d614115c9a4b26f5c6c50e454f
  });
  modal.style.display = 'block';
};

// Get data for cat by id from array
const catData = (id) => {
  const cat = pictureData.find((pic) => pic._id == id);
  return cat;
};

// remove cat card by id after deleting cat
const removeById = (id) => {
  const elem = document.getElementById('card-' + id);
<<<<<<< HEAD
  elem.parentNode.removeChild(elem);
  pictureData.filter((cat) => cat._id != id);
=======
  return elem.parentNode.removeChild(elem);
>>>>>>> 00b7eb51eb3145d614115c9a4b26f5c6c50e454f
};

// get all cat data
const init = () => {
  db.getCats()
    .then((data) => {
      pictureData = data;
<<<<<<< HEAD
      fillCards(pictureData, container);
=======
      fillCards(pictureData);
>>>>>>> 00b7eb51eb3145d614115c9a4b26f5c6c50e454f
      createSelect(pictureData);
    })
    .catch((e) => console.log(e));
};

// method for initing updateform
const initUpdate = (id) => {
  db.getCat(id)
    .then((res) => {
      document.getElementById('updateImage').src = res.thumbnail;
      document.getElementById('inputTitle').value = res.title;
      document.getElementById('inputBreed').value = res.breed;
      document.getElementById('inputDetails').value = res.details;
      document.getElementById('inputSex').value = res.sex;
      document.getElementById('inputTime').value = moment(res.time).format('YYYY-MM-DD');

      map.initUpdateMap(res.coordinates);

      document.getElementById('updateFormButton').addEventListener('click', (evt) => {
        evt.preventDefault();
        const formData = new FormData(document.getElementById('updateForm'));
        db.updateCat(id, formData);
      });
    })
    .catch((err) => console.log(err));
};

// add event listener for modal's close button
if (document.getElementById('closeButton')) {
  document.getElementById('closeButton').addEventListener('click', (evt) => {
    modal.style.display = 'none';
  });
}

// submit form
if (document.getElementById('submitForm')) {
  document.getElementById('submitForm').addEventListener('click', (evt) => {
    evt.preventDefault();
    const formData = new FormData(document.getElementById('addForm'));
    db.addCat(formData);
<<<<<<< HEAD
  });
}

if (document.getElementById('searchButton')) {
  document.getElementById('searchButton').addEventListener('click', (evt) => {
    evt.preventDefault();
    const search = document.getElementById('search');
    console.log(search.value);
    if (search.value.length > 3) {
      window.location.href= 'search.html?text='+search.value;
    } else {
      console.log('Too short seacrhword');
    }
=======
>>>>>>> 00b7eb51eb3145d614115c9a4b26f5c6c50e454f
  });
}

// Init app if on front page
if (container) {
  init();
<<<<<<< HEAD
}

if (searchContainer) {
  const urlString = window.location.href;
  const url = new URL(urlString);
  const searchWord = url.searchParams.get('text');
  db.findCats(searchWord)
  .then((res) => {
    if (res.length) {
      pictureData = res;
      fillCards(pictureData, searchContainer);
      createSelect(pictureData);
    } else {
      searchContainer.innerHTML = `
      <p>No results with searchword</p>`;
    }
  })
  .catch((err) => console.log(err));
}

if (sessionStorage.getItem('loggedin') == null) {
  const login = document.createElement('li');
  login.innerHTML = `
  <li class="nav__item inline">
  <a class="nav__link" href="login.html">Login</a>
  </li>
  <li class="nav__item inline">
    <a class="nav__link" href="signup.html">Sign up</a>
  </li>
  <li class="nav__item inline">
  <a class="nav__link" href="logout">Log out</a>
  </li>`;
  authContainer.appendChild(login);
}
if (sessionStorage.getItem('loggedin')) {
  const logout = document.createElement('li');
  logout.innerHTML = `
  <li class="nav__item">
    <a class="nav__link" href="logout">Log out</a>
  </li>`;
  authContainer.appendChild(logout);
}
=======
}

>>>>>>> 00b7eb51eb3145d614115c9a4b26f5c6c50e454f
// Init add map if on add page
if (document.getElementById('mapCoords')) {
  map.initAddMap();
}

// Init updateform with existing data after extracting cat id from url, 
// if on update page
if (document.getElementById('updateForm')) {
  const urlString = window.location.href;
  const url = new URL(urlString);
  const id = url.searchParams.get('id');
  if (id) {
    console.log(id);
    initUpdate(id);
  }
}
