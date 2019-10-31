# gulp-separate-media-queries

This project is used to generate a gulp plugin for extracting media queries from CSS.
Use case is to bundle media queries under a single css file

## Usage

```bash
npm install gulp-separate-media-queries
```

```javascript
// Initialize the plugin in your gulpfile
let extractQueries = require('gulp-separate-media-queries');

// For extracting all the media queries
stream = stream.pipe(extractQueries());

// For removing all the media queries use the removeQueries property
stream = stream.pipe(extractQueries({
  removeQueries: true
}));
```
