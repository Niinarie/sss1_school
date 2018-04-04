const apiUrl = './api/';

export function getCats() {
  return new Promise((resolve, reject) => {
    const url = apiUrl + 'cats';
    fetch(url, {
      method: 'GET',
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
  }).then((res) => {
    return res.json();
  }).then(()=> {
    document.getElementById('form').innerHTML = `
      Cat submitted successfully!
    `;
  })
  .catch((error) => console.error('Error:', error));
}

export function deleteCat(id) {
  return new Promise((resolve, reject) => {
    const url = apiUrl + 'cats/' +id;
    fetch(url, {
      method: 'DELETE',
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
    const url = apiUrl +'cats/' +id;
    fetch(url, {
      method: 'GET',
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
  const url = apiUrl +'cats/' +id;
  fetch(url, {
    method: 'PATCH',
    body: cat,
  }).then((res) => {
    return res.json();
  }).then(()=> {
    document.getElementById('form').innerHTML = `
      Cat updated successfully!
    `;
  })
  .catch((error) => console.error('Error:', error));
}
