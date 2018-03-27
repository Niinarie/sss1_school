'use strict';
import {addCat} from './db';
const moment = require('moment');

const apiKey = 'AIzaSyBcgiaMjSFZHfSQkET1QYXH_9ynJvskptY';

const container = document.getElementById('cards');
const mapContainer = document.getElementById('mapContainer');
let pictureData = [];

// create select menu for categories
const createSelect = (array) => {
  const select = document.getElementById('categorySelect');
  const categories = [];
  array.map((item) => {
    if (!categories.includes(item.category)) {
      categories.push(item.category);
    }
  });

  categories.map((cat) => {
    const option = document.createElement('option');
    option.text = cat;
    option.value = cat;
    select.add(option);
  });

  select.addEventListener('change', (evt) => {
    const category = select.options[select.selectedIndex].value;
    filterByCategory(category, array);
  });
};

const filterByCategory = (cat, array) => {
  container.innerHTML = '';
  if (cat !== 'All') {
    array = array.filter((item) => item.category == cat);
  }
  fillCards(array);
};

// Create the cards
const fillCards = (array) => {
  array.forEach((el) => {
    const element = document.createElement('div');
    element.classList.add('card');

    const picture = document.createElement('img');
    picture.src = 'http://localhost:3000/'+el.thumbnail;
    picture.classList.add('card-img-top');

    const body = document.createElement('div');
    body.classList.add('card-body');

    const header = document.createElement('h2');
    header.classList.add('card-title');
    header.appendChild(document.createTextNode(el.title));
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

    container.appendChild(element);

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

// Update modal data with current cat
const displayModal = (id) => {
  const cat = catData(id);
  modalTitle.innerHTML = cat.title;
  modalPic.src = 'http://localhost:3000/' + cat.image;
  modalDate.innerHTML = moment(cat.time).format('MMM Do YYYY');
  modalDetails.innerHTML = `<h4>Details:</h4><p>${cat.details}</p>`;
  if (cat.coordinates) {
    mapContainer.src = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${cat.coordinates.lat},${cat.coordinates.lng}`;
  }
  modal.style.display = 'block';
};

// Get data for cat by id from array
const catData = (id) => {
  const cat = pictureData.find((pic) => pic._id == id);
  return cat;
};

// add event listener for modal's close button
if (document.getElementById('closeButton')) {
  document.getElementById('closeButton').addEventListener('click', (evt) => {
    modal.style.display = 'none';
  });
}

if (document.getElementById('submitForm')) {
  document.getElementById('submitForm').addEventListener('click', (evt) => {
    evt.preventDefault();
    const formData = new FormData(document.getElementById('addForm'));
    addCat(formData);
  });
}

// ** fetch picArray
if (container) {
  fetch('http://localhost:3000/api/cats')
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    pictureData = data;
    fillCards(pictureData);
    createSelect(pictureData);
  })
  .catch((e) => console.log(e));
}


