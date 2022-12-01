exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'Jisu',
      age:25,
      email: 'jisulove735@gmail.com'
    })
  }
}