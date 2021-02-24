import { useState } from 'react'
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
  const [hasActiveChallenge, setHasActiveChallenge] = useState(true) 

  return (
    <div className={styles.challengeBoxContainer}>
      {hasActiveChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe 400 xp</header>
          
          <main>
            <img src="icons/body.svg" alt=""/>
            <strong>Novo desafio</strong>
            <p>
              Levante e faça uma caminhada de 3 minutos.
            </p>
          </main>
          <footer>
            <button 
              type="button"
              className={styles.challengeFailedButton}
              onClick={()=>{}}
            >
              Falhei
            </button>
            <button 
              type="button"
              className={styles.challengeSucceededButton}
              onClick={()=>{}}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>
            Finalize um clico para receber um desafio
          </strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up"/>
            Avance de level completando desafios.
          </p>
        </div>
      )}
    </div>
  )
}