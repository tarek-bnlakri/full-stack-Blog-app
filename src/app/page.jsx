
import styles from "./homepage.module.css";
import Featured from "./Components/Featured/Featured";
import CatigoryList from "./Components/CatigoryList/CatigoryList";
import Menu from "./Components/Menu/Menu";
import CardList from "./Components/CardList/CardList";


export default function Home({searchParams}) {
  const page =parseInt(searchParams.page)  || 1;
  return(
    <div className={styles.container}>
      <Featured/>
      <CatigoryList/>
      <div className={styles.content}>
        <CardList page={page} />
        <Menu/>

      </div>
    </div>

  ) 
  
}
