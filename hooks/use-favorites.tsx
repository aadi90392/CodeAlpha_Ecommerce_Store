"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"

interface FavoriteItem {
  id: string
  name: string
  price: number
  image: string
  category: string
  rating: number
}

interface FavoritesState {
  items: FavoriteItem[]
}

type FavoritesAction =
  | { type: "ADD_FAVORITE"; payload: FavoriteItem }
  | { type: "REMOVE_FAVORITE"; payload: string }
  | { type: "LOAD_FAVORITES"; payload: FavoriteItem[] }
  | { type: "CLEAR_FAVORITES" }

const FavoritesContext = createContext<{
  items: FavoriteItem[]
  addToFavorites: (item: FavoriteItem) => void
  removeFromFavorites: (id: string) => void
  isFavorite: (id: string) => boolean
  clearFavorites: () => void
} | null>(null)

function favoritesReducer(state: FavoritesState, action: FavoritesAction): FavoritesState {
  switch (action.type) {
    case "ADD_FAVORITE":
      if (state.items.find((item) => item.id === action.payload.id)) {
        return state
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      }
    case "REMOVE_FAVORITE":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }
    case "LOAD_FAVORITES":
      return { items: action.payload }
    case "CLEAR_FAVORITES":
      return { items: [] }
    default:
      return state
  }
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(favoritesReducer, { items: [] })

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites")
    if (savedFavorites) {
      try {
        const items = JSON.parse(savedFavorites)
        dispatch({ type: "LOAD_FAVORITES", payload: items })
      } catch (error) {
        console.error("Failed to load favorites from localStorage:", error)
      }
    }
  }, [])

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(state.items))
  }, [state.items])

  const addToFavorites = (item: FavoriteItem) => {
    dispatch({ type: "ADD_FAVORITE", payload: item })
  }

  const removeFromFavorites = (id: string) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: id })
  }

  const isFavorite = (id: string) => {
    return state.items.some((item) => item.id === id)
  }

  const clearFavorites = () => {
    dispatch({ type: "CLEAR_FAVORITES" })
  }

  return (
    <FavoritesContext.Provider
      value={{
        items: state.items,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
