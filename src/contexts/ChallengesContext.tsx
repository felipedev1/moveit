import Cookies from 'js-cookie'
import { createContext, useState, ReactNode, useEffect } from 'react'
import challenges from '../../challenges.json'

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  activeChallenge: Challenge;
  level: number;
  currentExperience: number;
  experienceToNextLevel: number;
  challengesCompleted: number;
  completeChallenge: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData)

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export function ChallengesProvider({children, ...rest} : ChallengesProviderProps) {

  const [activeChallenge, setActiveChallenge] = useState(null)

  const [level, setLevel] = useState(rest.level || 1)
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience || 0)
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted || 0)
  
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('challengesCompleted', String(challengesCompleted))
  }, [level, currentExperience, challengesCompleted])

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]
    setActiveChallenge(challenge)

    const alarmSong = new Audio('/notification.mp3')
    alarmSong.volume = 0.7
    alarmSong.play()

    if(Notification.permission === 'granted') {
      new Notification('Novo desafio', {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
    if(!activeChallenge){
      return;
    }

    let finalExperience = currentExperience + activeChallenge.amount

    if(finalExperience > experienceToNextLevel) {
      levelUp()
      finalExperience = finalExperience - experienceToNextLevel
    }
    
    setCurrentExperience(finalExperience)
    setChallengesCompleted(challengesCompleted + 1)
    resetChallenge()
  }

  function levelUp() {
    setLevel(level + 1)
  }

  return (
    <ChallengesContext.Provider 
      value={{
        activeChallenge,
        level,
        currentExperience,
        experienceToNextLevel,
        challengesCompleted,
        completeChallenge,
        startNewChallenge,
        resetChallenge,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  )
}