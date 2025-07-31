import { create } from 'zustand'

type Store = {
  unreadNotificationCount: number | null
  setUnreadNotificationCount: (value: number) => void
}

export const useNotificationsStore = create<Store>()((set) => ({
  unreadNotificationCount: null,
  setUnreadNotificationCount: (count) => set(() => ({ unreadNotificationCount: count })),
}))
