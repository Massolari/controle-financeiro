import localforage from 'localforage'
const store = localforage.createInstance({ name: "contas"})

export function addConta(conta) {
    store.setItem(conta.id, conta)
}


