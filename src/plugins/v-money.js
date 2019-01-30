import money from 'v-money'

export default ({ app, router, Vue }) => {
  Vue.use(money, {
    decimal: ',',
    thousands: '.'
  })
}
