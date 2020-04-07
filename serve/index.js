const express = require('express');

const app = express();

app.use(require('cors')());
app.use(express.json());
// 从 uploads 引入静态资源
app.use('/uploads', express.static(__dirname + '/uploads'));


// 引入 router
require('./routes/admin')(app);

// 引入 MongoDB
require('./plugins/db')(app);



app.listen(3000, () => {
    console.log('http://localhost:3000');
})