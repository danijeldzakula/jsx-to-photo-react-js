import React from "react";
import { Link } from "react-router-dom";
import { route } from "../router/route";

export default function Layout(props) {
  const { className, style } = props;

  let classValue = "";
  let styleValue = {};

  if (typeof className !== "undefined") {
    classValue += className;
  }

  if (typeof style !== "undefined") {
    styleValue = style;
  }

  const menus = route.filter(({ path }) => !path.includes("*"));

  return (
    <div className={`app ${classValue}`} style={styleValue}>
      <header>
        <nav>
          <ul>
            <li>
              {menus.map((item, idx) => {
                return (
                  <Link key={idx} to={item.path}>
                    {item.label}
                  </Link>
                );
              })}
            </li>
          </ul>
        </nav>
      </header>
      <main className={`main`}>
        <article className="article">{props.children}</article>
      </main>
      <footer>Footer</footer>
    </div>
  );
}
