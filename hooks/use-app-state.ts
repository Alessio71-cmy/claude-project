'use client'

import { useSyncExternalStore } from 'react'
import { getServerState, getState, subscribe, type AppState } from '@/lib/storage'

/**
 * Lo stato dell'app come sorgente esterna. useSyncExternalStore è la via
 * corretta qui: durante il prerender restituisce lo stato del server, poi
 * passa a quello reale, senza il lampeggio da idratazione che si ottiene
 * leggendo il localStorage dentro un useEffect.
 */
export function useAppState(): AppState {
  return useSyncExternalStore(subscribe, getState, getServerState)
}

/**
 * Vero solo dopo l'idratazione. Serve per le parti che non possono essere
 * rese sul server in modo sensato — l'indice del giorno dipende dall'ora
 * locale del telefono, che il server non conosce.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
}
