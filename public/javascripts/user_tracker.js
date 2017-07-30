//var userTrackerURL = "http://localhost:3000/api/v1/users";
var userTrackerURL = "https://serene-temple-33600.herokuapp.com/api/v1/users";

function sendVisitedPagesToUserTrackerApplication() {
  var user_name = "";
  var user_email = "";
  if(sessionStorage.getItem('user')){
    var user = JSON.parse(sessionStorage.getItem('user'));
    user_name = user.name;
    user_email = user.email;
  }

  var user = {user:{name: user_name, email: user_email, pages_attributes: JSON.parse(sessionStorage.getItem('visited_pages'))}};
  
  $.ajax({
      type: "POST",
      data :JSON.stringify(user),
      url: userTrackerURL,
      contentType: "application/json"
  }).done(function(data) {
    sessionStorage.setItem('user', JSON.stringify(data));
  });
}

beforeSubmit = function(){
  var user_name = document.forms["contactForm"]["name"].value;
  var user_email = document.forms["contactForm"]["email"].value;

  var user = {user:{name: user_name, email: user_email, pages_attributes: JSON.parse(sessionStorage.getItem('visited_pages'))}};
  
  $.ajax({ 
     type: "POST",
     data :JSON.stringify(user),
     url: userTrackerURL,
     contentType: "application/json",
     success: function(data) {
       sessionStorage.setItem('user', JSON.stringify(data));
     },
     complete: function() { 
       $('#contactForm').submit();
     }
  });
}

function savePageToLocalStorage() {
  var page = {name: document.title, url: document.URL, visited_at: new Date()}
  console.log(page);
  var visitedPages = [];
  if(sessionStorage.getItem('visited_pages')){
    visitedPages = JSON.parse(sessionStorage.getItem('visited_pages'));
    var exists = visitedPages.find(p => p.name === page.name);
    if(exists)
      return false;
  }
  visitedPages.push(page);
  sessionStorage.setItem('visited_pages', JSON.stringify(visitedPages));
  
  if(sessionStorage.getItem('user')){
    var user = JSON.parse(sessionStorage.getItem('user'));
    if(user.id){
      sendVisitedPagesToUserTrackerApplication();
    }
  }
}

savePageToLocalStorage();
