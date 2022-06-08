import { useState } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

function Header(props) {
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(evt) => {
            //console.log(evt);
            evt.preventDefault();
            props.onSelect();
          }}
        >
          WWW
        </a>
      </h1>
    </header>
  );
}
function Nav(props) {
  const list = props.data.map((e) => {
    return (
      <li key={e.id}>
        <a
          href={"/read/" + e.id}
          onClick={(evt) => {
            evt.preventDefault();
            props.onSelect(e.id);
          }}
        >
          {e.title}
        </a>
      </li>
    );
  });
  return (
    <nav>
      <ol>{list}</ol>
    </nav>
  );
}
function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}
function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);

  const topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
  ];
  let content = null;
  if (mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello, WEB!"></Article>;
  } else if (mode === "READ") {
    const topic = topics.filter((e) => {
      if (e.id === id) {
        return true;
      } else {
        return false;
      }
    })[0];
    //console.log(topic);
    content = <Article title={topic.title} body={topic.body}></Article>;
  }

  function createHandler() {
    alert("create!");
  }
  return (
    <div>
      <Header
        onSelect={() => {
          setMode("WELCOME");
          //alert("header");
        }}
      ></Header>
      <Nav
        data={topics}
        onSelect={(id) => {
          setMode("READ");
          setId(id);
          //alert("nav" + id);
        }}
      ></Nav>
      {content}
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button variant="outlined" onClick={createHandler}>
          Create
        </Button>
        <Button variant="outlined">Update</Button>
      </ButtonGroup>
      <Button variant="outlined">Delete</Button>
    </div>
  );
}

export default App;
