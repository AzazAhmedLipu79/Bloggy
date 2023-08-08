const express = require("express");
const ejs = require("ejs");
const path = require("path");
const blogsRouter = require("./Server/Router/Blogs.Router");
const { pool } = require("./Server/Config/database");

const app = express();

const getmetaData = (route) => {
  let data;
  switch (route) {
    case "/":
      data = {
        title: "Home",
      };
      break;
    case "/about":
      data = {
        title: "About",
      };
      break;
    case "/blogs":
      data = {
        title: "Our Blog",
      };
      break;

    default:
      data = {
        title: "Unknown",
      };
      break;
  }
  return data;
};

// Set the 'views' directory
app.set("views", path.join(__dirname, "views"));

// Set EJS as the view engine
app.set("view engine", "ejs");

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Set up a route to render the EJS view
app.get("/", (req, res) => {
  // Render the 'index' view (index.ejs) from the 'views' directory
  res.render("Layout/index", { path: "/views/components/home.ejs" });
});

app.get("/about", (req, res) => {
  // Render the 'index' view (index.ejs) from the 'views' directory
  res.render("Layout/index");
});
app.get("/blogs", async (req, res) => {
  const articles = [
    {
      title: "Man Discovers Different Opinion",
      author: "Reginald",
      date: "9/2/45",
    },
    { title: "Tigers Aren't Great Pets", author: "Simon", date: "4/13/95" },
    { title: "Eating Cake for Breakfast", author: "Katie", date: "8/20/13" },
  ];
  res.render("Layout/index");
  /* */
  // Render the 'index' view (index.ejs) from the 'views' directory
});

app.get("/blogs/:slug", (req, res) => {
  // Render the 'post' view (post.ejs) from the 'views' directory
  res.render("Layout/index");
});

app.get("/Pages/blog", (req, res) => {
  let slug = req.query.slug;
  console.log(slug);
  console.log("from components: ", req.query);
  res.render("Pages/blog", { slug: slug });
});

// components
app.get("/Shared/meta", (req, res) => {
  //  Here app.get: /components/meta is fixed so i put it on set Meta Function
  let route = req.query.route;
  let metaData = getmetaData(route);
  console.log("From meta: ", req.query);
  res.render("Partials/meta", metaData);
});

app.get("/Shared/header", (req, res) => {
  console.log("from header:", req.query);
  res.render("Shared/header");
});
app.get("/Shared/footer", (req, res) => {
  console.log("from footer:", req.query);
  res.render("Shared/footer");
});
app.get("/Partials/header", (req, res) => {
  console.log("PARTIAL TRIGERRED");
  res.render("Partials/header");
});
app.get("/Partials/footer", (req, res) => {
  console.log("from footer:", req.query);
  res.render("Partials/footer");
});

// PAGES
app.get("/Pages/home", (req, res) => {
  res.render("Pages/home");
});
app.get("/Pages/blogs", async (req, res) => {
  try {
    // Create a query string that selects all records from the blog table
    const query = "SELECT * FROM blog";
    // Execute the query using the connection object and await for the result
    // The result is an array of objects that represent each blog post
    const blogs = await pool.query(query);
    // Send a success response with the blog data

    return res.render("Pages/blogs", { blogs: blogs[0] });
  } catch (error) {
    // Handle any errors by passing them to the next error handler middleware
    return next(error);
  } finally {
  }
});
app.get("/Pages/about", (req, res) => {
  let data = {
    id: req.query.id,
    name: req.query.name,
  };
  console.log("from components: ", req.query);
  res.render("Pages/about", data);
});

app.use((err, req, res, next) => {
  console.error(err); // Log the error
  res.status(400).send("Oops! Something broke!"); // Send a response
});
// Start the server
const port = 8888;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
