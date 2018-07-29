import localforage from 'localforage'

export const unicosStore = localforage.createInstance({
  name: 'unicos'
})
export const mensaisStore = localforage.createInstance({
  name: 'mensais'
})
export const cartaoStore = localforage.createInstance({
  name: 'cartao'
})
