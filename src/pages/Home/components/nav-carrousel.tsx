import React from 'react'
import { NavButton } from './nav-button'
import {
  GoalIcon,
  AppleIcon,
  SoupIcon,
  ListChecksIcon,
  CalendarDaysIcon,
} from 'lucide-react'

export function NavCarrousel() {
  return (
    <nav className="w-full p-2 flex items-center overflow-x-auto no-scrollbar">
      <NavButton to="/meu-plano-diario" title="Plano de Hoje" Icon={GoalIcon} />

      <NavButton to="/meus-alimentos" title="Meus Alimentos" Icon={AppleIcon} />

      <NavButton
        to="/minhas-refeicoes"
        title="Minhas Refeições"
        Icon={SoupIcon}
      />

      <NavButton
        to="minhas-rotinas"
        title="Minhas Rotinas"
        Icon={ListChecksIcon}
      />

      <NavButton
        to="/meus-planos"
        title="Meus Planos"
        Icon={CalendarDaysIcon}
      />
    </nav>
  )
}
