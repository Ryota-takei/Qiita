import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

export const App = () => {
  const [query, setQuery] = useState("React");
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    axios
      .get("https://qiita.com/api/v2/items", {
        params: {
          page: "1",
          per_page: "20",
          query: query
        }
      })
      .then((res) => {
        setItems(res.data);
      })
      .catch((error) => {});
  }, [query]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleClick = () => {
    setQuery(text);
  };

  return (
    <SApp>
      <STitle>Search By Qiita</STitle>
      <Input
        value={text}
        placeholder="Search something"
        onChange={handleChange}
      />
      <button onClick={handleClick}>検索</button>
      {items.map((item) => {
        return (
          <>
            <p>タイトル: {item.title}</p>
            <a href={item.url}>リンク</a>
          </>
        );
      })}
    </SApp>
  );
};

const SApp = styled.div`
  width: 100%;
  margin: 0 auto;
  align-items: center;
`;

const STitle = styled.h1`
  font-size: 25px;
  width: 100%;
  margin: 20px auto;
`;

const Input = styled.input`
  width: 50%;
`;
