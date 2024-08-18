import express from "express";
import bodyParser from "body-parser";
import session from 'express-session';
const app = express();
const port=3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'mousie@123', // Replace with a strong secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));






const titles=["MURDER AT THE ORIENT EXPRESS","APPOINTMENT WITH DEATH", "ABC MURDERS", "HARRY POTTER AND THE PHILOSOPHERS STONE", "HARRY POTTER AND THE CHAMBER OF SECRETS"];
const authors=["Sandhya", "Sandhya", "Sandhya","Sandhya" ,"Sandhya"];
const articles=["A man is murdered in the famous orient express after being stabbed 12 times. He was found to have been receiving anonymous and threatening letters before the murder. Agatha Christies clever and witty detective Hercule Poirot is being to called to investigate the case. The mysteries after questioning every single passenger keeps the readers eye glued to the book. With the language easy to understand by an average English speaker, the characters description precise and scenes of the story easy to visualize, this book attracts everyones eyes. Find out if Poirot manages to catch the culprit within the stipulated time and grants justice to the innocent. With the story being crisp, having unbelievable twists and turns and appropriate details, it doesnt take more than 2 days to finish the book. But observing every little point and reading makes the novel more understandable. Overall, I would rate the book 4.8 out of 5.",
  "Appointment with death is crime thriller by Agatha Christie which features the intelligent and humorous Hercule Poirot. It is about a murder case that Hercule Poirot gets to solve during his trip to Petra. Problems begin when old Mrs Boynton is killed. Her family members call the reason of death to be heart attack. But things become complicated when Dr Gerard discovers a mark on the victim’s wrist which could have been caused by a hypodermic syringe. The mysteries and lies from every witness keep the reader’s eye glued to the book. Will Poirot manage to crack the truth in the given 24 hours?",
  "A crime thriller by Christie.  According to me this is the best book by Christie I’ve read so far. The mystery begins when Hercule Poirot receives an anonymous letter threatening to kill a person whose name begins with the letter ‘a’. The book becomes more thrilling when Mrs Ascher from Andover is killed and eventually proceeds in the alphabetical order. An ABC railway guide is left next to every victim who is murdered. The way Poirot approaches the issue and solves it is the best part of the story.",
  "Harry Potter find himself quite impatient to leave Little Whinging. Rons father Mr Weasley has tickets for the upcoming Quidditch world cup final. But so many bizarre things happen in the camp. Harrys scar hurts him more often than before. On top of everything Hogwarts is chosen to host the ancient Triwizard tournament. To make things worse Harrys name is picked to participate in the dangerous contest. Will Harry survive through everything? Yet another masterpiece by J K Rowling. Most thrilling adventure filled with twists and turns. Language is similar to other books by Rowling. The same characters continue with one or two new additions. This story is going to be a turning point in Harry Potters life. Dont forget to read the previous books for better understanding. Overall I would rate this book 4.8 out of 5.",
  "Whole wizarding community is filled with awe in the third book of Harry Potter series by J K Rowling. Mass murderer Sirius Black has broken out of the wizard prison Azkaban which has never been done by anyone before. Meanwhile Harry Potter is having a hard time with the Dursley’s in Little Whinging. But one night Harry loses his control and blows up his cruel aunt Marge. With his mind full of hatred Harry leaves Little Whinging to seek shelter in the Leaky Cauldron for the rest of the holidays. Hogwarts is guarded by Dementors (guardians of the Azkaban prison) who bring distressing thoughts to the minds of people near them. Find out how Harry handles the new happenings and finds himself before a year filled with love, miseries and betrayals.",
];

app.get("/blog/:id", (req, res) => {
  const blogId = req.params.id;
  console.log("Blog ID:", blogId);
  const title = titles[blogId];
  const author = authors[blogId];
  const article = articles[blogId];

  if (title && author && article) {
    res.render("blog.ejs", { title, author, article });
  } else {
    res.status(404).send("Blog not found");
  }
});

app.get("/createnew",(req,res)=>{
  const previewData = req.session.previewData || {};
  console.log(previewData);
  res.render("createpost.ejs", { title: previewData.title, author: previewData.author, content: previewData.content});
});

app.post("/submit", (req, res) => {
  const { title, content, author } = req.body;
  
  // Add the received data to your arrays or handle it as needed
  titles.push(title);
  articles.push(content);
  authors.push(author);
  console.log(titles);
  req.session.previewData = null;
  // Redirect or send a response to the user
  res.redirect("/");
});

app.post("/seepreview", (req, res) => {
  const { title, content, author } = req.body;
  req.session.previewData = { title, content, author };
  console.log('Preview Data:', { title, content, author });
  res.render("seepreview.ejs", { title, content, author });
});

app.get("/", (req,res)=>{
  res.render("home.ejs", {titles, authors, articles});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

