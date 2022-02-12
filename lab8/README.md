CS-546 Lab 8
Template Time
For this lab, you will be using HTML, CSS, and Handlebars to make your first simple templated web application! You will be building a form that allows you to search through characters in the  Marvel API.

You will not need to use a database for this lab. 

You must use the async/await keywords (not Promises). You will also be using axios (Links to an external site.), which is a HTTP client for Node.js; you can install it with npm i axios. 

Marvel API
You will be using the Marvel API (Links to an external site.).  You will need to register and sign up for an API key.  You will not be able to make requests to the API without signing up and getting an API key (Links to an external site.).  You will use the Characters (Links to an external site.) listings  Please look at the data returned so you know the schema of the data and the objects it returns (the links to Characters above work but using my API key.  DO NOT use my API key. Please register for your own.  You will need to compose the URL with your API key, a ts (time stamp) and a hash.  

You can use the following code to construct the URL. You can read more about AUTHORIZING AND SIGNING REQUESTS from the link below

https://developer.marvel.com/documentation/authorization (Links to an external site.) 

const md5 = require('blueimp-md5');
const publickey = 'your_public_key(API KEY) from Marvel dev portal';
const privatekey = 'your private key from Marvel dev portal';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
You will be using two endpoints of the Marvel API which is an API about Marvel  for your Axios calls.  The search character endpoint where you pass the search term as a query string parameter: https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=SEARCH_TERM_HERE  and then you'll get an individual character using the endpoint

https://gateway.marvel.com:443/v1/public/characters/:id
:id where :id is the ID of the character you are looking up.

You will use these two endpoints to make your axios.get calls depending on which route is called. 

You will be making three routes/pages in your application:

http://localhost:3000/ the main page of this application will provide a search form to start a search of characters for a keyword. 
http://localhost:3000/search this page will make the axios call to the search endpoint and return up to 20 matching results that contain the provided request form param, searchTerm
http://localhost:3000/characters/{id} this page will show all the details of the character with the id matching the provided URL param, id
All other URLS should return a 404

## `GET http://localhost:3000/`
This page will respond with a valid HTML document. The title of the document should be "Character Finder". You should have the title set as the <title> element of the HTML document and as an h1 in your document.

Your page should reference a CSS file, /public/site.css; this file should have at least 5 rulesets that apply to this page; these 5 rules can also apply to elements across all of your pages, or be unique to this page.

You should have a main element, and inside of the main element have a p element with a brief (2-3 sentence description) of what your website does.

Also inside the main element, you will have a form; this form will POST to /search. This form will have an input and a label; the label should properly reference the same id as the input. You should also have a input with a type of submit that submits the form. The input in your form  where the user types the search term should have a name of searchTerm.


POST http://localhost:3000/search
This route will read the searchTerm parameter and then make an axios call to the Marvel API endpoint searching for that keyword. For example, if the user typed spider in the input field, you would make the axios call to: https://gateway.marvel.com/v1/public/characters?nameStartsWith=SEARCH_TERM_HERE&ts=TIME_STAMP_HERE&apikey=API_KEY_HERE&hash=HASH_HERE

This route will respond with a valid HTML document with the results returned from the API. The title of the document should be "Characters Found". You should have the title set as the <title> element of the HTML document and as an h1 in your document. In an h2 element, you will print the supplied searchTerm.

Your page should reference a CSS file, /public/site.css; this file should have at least 5 rulesets that apply to this page; these 5 rules can also apply to elements on /, or be unique to this page.

You should have a main element, and inside of the main element have a ul tag that has a list of up to 20 characters matching the searchTerm found in the request body in the following format (after searching under). DO NOT SHOW MORE THAN 20 Characters.

<ul>
    <li>
        <a href="/characters/1010727">Spider-dok</a>
    </li>
    <li>
        <a href="/characters/1009157">Spider-Girl (Anya Corazon)</a>
    </li>
    <li>
        <a href="/Characters/1009609">Spider-Girl (May Parker)</a>
    </li>
</ul>
You must also provide an a tag that links back to your / route with the text Make another search.

If no matches are found, you will print the following HTML paragraph:

<p class="not-found">We're sorry, but no results were found for {searchTerm}.</p>
If the user does not input text into their form or enters just spaces into the input field, make sure to give a response status code of 400 on the page, and render an HTML page with a paragraph class called error; this paragraph should describe the error.

GET http://localhost:3000/characters/{id}
This route will query the Marvel API using the the id parameter in the URL (for example:  https://gateway.marvel.com/v1/public/characters/1009609?ts=TS_HERE&apikey=API_KEY_HERE&hash=HASH_HERE) and will  respond with a valid HTML document with some of the character details. The title of the document should be the name of the character. You should have the title set as the <title> element of the HTML document.  

Your page should reference a CSS file, /public/site.css; this file should have at least 5 rulesets that apply to this page; these 5 rules can also apply to elements on /, or be unique to this page.

You should have a main element, and inside of the main element, you will have a div tag that has an h1 with the character name,  an img which the src is set to the value read from thumbnail.path in the data which is a URL to an image for the character, you will have a p element that contains the character  description, a h2 that's content says "Comics"   and a ul  for the list of comics. You only need to display the comic name  as the list items

Matching Character Data Returned from API (We will not be using all the fields, just the ones noted above):

{
  "code": 200,
  "status": "Ok",
  "copyright": "© 2021 MARVEL",
  "attributionText": "Data provided by Marvel. © 2021 MARVEL",
  "attributionHTML": "&lt;a href=\"http://marvel.com\" (Links to an external site.);&gt;Data provided by Marvel. © 2021 MARVEL&lt;/a&gt;",
  "etag": "284b3f7635608d1e18add4ff80c10902ef5959b4",
  "data": {
    "offset": 0,
    "limit": 20,
    "total": 1,
    "count": 1,
    "results": [
      {
        "id": 1009609,
        "name": "Spider-Girl (May Parker)",
        "description": "May \"Mayday\" Parker is the daughter of Spider-Man and Mary Jane Watson-Parker. Born with all her fatherï¿½s powers-and the same silly sense of humor-sheï¿½s grown up to become one of Earthï¿½s most trusted heroes and a fitting tribute to her proud papa.",
        "modified": "2016-03-02T11:04:46-0500",
        "thumbnail": {
          "path": "http://i.annihil.us/u/prod/marvel/i/mg/1/70/4c003adccbe4f (Links to an external site.)",
          "extension": "jpg"
        },
        "resourceURI": "http://gateway.marvel.com/v1/public/characters/1009609 (Links to an external site.)",
        "comics": {
          "available": 196,
          "collectionURI": "http://gateway.marvel.com/v1/public/characters/1009609/comics (Links to an external site.)",
          "items": [
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/comics/5286 (Links to an external site.)",
              "name": "Amazing Spider-Girl (2006)"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/comics/5281 (Links to an external site.)",
              "name": "Amazing Spider-Girl (2006) #1"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/comics/5591 (Links to an external site.)",
              "name": "Amazing Spider-Girl (2006) #2"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/comics/5701 (Links to an external site.)",
              "name": "Amazing Spider-Girl (2006) #3"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/comics/5843 (Links to an external site.)",
              "name": "Amazing Spider-Girl (2006) #4"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/comics/5997 (Links to an external site.)",
              "name": "Amazing Spider-Girl (2006) #5"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/comics/6130 (Links to an external site.)",
              "name": "Amazing Spider-Girl (2006) #6"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/comics/6270 (Links to an external site.)",
              "name": "Amazing Spider-Girl (2006) #7"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/comics/13478 (Links to an external site.)",
              "name": "Amazing Spider-Girl (2006) #8"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/comics/15856 (Links to an external site.)",
              "name": "Amazing Spider-Girl (2006) #9"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/comics/15966 (Links to an external site.)",
              "name": "Amazing Spider-Girl (2006) #10"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/comics/16151 (Links to an external site.)",
              "name": "Amazing Spider-Girl (2006) #11"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/comics/16522 (Links to an external site.)",
              "name": "Amazing Spider-Girl (2006) #12"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/comics/16523 (Links to an external site.)",
              "name": "Amazing Spider-Girl (2006) #13"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/comics/17249 (Links to an external site.)",
              "name": "Amazing Spider-Girl (2006) #14"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/comics/17385 (Links to an external site.)",
              "name": "Amazing Spider-Girl (2006) #15"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/comics/17629 (Links to an external site.)",
              "name": "Amazing Spider-Girl (2006) #16"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/comics/70668 (Links to an external site.)",
              "name": "Amazing Spider-Girl (2006) #17"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/comics/20868 (Links to an external site.)",
              "name": "Amazing Spider-Girl (2006) #18"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/comics/21003 (Links to an external site.)",
              "name": "Amazing Spider-Girl (2006) #19"
            }
          ],
          "returned": 20
        },
        "series": {
          "available": 37,
          "collectionURI": "http://gateway.marvel.com/v1/public/characters/1009609/series (Links to an external site.)",
          "items": [
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/series/1126 (Links to an external site.)",
              "name": "Amazing Spider-Girl (2006 - 2009)"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/series/2234 (Links to an external site.)",
              "name": "AMAZING SPIDER-GIRL VOL. 1: WHATEVER HAPPENED TO THE DAUGHTER OF SPIDER-MAN TPB (2007)"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/series/3101 (Links to an external site.)",
              "name": "AMAZING SPIDER-GIRL VOL. 2: COMES THE CARNAGE! TPB (2007)"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/series/5376 (Links to an external site.)",
              "name": "Amazing Spider-Man Family (2008 - 2009)"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/series/1143 (Links to an external site.)",
              "name": "Avengers Next (2006 - 2007)"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/series/1995 (Links to an external site.)",
              "name": "Cable (1993 - 2002)"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/series/5260 (Links to an external site.)",
              "name": "Counter X Vol. 1 (2008)"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/series/19 (Links to an external site.)",
              "name": "Daredevil Vol. II: Parts of a Hole (1999)"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/series/2119 (Links to an external site.)",
              "name": "Fantastic Five (1999 - 2000)"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/series/3281 (Links to an external site.)",
              "name": "Fantastic Five: The Final Doom (2007)"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/series/13881 (Links to an external site.)",
              "name": "Fear Itself: The Home Front (2010)"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/series/2572 (Links to an external site.)",
              "name": "Iron Man (1998 - 2004)"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/series/2031 (Links to an external site.)",
              "name": "J2 (1998 - 1999)"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/series/923 (Links to an external site.)",
              "name": "Last Hero Standing (2005)"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/series/991 (Links to an external site.)",
              "name": "Last Planet Standing (2006)"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/series/322 (Links to an external site.)",
              "name": "MARVEL AGE: SPIDER-GIRL VOL. 1: LEGACY DIGEST (2004)"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/series/26878 (Links to an external site.)",
              "name": "Marvel's Greatest Creators: What If? - Spider-Girl (2019)"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/series/2059 (Links to an external site.)",
              "name": "Paradise X (2002 - 2003)"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/series/2431 (Links to an external site.)",
              "name": "Paradise X Vol. 1 (2007)"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/series/2702 (Links to an external site.)",
              "name": "PARADISE X VOL. 2 TPB [NEW PRINTING] (2007)"
            }
          ],
          "returned": 20
        },
        "stories": {
          "available": 309,
          "collectionURI": "http://gateway.marvel.com/v1/public/characters/1009609/stories (Links to an external site.)",
          "items": [
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/stories/791 (Links to an external site.)",
              "name": "Cover #791",
              "type": "cover"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/stories/792 (Links to an external site.)",
              "name": "Interior #792",
              "type": "interiorStory"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/stories/806 (Links to an external site.)",
              "name": "Cover #806",
              "type": "cover"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/stories/807 (Links to an external site.)",
              "name": "Interior #807",
              "type": "interiorStory"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/stories/808 (Links to an external site.)",
              "name": "Cover #808",
              "type": "cover"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/stories/809 (Links to an external site.)",
              "name": "Interior #809",
              "type": "interiorStory"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/stories/810 (Links to an external site.)",
              "name": "Cover #810",
              "type": "cover"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/stories/811 (Links to an external site.)",
              "name": "Interior #811",
              "type": "interiorStory"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/stories/812 (Links to an external site.)",
              "name": "Cover #812",
              "type": "cover"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/stories/813 (Links to an external site.)",
              "name": "Interior #813",
              "type": "interiorStory"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/stories/814 (Links to an external site.)",
              "name": "Cover #814",
              "type": "cover"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/stories/815 (Links to an external site.)",
              "name": "Interior #815",
              "type": "interiorStory"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/stories/816 (Links to an external site.)",
              "name": "Cover #816",
              "type": "cover"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/stories/817 (Links to an external site.)",
              "name": "Interior #817",
              "type": "interiorStory"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/stories/818 (Links to an external site.)",
              "name": "Cover #818",
              "type": "cover"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/stories/819 (Links to an external site.)",
              "name": "Interior #819",
              "type": "interiorStory"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/stories/820 (Links to an external site.)",
              "name": "\"THE PEOPLE PLAYED BY GAMES!\" Torn between her loyalties to Kaine and the Black Tarantula, Spider-Girl finally confronts Lady Oc",
              "type": "cover"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/stories/821 (Links to an external site.)",
              "name": "\"THE PEOPLE PLAYED BY GAMES!\" Torn between her loyalties to Kaine and the Black Tarantula, Spider-Girl finally confronts Lady Oc",
              "type": "interiorStory"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/stories/822 (Links to an external site.)",
              "name": "\"IF THIS BE MY DESTINY—!\" Spider-Girl learns the fate Norman Osborn planned for his grandson when she finally uncovers the secre",
              "type": "cover"
            },
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/stories/823 (Links to an external site.)",
              "name": "\"IF THIS BE MY DESTINY—!\" Spider-Girl learns the fate Norman Osborn planned for his grandson when she finally uncovers the secre",
              "type": "interiorStory"
            }
          ],
          "returned": 20
        },
        "events": {
          "available": 1,
          "collectionURI": "http://gateway.marvel.com/v1/public/characters/1009609/events (Links to an external site.)",
          "items": [
            {
              "resourceURI": "http://gateway.marvel.com/v1/public/events/302 (Links to an external site.)",
              "name": "Fear Itself"
            }
          ],
          "returned": 1
        },
        "urls": [
          {
            "type": "detail",
            "url": "http://marvel.com/characters/2171/spider-girl?utm_campaign=apiRef& (Links to an external site.);amp;utm_source=a8f9ccf932bf29fd379ef00e11668673"
          },
          {
            "type": "wiki",
            "url": "http://marvel.com/universe/Spider-Girl_(MC2)?utm_campaign=apiRef& (Links to an external site.);amp;utm_source=a8f9ccf932bf29fd379ef00e11668673"
          },
          {
            "type": "comiclink",
            "url": "http://marvel.com/comics/characters/1009609/spider-girl_may_parker?utm_campaign=apiRef& (Links to an external site.);amp;utm_source=a8f9ccf932bf29fd379ef00e11668673"
          }
        ]
      }
    ]
  }
}
HTML Format Printed for the character.  This will go into your main element:

<div> 
  <h1>Spider-Girl (May Parker)</h1> 
  <img alt= "Spider-Girl (May Parker)"src="http://i.annihil.us/u/prod/marvel/i/mg/1/70/4c003adccbe4f (Links to an external site.)"/> 
  <p>May \"Mayday\" Parker is the daughter of Spider-Man and Mary Jane Watson-Parker. Born with all her fatherï¿½s powers-and the same silly sense of humor-sheï¿½s grown up to become one of Earthï¿½s most trusted heroes and a fitting tribute to her proud papa.</p> 
  <h2>Comics</h2>
  <ul>
    <li>Amazing Spider-Girl (2006)</li>
    <li>Amazing Spider-Girl (2006) #1</li>
    <li>Amazing Spider-Girl (2006) #2</li>
    <li>Amazing Spider-Girl (2006) #3</li>
    <li>Amazing Spider-Girl (2006) #4</li>
    <li>Amazing Spider-Girl (2006) #5</li>
    <li>Amazing Spider-Girl (2006) #6</li>
    <li>Amazing Spider-Girl (2006) #7</li>
    <li>Amazing Spider-Girl (2006) #8</li>
    <li>Amazing Spider-Girl (2006) #9</li>
    <li>Amazing Spider-Girl (2006) #10</li>
    <li>Amazing Spider-Girl (2006) #11</li>
    <li>Amazing Spider-Girl (2006) #12</li>
    <li>Amazing Spider-Girl (2006) #13</li>
    <li>Amazing Spider-Girl (2006) #14</li>
    <li>Amazing Spider-Girl (2006) #15</li>
    <li>Amazing Spider-Girl (2006) #16</li>
    <li>Amazing Spider-Girl (2006) #17</li>
    <li>Amazing Spider-Girl (2006) #18</li>
    <li>Amazing Spider-Girl (2006) #19</li>
  </ul>
</div> 
If there is no character found for the given ID, make sure to give a response status code of 404 on the page, and render an HTML page with a paragraph class called error; this paragraph should describe the error. 

http://localhost:3000/public/site.css
This file should have 5 rulesets that apply to the / route, and 5 rulesets that apply to all of your pages. Rulesets may be shared across both pages; for example, if you styled a p tag, it would count as 1 of the 5 for both pages.

You may include more than 5 rulesets if you so desire.

References and Packages
Basic CSS info can easily be referenced in the MDN CSS tutorial (Links to an external site.).

Hints
You can use variables in your handlebars layout, that you pass to res.render. For example, in your layout you could have:

<meta name="keywords" content="{{keywords}}" />
And in your route:

res.render("someView", {keywords: "dogs coffee keto"});
Which will render as:

<meta name="keywords" content="dogs coffee keto" />
Or, perhaps, the title tag.

Requirements
You must not submit your node_modules folder
You must remember to save your dependencies to your package.json folder
You must do basic error checking in each function
Check for arguments existing and of proper type.
Throw if anything is out of bounds (ie, trying to perform an incalculable math operation or accessing data that does not exist)
You MUST use async/await for all asynchronous operations.
You must remember to update your package.json file to set app.js as your starting script!
Your HTML must be valid (Links to an external site.) or you will lose points on the assignment.
Your HTML must make semantical sense; usage of tags for the purpose of simply changing the style of elements (such as i, b, font, center, etc) will result in points being deducted; think in terms of content first, then style with your CSS.
You can be as creative as you'd like to fulfill front-end requirements; if an implementation is not explicitly stated, however you go about it is fine (provided the HTML is valid and semantical). Design is not a factor in this course.
All inputs must be properly labeled!
All previous requirements about the package.json author, start task, dependenices, etc. still apply