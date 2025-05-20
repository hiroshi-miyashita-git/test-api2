const express = require('express');
const app = express();

app.use((req, res, next) => {
  try {
    res.charset = 'utf-8';
    res.type("application/json; charset=utf-8");
  } catch (err){
    //return res.status(500).send(JSON.stringify({"msg":"error"}));
    return next(err);
  }
  next();
});
app.use(express.json());

async function reqHandler(req, res, next){
  try {
    if(req.method === "GET"){
      res.status(200).send();
    }else{
      res.status(200).send(JSON.stringify(req.body));
    }
  } catch (err){
    return next(err);
    //res.status(500).send(JSON.stringify({"msg":"error"}));
  }
  //return;  
}

app.route("/*").all(reqHandler);

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  //if (err) {
    res.status(500).send(JSON.stringify({"msg":"error"}));
  // }
  // next();
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Express Start Port:${PORT}`));