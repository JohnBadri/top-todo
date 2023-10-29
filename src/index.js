import "./styles/style.css";
import { sayHi } from "./js/function";
import icon from "./images/icon.png";

const content = document.querySelector(".content");
content.textContent = sayHi();
