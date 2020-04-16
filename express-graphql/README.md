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
