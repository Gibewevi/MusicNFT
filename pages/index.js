import styles from '../styles/Home.module.css'
import Scene from './components/Scene'
import Header from './components/Header'

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <Scene />
    </div>
  )
}
