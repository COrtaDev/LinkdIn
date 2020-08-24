# Dizney+

## Features-List

1. #### Hosting on Heroku

2. #### User Authorization
    - Visitors arrive on landing page when not logged in
    - Visitors can sign up, log in, log out
    - Visitors can use a demo login to try the site
    - Visitors must log in to enter site
    - Users arrive on home page when logged in
3. #### CRUD - User Profile Settings
    - Users can navigate profile options with drop-down menu
    - Users can add profile with name/avatar
    - Users can update profile name/avatar
    - Users can delete profile
4. #### Watch List - CRUD across watch list items
    - Users have a watch list that is initially empty
    - Users can add/remove videos to their watch list
5. #### Search
    - Users can search for videos by:
        - Title
        - Actor(Bonus)
        - Genre(Bonus)
    - Explore-block shows movie collections under text input
6. #### Catalog/Profile (Home)
    - Users have a home page as a catalog/profile of videos
    - Users can dynamically update home page based on recently watched items
    - Users can view videos based on genre/type
    - Users can browse through a main banner of ten featured/trending videos
    - Users can browse across five major collections:
        - Disney
        - Pixar
        - Marvel
        - Star Wars
        - National Geography
7. #### videos Player
    - Users can play/pause movie
    - Users can time-stamp movie


## Bonus
1. #### CRUD - Continue Watching
    - Users can resume play where they left off.
    - Users can watch from the beginning.
2. #### "It's a small world after all..." Selecting app language
    - Users can change the global site language
3. #### Search
    - Users can see suggested search results render per keystroke


# Main Component Routes
### /
- GET / - Renders the default page
### /login
- GET /login - Render form to enter email credentials
- POST /login - Submits the email credtials, redirect to GET /login/password
- POST /login/password - Submits the password to the server and redirect to GET /account/profile/select if more than one profile
- POST /account/profile/select - Set the current profile and redirect to /home
### /home
- GET /home - Renders the catalogue
### /search
- GET /search - Render the search page
- PATCH /search - Update to display matched results
### /watchlist
- GET /watchlist - Render the associated watchlist for current profile
### /movies
- GET /movies - Renders all movies
- GET /movies/:id - Render the associated id movie
- DELETE /movies/:id - Deletes from watch list
### /series
- GET /series - Renders all series
- GET /series/:id - Renders the associated id series
- DELETE /series/:id - Deletes from watch list
### /select-avatar
- GET /select-avatar - Render possible avatars for a profile when you add or edit a profile
- PATCH /select-avatar - Save the selected avatar to the profile redirect GET /account/profile/add or account/profile/edit
### /account/profile
- GET /add - Renders the add profile screen to add name and kid options
- POST /add:id - Save newly added profile redirects GET account/profile/select
- GET /select - Renders a screen to select current profile
- POST /select - Set the current profile and redirect to GET /home
- GET /edit - Renders a screen with all available profiles
- GET /edit:id - Renders a screen to edit the selected profile
- PATCH /edit - Updates the profiles and redirects to GET account/profile/select
- PATCH /edit:id - Updates the preferences for a selected profile and redirects to GET account/profile/select
- DESTROY /edit:id - Deletes selected profile and redirects to GET account/profile/edit

### /brand
- GET /brand/:id

### Accounts
column name | data type | details
------------|-----------|--------
id | integer (serial) | not null, primary key
email | string | not null, indexed, unique
passwordDigest | string | not null
passwordSalt | string | not null
sessionToken | string | not null, unique


### Profiles
- Must always have at least one profile, but you may have up to 7 profiles per account.

column name | data type | details
------------|-----------|--------
id | integer (serial) | not null, primary key
name | string | not null
isKid | boolean | default false
accountId | integer | not null, foreign key references Accounts(id)
avatarId | integer | not null, foreign key references Avatars(id)


### Videos
column name | data type | details
------------|-----------|--------
id | integer (serial) | not null, primary key
title | string | not null, unique, indexed
description | string | not null
rating | integer (serial) | not null
year | integer | not null
isOriginal | boolean | default false
isMovie | boolean | not null
runtime | string | not null
director | string | nullable
starring | string | not null
seasons | string | nullable
genres | string | not null
details | string | not null
videoUrl | url | not null
titleImg | url | not null
backgroundImg | url | not null
buttonImg | url | not null
brandId | integer | not null, foreign key references Brands(id)


### Brands
column name | data type | details
------------|-----------|--------
id | integer (serial) | not null, primary key
brandName | string | not null
titleImg | url | not null
backgroundImg | url | not null
buttonImg | url | not null


### WatchListedVideos (join table)
column name | data type | details
------------|-----------|--------
id | integer (serial) | not null, primary key
profileId | integer | not null, foreign key references Profiles(id)
videoId | integer |  (allow null), foreign key references Videos(id)


### MovieSelections
column name | data type | details
------------|-----------|--------
id | integer (serial) | not null, primary key
selection | string | not null


### SeriesSelections
column name | data type | details
------------|-----------|--------
id | integer (serial) | not null, primary key
selection | string | not null


### Avatars
column name | data type | details
------------|-----------|--------
id | integer (serial) | not null, primary key
name | string | not null
avatarImg | url | not null


### ContinueWatchings (Bonus)
column name | data type | details
------------|-----------|--------
id | integer (serial) | not null, primary key
