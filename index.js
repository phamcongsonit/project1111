const express = require("express");
const app = express();
const post = require("./api/post");

app.use(express.json({ extended: false }));

app.use("/post", post);
app.use("/uploads", express.static('uploads'));
var thumbnail = JSON.parse(data)['thumbnail']
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
