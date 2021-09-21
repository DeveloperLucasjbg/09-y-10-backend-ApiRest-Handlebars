const express = require("express");
const metodos = require("./metodos");
const handlebars = require("express-handlebars");
const { urlencoded } = require("express");

const app = express();
const PORT = 8080;
const router = express.Router();

app.use(express.static("public"));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use("/api", router);

let productos = [
  {
    id: 0,
    tittle: "alfajor",
    price: 421.5,
    thumbail: ".../public/amongWhite.png",
  },
  {
    id: 1,
    tittle: "alfajor",
    price: 421.5,
    thumbail: "../public/amongWhite.png",
  },
  {
    id: 2,
    tittle: "Sigarro",
    price: 421.5,
    thumbail: "./public/amongWhite.png",
  },
];

router.get("/productos/listar", (_, res) => {
  res.json(new metodos(null, null, productos).listar());
});

router.get("/productos/listar/:id", (req, res) => {
  const { id } = req.params;
  res.json(new metodos(id, null, productos).listarPorId());
});
router.post("/productos/guardar", (req, res) => {
  res.json(new metodos(null, req.body, productos).guardar());
});

router.put("/productos/actualizar/:id", (req, res) => {
  const { id } = req.params;
  res.json(new metodos(id, req.body, productos).actualizar());
});
router.delete("/productos/borrar/:id", (req, res) => {
  const { id } = req.params;
  res.json((productos = new metodos(id, req.body, productos).borrar()));
});

const server = app.listen(PORT, () => {
  console.log("escuchando el servidor", server.address().port);
});
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);
app.set("main", "/views");
app.set("view engine", "hbs");

router.get("/productos/vista", (_, res) => {
  res.render("main", {
    datos: new metodos(null, null, productos).listar(),
  });
});
