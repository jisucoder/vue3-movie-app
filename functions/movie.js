const axios = require('axios')  //서버리스함수는 node.js환경에서 가능

exports.handler = async function (event) {
  console.log(event)
  const payload = JSON.parse(event.body)
  const { title, type, year, page, id } = payload
  const OMDB_API_KEY = '7035c60c'
  const url = id
  ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
  : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  try {
    const {data} = await axios.get(url)
    if(data.Error) {
      return {
        statusCode: 400,
        body: data.Error
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (error) {
    return {
      statusCode: error.response.status,
      body: error.message
    }
  }
}

//   return new Promise((resolve, reject)=>{
//     axios.get(url)
//       .then(res => {
//         if(res.data.Error){
//           reject(res.data.Error)
//         }
//         resolve(res)
//       })
//       .catch((err)=>{
//         reject(err.message)
//       })
//   })
// }