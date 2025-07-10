import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
import Spinner from "../components/Spinner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [noteTitle, setNoteTitle] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCreateNote = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${SERVER_URL}/notes`, {
        title: noteTitle,
      });
      if (response.status === 201) {
        setLoading(false);
        const savedNoteId = response.data._id;
        navigate(`/note/${savedNoteId}`);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const result = await axios.get(`${SERVER_URL}/notes`);
        if (result.data.length > 0) {
          setNotes(result.data);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };

    fetchNotes();
  }, []);
  return (
    <>
      <main className="container py-4">
        <section className="mt-5">
          <div className="d-flex justify-content-between flex-column gap-3">
            <div className="d-flex justify-content-between align-items-center gap-1">
              <div style={{ width: "90%" }}>
                <input
                  type="text"
                  id="titleInput"
                  placeholder="Enter a new Note title"
                  className="form-control"
                  onChange={(e) => setNoteTitle(e.target.value)}
                />
              </div>

              <div>
                <button
                  className="btn btn-primary"
                  onClick={handleCreateNote}
                  disabled={!noteTitle}
                >
                  Add Note
                </button>
              </div>
            </div>
            {!loading && notes.length > 0 && (
              <div className="row">
                {notes.map((note) => (
                  <div
                    key={note._id}
                    className="col-md-3 mb-4"
                    style={{ height: "200px" }}
                  >
                    <div
                      className="card h-100"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/note/${note._id}`)}
                    >
                      <h5 className="card-header">{note.title}</h5>
                      <div className="card-body">
                        <p className="card-text">{note.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {loading && <Spinner />}
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
