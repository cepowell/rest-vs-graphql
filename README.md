# REST vs. GraphQL

## What does this API do?
This API, which is built once in a traditional RESTful style and once using GraphQL, is intended to be the backend for a potential future application called Do the Lesbians Die. This is a play on [Does the Dog Die](https://www.doesthedogdie.com/), and is imagined as tracking media that contains queer representation, as well as the kind of representation (gay, lesbian, bisexual, trans, asexual, etc) in that media and whether or not it is positive representation.

The API allows for the manipulation of media items and comments. A media item represents a piece of media — for example, a book or a movie or a TV show — and contains fields that represent its title, the year of its production, its media type, the kind of representation it contains, whether or not it is positive representation or not, and a description.

Additionally, each media item has comments associated with it — a comment contains nothing but its textual content.

## How do I run it?

To run the API, you need to first start the correct database, and then start whichever version of the API — the RESTful version or the GraphQL version — you want to use.

### Starting the Database
To run the database that powers the API, you'll need to have MongoDB downloaded and installed on your machine. Once you have it, you can simply start a database by running `mongod` from the command line. Keep in mind that if you're running MacOS Catalina, the `/data/db` directory has been moved, and you may need to run `mongod --dbpath <non-root path to /data/db>`.

To figure out which database you're running or to run a different one, run `mongo` from the command line. This launches an interactive shell. From here, you can run `show databases` to see which databases exist, or `db` to see which database you're currently in. To use a specific database, simply run `use <database>`. If the database doesn't already exist, it will be created.

### Starting the RESTful API
From the command line, run:

```
use media-api
npm i
npm run start:express-rest
```

The API is being served at `http://localhost:8080`, and you can test it using the browser or using Postman.

### Starting the GraphQL API
From the command line, run:

```
use media-api-graphql
npm i
npm run start:graphql-rest
```

You can then test the API at `http://localhost:8080/graphql` using `graphiql`.

### Sample calls for each GraphQL query and mutation
```
query GetAllMediaItems {
 mediaItems {
   _id,
   title,
   year,
   mediaType,
   representationType,
   description,
   comments {
     _id,
     content
   }
 }
}

query GetOneMediaItem {
 mediaItem(id: "5e8a9afb1f1a766a33b618cb") {
   title,
   year,
   mediaType,
   representationType,
   comments {
     _id,
     content
   }
 }
}

mutation CreateMediaItem {
 createMediaItem(title: "Portrait of a Lady on Fire", year: "2019", mediaType: "movie", representationType: "lesbian", positive: true, description: "Take on the artist's muse story, but with French lesbians.") {
   title,
   year,
   mediaType,
   representationType,
   positive,
   description
 }
}

mutation UpdateMediaItem {
 updateMediaItem(id: "5e8a365bc318a06393e623d2", description: "Both main characters are wlw who never show interest in men.") {
   title,
   year,
   mediaType,
   representationType,
   positive,
   description
 }
}

mutation DeleteMediaItem {
 deleteMediaItem(id:"5e8a36dec318a06393e623d3") {
   title,
   year,
   mediaType,
   representationType,
   positive,
   description
 }
}

mutation CreateComment {
 createComment(id: "5e8a9afb1f1a766a33b618cb", content: "I love the music!") {
   content
 }
}

mutation UpdateComment {
 updateComment(id:"5e92abf2f5b54682959eaddc", content: "So many twists!") {
   content
 }
}

mutation DeleteComment {
 deleteComment(id: "5e92d772e5e91183d35d6b45") {
   content
 }
}
```
