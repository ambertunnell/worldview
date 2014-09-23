News Navigator
News Sprint | NewSprint
worldview

BUGS

- like a picture, switch cities, go back to the city, the picture won't be marked as 'liked' already
- add text that says 'log in to add infinite cities'

WEDNESDAY

- firefox
  (fixed) - footer is pulled up to the top (can fix with a clearfix before the footer div)
  (fixed) - clicking a clock does not autoscroll down to the content
 (fixed) - webfont for footer 'about' text is not working
 (fixed) - webfont for 'more' lightbox page is not working
 (fixed) - small gap of white space above nav bar
- chrome
  (fixed) - tweet like button not working (on heroku)

PRIORITY

- finish dashboard (amber & koren)
- if there is no content (articles, photos, tweets), add a notice and fallback to bigger thing search
- stress testing (everyone)

OTHERS

(later) - article title filter (for fight times, other schedules)
  - if you're logged in and save something, when you save out and come back, the 'save' button should be 'saved'
- testing and collect all bugs/feedback items (everyone)
- background photo should pull in from flickr (or a map?)
- refine twitter results with fallbacks 
  - results page if there are no results for a search
  - (low) adding a city when you're not logged in
  - (next year) autocomplete when adding 3 characters
- general css styling (koren)
- possibly make clock hands white? easier to see on the dark background
  - possibly make night/day clock backgrounds
- footer & about page (and diagram of ajax calls)
- adding another login (facebook? linkedin?)

TUESDAY

(done) - switching to unicorn from webrick (edward)
(done) - fix the container for the 'log in' button in the top right - keeps overflowing (koren)
(done) - rename ap in twitter auth page (koren)
(done) - fix weather double click bug

MONDAY

(done) - tuesday (deploy to heroku to find problems)
(done) - show photos attached to tweets 
(done) - articles won't display if the article array is less than 10 (edward)
(done) - check for duplicate news headlines (edward)
(done) - fix log in with twitter button so the whole thing is a clickable link (ben)
(done) - add international and school filter to city locations (ben)
  (done) - if there's an int'l or school, go to the next array result
(done) - look at UTC offset for countries off by minutes and not hours (edward)
(done) - refactoring the login status (global variable) (edward)
  - preventing 'save' buttons from appearing on content if user is not logged in
(done) - make sure you only have 5 cities in a session (amber)
(done) - animate clocks getting added (ben)

SUNDAY

(done) - refining article results (edward)
(done) - additional city validation (ben)
  (done) - reject zipcodes
  (done) - reject cities already being displayed
  (done) - reject countries
(done) - all github, linkedin, twitter links for all of us to bottom of the page
(done) - getting fifth clock back up to clock row (koren)
(done) - finalize domain
(done) - buy domain
(done) - add new cities with populated data
(done) - more css revisions

QUESTION

What news should I read?

THURSDAY

(done) - make remove buttons work in dashboard (Ben)
  (done) - news
  (done) - tweets
  (done) - photos
(done) - format news time
(done) - make clocks reflect real time (Koren)
(done) - change 'my profile' click action so it doesn't display an empty dashboard if you go directly to #dashboard
- add stock info
- add cities - choose from 100 
  - autocomplete via pre-populated list with jquery ui
  - weather - get coordinates
  - news - city name (url encoded? not sure)
  - photos - city name (url encoded? not sure)
  - tweets - #cityname 
- add testing (through jasmine?)
- save user city in profile?
- hide save buttons when not logged in (AJAX response for if user is nil) (Ben)

WEDNESDAY

- persist user data (Ben, Amber, Koren)
  - save articles
  - save pictures
  - save tweets?
- add stock ticker (Ben)
- add animation (Ben)
- twitter (Koren, Edward)
  - confirm no dupe RTs in twitter
  - narrow search parameters
  - make hashtags, links, users clickable
- add cities (Edward)


OVERVIEW

  - news headlines streaming across the screen via ajax (nyt to start)
  - click a headline and open a modal preview
  - can click 'view source' to open full article
  - gets your location to include local news (html5 geo? ip via geocoder?)
    - clocks for your location and major hubs
      - click on one and enable local stories for where you are
      - major cities
        - NYC
        - London
        - SF
        - Paris
        - Tokyo
        - Sydney
      - 
  - user accounts track articles read history
  - user accounts track news source history
  - user accounts track vote up/vote down per article and news source
  - APIs to work with
    - NYT
    - 
  - 
  - (later) twitter sidebar with tweets relating to a news story

MODELS

  users
    name
    email
    password (devise)


  articles

  GIT BRANCHES
    ED:
      articlerefac - contains just article json request refac 
      TWIT refrac - contains article and twitter


