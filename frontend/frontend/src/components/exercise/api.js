import axios from 'axios'


export async function fetchItem(page) {
    const retArr = [];
    try {
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/photos/${page+1}`
        );
        retArr.push({
            url:response.data.title,
            idx:1,
        })
    }catch(e) {
        console.log('error')
    }
    console.log(retArr)
    return retArr
 

    
  }


// export async function fetchItem(page) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const retArr = [];

//       for (let i = page * 1; i < (page + 1) * 1; i++) {
//         retArr.push({
//           url: `https://jsonplaceholder.typicode.com/photos/${page}`,
//           idx: i,
//         });
//         console.log(retArr)
//       }

//       resolve(retArr);
//     }, 100);
//   });
// }