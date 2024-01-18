import React, {
  forwardRef,
  useEffect,
  Suspense,
  useRef,
  useState,
} from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Layout from "../layouts";
import html2canvas from "html2canvas";

const Heading = ({ title }) => {
  return <h1 style={{ fontSize: "48px" }}>{title}</h1>;
};

const getBase64 = async (url) => {
  return await fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    });
};

const AsyncImage = (props) => {
  const { alt, src } = props;
  const [image, setImage] = useState("");
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    if (isMounted.current) {
      getBase64(src).then((res) => {
        setImage(res);
      });
    }

    return () => {
      isMounted.current = false;
    };
  }, [src]);

  if (!image) {
    return null;
  }

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <img src={image} alt={alt} className="img" />
    </Suspense>
  );
};

const ComponentPhotos = forwardRef((props, ref) => {
  const { data, images, title } = props;

  return (
    <div ref={ref}>
      <div className="first">I will not be in the image.</div>
      <h1>Component name: {title}</h1>
      <Heading title={title} />
      <div className="second">I will be in the image.</div>

      {data &&
        data &&
        data.map((item) => {
          return <div key={item._id}>{item.name}</div>;
        })}

      <div style={{ display: "flex" }}>
        <div>
          <h1>Canvas</h1>
          <Suspense fallback={<h1>Loading...</h1>}>
            {images &&
              images.length > 0 &&
              images.map((item) => {
                return (
                  <div key={item._id}>
                    <img
                      key={item._id}
                      src={item.url}
                      alt={item.alt}
                      className="img"
                    />
                  </div>
                );
              })}
          </Suspense>
        </div>
        <div>
          <h1>Canvas</h1>
          <Suspense fallback={<h1>Loading...</h1>}>
            {images &&
              images.length > 0 &&
              images.map((item) => {
                return (
                  <div key={item._id}>
                    <img
                      key={item._id}
                      src={item.url}
                      alt={item.alt}
                      className="img"
                    />
                  </div>
                );
              })}
          </Suspense>
        </div>
        <div>
          <h1>Async</h1>
          {images &&
            images.length > 0 &&
            images.map((item) => {
              return (
                <div key={item._id}>
                  <AsyncImage src={item.url} alt={item.alt} />
                </div>
              );
            })}
        </div>
      </div>

      <NavLink to="/">
        <span>Home</span>
      </NavLink>

      <NavLink to="/messages">
        <span>Messages</span>
      </NavLink>

      <NavLink to="/notifications">
        <span>Notifications</span>
      </NavLink>
    </div>
  );
});

function Home() {
  return (
    <Layout>
      <section className="section">
        <div className="container">
          <h1>Home</h1>

          <Outlet />
        </div>
      </section>
    </Layout>
  );
}

function About() {
  const printRef = useRef();

  const handleDownloadImage = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element, { useCORS: true, scale: 4 });

    const data = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = "image.jpg";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  const [title, setTitle] = useState("");
  const onChange = (value) => {
    setTitle(value);
  };

  const data = [
    { _id: "sdfhdf", name: "Ogi" },
    { _id: "dfdfdf", name: "Zohara" },
  ];

  const images = [
    {
      _id: "teasfdfg",
      url: "https://picsum.photos/id/238/200/300",
      alt: "gdfjgj",
    },
    {
      _id: "gfdfhgfj",
      url: "https://picsum.photos/id/248/200/300",
      alt: "fhjdf",
    },
  ];

  return (
    <Layout>
      <section className="section">
        <div className="container">
          <h1>About</h1>

          <button type="button" onClick={handleDownloadImage}>
            Download as Image
          </button>

          <input name="text" onChange={(e) => onChange(e.target.value)} />

          <ComponentPhotos
            title={title}
            data={data}
            images={images}
            ref={printRef}
          />
        </div>
      </section>
    </Layout>
  );
}

function NotFound() {
  return (
    <Layout>
      <section className="section">
        <div className="container">
          <h1>Not Found Error</h1>
        </div>
      </section>
    </Layout>
  );
}

function Messages(props) {
  const { name, path } = props;

  const location = useLocation();

  const getPathLocation = (path) => {
    return location.pathname.includes(path) ? "isActive" : "";
  };

  return (
    <aside
      className={`sidebar sidebar--right sidebar-messages ${getPathLocation(
        path
      )}`}
    >
      <h1>{name}</h1>
      <Outlet />
    </aside>
  );
}

const route = [
  {
    path: "/",
    label: "Home",
    element: <Home />,
    children: [
      {
        path: "/messages",
        label: "Messages",
        element: <Messages name="Messages" path="messages" />,
      },
      {
        path: "/notifications",
        label: "Notifications",
        element: <Messages name="Notifications" path="notifications" />,
      },
    ],
  },
  {
    path: "/about",
    label: "About",
    element: <About />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export { route };
