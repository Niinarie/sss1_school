'use strict';
const apiKey = '';

window.onload = () => {
  const container = document.getElementById('cards');
  const mapContainer = document.getElementById('mapContainer');
  let pictureData = [];

  // create select menu for categories
  function createSelect(array) {
    const select = document.getElementById('categorySelect');

    // get categories
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

    // event listener
    select.addEventListener('change', (evt) => {
      const category = select.options[select.selectedIndex].value;
      filterByCategory(category, array);
    });
  }

  function filterByCategory(cat, array) {
    container.innerHTML = '';
    if (cat !== 'All') {
     array = array.filter((item) => item.category == cat);
    }
    fillCards(array);
  }

  function fillCards(array) {
    array.forEach((el) => {
      const element = document.createElement('div');
      element.classList.add('card');

      const picture = document.createElement('img');
      picture.src = el.thumbnail;
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

      viewButton.addEventListener('click', (evt) => {
        displayModal(el.id);
      });

      element.appendChild(picture);
      element.appendChild(body);
      element.appendChild(footer);
      container.appendChild(element);
    });
  }

  // modal stuff
  const modal = document.getElementById('catModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalPic = document.getElementById('modalPic');
  const modalDate = document.getElementById('modalDate');
  const modalDetails = document.getElementById('modalDetails');

  function displayModal(id) {
    const cat = catData(id);
    modalTitle.innerHTML = cat.title;
    modalPic.src = cat.image;
    modalDate.innerHTML = moment(cat.time).format('MMM Do YYYY');
    modalDetails.innerHTML = `<h4>Details:</h4><p>${cat.details}</p>`;
    mapContainer.src = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${cat.coordinates.lat},${cat.coordinates.lng}`;
    modal.style.display = 'block';
  }

  function catData(id) {
    const cat = pictureData.filter((pic) => pic.id == id);
    return cat[0];
  }

  document.getElementById('closeButton').addEventListener('click', (evt) => {
    modal.style.display = 'none';
  });

  // ** fetch picArray
  fetch('data.json')
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    pictureData = data.data;
    fillCards(pictureData);
    createSelect(pictureData);
  })
  .catch((e) => console.log(e));
};
