/*
 * This files holds all the code for Project 1.
 */

//Run once broswer has loaded everything
window.onload = function () {

 //Function that adds new Divs to the HTML page
 function addHTML(text)
{
  //Grab the container div
  var start_div = document.getElementById('start');
  //make a new Div element
  var newElement = document.createElement('div');
  //add text to that div
  newElement.innerHTML = text;
  //append it to the main 
  start_div.appendChild(newElement);
}

    async function SearchAuthors(title_search) {
        //append the parameter title_search to the URI for searching for titles
        const url = await fetch('http://openlibrary.org/search.json?title=' + title_search + '&limit=25');

        //create a JSON from the results

        const myJson = await url.json();

        //create an array to hold the results, first entry is temp

        let array = [
        {
               searchedBook: title_search,
               author_key: "test",
               author: "name",
               numBooks: 5
        }];

        var authors = [];

    //go through each entry of the json and search the author key

    for (var i = 0; i < myJson['docs'].length; i++)
    {
        if (myJson['docs'][i].author_key)
        {
            var authKey = myJson['docs'][i].author_key[0];
        }

        if (myJson['docs'][i].author_name)
        {
            var authName = myJson['docs'][i].author_name[0];
        }

        console.log(myJson['docs'][i].author_name);
        
        //author search
        const authURL = await fetch('https://openlibrary.org/search.json?author=' + authKey);
        const authJson = await authURL.json();
        var numOfBooks = authJson['numFound'];
        let results = 
            {
                searchedBook: title_search,
                //author_key: authKey,
                author: authName,
                numBooks: numOfBooks 
        };

            //put the results in the array, removing duplicates

        if (!authors.includes(authName))
        {
            array.push(results);
            authors.push(authName);
        }
            


        //take out the temp first entry of the array from earlier
        if (i == 0) 
        {
            array.shift();
        }
        //if (myJson['docs'][i].author_name)
        //{
          //  addHTML(array[i]["author"] + " wrote " + title_search + " and " + (array[i]["numBooks"] - 1) + " other books");
        //}

        //console.log(['searchedBook', title_search]['author_key', authKey]['numBooks', authJson['numFound']]);
        
        //array.push(['searchedBook', title_search] ['author_key', authKey] ['numBooks', authJson['numFound']]);

    }
        //sort array by number of books
        var temp = 0;

        for (var j = 0; j < array.length - 1; j++)
        {
            for (var k = 0; k < array.length - 1 - j; k++)
            {
                if (array[k]["numBooks"] < array[k + 1]["numBooks"])
                {
                    temp = array[k + 1];
                    array[k + 1] = array[k];
                    array[k] = temp;
                }
            }

        }

        //print

        for (var i = 0; i < array.length; i++)
        {
            addHTML(array[i]["author"] + " wrote " + title_search + " and " + (array[i]["numBooks"] - 1) + " other books");
        }
        //console.log(array);

        //console.log(array[0]["author_key"] + " wrote " + title_search + " and " + (array[0]["numBooks"] - 1) + " other books");
        //console.log(array[3]["author_key"] + " wrote " + title_search + " and " + (array[3]["numBooks"] - 1) + " other books");

}



//gran the current form in the HTML document
var form = document.querySelector("form");

//event that listens for form submit
form.addEventListener("submit", function(event) {
  var search_text = form.elements.value.value;
  
  console.log("Saving value", search_text);
  
  //get main DIV
  var start_div = document.getElementById('start');
  //Clear main DIV
  start_div.innerHTML = '';
  
  addHTML("Looking up Authors for search term "+search_text);
  
  //uncomment these lines to run your code here
  var printFunc = SearchAuthors(search_text)
  //printFunc(addHTML);
  
  event.preventDefault();
});

};