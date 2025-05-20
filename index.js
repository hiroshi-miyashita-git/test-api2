const express = require('express');
const app = express();


async function reqHandler(req, res){
  try {
    res.status(200).send(JSON.stringify(req.body));
  } catch (err){
    res.status(500).send(JSON.stringify({"msg":"error"}));
  }
  return;  
}

// async function getMethodHandler(req, res){
//   try {
//     res.status(200).send();
//   } catch (err){
//     res.status(500).send(JSON.stringify({"msg":"error"}));
//   }
//   return;
// };

// async function postMethodHandler(req, res){
//   try {
//     res.status(200).send(JSON.stringify(req.body));
//   } catch (err){
//     res.status(500).send(JSON.stringify({"msg":"error"}));
//   }
//   return;
// };

app.use((req, res, next) => {
  try {
    res.charset = 'utf-8';
    res.type("application/json; charset=utf-8");
  } catch (err){
    return res.status(500).send(JSON.stringify({"msg":"error"}));
  }
  next();
});

app.use(express.json());
app.use((err, req, res, next) => {
  if (err) {
    return res.status(500).send(JSON.stringify({"msg":"error"}));
  }
  next();
});

app.route("/*")
.all(reqHandler)
  // .get(getMethodHandler)
  // .post(postMethodHandler)
;

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Express Start Port:${PORT}`));