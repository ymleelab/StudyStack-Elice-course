import { useState } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import styled from "styled-components";

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

const HeaderStyled = styled(Header)`
  border-bottom: 1px solid gray;
  color: red;
`;

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
  const [nextId, setNextId] = useState(3);
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
  ]);
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
  } else if (mode === "CREATE") {
    content = (
      <Create
        onCreate={(title, body) => {
          const newTopic = { id: nextId, title, body };
          const newTopics = [...topics];
          newTopics.push(newTopic);
          setTopics(newTopics);
          setId(nextId);
          setMode("READ");
          setNextId(nextId + 1);
          //topics.push(newTopic);
          //alert("create");
        }}
      ></Create>
    );
  }

  function Create(props) {
    return (
      <article>
        <h2>Create</h2>
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            const title = evt.target.title.value;
            const body = evt.target.body.value;
            props.onCreate(title, body);
          }}
        >
          <p>
            <input type="text" name="title" placeholder="title"></input>
          </p>
          <p>
            <textarea name="body" placeholder="body"></textarea>
          </p>
          <p>
            <input type="submit" value="Create"></input>
          </p>
        </form>
      </article>
    );
  }

  return (
    <div>
      <HeaderStyled
        onSelect={() => {
          setMode("WELCOME");
          //alert("header");
        }}
      ></HeaderStyled>
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
        <Button
          variant="outlined"
          onClick={() => {
            setMode("CREATE");
          }}
        >
          Create
        </Button>
        <Button variant="outlined">Update</Button>
      </ButtonGroup>
      <Button
        variant="outlined"
        onClick={() => {
          const newTopics = topics.filter((e) => {
            if (e.id === id) {
              return false;
            } else {
              return true;
            }
          });
          setMode("WELCOME");
          setTopics(newTopics);
        }}
      >
        Delete
      </Button>
    </div>
  );
}

export default App;
