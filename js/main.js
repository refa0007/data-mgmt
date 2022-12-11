
import catnames from "./catlist.js";


function pickRandomName() {
  let num = Math.floor(Math.random() * catnames.length);
  let name = catnames[num];
  console.log (name);
  let removed = catnames.splice(num, 1);
  return name; 
}



async function start(){
  const response= await fetch ("https://api.thecatapi.com/v1/categories")
  const data = await response.json()
  console.log(data);
  createCatlist (data);
  }

start();


function createCatlist(catlist){
document.getElementById("category").innerHTML= `
<label>Pick a category</label>
<select id="select">
  <option>Please select</option>
  ${catlist.map(function(category){
    return `<option value='${category.id}'>${category.name}</option>`
  }).join('')}
  </select>
  `
  const select = document.getElementById('select');
  

select.addEventListener('change', handleChange);

}


function handleChange (ev) {
let cat = ev.target.value;
const url = `https://api.thecatapi.com/v1/images/search?limit=12&category_ids=${cat}`;
const api_key = "live_vec53O9J4xJL6b4yXj5SoiycFy4uiChJ5qJ0ZJ3o5NIViqVIWK8KoJEtaslDBEhR"

//added
if (handleChange=true){
  let grid= document.getElementById('grid')
  grid.innerHTML= '';
}

 fetch(url,{headers: {
      'x-api-key': api_key
    }})
 .then((response) => {
   return response.json();
 })
.then((data) => {
  let imagesData = data;
  console.log (imagesData);
  imagesData.map(function(imageData) {

    let randomName= pickRandomName();

    localStorage.setItem (imageData.id,randomName); //saved in local storage
    let image = document.createElement('img');
   
    image.src = `${imageData.url}`;
        
    let gridCell = document.createElement('figure');
    let div = document.createElement ('div');
    div.classList.add('card');
    gridCell.classList.add('col');
    

    gridCell.appendChild(image)
    let figcap= document.createElement('figcaption');
    figcap.textContent= randomName;
    gridCell.appendChild(figcap);
    div.appendChild(gridCell);
    // gridCell.innerHTML= `<img src="${imageData.url}">`;
    let grid= document.getElementById('grid')
    
    grid.appendChild(div);
 
    })  ; 
})
.catch(function(error) {
   console.log(error);
});
}
