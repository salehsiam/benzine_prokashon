require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bx9ca.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const booksCollection = client.db("benzine_prokashon").collection("books");

    // books apis

    app.get("/books/:id", async (req, res) => {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid book ID" });
      }

      try {
        const query = { _id: new ObjectId(id) };
        const book = await booksCollection.findOne(query);

        if (!book) {
          return res.status(404).json({ error: "Book not found" });
        }

        res.json(book);
      } catch (error) {
        console.error("Error fetching book by ID:", error);
        res.status(500).json({ error: "Failed to fetch book" });
      }
    });

    app.get("/books", async (req, res) => {
      try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        const sortBy = req.query.sortBy || "price";
        const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;
        const genre = req.query.genre;

        const skip = (page - 1) * limit;

        // Search condition
        const query = {
          ...(search && {
            $or: [
              { productNameEn: { $regex: search, $options: "i" } },
              { productNameBn: { $regex: search, $options: "i" } },
              { authorName: { $regex: search, $options: "i" } },
              { translatorName: { $regex: search, $options: "i" } },
              { genres: { $regex: search, $options: "i" } },
            ],
          }),
          ...(genre && { genres: genre }),
        };
        const sortField =
          sortBy === "time"
            ? { createdAt: sortOrder }
            : { listPrice: sortOrder };
        // Fetch books
        const cursor = booksCollection
          .find(query)
          .sort(sortField)
          .skip(skip)
          .limit(limit);

        const books = await cursor.toArray();
        const totalBooks = await booksCollection.countDocuments(query);

        res.send({
          books,
          totalBooks,
          totalPages: Math.ceil(totalBooks / limit),
          currentPage: page,
        });
      } catch (error) {
        console.error("Error fetching books:", error); // Debug log
        res.status(500).send({ error: "Failed to fetch books" });
      }
    });
    app.post("/books", async (req, res) => {
      const book = req.body;
      const result = await booksCollection.insertOne(book);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("Hello from Benzine Prokashon Server!");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
