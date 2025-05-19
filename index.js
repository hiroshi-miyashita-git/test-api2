const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  try {
    res.send({ name: "hoge" });
  } catch (error) {
    res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("start"));
// export default app;