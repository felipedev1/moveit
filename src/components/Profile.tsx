import styles from '../styles/components/Profile.module.css'

export function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img 
        src="https://github.com/felipedev1.png" 
        alt="Felipe"
        className={styles.profilePicture}
      />
      <div className={styles.name}>
        <strong>Felipe Pereira</strong>
        <p className={styles.level}>
          <img src="icons/level.svg" alt="level"/>
          Level 1
        </p>
      </div>
    </div>
  )
}