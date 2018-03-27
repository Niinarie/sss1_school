
export function getCats() {
  console.log('cats');
}

export function addCat(cat) {
  const url = 'http://localhost:3000/api/upload';
  fetch(url, {
    method: 'POST',
    body: cat,
  }).then((res) => {
    return res.json();
  })
  .catch((error) => console.error('Error:', error));
  console.log('new cat added');
}
