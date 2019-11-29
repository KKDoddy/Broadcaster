[![Build Status](https://travis-ci.org/KKDoddy/Broadcaster.svg?branch=develop)](https://travis-ci.org/KKDoddy/Broadcaster)
[![Coverage Status](https://coveralls.io/repos/github/KKDoddy/Broadcaster/badge.svg?branch=develop)](https://coveralls.io/github/KKDoddy/Broadcaster?branch=develop)
# Broadcaster
 Broadcaster is a web application that allows users to report any form of corruption to appropriate authorities, and it also enables them bring to authorities attention anything that needs government intervention.

## Features
>- User signup : user can create an account
>- User signin : user can signin with an account
>- Create red-flag : a user can create a red-flag incident
>- View red-flags : users can view their red-flag records
>- View specific red-flag : users can look for a specific red-flag record
>- Modify red-flag's comment : users can modify a red-flag record's comment
>- Modify red-flag's location : users can modify a red-flag record's location
>- Delete red-flag : users can delete a particular red-flag record

## UI routes
|Route|Description|
|-----|-----------|
|https://kkdoddy.github.io/Broadcaster/UI/html/signup.html|user signup|
|https://kkdoddy.github.io/Broadcaster/UI/login.html|user signin|
|https://kkdoddy.github.io/Broadcaster/UI/html/newRed-flag.html|create red-flag|
|https://kkdoddy.github.io/Broadcaster/UI/html/my%20red-flags.html|view redflags|
|https://kkdoddy.github.io/Broadcaster/UI/html/editredComment.html|modify redflag's comment|
|https://kkdoddy.github.io/Broadcaster/UI/html/editredLocation.html|modify redflag's location|

## Endpoints
|Route|Method|Description|
|-----|------|-----------|
|api/v1/auth/signup|POST|user signup|
|api/v1/auth/signin|POST|user signin|
|api/v1/red-flags|POST|create red-flag|
|api/v1/red-flags|GET|view redflags|
|api/v1/red-flags/:redflagId|GET|view specific redflag|
|api/v1/red-flags/:redflagId/comment|PATCH|modify redflag's comment|
|api/v1/red-flags/:redflagId/location|PATCH|modify redflag's location|
|api/v1/red-flags/:redflagId|DELETE|delete redflag|

## Pivotal tracker stories
[Broadcaster Pivotal Tracker stories](https://www.pivotaltracker.com/n/projects/2410293)

### Terminologies
>
##### red-flag : a corruption case to be reported to the authorities.