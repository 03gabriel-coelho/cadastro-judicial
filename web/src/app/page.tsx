import Navbar from "document/components/navbar";
import style from "./page.module.css";

export default function Home() {
  return (
    <div className={style.container}>
      <Navbar />
    </div>
  );
}
