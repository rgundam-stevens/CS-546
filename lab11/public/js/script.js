
(function ($) {

  $('#showList').show();
  $.ajax({
    url: "http://api.tvmaze.com/shows",
    success: function (result) {
      let list = document.getElementById("showList");
      console.log(result);
      for (let i = 0; i < result.length; i++) {
        let c = document.createElement("li");
        try {
          c.innerHTML = `
            <a class="link" href=" ${result[i]._links.self.href}">${result[i].name}</a>
        `;
        temp(c);
          list.appendChild(c);
        } catch (e) {}
      }
    },
  });



 
  let searchBar = document.getElementById("search_term");
  let list = document.getElementById("showList");

  $('#searchForm').submit((event) => {
    event.preventDefault();
    if ($('#search_term').val().trim()) {
      $('#error').hide();
      $('#show').hide();
      $('#search_label').removeClass('error');
      $('#search_term').removeClass('inputClass');
      if (!searchBar.value) return;
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  console.log(searchBar.value);
  $('#showList').show();
  $('#homeLink').show();
  
  $.ajax({
    url: "http://api.tvmaze.com/search/shows?q=" + searchBar.value,
    success: function (result) {
      let list = document.getElementById("showList");
      console.log(result);
      for (let i = 0; i < result.length; i++) {
        try {
          let c = document.createElement("li");

          c.innerHTML = `
                <a class="link" href=${result[i].show._links.self.href}>${result[i].show.name}</a>
            `;
          temp(c);
          list.appendChild(c);
        } catch (e) {}
      }
    },
  });
      $('#searchForm').trigger('reset');
      $('#search_term').focus();
    } else {
      $('#error').show();
      $('#error').html('You must enter an input value');
      $('#search_label').addClass('error');
      $('#search_term').addClass('inputClass');
      $('#search_term').focus();
      $('#search_term').value= "";
      $('#showList').hide();
      $('#show').hide();
      $('#homeLink').show();
    }
  });



let temp = function(item){
  $(item).find("a").on('click', function(e){
    e.preventDefault();
    console.log('HERE');
    let currentLink = $(this);
    let currentUrl = currentLink.context.href;
    let req = {
      method : 'GET',
      url: currentUrl
    };
    $.ajax(req).then((res)=>{
      console.log(res);
      $('#showList').hide();
      $('#error').hide();
      $('#show').empty();
      // let show = document.getElementById("show");
      $("#show").append(`<h1>${res.name == null ? 'N/A' : res.name}</h1>`);
      if(res.image == null){
        $("#show").append(`<img src="public/no_image.jpeg" />`);
      }
      else{
      $("#show").append(`<img src="${res.image.medium}" />`);
      }
      let dl = document.createElement("dl");
      $(dl).append('<dt>language</dt>');
      $(dl).append(`<dd>${res.language == null ? 'N/A' : res.language}</dd>`);
      $(dl).append('<dt>genres</dt>');
      let dd = document.createElement("dd");
      let ul = document.createElement("ul");
      if(res.genres.length){
        res.genres.forEach(element => {
          $(ul).append(`<li>${element}</li>`);
        });
        $(dd).append(ul);
      }
      else {
        $(dd).text('N/A');
      }
      $(dl).append(dd);
      $(dl).append('<dt>Average Rating</dt>');
      $(dl).append(`<dd>${res.rating.average == null ? 'N/A' : res.rating.average}</dd>`);
      $(dl).append('<dt>Network</dt>');
      $(dl).append(`<dd>${res.network == null ? 'N/A' : res.network.name}</dd>`);
      $(dl).append('<dt>Summary</dt>');
      $(dl).append(`<dd>${res.summary == null ? 'N/A' : res.summary}</dd>`);
      $("#show").append(dl);
      $('#show').show();
      $('#homeLink').show();
    }
    );
  });
};

})(window.jQuery);




  






  

  



