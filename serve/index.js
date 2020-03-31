const express = require('express');

const app = express();

app.use(require('cors')());
app.use(express.json());

// 引入 router
require('./routes/admin')(app);

// 引入 MongoDB
require('./plugins/db')(app);



app.listen(3000, () => {
    console.log('http://localhost:3000');
})