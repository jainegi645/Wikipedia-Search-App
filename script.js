//created a varible and refernced it, to a class
const form = document.querySelector('.js-search-form');
//added a event listener to the variable, 
form.addEventListener('submit',handleSubmit);


//creted an async function to handle submit event
async function handleSubmit(event){
  
   // prevent page from reloading when form is submitted
event.preventDefault();

  //get the value of the input field
  const inputValue = document.querySelector('.js-search-input').value;
  
  //remove whitespace from the input and save it to new variable 
  const searchQuery = inputValue.trim();
  console.log(searchQuery);
  
 try{

  //created a variable, which saves result of 'search query'
   const results = await searchWikipedia(searchQuery);
   displayResults(results);
   console.log(results);
 } 
  
  catch(err){
console.log(err);
    alert('failed to search on wiki');
  }
}


//to search in the wikipedia api
async function searchWikipedia(searchQuery){
 
const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;

const response = await fetch(endpoint);
  
  if(!response.ok){
    throw Error(response.statusText);
  }
  const json = await response.json();
  
   console.log(json);
 return json;
}

//display the search result

function displayResults(results){
  
   const searchResults = document.querySelector('.js-search-results');

  //iterate over the `search` array.
   results.query.search.forEach(result=> {
    const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
    
    //append the result to dom
    searchResults.insertAdjacentHTML(

    `beforeend`,
      `<div class = 'result-item'>
  <h3 class = 'result-title'>
  <a href = '${url}'target = '_blank' rel = 'noopener'> ${result.title}</a>
  </h3>
  
  <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
        </h3>
        <a href="${url}" class="result-link" target="_blank" rel="noopener">${url}</a>
        
        <span class="result-snippet">${result.snippet}</span><br>
      </div>`
    );
  });

}


