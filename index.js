const express = require('express');
const app = express();

async function getMethodHandler(req, res){
  try {
    res.status(200).send();
  } catch (err){
    res.status(500).send(JSON.stringify({"msg":"error"}));
  }
  return;
};

async function postMethodHandler(req, res){
  try {
    res.status(200).send(JSON.stringify(req.body));
  } catch (err){
    res.status(500).send(JSON.stringify({"msg":"error"}));
  }
  return;
};

app.use((req, res, next) => {
  try {
//    res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
    res.charset = 'utf-8';
//    res.removeHeader("X-Powered-By");
    res.type("application/json; charset=utf-8");
//    res.setHeader("X-Process-Start-Time",process.hrtime.bigint().toString());
  } catch (err){
    return res.status(500).send(JSON.stringify({"msg":"error"}));
  }
  next();
});

app.use(express.json());
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send(JSON.stringify({"msg":"error"}));
    return;
  }
  next();
});

app.route("/*")
  .get(getMethodHandler)
  .post(postMethodHandler)
;

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Express Start Port:${PORT}`));