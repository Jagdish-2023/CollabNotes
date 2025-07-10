import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import socket from "../socket";
import TextareaAutosize from "react-textarea-autosize";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const NoteEditor = () => {
  const { noteId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const isTyping = useRef(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/notes/${noteId}`);
        if (res.status === 200) {
          setTitle(res.data.title);
          setContent(res.data.content);
          setLastUpdated(new Date(res.data.updatedAt).toLocaleTimeString());
        }
      } catch (err) {
        console.error("Failed to fetch note:", err);
      }
    };

    fetchNote();
  }, [noteId]);

  useEffect(() => {
    socket.emit("join_note", noteId);

    socket.on("note_update", (incomingContent) => {
      if (!isTyping.current) {
        setContent(incomingContent);
      }
    });

    return () => {
      socket.off("note_update");
    };
  }, [noteId]);

  const handleChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    isTyping.current = true;

    socket.emit("note_update", { noteId, content: newContent });

    setTimeout(() => (isTyping.current = false), 1000);
  };

  // Auto-save to backend every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      axios.put(`${SERVER_URL}/notes/${noteId}`, { content }).then((res) => {
        setLastUpdated(new Date(res.data.updatedAt).toLocaleTimeString());
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [content, noteId]);

  return (
    <main className="container py-4">
      <div>
        <Link to={"/"} className="btn btn-primary btn-sm">
          Back
        </Link>
      </div>
      <section className="mt-5">
        <h2 className="mb-3">{title}</h2>
        <p className="text-muted">Last updated: {lastUpdated}</p>
        <TextareaAutosize
          minRows={15}
          className="form-control"
          value={content}
          onChange={handleChange}
          placeholder="Start writing here..."
          style={{ fontSize: "1.1rem" }}
        />
      </section>
    </main>
  );
};

export default NoteEditor;
