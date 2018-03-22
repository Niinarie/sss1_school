'use strict';

var apiKey = 'AIzaSyBcgiaMjSFZHfSQkET1QYXH_9ynJvskptY';

window.onload = function () {
  var container = document.getElementById('cards');
  var mapContainer = document.getElementById('mapContainer');
  var pictureData = [];

  // create select menu for categories
  function createSelect(array) {
    var select = document.getElementById('categorySelect');

    // get categories
    var categories = [];
    array.map(function (item) {
      if (!categories.includes(item.category)) {
        categories.push(item.category);
      }
    });

    categories.map(function (cat) {
      var option = document.createElement('option');
      option.text = cat;
      option.value = cat;
      select.add(option);
    });

    // event listener
    select.addEventListener('change', function (evt) {
      var category = select.options[select.selectedIndex].value;
      filterByCategory(category, array);
    });
  }

  function filterByCategory(cat, array) {
    container.innerHTML = '';
    if (cat !== 'All') {
      array = array.filter(function (item) {
        return item.category == cat;
      });
    }
    fillCards(array);
  }

  function fillCards(array) {
    array.forEach(function (el) {
      var element = document.createElement('div');
      element.classList.add('card');

      var picture = document.createElement('img');
      picture.src = el.thumbnail;
      picture.classList.add('card-img-top');

      var body = document.createElement('div');
      body.classList.add('card-body');

      var header = document.createElement('h2');
      header.classList.add('card-title');
      header.appendChild(document.createTextNode(el.title));
      var description = document.createElement('p');
      description.classList.add('card-text');
      description.appendChild(document.createTextNode(el.details));
      body.appendChild(header);
      body.appendChild(description);

      var footer = document.createElement('div');
      footer.classList.add('card-footer');
      var viewButton = document.createElement('button');
      viewButton.classList.add('btn', 'center');
      viewButton.appendChild(document.createTextNode('View'));
      footer.appendChild(viewButton);

      viewButton.addEventListener('click', function (evt) {
        displayModal(el.id);
      });

      element.appendChild(picture);
      element.appendChild(body);
      element.appendChild(footer);
      container.appendChild(element);
    });
  }

  // modal stuff
  var modal = document.getElementById('catModal');
  var modalTitle = document.getElementById('modalTitle');
  var modalPic = document.getElementById('modalPic');
  var modalDate = document.getElementById('modalDate');
  var modalDetails = document.getElementById('modalDetails');

  function displayModal(id) {
    var cat = catData(id);
    modalTitle.innerHTML = cat.title;
    modalPic.src = cat.image;
    modalDate.innerHTML = moment(cat.time).format('MMM Do YYYY');
    modalDetails.innerHTML = '<h4>Details:</h4><p>' + cat.details + '</p>';
    mapContainer.src = 'https://www.google.com/maps/embed/v1/place?key=' + apiKey + '&q=' + cat.coordinates.lat + ',' + cat.coordinates.lng;
    modal.style.display = 'block';
  }

  function catData(id) {
    var cat = pictureData.filter(function (pic) {
      return pic.id == id;
    });
    return cat[0];
  }

  document.getElementById('closeButton').addEventListener('click', function (evt) {
    modal.style.display = 'none';
  });

  // ** fetch picArray
  fetch('data.json').then(function (res) {
    return res.json();
  }).then(function (data) {
    pictureData = data.data;
    fillCards(pictureData);
    createSelect(pictureData);
  }).catch(function (e) {
    return console.log(e);
  });
};