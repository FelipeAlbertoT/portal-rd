function sendVisitedPagesToUserTrackerApplication() {
  var user_name = "";
  var user_email = "";
  if(localStorage.getItem('user')){
    var user = JSON.parse(localStorage.getItem('user'));
    user_name = user.name;
    user_email = user.email;
  }

  var user = {user:{name: user_name, email: user_email, pages_attributes: JSON.parse(localStorage.getItem('visited_pages'))}};
  
  $.ajax({
      type: "POST",
      data :JSON.stringify(user),
      url: "http://localhost:3000/api/v1/users",
      contentType: "application/json"
  }).done(function(data) {
    localStorage.setItem('user', JSON.stringify(data));
  });
}

beforeSubmit = function(){
  var user_name = document.forms["contactForm"]["name"].value;
  var user_email = document.forms["contactForm"]["email"].value;

  var user = {user:{name: user_name, email: user_email, pages_attributes: JSON.parse(localStorage.getItem('visited_pages'))}};
  
  $.ajax({ 
     type: "POST",
     data :JSON.stringify(user),
     url: "http://localhost:3000/api/v1/users",
     contentType: "application/json",
     success: function(data) {
       localStorage.setItem('user', JSON.stringify(data));
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
  if(localStorage.getItem('visited_pages')){
    visitedPages = JSON.parse(localStorage.getItem('visited_pages'));
    var exists = visitedPages.find(p => p.name === page.name);
    if(exists)
      return false;
  }
  visitedPages.push(page);
  localStorage.setItem('visited_pages', JSON.stringify(visitedPages));
  
  if(localStorage.getItem('user')){
    var user = JSON.parse(localStorage.getItem('user'));
    if(user.id){
      sendVisitedPagesToUserTrackerApplication();
    }
  }
}

savePageToLocalStorage();
