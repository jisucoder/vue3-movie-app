import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

export default {
  //module
  namespaced: true,
  //data
  state: () => ({
    movies: [],
    message: '',
    loading: false
  }),
  //computed
  getters: {},
  //methods
  //변이
  mutations: {
    updateState(state, payload) {
      //['movies','message', 'loading']
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
        state.message = payload.message
      })
    },
    resetMovies (state){
      state.movies = []
    }
  },
  //비동기
  actions: {
    async searchMovies({state, commit}, payload) {    //context 객체구조분해{state, getters, commit}
      const {title, type, number, year} = payload
      const OMDB_API_KEY = '7035c60c'

      const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`)
      const { Search, totalResults }= res.data
      commit('updateState', {
        movies: _uniqBy(Search, 'imdbID')
      })
      console.log(totalResults)
      console.log(typeof totalResults) //string

      const total = parseInt(totalResults, 10)
      const pageLength = Math.ceil(total / 10) //올림처리

      //추가요청
      if(pageLength > 1) {
        for (let page = 2; page <= pageLength; page += 1) {
          if (page > (number / 10))  break
          const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`)
          const { Search } = res.data
          commit('updateState', {
            movies: [
              ...state.movies, 
              ..._uniqBy(Search, 'imdbID')]
          })
        }
      }
    }
  }
}