import axios from 'axios'
import { urlAPI } from '../../constants'

export const addDocuments = (id, table_id, files, token) =>
  Promise.all(
    files.map(file => {
      console.log('document.js:params: ', id, table_id, file.name)
      const fileReader = new FileReader()
      fileReader.onload = () =>
        axios({
          url: urlAPI,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
          data: {
            query: `mutation{
            addFileAndDocument(
              name:"${file.name}",
              type:"${file.type}",
              body:"${fileReader.result}"
              table_id:"${table_id}",
              owner_id:${id})
              {id}
            }`,
          },
        }).catch(console.error)
      return fileReader.readAsDataURL(file)
    })
  )
