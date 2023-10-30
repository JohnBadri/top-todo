import "./styles/meyer.css";
import "./styles/style.css";
import logo from "./images/logo.png";
import { preventFormSubmission } from "./js/preventFormSubmission";
import { projectListRender } from "./js/projectFactory";

preventFormSubmission();
projectListRender();
