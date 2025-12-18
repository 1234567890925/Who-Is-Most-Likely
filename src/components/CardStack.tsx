import TinderCard from 'react-tinder-card'
import Card from './Cards.tsx'
import type { GameCard } from '../game/types'

type Props = {
  deck: GameCard[]
  onSwipe: (dir: string, card: GameCard) => void
}

export default function CardStack({ deck, onSwipe }: Props) {
  return (
    <>
      {deck.map(card => (
        <TinderCard
          key={card.id}
          onSwipe={dir => onSwipe(dir, card)}
          preventSwipe={['down']}
        >
          <Card text={card.text} />
        </TinderCard>
      ))}
    </>
  )
}
