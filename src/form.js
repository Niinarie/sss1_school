import * as db from './db';

export function handleForm(formData) {
    console.log('handling form...');
    console.log(formData.get('title'));
    db.addCat(formData);
}
