import { createContext, useState, ReactNode } from 'react'
import challenges from '../../challenges.json'

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  activeChallenge: Challenge;
  startNewChallenge: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData)

interface ChallengesProviderProps {
  children: ReactNode;
}

export function ChallengesProvider({children} : ChallengesProviderProps) {

  
  const [activeChallenge, setActiveChallenge] = useState(null)

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]
    setActiveChallenge(challenge)
  }

  return (
    <ChallengesContext.Provider 
      value={{
        activeChallenge,
        startNewChallenge,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  )
}