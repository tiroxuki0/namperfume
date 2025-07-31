import { create } from "zustand"
import { ItemType } from "antd/es/menu/interface"

import { persist, createJSONStorage } from "zustand/middleware"

import { DEFAULT_ROUTE } from "@root/constant"

type Store = {
  selectedMenus: ItemType[]
  setSelectedMenus: (menus: ItemType[]) => void
  currentPath: string
  setCurrentPath: (path: string) => void
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

export const useStateMenu = create<Store>()(
  // Wrap the original store creator with the 'persist' middleware
  persist(
    set => ({
      selectedMenus: [],
      setSelectedMenus: menu => set(() => ({ selectedMenus: menu })),
      currentPath: DEFAULT_ROUTE,
      setCurrentPath: (path: string) => set(() => ({ currentPath: path })),
      collapsed: false,
      setCollapsed: (value: boolean) => set(() => ({ collapsed: value }))
    }),
    {
      name: "menu-state-storage", // A unique name for the item in session storage
      storage: createJSONStorage(() => sessionStorage), // Specify sessionStorage
      // Use 'partialize' to select which parts of the state to persist.
      partialize: state => ({
        currentPath: state.currentPath,
        collapsed: state.collapsed
      })
    }
  )
)
