const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 

let courses = [
  { id: 1, title: "JavaScript Basics", description: "Learn the basics of JavaScript", duration: "3 hours" },
  { id: 2, title: "Node.js Fundamentals", description: "Introduction to Node.js", duration: "4 hours" },
];

// 1. Retrieve all courses
app.get('/courses', (req, res) => {
  res.json(courses);
});

// 2. Add a new course
app.post('/courses', (req, res) => {
  const { title, description, duration } = req.body;
  if (!title || !description || !duration) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const newCourse = {
    id: courses.length + 1,
    title,
    description,
    duration,
  };
  courses.push(newCourse);
  res.status(201).json(newCourse);
});

// 3. Update a course by ID
app.put('/courses/:id', (req, res) => {
  const courseId = parseInt(req.params.id);
  const { title, description, duration } = req.body;

  const course = courses.find(course => course.id === courseId);
  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }

  if (title) course.title = title;
  if (description) course.description = description;
  if (duration) course.duration = duration;

  res.json(course);
});

// 4. Delete a course by ID
app.delete('/courses/:id', (req, res) => {
  const courseId = parseInt(req.params.id);
  const courseIndex = courses.findIndex(course => course.id === courseId);
  
  if (courseIndex === -1) {
    return res.status(404).json({ error: "Course not found" });
  }

  courses.splice(courseIndex, 1);
  res.json({ message: "Course deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
