News Navigator
News Sprint | NewSprint
worldview

SUNDAY

- testing
- finalize domain
- buy domain
- add new cities with populated data
- more css revisions
- background photo should pull in from flickr (or something)
- redo dashboard

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


