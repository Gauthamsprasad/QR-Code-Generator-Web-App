const express = require("express");
const app = express();
const QRCode = require("qrcode");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

const images = [
    "/images/wade-meng-LgCj9qcrfhI-unsplash.jpg",
    "/images/john-towner-JgOeRuGD_Y4-unsplash.jpg",
    "/images/nasa-Q1p7bh3SHj8-unsplash.jpg",
    "/images/anders-jilden-cYrMQA7a3Wc-unsplash.jpg",
    "/images/nick-scheerbart-xFjAftU8lMY-unsplash.jpg",
    "/images/cristina-gottardi-wndpWTiDuT0-unsplash.jpg",
    "/images/oleg-chursin-vaPoJZB9Mzg-unsplash.jpg",
    "/images/ashim-d-silva-WeYamle9fDM-unsplash.jpg"
  ];

  const randomImage = images[Math.floor(Math.random() * images.length)];
  console.log(randomImage)
app.get("/", (req, res) => {
  res.render("index.ejs", { qr: null, image: randomImage });
});

app.post("/generate", async (req, res) => {
  const url = req.body.url;

  if (!url) return res.send("Empty Data");
 
  try {
    const qrImage = await QRCode.toDataURL(url);
    res.render("index", { qr: qrImage, image: randomImage });
  } catch (err) {
    res.send("Error generating QR Code");
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
