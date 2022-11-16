import express from "express";

const PORT = 5001;
const app = express();

app.get("/slow", (req, res) => {
  console.log("delay for 3 seconds");
  setTimeout(() => {
    let seconds = new Date().getTime();
    res.send({ currentTime: seconds });
  }, 3000);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
