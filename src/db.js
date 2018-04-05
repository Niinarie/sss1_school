const apiUrl = './api/';

export function getCats() {
  return new Promise((resolve, reject) => {
    const url = apiUrl + 'cats';
    fetch(url, {
      method: 'GET',
      credentials: 'same-origin',
    }).then((res) => {
      return res.json();
    })
      .then((res) => resolve(res))
      .catch((error) => {
        console.error('Error:', error);
        reject('error');
      });
  });
}

export function addCat(cat) {
  const url = apiUrl + 'upload';
  fetch(url, {
    method: 'POST',
    body: cat,
    credentials: 'same-origin',
  }).then((res) => {
    if (res.status == 200) {
      document.getElementById('form').innerHTML = `
      Cat submitted successfully!
    `;
    }
    if (res.status == 401) {
      document.getElementById('form').innerHTML = `
      Log in required for submitting a cat.
    `;
    }
  })
    .catch((error) => console.error('Error:', error));
}

export function deleteCat(id) {
  return new Promise((resolve, reject) => {
    const url = apiUrl + 'cats/' + id;
    fetch(url, {
      method: 'DELETE',
      credentials: 'same-origin',
    }).then((res) => {
      return res.json();
    })
      .then(resolve('success'))
      .catch((error) => {
        console.error('Error:', error);
        reject('error');
      });
  });
}

export function getCat(id) {
  return new Promise((resolve, reject) => {
    const url = apiUrl + 'cats/' + id;
    fetch(url, {
      method: 'GET',
      credentials: 'same-origin',
    }).then((res) => {
      return res.json();
    })
      .then((res) => resolve(res))
      .catch((error) => {
        console.error('Error:', error);
        reject('error');
      });
  });
}

export function updateCat(id, cat) {
  const url = apiUrl + 'cats/' + id;
  fetch(url, {
    method: 'PATCH',
    body: cat,
    credentials: 'same-origin',
  }).then((res) => {
    return res.json();
  }).then(() => {
    document.getElementById('form').innerHTML = `
      Cat updated successfully!
    `;
  })
    .catch((error) => console.error('Error:', error));
}

export function findCats(search) {
  const url = apiUrl + 'find?text=' + search;
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      credentials: 'same-origin',
    }).then((res) => {
      return res.json();
    })
    .then((data) => {
      resolve(data);
    })
    .catch((error) => {
      console.error('Error:', error);
      reject('error');
    });
  });
}
