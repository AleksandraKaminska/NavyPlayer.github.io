// import store from 'store'
// import fetchJsonp from 'fetch-jsonp'
const { DZ } = window

const login: any = () =>
  DZ?.login(
    ({ authResponse }) => {
      console.log(authResponse)
      if (authResponse.accessToken) {
        // DZ.api('/user/me', (response) => {
        //   if (response.id) {
        //     const login = document.querySelector('.login')
        //     login.style.display = 'none'
        //     const URL = `/user/${response.id}/flow?access_token=${authResponse.accessToken}&limit=100&output=jsonp`
        //     fetchJsonp(`https://api.deezer.com${URL}`)
        //       .then((resp) => resp.json())
        //       .then((data) => {
        //         if (data) {
        //           data = data.data
        //           if (data && data.length) {
        //             store.dispatch({
        //               type: 'FLOW',
        //               data
        //             })
        //             login.style.display = 'block'
        //             login.textContent = 'FLOW'
        //           }
        //         }
        //       })
        //   }
        // })
      }
    },
    { perms: 'basic_access,email' }
  )

export default login