import React, {
  forwardRef,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Layout from "../layouts";
import html2canvas from "html2canvas";

const Heading = ({ title }) => {
  return <h1 style={{ fontSize: "48px" }}>{title}</h1>;
};

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

const getImages = async (url) => {
  return await getBase64(url);
};

// const getData = (async () => {
//   const response = await getImages(item.url).then((res) => res);
//   return response;
// })();

// const AsyncImage = (props) => {
//   const [loadedSrc, setLoadedSrc] = React.useState(null);
//   const [image, setImage] = useState("");

//   useEffect(() => {
//     setLoadedSrc(null);
//     if (props.src) {
//       const handleLoad = () => {
//         setLoadedSrc(props.src);
//       };
//       const image = new Image();
//       image.addEventListener("load", handleLoad);
//       image.src = props.src;
//       return () => {
//         image.removeEventListener("load", handleLoad);
//       };
//     }
//   }, [props.src]);

//   useEffect(() => {

//   }, [])

//   if (loadedSrc === props.src) {
//     return <img {...props} src={props.src} alt={props.alt} />;
//   }

//   return null;
// };

const AsyncImage = (props) => {
  const { alt, src } = props;
  const [image, setImage] = useState("");

  useEffect(() => {
    getImages(src).then((res) => setImage(res));
  }, [src]);

  return (
    <div>
      <img src={image} alt={alt} className="img" />
    </div>
  );
};

const ComponentPhotos = forwardRef((props, ref) => {
  const { data, title } = props;

  const results = images.map((item) => {
    console.log(item);
    return (
      <div key={item._id}>
        <AsyncImage alt={item.alt} src={item.url} />
        {/* <img src={item.url} alt={item.alt} className="img" /> */}
      </div>
    );
  });

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

      <Suspense fallback={<p>Fetching user details...</p>}>{results}</Suspense>
      {images &&
        images.length > 0 &&
        images.map((item) => {
          return (
            <div key={item._id}>
              <img key={item._id} src={item.url} alt={item.alt} />
              {item.url}
            </div>
          );
        })}

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
  const printRef = useRef();

  const handleDownloadImage = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element, { useCors: true, scale: 2 });

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

  return (
    <Layout>
      <section className="section">
        <div className="container">
          <h1>Home</h1>

          <button type="button" onClick={handleDownloadImage}>
            Download as Image
          </button>

          <input name="text" onChange={(e) => onChange(e.target.value)} />

          <ComponentPhotos title={title} data={data} ref={printRef} />
          <Outlet />
        </div>
      </section>
    </Layout>
  );
}

function About() {
  return (
    <Layout>
      <section className="section">
        <div className="container">
          <h1>About</h1>
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
