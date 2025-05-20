const express = require('express');
const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//   try {
//     res.send({ name: "hoge" });
//   } catch (error) {
//     res.sendStatus(500);
//   }
// });

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => console.log("start"));



app.set("trust proxy", 1);
//app.use(helmet());

async function allRequestHandler(req, res, next){
  try {
    if (req.path === "/" || req.path === "/favicon.ico"){
      res.status(200).send();
      return;
    }
    if (req.method !== "POST"){
      res.status(405).send();
      return;
    }
  } catch (err){
    res.status(500).send(JSON.stringify({"msg":"error"}));
    return;
  }
  next();
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
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
    res.charset = 'utf-8';
    res.removeHeader("X-Powered-By");
    res.type("application/json; charset=utf-8");
    res.setHeader("X-Process-Start-Time",process.hrtime.bigint().toString());
    decodeURIComponent(req.path);
  } catch (err){
    return res.redirect(`http://${req.get("Host")}`);
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
  .all(allRequestHandler)
  .post(postMethodHandler)
;

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("start"));