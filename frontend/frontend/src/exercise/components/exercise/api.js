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