import localforage from 'localforage'

export const cartoesStore = localforage.createInstance({
  name: 'cartoes'
})
