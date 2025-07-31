import { create } from "zustand"

type Store = {
  profileState: any | null
  loading: boolean
  activeTab: string
  setLoading: (value: boolean) => void
  setProfile: (profile: any) => void
  setActiveProfileTab: (tab: string) => void
}

export const useProfileStore = create<Store>()(set => ({
  profileState: null,
  currencyState: {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    currencyPosition: "suffix",
    currencyType: "code",
    uuid: "",
    displayName: "United States dollar",
    updatedAt: "",
    locale: "en-US"
  },
  loading: false,
  activeTab: "profile",
  setActiveProfileTab: (tab: string) => set(() => ({ activeTab: tab })),
  setLoading: (value: boolean) => set(() => ({ loading: value })),
  setProfile: profile => set(() => ({ profileState: profile }))
}))
